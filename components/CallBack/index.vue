<template>
  <div>
    <div class="call_back" @click="isModal = true" :class="{active:isActive}">
      <div class="anim_bg"></div>
      <svg-icon class="call_back_icon" name="phone"/>
    </div>
    <div>
      <transition name="fade">
        <modal callback
               title="Остались вопросы? Мы Вам перезвоним!"
               v-show="isModal"
               @sendForm="sendForm"
               @closeModal="isModal = false"/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isModal:false,
      once: true,
      isActive:false
    }
  },
  methods:{
    sendForm(){
      this.isModal = false
    },
    windowScroll(){
      if(this.once){
        this.once = false
        setTimeout(()=>{
          this.isActive = true
        },4000)
      }
      else {
        return false
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.windowScroll)
  }
}
</script>

<style scoped lang="scss">
  .call_back{
    position: fixed;
    z-index: 10;
    right: 50%;
    bottom: 32px;
    width: 300px;
    height: 48px;
    background: $mainColor;
    border-radius: 32px;
    transform: translateX(50%);
    display: flex;
    align-items: center;
    border: 2px solid #fff;
    justify-content: center;
    transition: .24s;
    cursor: pointer;
    &:hover{
      background: $mainColorHover;
    }
    &:after{
      content: 'Заказать обратный звонок';
      color: #fff;
      font-size: 18px;
      position: relative;
      z-index: 2;
    }
    &.active{
      right: 16px;
      transform: none;
      width: 48px;
      &:after{
        content: '';
      }
      .call_back_icon{
        opacity: 1;
      }
    }
  }
  .call_back_icon{
    fill: #fff;
    position: absolute;
    top: 11px;
    left: 10px;
    z-index: 1;
    width: 24px;
    height: 24px;
    opacity: 0;
    transition: opacity .24s;
  }
  .anim_bg{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 32px;
    top: 50%;
    left: 50%;
    z-index: 1;
    background: transparentize( $mainColor, 0.2 ) ;
    transform: translateY(-50%) translateX(-50%);
    animation: callback 1.6s infinite ease-in-out;
  }
  @keyframes callback {
    0%{
      width: 100%;
      opacity: 1;
    }
    50%{
      width: 120%;
      opacity: 0;
    }
    100%{
      width: 100%;;
      opacity: 0;
    }
  }
</style>
