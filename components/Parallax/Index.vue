<template>
  <div>
    <div class="parallax">
    <div class="parallax-content">
        <div class="container">
                   <h2> {{ title }}</h2>
        <p> {{ text }}</p> 
        </div>
    </div>
    <div class="mask"></div>
</div>
  </div>
</template>

<script>
export default {
 props: {
    title:{
      type: String,
      default:() => ''
    },
    text:{
      type: String,
      default:() => ''
    }
  }
}
</script>

<style scoped lang="scss">
    .parallax{
        background-color: #232323;
        background: url('~/static/img/parallax/main-car-mobile.webp') ;
        background-attachment: fixed;
        min-height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    @media(min-width: $medium-display){
          .parallax{
        background-color: #232323;
        background: url('~/static/img/parallax/main-car.webp') ;
        background-attachment: fixed;
        min-height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    }
    .parallax-content{
        z-index: 2;
        text-align: center;
    }
    .parallax h2{
        color: $white;
          font-size: 22px;
        @media(min-width: $medium){
          font-size: 34px;
        }
    }
    .parallax p{
        color: $white;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.5;
    margin-top: 14px;
    margin-bottom: 8px;
    @media(min-width: $medium){
     font-size: 18px;
        }
    }
    .parallax .mask{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color:rgb(0, 0, 0, .7);
        z-index: 1;
    }
</style>