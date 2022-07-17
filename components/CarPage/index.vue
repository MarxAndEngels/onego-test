<template>
  <div class="car_content" v-if="offer">
  <h1 class="hide_title" style="opacity: 0; height: 0px;">
      {{ pageTitle }}
    </h1>
    <transition name="fade">
      <modal credit
                     :data="offer"
                     :title="'Автокредит на ' + offer.name"
                     v-show="modalCredit"
                     @closeModal="modalCredit = false"/>
    </transition>
<!--    <transition name="fade">-->
<!--      <modal installment-->
<!--                     :data="offer"-->
<!--                     :title="'Рассрочка на ' + offer.name"-->
<!--                     v-show="modalInstallment"-->
<!--                     @closeModal="modalInstallment = false"/>-->
<!--    </transition>-->
    <transition name="fade">
      <modal test-drive
             :data="offer"
             :title="'Оставить заявку на тест-драйв '+ offer.mark.title + ' ' + offer.folder.title"
             v-show="modalTestDrive"
             @closeModal="modalTestDrive = false"/>
    </transition>
    <transition name="fade">
      <modal trade-in
                     :data="offer"
                     title="Trade-In БУ авто"
                     v-show="modalTradeIn"
                     @closeModal="modalTradeIn = false"/>
    </transition>
    <transition name="fade">
      <modal callback
                     :data="offer"
                     :title="'Остались вопросы по '+ offer.mark.title + ' ' + offer.folder.title +'? Мы Вам перезвоним!'"
                     v-show="modalCallback"
                     @closeModal="modalCallback = false"/>
    </transition>
    <div class="car_title">
      {{ offer.name }}
    </div>
    <div class="grid_container">
      <div class="grid_block grid_block_slider">
        <car-page-blocks-slider v-if="loaded" :images="offer.images"/>
        <div class="mock" v-else></div>
            <div class="space_little"></div>
            <span class="wrapper__advantages">
            <advantages/>
            </span>
      </div>
      <div class="grid_block grid_block_autoteka">
        <car-page-blocks-autoteka :offer="offer"  v-if="loaded" class="autoteka"/>
        <div class="mock" v-else></div>
      </div>
      <div class="grid_block grid_block_info">
        <car-page-blocks-info v-if="loaded" :data="offer" class="info"/>
        <div class="mock" v-else></div>
      </div>
      <!-- <div class="grid_block grid_block_icons">
        <car-page-blocks-icons-line  v-if="loaded" class="icons"/>
        <div class="mock small" v-else></div>
      </div> -->
      <div class="grid_block grid_block_callback">
        <car-page-blocks-callback  v-if="loaded" class="callback" @callbackClick="modalCallback = true"/>
        <div class="mock small" v-else></div>
      </div>
      <div class="grid_block grid_block_buttons">
        <car-page-blocks-buttons  v-if="loaded" :data="offer" class="buttons_block"
                                  @creditClick="modalCredit = true"
                                  @testDriveClick = 'modalTestDrive = true'
                                  @installmentClick="modalInstallment = true"
                                  @tradeInClick="modalTradeIn = true"/>
        <div class="mock" v-else></div>
      </div>
      <div class="grid_block grid_block_map">
        <car-page-blocks-map  v-if="loaded" class="map_block"/>
        <div class="mock" v-else></div>
      </div>
    </div>
    <lists-cars :current-car-id="offer.external_id"
                title="Похожие автомобили"
                :mark="this.$route.params.mark"
                :model="this.$route.params.model"
                :has-sort="false" class="cars"
                :limit="5"/>
  </div>
</template>

<script>

export default {
  data(){
    return{
      modalCredit:false,
      modalTradeIn:false,
      modalCallback:false,
      modalInstallment:false,
      modalTestDrive: false,
    }
  },
  computed:{
    currentTitle(){
      let slug = '';
      if(this.offer){
        slug = `Купить ${this.offer.name} ${ this.$config.inaddress }, авто c пробегом по выгодным ценам`;
      }
      else {
        slug = 'Авто с пробегом в наличии'
      }
      return slug
    },
  },
	props: {
      offer:{
      type:Object,
      default:() => ''
    },
       loaded:{
      type:Boolean,
      default:() => ''
    },
    pageTitle:{
      type:String,
      default:() => ''
    }
	},
	mounted() {
		if(this.offer){
			_tmr.push({
				type: 'itemView',
				productid: this.offer.external_id,
				pagetype: 'product',
				list: '1',
				totalvalue: this.offer.price
			})
		}
	},
}
</script>

<style scoped lang="scss">
  .car_title{
    font-size: 24px;
    font-weight: bold;
    padding-top: 16px;
    @media screen and (max-width:$large-display){
      font-size: 16px;
      line-height: 1.5;
    }
    @media screen and (max-width:$small-display){
      padding-top: 8px;
    }
  }
  .grid_container {
    display: grid;
    grid-template-columns: 800px auto;
    grid-gap: 16px;
    padding: 24px 0;
    grid-template-areas:
    "slider buttons"
    "slider info"
    "autoteka callback"
    "autoteka."
    "map.";
    @media screen and (max-width: $xx-large-display){
      grid-template-columns: 480px auto;
      padding: 16px 0;
      grid-template-areas:
      "slider buttons"
      "autoteka info"
      "autoteka callback"
      "autoteka."
      "map.";
    }
    @media screen and (max-width:$large-display){
      grid-template-columns: 100%;
      grid-template-areas:
      "slider."
      "buttons."
      "info."
      "map.";
      }
  }
  .wrapper__advantages{
   display: none;
  }
  @media(min-width: $x-large){
     .wrapper__advantages{
   display: block;
  }
  }
  .grid_block{
    background: #fff;
    padding: 24px;
    border-radius: 10px;
    box-shadow: $box-shadow;
    @media screen and (max-width: $xx-large-display){
     padding: 16px;
    }
    @media screen and (max-width:$small-display){
      padding: 16px 8px;
    }
    &_slider{
      padding: 0;
      grid-area: slider;
    }
    &_info{
      grid-area: info;
    }
    &_autoteka{
      grid-area: autoteka;
      @media screen and (max-width:$large-display){
        display: none;
      }
    }
    &_buttons{
      grid-area: buttons;
      align-self: start;
    }
    &_icons{
      grid-area: icons;
      align-self: start;
      @media screen and (max-width:$large-display){
        display: none;
      }
    }
    &_callback{
      grid-area: callback;
      align-self: start;
      @media screen and (max-width:$large-display){
       display: none;
      }
    }
    &_map{
      grid-area: map;
    }
  }
  .grid_block_slider{
    height: 100%;
    max-height: 500px;
    // position: sticky;
    // top: 140px;
  }
   .grid_block_map{
          display: block;
  }
  @media(min-width: $large-display){
     .grid_block_map{
          display: none;
  }
  }

   .space_little{
    padding-top: 20px;
  }
  
  .mock{
    width: 100%;
    height: 538px;
    background: #fff;
    border-radius: 10px;
    @media screen and (max-width:$large-display){
      height: 385px;
    }
    &.small{
      height: 90px;
    }
  }
 
</style>
