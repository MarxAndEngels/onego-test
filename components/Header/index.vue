<template>
  <div class="header">
    <div class="header_top">
      <div class="container">
        <div class="header_top_inner">
          <div class="top_title">Автомобили с пробегом {{$config.inaddress}}</div>
          <div class="top_info">
            <div class="top_info_address">
              {{$config.address}}
            </div>
            <div class="top_info_phone">
                <a :href="'tel:' + $config.phone">
                 {{$config.phone}}
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header_middle">
      <div class="container">
        <div class="header_middle_inner">
          <div class="burger" @click="isOpen = !isOpen" :class="{isOpen:isOpen}">
            <div class="burger_line"></div>
            <div class="burger_line"></div>
          </div>
          <nuxt-link @click.native="isOpen = false" class="logo_link" :to="'/'">
            <img src="~/static/main/logo.svg" class="main-logo_icon" alt="logo">
            <!-- <svg-icon class="main-logo_icon" name="logo" /> -->
          </nuxt-link>
          <div class="nav" :class="{isOpen:isOpen}">
            <nuxt-link @click.native="isOpen = false" :to="'/used'" class="nav_link">С пробегом</nuxt-link>
            <nuxt-link @click.native="isOpen = false" :to="'/credit'" class="nav_link">Автокредит</nuxt-link>
<!--            <nuxt-link @click.native="isOpen = false" :to="'/installments'" class="nav_link">Рассрочка</nuxt-link>-->
            <nuxt-link @click.native="isOpen = false" :to="'/buyout'" class="nav_link">Выкуп</nuxt-link>
            <nuxt-link @click.native="isOpen = false" :to="'/exchange'" class="nav_link">Трейд-ин</nuxt-link>
            <nuxt-link @click.native="isOpen = false" :to="'/contacts'" class="nav_link">Контакты</nuxt-link>
            <nuxt-link @click.native="isOpen = false" :to="'/about'" class="nav_link">Об автосалоне</nuxt-link>
          </div>
          <div class="mobile_address">
            {{$config.address}}
          </div>
          <a :href="'tel:' + $config.phone" class="phone_icon">
            <svg-icon name="phone" />
          </a>
          <!-- <a href=""></a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isOpen:false
    }
  },
}
</script>

<style scoped lang="scss">
  .main-logo_icon{
    width: 100%;
    max-width: 120px;
    height: 100%;
    max-height: 74px;
    margin-left: 14px;
    transform: translate3d(0px,2px,0);
  }
  @media(min-width: 991px){
     .main-logo_icon{
    max-width: 160px;
  }
  }
  .header{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
    background: #fff;
    box-shadow: 0 0 24px -8px rgb(0 0 0 / 40%);
  }
  .mobile_address{
    display: none;
    @media screen and (max-width:$large-display){
      display: block;
      width: 160px;
      margin-left: auto;
      margin-right: 24px;
      color: $darkGrey;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      text-align: right;
    }
  }
  .phone_icon{
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparentize( $mainColor, 0.32 );
    border-radius: 10px;
    cursor: pointer;
    margin-left: auto;
    outline: 0 solid transparentize( $mainColor, 0.64 );
    transition: outline .24s;
    transition: transform 0.3s ease-in-out;
    &:hover{
      // outline: 3px solid transparentize( $mainColor, 0.64 );
      transform: scale(1.1,1.1);
    }
    @media screen and (max-width:$large-display){
      width: 32px;
      margin-left: 0;
      height: 32px;
      margin-right: 16px;
      border-radius: 5px;
    }
    svg{
      fill:#fff;
      width: 50%;
      height: 50%;
    }
  }

  a{
    text-decoration: none;
    color:inherit;
  }
  .nav{
    width: 70%;
  }
  .header_top{
    background: $lightGrey;
  }
  .top_info{
    display: flex;
  }
  .top_info_address{
    margin-right: 24px;
  }
  .header_top_inner,.header_middle_inner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
  }
  .header_top_inner{
    @media screen and (max-width:$large-display){
      position: relative;
      z-index: 16;
    }
  }
  .header_middle_inner{
    @media screen and (max-width:$large-display){
      justify-content: flex-start;
    }
  }
  .header_top_inner{
    font-size: 12px;
    @media screen and (max-width:$large-display){
      display: none;
    }
  }
  .logo_link{
    transition: .24s linear;
    @media screen and (max-width:$large-display){
      position: relative;
      z-index: 16;
    }
    img{
      max-width: 200px;
      max-height: 62px;
      pointer-events: none;
      @media screen and (max-width:$large-display){
        max-width: 160px;
        max-height: 48px;
        margin-left: 24px;

      }
    }
    &:hover{
      opacity: .8;
    }
  }
  .burger{
    position: relative;
    z-index: 20;
    height:16px;
    width: 32px;
    display: none;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    cursor: pointer;
    &:hover{
      opacity: .8;
    }
    &.isOpen{
      .burger_line{
        &:first-child{
          top: 5px;
          transform: rotate(45deg);
        }
        &:last-child{
          top: -6px;
          transform: rotate(-45deg);
        }
      }
    }
    @media screen and (max-width:$large-display){
      display: flex;
    }
  }
  .burger_line{
    height: 4px;
    width: 100%;
    border-radius: 3px;
    position: relative;
    transition: .24s;
    background: $mainColor;
  }
  .nav{
    display: flex;
    justify-content: center;
    margin-left: 32px;
    @media screen and (max-width:$large-display){
      position: fixed;
      width: 100vw;
      height: calc(100vh - 67px);
      z-index: 15;
      top: 67px;
      left: 0;
      transform: translateX(-100%);
      background: $grey;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      transition: .24s;
      margin-left: 0;
      &.isOpen{
        transform: translateX(0);
      }
    }
  }
  .nav_link{
    color: $black;
    text-decoration: none;
    position: relative;
    margin: 0 10px;
    font-size: 16px;
    @media screen and (max-width:$large-display){
      font-size: 20px;
      padding: 16px;
      width: 100%;
      margin: 0;
      border-bottom: 1px solid $darkGrey;
    }
    &.disabled{
      display: none;
    }
    &:after{
      content: '';
      @media screen and (min-width:$large-display){
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        transition: .24s linear;
        height: 2px;
        background: $mainColor;
      }
    }
    &:hover{
      @media screen and (min-width:$large-display){
        color: $mainColor;
        &:after{
          width: 100%;
        }
      }
    }
    &.nuxt-link-active{
      color: $mainColor;
      &:after{
        width: 100%;
      }
    }
  }
</style>
