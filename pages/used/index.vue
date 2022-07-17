<template>
  <div class="container">

    <breadcrumbs :items="[
      {title:'Главная', link:'/', active:false},
      {title:'С пробегом', link:'/'+$config.used_page, active:true},
      ]"/>
     <h1 class="h1_title">{{ page_title }}</h1>
    <!-- <lists-marks class="marks"/> -->
    <lists-cars class="cars" :limit="20" has-pagination has-sort/>
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
