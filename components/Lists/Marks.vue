<template>
  <div class="list_block" ref="marks">
    <div class="marks_block" :class="{mark_choosen : markSlug}">
<!--      <div class="title">-->
<!--        Каталог <span :class="{'uppercase': markSlug}">{{ markSlug ? markSlug : 'авто' }}</span> с пробегом в наличии-->
<!--      </div>-->

      <div id="marks" class="list" :class="{full:full}">
      <div v-if="!this.$route.params.mark" class="marks__fullCount">
   Прямо сейчас имеется в наличии <span class="marks__fullCount_count">{{ fullCount }}</span>
</div>

      <div v-if="this.$route.params.mark && !this.$route.params.model" class="marks__fullCount">
      Выберите модель автомобиля
</div>
      <div v-if="this.$route.params.model && !this.$route.params.generation" class="marks__fullCount">
      Выберите поколение автомобиля
</div>
      <div v-if="this.$route.params.model && this.$route.params.generation" class="marks__fullCount">
      Выберите автомобиль
</div>
        <nuxt-link class="item" :to="'/'+ $config.used_page +'/'+item.slug"
                   :class="{active:markSlug === item.slug}"
                   v-for="item in marks" :key='item.id'>
         <svg-icon  class="mark_icon" :name="'emblems/'+item.slug+'-logo'" />
          <div class="name">{{item.title}}</div>
          <div class="number">{{item.offers_count}}</div>
        </nuxt-link>
      </div>
      <div class="more_button button" @click="full = true" v-if="!full">
        Показать больше
      </div>
    </div>
  </div>

</template>

<script>
import usedMarks from '~/apollo/queries/usedMarks'
export default {
  mounted() {
    window.scrollTo(0, this.$refs.marks.offsetTop - 64 )
  },
  data(){
    return{
      full: false,
    }
  },
  props: {
    markSlug: {
      type: String,
      default: ''
    },
    has_icons:{
      type: Boolean,
      default: false
    },
    modelSlug: {
      type: String,
      default: ''
    }
  },
  computed:{
    currentMarkId(){
      if(!this.markSlug){
        return null;
      }
      return this.marks.filter(mark=> mark.slug === this.markSlug)[0].id
    },
    fullCount(){
      let count = 0;
        for(let item of this.marks){
           count += item.offers_count
        }
        let text=  this.declension({'count' : count, one: "автомобиль", few: "автомобиля", many: "автомобилей"});
        return count + ' ' + text;
    },

  },
  apollo: {
    marks: {
      query: usedMarks,
      variables () {
        return {
          site_id: this.$config.site_id_used
        }
      }
    }
  },
  methods:{
    declension ({count, one, few, many}){
    const isFloat = Math.round(count) !== count;
    let declension = many;
    if (isFloat) {
        declension = few;
    }else{
        const units = Math.abs(count % 10);
        const tens = Math.abs(count % 100);
        if (units === 1 && tens !== 11) {
          declension = one;
        } else if (2 <= units && units <= 4 && (tens < 10 || 20 <= tens)) {
          declension = few;
    }
    }
    return declension;
    }
  }
}
</script>

<style lang="scss" scoped>
.marks__fullCount{
  position: absolute;
  top:20px;
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  &::before{
    content: '';
    position: absolute;
    top:6px;
    left:0;
    background-color: $mainColor;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    display: block;
  }
}
.marks__fullCount_count{
  color: $mainColor;
}
.title{
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  padding-top: 24px;
  .uppercase{
    text-transform: uppercase;
    color: #3f3f3f;
  }
}
.mark_icon{
  width: 16px;
  height: 16px;
  margin-right: 4px;
  fill: $mainColor;
}
.mark_choosen{
  @media screen and (max-width:$large-display){
    display: none;
  }
}
.more_button{
  height: 32px;
  width: 100%;
  font-size: 14px;
  margin: 16px auto 0;
  justify-content: center;
  display: none;
  @media screen and (max-width:$large-display){
    display: flex;
  }
  &:hover{
    background: $mainColorHover;
  }
}
.list{
  position: relative;
  padding: 24px;
  padding-top: 66px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: flex-start;
  justify-content: center;
  background: #fff;
  box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
  @media screen and (max-width:$large-display){
    padding: 16px;
      padding-top: 76px;
    height: 235px;
    justify-content: space-between;
    overflow: hidden;
    &.full{
      height: 100%;
    }
  }
}
.models_loader{
  min-height: 36px;
  width: 100%;
  @media screen and (max-width:$large-display){
    min-height: auto;
  }
}
.list_loader{
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #fff;
  border-radius: 15px;
}
.item{
  width: 14%;
  padding: 12px 16px;
  // border-radius: 4px;
  display: flex;
  align-items: center;
  color: $mainColor;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.3s;
    // background: $lightGrey;
        background: #fcf8f8;
  @media screen and (max-width:$large-display){
    width: calc(50% - 4px);
    border: 1px solid $lightGrey;
    font-size: 14px;
    margin: 4px 0;
    justify-content: space-between;
  }
  &:nth-child(2n) {
    background: #f0f0f0;
   } 
  &::before{
    // content: '';
    // width: 11px;
    //     position: absolute;
    // height: 1px;
    // display: block;
    // top: 2px;
    //     opacity: 0.3;
    // background-color: $mainColor;
  }
  &.nuxt-link-active{
    background: $lightGrey;
    color: $mainColorHover;
    .number{
      color: $mainColorHover;
    }
  }
  &:hover{
    // border-radius: 0;
    // // background: $lightGrey;
     transform: translate3d(-5px,-5px,0);
    //     border-bottom: 2px solid $mainColor;
    //     border-bottom-style: dotted;
    .number{
      color: $mainColorHover;
    }
  }
  .name{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $mainColor;
  }
  .number{
    margin-left: 8px;
    color: $mainColor;
    font-weight: 600;
    font-size: 14px;
    transition: .24s;
  }
}
</style>
