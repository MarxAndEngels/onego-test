<template>
<div>
  <div class="container">
       <h1 class="hidden-h1">{{ page_title }}</h1>
    <div class="main_page">
      <sliders-main class="slider"/>
      <!-- <lists-marks class="marks"/> -->
      <h2 class="h2_title">Подобрать автомобиль</h2>
        <!-- <breadcrumbs :items="[
      {title:'Главная', link:'/', active:false},
      {title:'С пробегом', link:'/'+$config.used_page, active:true},
      ]"/> -->
     <h1 class="h1_title">{{ page_title }}</h1>
    <lists-marks class="marks"/>
    <!-- <lists-all/> -->
        <h2 class="h2_title">Последние поступления</h2>
    <lists-cars has-sort="false" :default-sort="'created_at|desc'" class="cars" :limit="6" has-pagination/>
     <filters-main class="filter"/>
       <!-- <h2 class="h2_title">Последние поступления</h2>
      <lists-cars :has-sort="false" :default-sort="'created_at|desc'" :limit="4" class="cars"/> -->
       </div>
  </div>

   <div class="space-content-x-lg"></div>
   <!-- <parallax :title="parallaxTitle" :text='parallaxText'/> -->
   <div class="space-content-x-lg"></div>
  <div class="container">
    <div class="main_page">
      <h2 class="h2_title">
        Банки-партнеры
      </h2>

      <sliders-banks class="banks"/>
    </div>
  </div>
  </div>
</template>

<script>
import seoTags from "~/mixins/seoTags";
export default {
    mixins: [seoTags],
  data(){
    return{
      parallaxTitle: 'Об автосалоне '+ this.$config.mark_title,
      parallaxText: `Придя в наш автосалон по адресу ${this.$config.address} Вас будет ожидать множество машин самого широкого выбора, автомобилей «бизнес» и среднего классов, седаны, внедорожники, хэтчбеки, минивены, универсалы самых стабильных, качественных и развитых производителей. Со всеми удобствами и возможностью оставляйте заявку на нашем сайте и приезжайте за Своей приятной покупкой!`
    }
  },
}
</script>

<style scoped lang="scss">

  .marks,.filter,.cars, .h2_title, .banks{
    margin-top: 16px;
  }
  
  .hidden-h1{
    opacity: 0;
    height: 0;
  }
</style>
