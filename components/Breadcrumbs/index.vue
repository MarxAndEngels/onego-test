<template>
  <div class="breadcrumb">
    <NuxtLink :to="item.link ? item.link : ''" class="breadcrumb_link"
              :class="{active: item.active}"
              v-for="(item, index) in items" :key="index">
      {{ item.title }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    items:{
      type:Array,
      default:() => []
    }
  }
}
</script>

<style scoped lang="scss">

  .breadcrumb{
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    align-items: center;
    justify-content: flex-start;
    padding: 16px 0 8px;
  }
  .breadcrumb_link{
    font-size: 16px;
    color: $darkGrey;
    font-weight: 300;
    transition: .24s;
    margin: 4px 0;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    @media screen and (max-width:$large-display){
      font-size: 14px;
    }
    &.active{
      color: $mainColor;
    }
    &:hover{
      color: $mainColorHover;
    }
    &:after{
      content: '>';
      position: relative;
      top: 2px;
      margin: 0 8px;
      color: $grey;
      line-height: 0;
      font-size: 20px;
      @media screen and (max-width:$large-display){
        font-size: 16px;
        margin: 0 4px;
      }
    }
    &:first-child{
      cursor: pointer!important;
      pointer-events: auto!important;
    }
    &:last-child{
      cursor: auto;
      pointer-events: none;
      &:after{
        display: none;
      }
    }
}
</style>
