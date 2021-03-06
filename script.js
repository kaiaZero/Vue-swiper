var app = new Vue({
  el:'#app',
  data:{
    images:[{
      src:'static/1.jpg'
    },
      {
      src:'static/2.jpg'
    },
      {
      src:'static/3.jpg'
    }],
    position:-500,
    currentIndex:1,
    animation:true,
    des:'',
  },
  mounted(){
    this.init()
  },
  computed:{
    //修改style移动图片
    move:function(){
      return {left:`${this.position}px`}
    },
    len:function(){
      return this.images.length
    },
    dotDes:function(){
      return -500*(i+1)
    },
   },
  methods:{
    init(){
      this.play();
    },
    //按左右键的移动
    movement(distance,direction){
      if(!this.animation) return; //保证移动效果后click才再次有效，防止快速点击事件
      this.animation = false;
      //往右移direction:-1;往左direction:1;
      if(direction===-1)this.currentIndex++
      else this.currentIndex--;
      //边界情况
      if(this.currentIndex>this.len)this.currentIndex=1;
      if(this.currentIndex<1)this.currentIndex=this.len;
      var i=this.currentIndex-1;
      this.des = this.position + distance * direction;
      this.animate2(i,this.des)
    },
    //按圆点移动
    movement2(i){
      this.currentIndex=i+1;
      this.des=-500*(i+1);
      this.animate2(i,this.des);
    },
    //移动效果
    animate2(i,des){
      if((des-this.position)<-0.1||(des-this.position>0.1)){
          var step = (des-this.position)/3;
          this.position+=step;
          setTimeout(()=>{this.animate2(i,des)},20)
        }
      else if(this.position>-2){
          this.position = -500 *this.len;
          this.animation = true;
        }
      else if(this.position<-500*(this.len+1)+2){
          this.position = -500;
          this.animation = true;
        }
      else this.animation = true;
    },
    //自动播放
    play(){
      if(this.timer){
        window.clearInterval(this.timer);
        this.timer = null;
      }
      this.timer=window.setInterval(()=>{
        this.movement(500,-1);
      },3000)
    },
    stop(){
      window.clearInterval(this.timer);
      this.timer = null;
    }
  },
})
