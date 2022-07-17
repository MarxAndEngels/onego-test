<template>
  <div class="info_block">
    <div class="tabs_block">
      <div class="tabs">
        <div class="tab" @click="tabClick(index)"
             :class="{active: index === tabActive, showMobile: tab.showMobile, fullWidth: tab.fullWidth}"
             v-for="(tab, index) in tabs"
             v-if="tab.isData"
             :key="index">
          <img v-if="tab.autoteka" src="~/static/img/autoteka/autoteka-logo.svg" alt="autoteka">
          {{tab.title}}
        </div>
      </div>
      <div class="tab_content" v-if="tabActive === 0">
        <div class="tab_content_line">
          <div class="tab_content_line-left">
           Поколение
          </div>
          <div class="tab_content_line-right">
            {{ data.generation.name }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
           Год выпуска
          </div>
          <div class="tab_content_line-right">
            {{ data.year }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Пробег
          </div>
          <div class="tab_content_line-right">
            {{ data.run | run }} км
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Тип кузова
          </div>
          <div class="tab_content_line-right">
            {{ data.bodyType.title }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Двигатель
          </div>
          <div class="tab_content_line-right">
            {{ data.engineType.title }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            КПП
          </div>
          <div class="tab_content_line-right">
            {{ data.gearbox.title }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Цвет
          </div>
          <div class="tab_content_line-right">
            {{ data.color.title }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Привод
          </div>
          <div class="tab_content_line-right">
            {{ data.driveType.title }}
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Объем / Мощность
          </div>
          <div class="tab_content_line-right">
            {{ data.engine_volume | engineVolume }} / {{ data.engine_power }} л.с.
          </div>
        </div>
      </div>
      <div class="tab_content scrolling" v-if="tabActive === 1">
        <div class="tab_content_complectation" v-for="(item, index) in data.equipment_groups" :key="index">
         <div class="tab_content_complectation_title" v-if="item.values"> {{item.title}} </div>
          <div v-for="(value, i) in item.values" :key="i">
            <div class="tab_content_complectation_item">
              {{value}}
            </div>
          </div>
        </div>
      </div>
      <div class="tab_content" v-if="tabActive === 2">
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Ставка
          </div>
          <div class="tab_content_line-right">
            От 4.9%
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Первый взнос
          </div>
          <div class="tab_content_line-right">
            От 0%
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Сумма кредита
          </div>
          <div class="tab_content_line-right">
            50 000 — 5 000 000 ₽
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Срок кредита
          </div>
          <div class="tab_content_line-right">
            От 6 мес. до 7 лет
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Скидка по автокредиту
          </div>
          <div class="tab_content_line-right">
            до 150 000
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Оформление
          </div>
          <div class="tab_content_line-right">
            30 минут
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Одобрение банков
          </div>
          <div class="tab_content_line-right">
            По паспорту и ВУ
          </div>
        </div>
        <div class="tab_content_line">
          <div class="tab_content_line-left">
            Досрочное погашение
          </div>
          <div class="tab_content_line-right">
            Без штрафов
          </div>
        </div>
      </div>
      <div class="tab_content" v-if="tabActive === 3">
        <car-page-blocks-autoteka :offer="data"/>
      </div>
    </div>
  </div>
</template>

<script>
import filters from "~/mixins/filters";
export default {
  data(){
    return{
      tabActive:0,
      tabs:[
        {
          title:'Характеристики',
          showMobile: false,
          isData: true
        },
        {
          title:'Комплектация',
          showMobile: false,
          isData: this.data.equipment_groups.length ? true : false // проверка на наличие комплектации
        },
        {
          title:'Преимущества',
          showMobile: false,
          isData: true,
          fullWidth: true
        },
        {
          title:'Проверка VIN',
          showMobile: true,
          autoteka: true,
          isData: true
        },
      ]
    }
  },
  mixins: [filters],
  props: {
    data: {
      type: Object,
      default:()=>{}
    }
  },
  methods:{
    tabClick(index){
      this.tabActive = index
    }
  }
}
</script>

<style scoped lang="scss">

  .tabs_block{
    //min-height: 570px;
    //@media screen and (max-width: 980px) {
    //  min-height: 394px;
    //}
  }
  .tab_content_line-left{
    font-weight: 600;
  }
  .tab_content_line-right{
    text-align: right;
  }
  .tabs{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 24px;
    padding: 0;
    @media screen and (max-width:$large-display){
      margin-bottom: 8px;
    }
    .tab{
      width:  calc(50% - 4px);
      text-align: center;
      padding: 12px 0;
      margin: 4px 0;
      display: flex;
      align-items: center;
      justify-content: center;
          // background: #e8e8e8;
      font-size: 14px;
      position: relative;
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      transition: all .44s ease-in-out;
      cursor: pointer;
      img{
        width: 16px;
        margin-right: 8px;
      }
      &.showMobile{
        display: none;
        @media screen and (max-width:$large-display){
          display: flex;
        }
      }
      &:hover{
           color: $mainColor;
      }
      &.active{
            background: $white;
          background: #e8e8e8;
        color: $black;
         &::after{
        content: '';
        // width: 10px;
        // height: 10px;
        // display: block;
        // border-radius: 12px;
        left: 15px;
        // background-color: $mainColor;
        position: absolute;
        width: 8px;
      height: 8px;
      border-top: 3px solid $black;
      border-right: 3px solid $black;
      transform: rotate(40deg);
      }
      }
      &.fullWidth{
        width: 100%;
      }
      @media screen and (max-width:$large-display){
        font-size: 12px;
        &.fullWidth{
        width: 50%;
      }
      }
    }
  }
  .tab_content{
    &.scrolling{
      padding-right: 16px;
      overflow-y: scroll;
      max-height: 472px;
      &::-webkit-scrollbar {
        width: 4px;
        background-color: #e8e8e8; /* or add it to the track */
      }
      &::-webkit-scrollbar-thumb {
        background: $mainColor;
        border-radius: 5px;
      }
      @media screen and (max-width:$x-large-display){
        max-height: 444px;
      }
      @media screen and (max-width:$large-display){
        max-height: none;
        overflow: visible;
      }
    }
  }
  .tab_content_complectation_item{
    padding: 16px 0;
    border-bottom: 1px solid #e8e8e8;
    @media screen and (max-width:$x-large-display){
      padding: 8px 0;
    }
  }
  .tab_content_complectation_title{
    margin: 16px 0 8px;
    font-size: 20px;
    font-weight: bold;
    @media screen and (max-width:$x-large-display){
      margin: 8px 0 0;
      font-size: 18px;
    }
  }

  .tab_content_line{
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid #e8e8e8;
    @media screen and (max-width: 1200px) {
      padding: 8px 0;
    }
    @media screen and (max-width:$large-display){
     padding: 16px 16px 16px 0;
    }
    &:last-child{
      border-bottom: none;
    }
  }
</style>
