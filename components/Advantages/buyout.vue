<template>
  <div class="advantages">
        <div class="advantages-title">Почему клиенты заинтересованны именно нами?</div>
    <div class="advantages__item" v-for="(item, index) in items" :key="index">
      <svg-icon :name="item.icon" />
      <div class="advantages__item--title" v-html="item.title"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items:[
        {
          title:`Мгновенная выплата`,
          icon:'time',
        },
        {
          title:`Выезд оценщика`,
          icon:'legal',
        },
        {
          title:`Оформление за 30 минут`,
          icon:'docs',
        },
        {
          title:`Рыночная оценка`,
          icon:'repair',
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.advantages-title{
  position: absolute;
      top: 16px;
      left: 34px;
      font-weight: 600;
          @media screen and (max-width:$small-display){
    top: 28px;
       left: 20px;
    font-size: 12px;
    }
      }
  .advantages{
    display: flex;
    width: 100%;
    margin: 24px 0 8px;
    padding: 16px;
    background: $lightGrey;
    border-radius: 12px;
    justify-content: space-between;
    position: relative;
    @media screen and (max-width:$large-display){
      padding: 16px;
      width: calc(100% + 16px);
      margin: 18px 0;
    }
    @media screen and (max-width:$small-display){
      margin: 8px -8px;
      overflow-x: scroll;
      overflow-y: auto;
      &::-webkit-scrollbar {
        height: 4px;
        background-color: #aaa; /* or add it to the track */
      }
      &::-webkit-scrollbar-thumb {
        background: $mainColor;
        border-radius: 2px;
      }
    }
  }
  .advantages__item{
    display: flex;
    align-items: center;
    cursor: auto;
    width: 25%;
    padding-left: 16px;
    margin: 20px 0;
        margin-top: 50px;
    @media screen and (max-width:$small-display){
      min-width: 160px;
      width: 160px;
      margin-right: 16px;
            padding-left: 0px;
    margin: 0;
       margin-top: 50px;
      &:last-child{
        margin-left: 0;
      }
    }
    svg{
      min-width: 33px;
      width: 33px;
      height: 33px;
      position: relative;
      top: 0;
      transition: .4s;
      fill: $mainColor;
      @media screen and (max-width:$large-display){
        min-width: 16px;
        width: 16px;
        height: 16px;
      }
      @media screen and (max-width:$small-display){
        min-width: 24px;
        width: 24px;
        height: 24px;
      }
    }
  }
  .advantages__item--title{
    margin-left: 13px;
    color: $black;
    font-size: 14px;
    @media screen and (max-width:$large-display){
      font-size: 10px;
    }
    @media screen and (max-width:$small-display){
      font-size: 12px;
    }
  }
</style>
