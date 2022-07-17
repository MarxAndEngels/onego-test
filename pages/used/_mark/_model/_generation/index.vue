<template>
  <div class="container">
    <!-- <advantages/> -->
    <breadcrumbs :items="[
      {title:'Главная', link:'/', active:false},
      {title:'С пробегом', link:'/' + $config.used_page, active:false},
      {title:this.$route.params.mark.toUpperCase(), link:`/${$config.used_page}/${this.$route.params.mark}`, active:false},
      {title:this.$route.params.model, link:`/${$config.used_page}/${this.$route.params.mark}/${this.$route.params.model}`, active:false},
      {title:this.$route.params.generation, link:`/${$config.used_page}/${this.$route.params.mark}/${this.$route.params.model}/${this.$route.params.generation }`, active:true}
      ]"/>

          <h1 class="h2_title">{{ page_title }}</h1>
    <!-- <h2 class="h2_title">Автомобили <span class="upper">{{this.$route.params.mark}}</span> <span>{{this.$route.params.model}}</span> с пробегом</h2> -->
    <!-- <lists-marks class="marks"/> -->
    <div class="lists">
      <!-- <lists-models :mark-slug="this.$route.params.mark" class="models"/> -->
      <!-- <lists-generations :model-slug="this.$route.params.model" :mark-slug="this.$route.params.mark" class="generations"/> -->
    </div>

    <lists-cars :generation="this.$route.params.generation" :mark="this.$route.params.mark" :model="this.$route.params.model" class="cars" :limit="20" has-pagination/>
  </div>
</template>
<script>
  import seoTags from "~/mixins/seoTags";
export default {
    mixins: [seoTags],

}
</script>
<style lang="scss" scoped>
.marks, .models, .cars, .h2_title ,.generations{
  margin-top: 16px;
}
.lists{
  display: flex;
  @media screen and (max-width:$large-display){
    flex-direction: column;
  }
}
.generations{
  margin-left: 24px;
  @media screen and (max-width:$large-display){
    margin-left: 0;
  }
}
</style>
