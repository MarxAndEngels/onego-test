<template>
  <div class="line">
    <div class="line_item" v-for="(item, index) in infoItems" :key="index">
      <div class="line_item_icon" >
        <svg-icon :name="item.icon" />
      </div>
      <div class="line_item_title" v-html="item.title"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      infoItems:[
        {title:`Первый взнос <br/> от  0%`, icon:'percent-border'},
        {title:`По <br/> 2м документам`, icon:'docs-border'},
        {title:`Гарантия на <br/> авто 1 год`, icon:'warranty-border'},
        {title:`Оформление <br/> за 30 мин`, icon:'time'},
      ],
    }
  }
}
</script>

<style scoped lang="scss">

.line{
  display: flex;
  justify-content: space-between;
  text-align: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    padding-bottom: 16px;
    &::-webkit-scrollbar {
      height: 4px;
      background-color: $lightGrey; /* or add it to the track */
    }
    &::-webkit-scrollbar-thumb {
      background: $mainColor;
      border-radius: 5px;
    }
  }
}
.line_item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: calc(50% - 16px);
  margin: 16px 8px;
  @media screen and (max-width: 768px) {
    min-width: calc(50% - 16px);
    margin: 0 8px;
  }
  @media screen and (min-width: 768px) {
    &:hover{
      .line_item_icon{
        top: -4px;
        background:$lightGreyHover;
        svg{
          fill: $mainColorHover;
        }
      }
    }
  }
}
.line_item_icon{
  min-width: 56px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-radius: 50px;
  background: $lightGrey;
  position: relative;
  top: 0;
  transition: .48s;
  svg{
    width: 60%;
    transition: .48s;
    fill: $mainColor;
  }
  @media screen and (max-width: 768px) {
    width: 24px;
  }
}
.line_item_title{
  font-size: 13px;
  color: $black;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
}

</style>
