<template>
  <div class="cars_wrapper" ref="cars">

    <modal-filter :state-props='stateModal' :type-modal='typeModal'/>

    <!-- модалка для телефона, не получилось ее как компонент юзать (там был emit в emit и ничего не сработало)-->
<div class="modal" :class='{ active: modalState }'>
    <div class="modal_content">
        <filters-main-filters :max-number='max' @changeState='mainChangeState' @changeSort='mainChangeSort'/>
      <div class="close" @click='changeState'>×</div>
      <button class='button accept' @click='changeState'>Применить</button>
    </div>
  </div>
     <!-- модалка для телефона -->
    <transition name="fade">
      <modal card-credit
                     :data="choosenCar"
                     :title="'Автокредит на ' + choosenCar.name"
                     v-show="modal"
                     @closeModal="modal = false"/>
    </transition>
    <h2 class="h2_title" v-if="offers && title && offers.data.length !== 1">
      {{title}}
    </h2>
    <div class="cars" v-if="offers">

    <div class='wrapper__cars' ref='carMain'>
<center>
      <div class="filters__line-mobile">
        <p class='filters__icon-p-mobile' @click='openModalMobile'>Открыть фильтры
          <svg-icon class='filters__icon' name='filters'/>
        </p>
      </div>
      </center>

   <div class="filters__main_pk">
    <filters-main-filters :max-number='max' @changeState='mainChangeState' @changeSort='mainChangeSort'/>
   </div>


      <div class="cars_line" v-if="offers.data.length">
        <nuxt-link v-for="car in offers.data"
                   v-if="currentCarId !== car.external_id"
                   :key="car.id" class="card_wrapper"
                   :to="`/${$config.used_page}/${car.mark.slug}/${car.folder.slug}/${car.generation.slug}/${car.external_id}`">
          <mini-card @creditClick="creditClick(car)" :data="car"/>
        </nuxt-link>
      </div>
      <div class="no_data" v-else >
        Ничего не найдено
      </div>
       <!-- <div class="no_data" v-else >
        Ничего не найдено
      </div> -->
    </div>
      <client-only>
        <paginate
          v-if="offers.last_page > 1 && hasPagination"
          :page-count="offers.last_page"
          :click-handler="clickCallback"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'">
        </paginate>
      </client-only>
    </div>
    <lists-cars-mock v-else/>
  </div>
</template>

<script>
import usedOffers from '~/apollo/queries/usedOffers';

// import "~/static/scss/form.scss";
export default {
  data(){
    return{
      // sortSelected:'Сортировка',
      // sortActive:false,
      // sortOptions:[
      //   {
      //     title:'Сначала дешевле',
      //     sort:'price|asc'
      //   },
      //   {
      //     title:'Сначала дороже',
      //     sort:'price|desc'
      //   },
      //   {
      //     title:'Пробег',
      //     sort:'run|asc'
      //   },
      //   {
      //     title:'Год новее',
      //     sort:'year|desc'
      //   },
      //   {
      //     title:'Год старше',
      //     sort:'year|asc'
      //   }
      // ],
      sort: this.defaultSort,
      modal:false,
      carsList: '',
      max: '',
      // priceFrom: '',
      // priceTo: '',
      choosenCar: {},
      pageOur: 1,
      stateModal: true,
      stateModalMobile: true,
      typeModal: 'mark',
      // countSelect: 1,
    }
  },
  props:{
    currentCarId:{
      type: Number,
      default: null
    },
    mark: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    generation: {
      type: String,
      default: ''
    },
    defaultSort:{
      type: String,
      default: 'price|asc'
    },
    limit: {
      type: Number,
      default: 3
    },
    hasPagination:{
      type: Boolean,
      default: false
    },
    hasSort:{
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPagination() {
      return Number(this.$route.query.page ? this.$route.query.page : 1)
    },
    currentGearbox(){
      return Number(this.$route.query.gearbox) || null
    },
    currentBodyType(){
      return Number(this.$route.query.bodyType) || null
    },
    currentDriveType(){
      return Number(this.$route.query.driveType) || null
    },
    currentEngineType(){
      return Number(this.$route.query.engineType) || null
    },
    currentYearFrom(){
      return Number(this.$route.query.yearFrom) || null
    },
    currentYearTo(){
      return this.$route
    },
    currentOwner(){
      return Number(this.$route.query.owners) || null
    },
    currentPriceFrom(){
      return Number(this.$route.query.priceFrom) || 0
    },
    currentPriceTo(){
      return Number(this.$route.query.priceTo) || 50000000
    },
    currentMark(){
      return this.mark || ''
    },
    currentModel(){
      return this.model || ''
    },
    currentGeneration(){
        return this.generation || ''
    },
      modalState(){
        return this.$store.state.modalMobile
    }
  },
	methods:{
    sortClick(item){
      this.sortActive = false
      this.sort = item.sort
      this.sortSelected = item.title
    },
    creditClick(car){
      this.choosenCar = car
      this.modal = true
    },
    closeModal(){
      this.modal = false
    },
    clickCallback(pageNum){
      let variables = this.returnVariables();
   let pathUrl = this.returnPath();
   variables.page = pageNum;

       this.$router.push( { path: pathUrl ,query: variables});
      this.$router.push({path: pathUrl,query: variables});
    },
    // changeState(){
    //    this.$store.commit('setModal', false)
    // },
    openPopup(param){
       this.typeModal =param;
       this.$store.commit('setModal', false)
    },

    //для модалки свойства
         changeState(){
       this.$store.commit('setModalMobile', true)
    },

      mainChangeState(param){
        let number = param
        console.log(param)
     this.$emit('mainChangeStateM', param)
   },
   mainChangeSort(param){
     let number = param
    this.$emit('mainChangeSortM', number)
   },
  //для модалки свойства

  relocate(){
      setTimeout(()=>{
     if(this.$refs.carMain && this.$route.name != "index"){
  window.scrollTo(0, this.$refs.carMain.offsetTop - 144 )
       }
},1000)
  },

// //проверка на число при вводе
//     onlyNumber ($event) {
//    let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
//    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
//       $event.preventDefault();
      
//    }
// },
//    changeFilterCost(){

//    let variables = this.returnVariables();
//    let pathUrl = this.returnPath();
//     if(this.priceFrom != ''){
//   this.$router.push( { path: pathUrl ,query: variables});
//     }
//     if(this.priceTo != ''){
//  this.$router.push({ path: pathUrl ,query: variables});
//     }

//    },

  //  returnVariables(){
  //     let variables= {
  //   priceFrom: this.priceFrom == '' ? 0 : +this.priceFrom,
  //   priceTo: this.priceTo == '' ? 5000000 : +this.priceTo,
  //   page: this.currentPagination,
  //   // mark: this.currentMark,
  //   // model: this.currentModel,
  //   // generation: this.currentGeneration,
  //     }
  //     return variables;
  //  },
  //  returnPath(){
  //       let path = '/' + this.$config.used_page;

     
  //     if(this.$route.params.mark){
  //       path +=  '/' + this.$route.params.mark
  //     }
  //     if(this.$route.params.model){
  //       path += '/' + this.$route.params.model
  //     }
  //     if(this.$route.params.generation){
  //       path += '/' + this.$route.params.generation
  //     }
  //     return path;
     
  //  },
   openModalMobile(){
       this.$store.commit('setModalMobile', false)
   },
   mainChangeState(param){
    this.typeModal = param;
   },
   mainChangeSort(param){
    this.sort = param;
   },
   mainChangeStateM(param){
    console.log(param)
  this.typeModal = param;
   },
     mainChangeSortM(param){
    this.sort = param;
   },

   async getCars(){
      await this.$apollo.query({
        query : usedOffers,
        variables: {
          site_id: this.$config.site_id_used,
          page: this.currentPagination,
          limit: this.limit,
          mark_slug: this.currentMark,
          folder_slug: this.currentModel,
          generation_slug: this.currentGeneration,
          sort: 'price|desc',
          gearbox_id: this.currentGearbox,
          body_type_id: this.currentBodyType,
          drive_type_id: this.currentDriveType,
          engine_type_id: this.currentEngineType,
          owner_id: this.currentOwner,
          price_from: this.currentPriceFrom,
          price_to: this.currentPriceTo,
          year_from: this.currentYearFrom,
          year_to: null
        }
      })
        .then(({ data }) => {
          this.carsList = data.offers.data;
              //  console.log(this.carsList)
            this.max = this.carsList[0].price;
        })
    },
  },
  apollo: {
    offers: {
      query: usedOffers,
      variables () {
        return {
          site_id: this.$config.site_id_used,
          page: this.currentPagination,
          limit: this.limit,
          mark_slug: this.currentMark,
          folder_slug: this.currentModel,
          generation_slug: this.currentGeneration,
          sort: this.sort,
          gearbox_id: this.currentGearbox,
          body_type_id: this.currentBodyType,
          drive_type_id: this.currentDriveType,
          engine_type_id: this.currentEngineType,
          owner_id: this.currentOwner,
          price_from: this.currentPriceFrom,
          price_to: this.currentPriceTo,
          year_from: this.currentYearFrom,
          year_to: null
        }
      },
    }
  },
  mounted(){
    this.getCars();
  //  if(this.$route.params.mark){
  //   this.countSelect = 2
  //  }
  //  if(this.$route.params.model){
  //   this.countSelect = 3
  //  }
  },
  updated(){
    setTimeout(()=>{
     if(this.$refs.carMain && this.$route.name != "index"){
  window.scrollTo(0, this.$refs.carMain.offsetTop - 144 )
       }
},1000)
  }
}
</script>

<style scoped lang="scss">
.filters__main_pk{
        display: block;
        flex: 1;
        padding-right: 24px;
    @media screen and (max-width:$medium-display){
    display: none;
  }
}
.filters__icon{
  width: 20px;
  height: 20px;
  transform: translate3d(4px, 4px, 0);
}
.filters__icon-p{
  font-size:24px;
}
.filters__line{
  margin-top: 20px;
      display: block;
    @media screen and (max-width:$medium-display){
    display: none;
  }
}
.filters__line_mobile{
      display: none;
    @media screen and (max-width:$medium-display){
    display: block;
  }
}

.filters__line-mobile{
       display: none;
    @media screen and (max-width:$medium-display){
    display: block;
  }
}
.select_filter{
    font-size:16px;
    font-weight: 500;
      transform: translate3d(0px, -2px, 0);
      &:hover{
       color: $mainColor;
      }
}

.arrow {
      width: 8px;
      margin-top: 4px;
      height: 8px;
      border-top: 3px solid $mainColor;
      border-right: 3px solid $mainColor;
      margin-right: 30px;
      transform: rotate(45deg);
  }   
  .wrapper__select{
    display: flex;
    justify-content: space-between;
    margin-top: 22px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover{
       color: $mainColor;
       transform: translate3d(3px,0,0);
      }
      &.active{
        opacity: 0.6;
        pointer-events: none;
      }
  } 
.sort_line{
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
  svg{
    fill:$mainColor;
    width: 32px;
    height: 32px;
    cursor: pointer;
    transition: .24s;
    &:hover{
      fill: $mainColorHover;
    }
  }
}
.h2_title{
  margin-bottom: 16px;
}
.sort_select{
  position: relative;
  padding: 8px;
  cursor: pointer;
}
.sort_options{
  position: absolute;
  top: 36px;
  z-index: 2;
  background: #fff;
  width: calc(100% + 40px);
  left: -32px;
  box-shadow: $box-shadow;
  overflow: hidden;
  height: 0;
  &.active{
    height: auto;
  }
}
.filters__icon-p-mobile{
   border: 1px solid black;
   padding: 4px 8px;
   width: 100%;
   height: 40px;
   border-radius: 20px;
   cursor: pointer;
}
.sort_option{
  font-size: 14px;
  padding: 4px 8px;
  margin-bottom: 4px;
  background: #fff;
  transition: .24s;
  &:hover{
    background: $grey;
  }
}
.cars_line{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 3;
  width: 100%;
  @media screen and (max-width:$medium-display){
    justify-content: space-between;
  }
}
.no_data{
  color: $black;
  font-size: 24px;
  margin: 24px 0;
  width: 100%;
}
.card_wrapper{
  text-decoration: none;
  color: $black;
  width: calc(33% - 24px);
  margin: 12px;
  @media screen and (max-width: $xx-large-display){
    width: calc(33% - 12px);
    margin: 6px;
  }
  @media screen and (max-width:$large-display){
    width: calc(50% - 12px);
  }
  @media screen and (max-width:$small-display){
    width: 100%;
    margin: 0 0 16px 0;
  }
  //@media screen and (max-width:$small-display){
  //  max-width: 100%;
  //}
}
.cars_title{
  margin-bottom: 16px;
}


.wrapper__cars{
  display: flex;
  justify-content: space-between;
  @media screen and (max-width:$large-display){
    justify-content: center;
    flex-direction: column;
  }
}
.filters_line{
  flex: 1;
}
.price__wrapper{
  display: flex;
  justify-content: space-between;
  
}

.input{
  width: 100%;
  max-width: 100px;
  height: 40px;
}

.button{
  &.accept{
     width: 100%;
     position: fixed;
     bottom: 10px;
     left: -0px;
     z-index: 2;
     display: flex;
     border: none;
     justify-content: center;
  }
}


//для модалки свойства
 @import "~/static/scss/modal.scss";
  .close{
    font-size: 40px;
  }
  .active{
    display: none;
  }
  .modal{
    height: 100%;
    z-index: 455;
  }
  //для модалки свойства
</style>
