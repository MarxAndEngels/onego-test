<template>
    <div>
         <div class="intro">
   <div class="video">
  <video class="videom" src="~/static/video/about2.mp4" autoplay muted loop> </video>
 
 <div class="video-mask"></div>
  <div class="video-content">
           <h1 class="h2-title">{{ pageTitle }}</h1>
      <p>
        Проверенные временем, автосалон {{$config.mark_title}} успешно закрепился на рынке, способствуя развитию в качественной, добросовестной и результативной работе с товарами и клиентами.
      </p>
      <br>
      <!-- <p>
        Посетив наш автосалон по адресу {{$config.address}} Вы увидите большое количество автомобилей самого широкого спектра классов, начиная от автомобилей «бизнес» и среднего классов, семейные универсалы и минивэны, внедорожников от ведущих мировых производителей, так и автомобилей класса «VIP». Разобраться во всём этом разнообразии автомобилей Вам помогут наши менеджеры, а индивидуальный подход и дружественная атмосфера – мы надеемся, сделают Вашу покупку, ещё более приятной.
      </p> -->
    </div>
</div>

</div>
  <!-- <div class="introText">
    
    <h1 class="inn">Вы попали на ошибку 404 </h1>
  </div> -->

    </div>
</template>
<script>
export default {
         props: {
    pageTitle:{
      type: String,
      default:() => ''
    }
  }
}
</script>
<style scoped lang='scss'>
    .intro {
    width: 100%;
    height: 100%;
    display: block;
    opacity: 1;
    overflow: hidden;
    //  background-color: #232323;
}
.video-content{
     position: absolute;
      top: 50%; 
    left: 50%;
     color: $white;
    transform: translate(-50%, -50%); 
    z-index: 2;
     @media screen and (max-width: $small-display){
    top: 6%; 
    left: 2%;
    transform: none;
    }
}
.video{
    position: relative;
         background-color: #232323;
}
.video-mask{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color:rgb(0, 0, 0, .7);
        z-index: 1;
    }


.videom{
    height: 100%;
    width: 100%;
    z-index: 1;
}
.introText{
    display: flex;
   justify-content: center;
   align-items: center;
}
.inn{
    font-size: 16px;
    color: rgb(186, 27, 27);
    z-index: 5;
}

.h2-title{
    margin: 16px 0;
    font-size: 28px;

     @media screen and (max-width: $xx-large-display){
       margin: 16px 0;
    font-size: 26px;

    }
     @media screen and (max-width: $small-display){
      font-size: 14px;
       margin: 0;
       margin-top: 10px;
      line-height: 18px;
      padding-top: 14px;
        //   margin: 12px 0;
    }
  }
  p{
    font-size: 22px;
      line-height: 26px;

          @media screen and (max-width: $xx-large-display){
    font-size: 19px;
      line-height: 22px;

    }
    @media screen and (max-width: $small-display){
      font-size: 12px;
      line-height: 16px;
    }
  }

</style>