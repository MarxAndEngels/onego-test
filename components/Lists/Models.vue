<template>
<div>
  <!-- <div class="title_models-count" v-if="folders">
        Количество моделей: {{ countModels }}
      </div> -->

  <div class="list_models" ref="models">
<!--    <div class="back_to_mark" @click="$router.push('/'+ $config.used_page)"> Выбрать марку</div>-->
    <div class="models_line">
      <div class="models_title">
        Модели:
      </div>
      
      <div class="models_line" @click='changeState'>
      <nuxt-link class="list_model" v-for="model in folders" :key='model.id'
                 :to="'/'+ $config.used_page +'/'+markSlug+'/' + model.slug">
        <div class="name">{{model.title}}</div>
        <div class="number">{{model.offers_count}}</div>
      </nuxt-link>
      </div>
    </div>
    
  </div>
  </div>
</template>

<script>
import usedFolders from '~/apollo/queries/usedFolders'
export default {
  mounted() {
    window.scrollTo(0, this.$refs.models.offsetTop - 128 )
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    markSlug:{
      type: String,
      default: ''
    },
  },
  apollo: {
    folders: {
      prefetch: true,
      query: usedFolders,
      variables () {
        return { site_id: this.$config.site_id_used, mark_slug: this.markSlug }
      }
    }
  },
  // computed:{
  //   countModels(){
  //        let count = 0;
  //        for(let el of this.folders){
  //             count+= el.offers_count;
  //        }
  //        return count;
  //   }
  // }
  methods:{
       changeState(){
       this.$store.commit('setModal', true)
    },
  }
}
</script>

<style scoped lang="scss">
.title_models-count{
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
}
.list_models{
  display: flex;
  align-items: flex-start;
  @media screen and (max-width:$large-display){
    margin-top: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
}
.back_to_mark{
  display: none;
  margin: 8px 0 16px;
  color: $mainColor;
  text-decoration: underline;
  @media screen and (max-width:$large-display){
    display: block;
  }
}
.models_title{
  font-size: 18px;
  margin-right: 16px;
    margin-bottom: 16px;
  @media screen and (max-width:$large-display){
    margin-bottom: 16px;
    font-size: 20px;
    font-weight: bold;
  }
}
.models_line{
  margin-left: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media screen and (max-width:$large-display){
    margin-left: 0;
  }
}
.list_model{
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border: 1px solid $black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  color: #000;
  justify-content: space-between;
  transition: .24s;
    &.active{

    background: $mainColor;
    color: #f4f4f4;
      border: 1px solid $mainColor;
  }
    &.active .number{
    color: $white;
  }
  &:hover{
       transform: translate3d(0px,-3px,0);
  }
  .name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .number{
    margin-left: 8px;
    color: $mainColor;
    font-weight: bold;
     &.active{
    background: #f4f4f4;
    color: $black;
    // background: $mainColor;
    // color: #f4f4f4;
    //   border: 1px solid $mainColor;
  }
  }
}
</style>
