<template>
  <div class="list_models" ref="generations">
<!--    <div class="back_to_mark" @click="$router.push('/'+ $config.used_page)"> Выбрать марку</div>-->
    <div class="models_line">
      <div class="models_title">
        Поколение:
      </div>
      <div @click='changeState' class="models_line">
      <nuxt-link class="list_model" v-for="generation in generations" :key='generation.id'
                 :to="'/'+ $config.used_page +'/'+ markSlug+'/' + modelSlug + '/' +generation.slug">
        <div class="name">{{generation.name}} [{{generation.year_begin}} - {{generation.year_end || 'н.в.'}}]</div>
        <div class="number">{{generation.offers_count}}</div>
      </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import usedGeneration from '~/apollo/queries/usedGeneration'
export default {
  mounted() {
    window.scrollTo(0, this.$refs.generations.offsetTop - 128 )
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
    modelSlug:{
      type: String,
      default: ''
    },
  },
  apollo: {
    generations: {
      prefetch: true,
      query: usedGeneration,
      variables () {
        return { site_id: this.$config.site_id_used, mark_slug: this.markSlug, folder_slug: this.modelSlug }
      }
    }
  },
    methods:{
       changeState(){
       this.$store.commit('setModal', true)
    },
  }
}
</script>

<style scoped lang="scss">

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
  margin-right: 20px;
  font-size: 18px;
  margin-bottom: 10px;
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
    // background: #f4f4f4;
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
  }
}
</style>
