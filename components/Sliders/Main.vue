<template>
  <div class="slider">
    <div class="mock_wrapper">
      <!-- <nuxt-img class="slider_mock" format="webp" :src="'img/sliders/main/'+ slides[0].image +'.jpg'" alt="slide"/> -->
        <img class="slider_mock" :src="require('~/static/img/sliders/main/'+ slides[0].image +'.webp')" alt="slide"/>
    </div>
    <transition name="fade">
      <client-only v-show="isReady">
        <div  class="loaded_slider">
          <carousel :dots="false" :nav="false" :items="1" loop>
            <template slot="prev"><span class="prev main slider_nav_arrow"></span></template>
            <template slot="next"><span class="next main slider_nav_arrow"></span></template>
            <div class="slide" v-for="(slide, index) in slides" :key="index">
              <!-- <nuxt-img  lass="slide_image" format="webp" :src="'img/sliders/main/'+slide.image+'.jpg'" alt=""/> -->
              <picture>
                  <source media="(min-width: 768px)" type="image/webp" :srcset="'img/sliders/main/'+slide.image+'.webp'">
                <img media="(min-width: 768px)" class="slide_image" :src="'img/sliders/main/'+slide.image+'.jpg'" alt="slide_image">
                  <source type="image/webp" :srcset="'img/sliders/main/mobile-'+slide.image+'.webp'">
                <!-- <img class="slide_image" :src="'img/sliders/main/mobile-'+slide.image+'.jpg'" alt="slide_image"> -->
              </picture>
              <div class="slide_content">
                <div class="slide_title">
                  {{slide.title}}
                </div>
                <div class="slide_text">
                  {{slide.text}}
                </div>
                <nuxt-link :to="'/' + slide.button.link" class="button">
                  {{slide.button.text}}

                   <span class="flare"></span>
                </nuxt-link>
              </div>

                   <div class="loaded_slider_mask"></div>
            </div>
          </carousel>
        </div>
      </client-only>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isReady:false,
      slides:[
        {
          title:'Скидка на кредит до 100 000 ₽',
          text:'Дополнительная скидка',
          image:'4',
          button:{
            text:'Выбрать автомобиль',
            link:'credit'
          }
        },
        {
          title:'Досрочное погашение',
          text:'Вам не придется встречать дополнительных штрафов',
          image:'1',
          button:{
            text:'Выбрать автомобиль',
            link:'credit'
          }
        },
        {
          title:'Первоначальный взнос от 0%',
          text:'Покуйпайте автомобиль в кредит без первоначального взноса.',
          image:'2',
          button:{
            text:'Выбрать автомобиль',
            link:'credit'
          }
        },
        {
          title:'Кредит по 2 документам',
          text:'Необходимы только паспорт и водительское удостоверение',
          image:'3',
          button:{
            text:'Выбрать автомобиль',
            link:'credit'
          }
        }
      ]
    }
  },
  mounted() {
    this.isReady = true
  }
}
</script>

<style scoped lang="scss">
  .slider{
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    margin-top: 16px;
  }
  .slide{
    position: relative;
  }
  .slider_mock{
    border-radius: 10px;
  }

  .loaded_slider_mask{
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
    display: none;
    @media(max-width: $large-display){
     display: block;
  }
}
  .slide_image, .slider_mock{
    aspect-ratio: 24/8;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    position: relative;
    z-index: 1;
    @media screen and (max-width:$small-display){
      aspect-ratio: 24/16;
    }
  }
  .loaded_slider{
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .mock_wrapper{
    position: relative;
    overflow: hidden;
    &:after{
      content: '';
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // background: $black;
      // opacity: .32;
    }
  }
  .slide_content{
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    text-align: center;

    width: 100%;
    height: 100%;
    top: -20px;
    left: 0;
    padding: 64px 64px 24px;
    z-index: 4;
    color: $black;
    @media screen and (max-width:$large-display){
      padding: 32px 64px 16px;
    }
    @media screen and (max-width:$small-display){
      padding: 32px 16px 16px;
    }
    &:after{
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // background: $black;
      // opacity: .12;
    }
  }
  .slide_title{
    font-size: 32px;
    z-index: 8;
    @media screen and (max-width:$large-display){
     font-size: 24px;
     color: $white;
    }
  }
  .button{
    text-decoration: none;
    width: max-content;
    margin-top: 32px;

      position: relative; 
    overflow-x: hidden; 
    @media screen and (max-width:$large-display){
      margin-top: 16px;
    }
  }
  


  .slide_text{
    font-size: 16px;
    margin-top: 8px;
    @media screen and (max-width:$large-display){
     font-size: 14px;
     color: $white;
    }
  }
  .slider_nav_arrow{
    z-index: 6;
  }
</style>
