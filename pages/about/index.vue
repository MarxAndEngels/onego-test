<template>

<div>
    <!-- <videoAbout :page-title='page_title'/> -->
  <!-- <adversting/> -->
   <!-- <div class="container">
     <center><h2 class="title-about">Наши преимущества</h2></center>
       <steps-credit-two />
   </div> -->

 <div class="space-content-x-lg"></div>
  <div class="container">
     <center><h2 class="title-about">Наши преимущества</h2></center>
       <steps-credit-two />
   </div>

<div class="space-content-x-lg"></div>
 <!-- <parallax :title="parallaxTitle" :text='parallaxText'/> -->


    <!-- <div class="about">
    <h2 class="h2-title">Об автосалоне</h2>
    <div class="content">
      <p>
        Коллектив автосалона {{$config.mark_title}} накопил большой опыт по качественному и быстрому обслуживанию клиентов и их автомобилей, мы прикладываем все усилия для того, чтобы закрепить свой успех на рынке, и постоянно улучшать обслуживание наших клиентов.
      </p>
      <p>
        Посетив наш автосалон по адресу {{$config.address}} Вы увидите большое количество автомобилей самого широкого спектра классов, начиная от автомобилей «бизнес» и среднего классов, семейные универсалы и минивэны, внедорожников от ведущих мировых производителей, так и автомобилей класса «VIP». Разобраться во всём этом разнообразии автомобилей Вам помогут наши менеджеры, а индивидуальный подход и дружественная атмосфера – мы надеемся, сделают Вашу покупку, ещё более приятной.
      </p>
      <div class="images_line">
        <img src="~/static/img/about/1.jpeg" alt="img" class="img">
        <img src="~/static/img/about/2.jpeg" alt="img" class="img">
      </div>
    </div>
  </div> -->

  </div>
</template>

<script>
 import seoTags from "~/mixins/seoTags";
 

import Adversting from "../../components/Adversting/Index.vue";
export default {
   mixins: [seoTags],
    components: { Adversting },
      data(){
      return{
              parallaxTitle: 'Об автосалоне '+ this.$config.mark_title,
         parallaxText: `Придя в наш автосалон по адресу ${this.$config.address} Вас будет ожидать множество машин самого широкого выбора, автомобилей «бизнес» и среднего классов, седаны, внедорожники, хэтчбеки, минивены, универсалы самых стабильных, качественных и развитых производителей. Со всеми удобствами и возможностью оставляйте заявку на нашем сайте и приезжайте за Своей приятной покупкой!`
      }
     }
}
</script>

<style scoped lang="scss">
  .h2-title{
    margin: 32px 0 16px;
  }
  p{
    @media screen and (max-width: $small-display){
      font-size: 14px;
      line-height: 18px;
    }
  }
  .title-about{
    margin: 10px 0;
    margin-bottom: 24px;
    font-size: 32px;
  }
  .images_line{
    display: flex;
    margin-top: 24px;
    justify-content: space-between;
    flex-direction: column;
    @media screen and (min-width: $small-display){
      flex-direction: row;
    }
    .img{
      width: calc(50% - 12px);
      aspect-ratio: 24/16;
      -o-object-fit: cover;
      object-fit: cover;
      background: $grey;
      transition: .24s;
      @media screen and (max-width: $small-display){
        margin-right: 24px;
        margin-bottom: 0;
        width: 100%;
      }
      &:last-child{
        margin-bottom: 0;
        @media screen and (max-width: $small-display){
          margin-right: 0;
          margin-top: 16px;
        }
      }
      &:hover{
        @media screen and (min-width: $small-display){
          box-shadow: $box-shadow;
        }
      }
    }
  }
</style>
