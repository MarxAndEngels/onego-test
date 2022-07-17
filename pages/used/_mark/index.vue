<template>
  <div class="container">
    <!-- <advantages/> -->
    <breadcrumbs :items="[
      {title:'Главная', link:'/', active:false},
      {title:'С пробегом', link:'/'+$config.used_page, active:false},
      {title:this.$route.params.mark.toUpperCase(), link:`/${$config.used_page}/${this.$route.params.mark}`, active:true}
      ]"/>
         <h1 class="h2_title">{{ page_title }}</h1>
    <!-- <h2 class="h2_title">Автомобили <span class="upper">{{this.$route.params.mark}}</span> с пробегом</h2> -->
    <!-- <lists-marks class="marks"/> -->
    <!-- <lists-models :mark-slug="this.$route.params.mark" class="models"/> -->
    <lists-cars :mark="this.$route.params.mark" class="cars" :limit="20" has-pagination/>
  </div>
</template>
<script>
  import seoTags from "~/mixins/seoTags";
export default {
    mixins: [seoTags],

}
</script>
<style lang="scss" scoped>
  .marks, .models, .cars, .h2_title{
    margin-top: 16px;
  }
</style>
