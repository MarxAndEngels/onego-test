<template>
  <div class="slider">
    <client-only>
      <carousel :dots="false" :nav="false" :responsive="{0:{items:2}, 768:{items:4}}" loop>
        <template slot="prev"><span class="prev slider_nav_arrow"></span></template>
        <template slot="next"><span class="next slider_nav_arrow"></span></template>
        <div class="slide" v-for="(slide, index) in slides" :key="index">
          <img class="bank_logo" :src="'img/banks/'+ slide +'-bank.svg'" alt="bank">
        </div>
      </carousel>
    </client-only>
  </div>
</template>

<script>
export default {
  data(){
    return{
      slides:[
       "tinkoff",
       "alfa",
       "sber",
       "avangard",
       "center-invest",
       "east",
       "expert",
       "expo",
       "gazprom",
       "hamkor",
       "home-credit",
       "kapital",
       "mkb",
       "open",
       "otb",
       "plus",
       "pochta",
       "promsvaz",
       "reiffeisen",
       "renessans",
       "ros",
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.slider{
  position: relative;
  @media screen and (max-width:$large-display){
    padding: 0 64px;
  }
}
.slider_nav_arrow{
  background: $darkGrey;
}
.slide{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 60px;
  margin: 0 auto;
  cursor: pointer;
  @media screen and (max-width:$large-display){
    width: 96px;
    height: 32px;
  }
}
.bank_logo{
  max-width: 100%;
  max-height: 100%;
}

</style>
