<template>
    <div>
      <div class="filters__line">
       <!-- <input  v-model="preco"  v-money /> -->
        <p class='filters__icon-p'>Фильтры
          <svg-icon class='filters__icon' name='filters'/>
        </p>

        <div class="wrapper__select" @click='openPopup("mark")'>
          <div class='select_filter' >
            {{ !this.$route.params.mark ? 'Марка' : this.$route.params.mark.charAt(0).toUpperCase()+this.$route.params.mark.slice(1) }}
            </div>
         <div class="arrow"></div>
          </div>
        <div class="wrapper__select" :class='{active: countSelect < 2}' @click='openPopup("models")'>
          <div class='select_filter' >
            
            {{ !this.$route.params.model ? 'Модель' : this.$route.params.model.charAt(0).toUpperCase()+this.$route.params.model.slice(1) }}
          </div>
         <div class="arrow"></div>
          </div>
        <div class="wrapper__select" :class='{active: countSelect < 3}' @click='openPopup("genarations")'>
          <div class='select_filter'  >
             {{ !this.$route.params.generation ? 'Поколение' : this.$route.params.generation.charAt(0).toUpperCase()+this.$route.params.generation.slice(1) }}
            </div>
         <div class="arrow"></div>
          </div>


      
          <div class="cd-filter-block">
					<h4 @click='showGearbox = !showGearbox' class='cd-filter-block-title'>КПП
                  <div class="arrow2" :class='{active: showGearbox}'></div>
          </h4>
            <transition name="fade">
              <span v-if='showGearbox'>
					<div class="cd-filter-content" v-if='gearboxes'>
            <div v-for='(el,i) of gearboxes' :key='i'>
                	<div class="checkbox-label" :class='{"active": currentGearboxM == el.id}' @click='changeGearbox(el.id)'>{{ el.title }}</div>
						</div>
					</div> 
          </span>
            </transition>
  
				</div> 


        <!-- <div class="cd-filter-block">
					<h4 @click='showGearbox = !showGearbox' class='cd-filter-block-title'>Год
                  <div class="arrow2" :class='{active: showGearbox}'></div>
          </h4>
          {{ yearsFrom }}
            <transition name="fade">
              <span v-if='showGearbox'>
					<div class="cd-filter-content" v-if='yearsFrom'>
            <div v-for='(el,i) of yearsFrom' :key='i'>
                	<div class="checkbox-label" :class='{"active": true}' @click='changeGearbox(el)'>{{ el }}</div>
						</div>
					</div> 
          </span>
            </transition>
  
				</div>  -->

          <div class="cd-filter-block">
					<h4 @click='showBodyTypes = !showBodyTypes' class='cd-filter-block-title'>
            Тип кузова
                  <div class="arrow2" :class='{active: showBodyTypes}'></div>
          </h4>
            <transition name="fade">
              <span v-if='showBodyTypes'>
					<div class="cd-filter-content" v-if='bodyTypes'>
            <div v-for='(el,i) of bodyTypes' :key='i'>
                	<div class="checkbox-label" :class='{"active": currentBodyTypesM == el.id}' @click='changeBodyTypes(el.id)'>{{ el.title }}</div>
						</div>
					</div> 
          </span>
            </transition>
  
				</div> 

        
   <div v-if='this.$route.name != "index"'>
       <div class="wrapper__price-input">
        <h4 class='price__list_title'>Цена ₽</h4>
      <div class="price-input">
        <div class="field">
          <span>От</span>
          <input type="text" @keypress="onlyNumber" @blur="changeFilterCost" @keyup.enter="changeFilterCost" v-model="priceFrom" class="input-min" >
        </div>
        <div class="separator">-</div>
        <div class="field">
          <span>До</span>
          <input class="input-max" type="text" @keypress="onlyNumber"  @blur="changeFilterCost" @keyup.enter="changeFilterCost" v-model="priceTo">
        </div>
      </div>
      <br>
      <div class="slider">
        <div class="progress"></div>
      </div>
      <div class="range-input">
        <input type="range" class="range-min" min="0" :max="maxNumber" v-model='priceFromRange' @click='changeRange' step="10000">
        <input type="range" class="range-max" min="0" :max="maxNumber" v-model='priceToRange' @click='changeRange' step="10000">
      </div>
    </div>
</div>



    <div class="sort_line">
        <svg-icon name="sorting" @click="sortActive = !sortActive"/>
        <div class="sort_select">
          <div class="sort_data" @click="sortActive = !sortActive">
            {{ sortSelected }}
          </div>
          <div class="sort_options" :class="{active:sortActive}">
            <div class="sort_option" @click="sortClick(item)" v-for="(item,index) in sortOptions" :key="index">
              {{item.title}}
            </div>
          </div>
        </div> 
      </div>

      </div>
    </div>
</template>
<script>
import offerFilters from '~/apollo/queries/offerFilters'
export default {
    data(){
        return{
          stateModal: true,
           typeModal: 'mark',
               countSelect: 1,
                priceFrom: '',
      priceTo: '',
      priceFromEnd: '',
      priceToEnd: '',
      priceToRange: '',
      priceFromRange: '',
      showGearbox: true,
      showBodyTypes: false,

       sortActive:false,
           sortSelected:'Сортировка',
       sortOptions:[
        {
          title:'Сначала дешевле',
          sort:'price|asc'
        },
        {
          title:'Сначала дороже',
          sort:'price|desc'
        },
        {
          title:'Пробег',
          sort:'run|asc'
        },
        {
          title:'Год новее',
          sort:'year|desc'
        },
        {
          title:'Год старше',
          sort:'year|asc'
        }
      ],
      // marks:[],
      // currentMark: null,
      // models:[],
      // currentModel: null,
      yearsFrom:[],
      currentYearFrom: null,
      generations:[],
      currentGeneration: null,
      gearboxes:[],
      bodyTypes: [],
      owners: [],
      driveTypes: [],
      engineTypes: [],
      kpp: false,
      bodyT: false,
        }
    },
     props:{
    maxNumber:{
      type: String,
      default: 5555555
    },
     },
    methods:{
          openPopup(param){
       this.typeModal =param;
       this.$emit('changeState', param);
       this.$store.commit('setModal', false)
    },
    //проверка на число при вводе
    onlyNumber ($event) {
   let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
   if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      $event.preventDefault();
   }
   this.returnCostList()

},
   changeFilterCost(){
this.returnCostList();

   let variables = this.returnVariables();
   let pathUrl = this.returnPath();
    if(this.priceFrom != ''){
  this.$router.push( { path: pathUrl ,query: variables});
    }
    if(this.priceTo != ''){
 this.$router.push({ path: pathUrl ,query: variables});
    }

   },
    returnVariables(){
        this.returnCostList()

      let variables= {
    priceFrom: this.priceFromEnd == '' ? 0 : +this.priceFromEnd,
    priceTo: this.priceToEnd == '' ? this.maxNumber : +this.priceToEnd,
    page: this.currentPagination,
      }
      if(this.kpp){
        let gearbox = { 'gearbox': this.kpp }
        variables = Object.assign(variables, gearbox);
      }
      if(this.bodyT){
        let bodyt = { 'bodyTypes': this.bodyT }
        variables = Object.assign(variables, bodyt);
      }
      return variables;
   },
   returnPath(){
        let path = '/' + this.$config.used_page;

     
      if(this.$route.params.mark){
        path +=  '/' + this.$route.params.mark
      }
      if(this.$route.params.model){
        path += '/' + this.$route.params.model
      }
      if(this.$route.params.generation){
        path += '/' + this.$route.params.generation
      }
      return path;
     
   },

   returnCostList(){
       this.priceFrom = this.priceFrom.replace(/[^\d.,]/g, '').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').trim();
   this.priceFromEnd = this.priceFrom.replace(/\s/g, '')

       this.priceTo = this.priceTo.replace(/[^\d.,]/g, '').replace(/(.{3})/g, '$1 ').replace(/[,]/g, '.').trim();
   this.priceToEnd = this.priceTo.replace(/\s/g, '')

   if(this.priceFromEnd.length == 7){
    let arr = this.priceFromEnd.split('');
    arr[0] = arr[0]+' ';
    arr[3] = arr[4]+' ';
    let text = arr.join('');
    this.priceFrom = text;
   }
   if(this.priceFromEnd.length == 8){
    let arr = this.priceFromEnd.split('');
    console.log(arr)
    arr[1] = arr[1]+' ';
    arr[4] = arr[4]+' ';
    let text = arr.join('');
    this.priceFrom = text;
   }
    if(this.priceToEnd.length == 7){
    let arr = this.priceToEnd.split('');
    arr[0] = arr[0]+' ';
    arr[3] = arr[4]+' ';
    let text = arr.join('');
    this.priceTo = text;
   }
    if(this.priceToEnd.length == 8){
    let arr = this.priceToEnd.split('');
    arr[1] = arr[1]+' ';
    arr[4] = arr[4]+' ';
    let text = arr.join('');
    this.priceTo = text;
   }
   },
    sortClick(item){
      this.sortActive = false
      this.sort = item.sort
      this.sortSelected = item.title
      this.$emit('changeSort',this.sort)
    },

    changeRange(){
      this.priceFrom = this.priceFromRange;
      this.priceTo = this.priceToRange;
      this.priceFrom = String(this.priceFrom);
      this.priceTo = String(this.priceTo);
      this.returnCostList();
      this.returnVariables();
      this.changeFilterCost();
    },

    async getFilters(field){
       await this.$apollo.query({
        query : offerFilters,
        variables: {
          site_id: this.$config.site_id_used,
          mark_id: this.currentMark ? this.currentMark.id : null,
          folder_id: this.currentModel ? this.currentModel.id : null
        }
      })
        .then(({ data }) => {
          let yearsArr = [];
           console.log(data.offerFilters.year[0]);
          for(let i= data.offerFilters.year[0]; i<=data.offerFilters.year[1]; i++){
              yearsArr.push(data.offerFilters.year[0]++);
          }
          this.yearsFrom = yearsArr;

          this.gearboxes = data.offerFilters.gearbox
          this.bodyTypes = data.offerFilters.bodyType
          this.driveTypes = data.offerFilters.driveType

          this.engineTypes = data.offerFilters.engineType
          this.owners = data.offerFilters.owner

          // if(field === 'all'){
          //   this.marks = data.offerFilters.mark
          // }
          // if(field === 'models'){
          //   this.models = data.offerFilters.folder
          // }
          // if(field === 'generations'){
          //   this.generations = data.offerFilters.generation
          // }
        })
    },
    changeGearbox(id){
       this.kpp = id;
        this.returnVariables();
      this.changeFilterCost();
    },
    changeBodyTypes(id){
       this.bodyT = id;
        this.returnVariables();
      this.changeFilterCost();
      this.$parent.relocate();
    }
    },

      mounted(){
   if(this.$route.params.mark){
    this.countSelect = 2
   }
   if(this.$route.params.model){
    this.countSelect = 3
   }
setTimeout(()=>{
  if(this.maxNumber){
this.priceTo = String(this.maxNumber);
this.priceFrom = String(0);
   this.priceToRange = String(this.maxNumber);
   this.priceFromRange = String(0);
   this.returnCostList()
}
},1000)
   this.getFilters('all');
  },
   computed: {
    currentPagination() {
      return Number(this.$route.query.page ? this.$route.query.page : 1)
    },
    currentPriceFrom(){
      return Number(this.$route.query.priceFrom) || 0
    },
    currentPriceTo(){
      return Number(this.$route.query.priceTo) || 5000000
    },
    // currentMark(){
    //   return this.mark || ''
    // },
    // currentModel(){
    //   return this.model || ''
    // },
    // currentGeneration(){
    //     return this.generation || ''
    // },
    currentGearboxM(){
      return Number(this.$route.query.gearbox) || '';
    },
    currentBodyTypesM(){
       return Number(this.$route.query.bodyTypes) || '';
    }
  },
}
</script>
<style scoped lang="scss">
  .filters__icon{
  width: 18px;
  height: 18px;
  transform: translate3d(5px, 3px, 0);
}
.filters__icon-p{
  font-size:24px;
}
.filters__line{
  margin-top: 20px;
      display: block;
//     @media screen and (max-width:$medium-display){
//     display: none;
//   }
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

.arrow , .arrow2{
      width: 8px;
      margin-top: 4px;
      height: 8px;
      border-top: 3px solid $mainColor;
      border-right: 3px solid $mainColor;
      margin-right: 30px;
      transform: rotate(45deg);
  }   
  .arrow2{
    display: inline-block;
          margin-bottom: 2px;
                   margin-left: 5px;
      transform: rotate(135deg);
      transition: all 0.5s ease-in-out;
      &.active{
        transform: rotate(315deg) translate3d(0,4px,0);
      }
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

  .price__wrapper{
  display: flex;
  justify-content: space-between;
  
}

.input{
  width: 100%;
  max-width: 100px;
  height: 40px;
}

.sort_line{
  margin-top: 20px;
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
     @media screen and (max-width:$medium-display){
     justify-content: center;
  }
}

.sort_select{
  position: relative;
  padding: 8px;
  cursor: pointer;
}

.price__list_title{
  font-weight: 600;
  margin: 10px 0;
  margin-bottom: 20px;
  margin-top: 26px;
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

.wrapper__price-input{
  margin-top: 20px;
  margin-bottom: 30px;
  width: 280px;
  background: #fff;
  border-radius: 10px;
  // padding: 20px 25px 40px;
  box-shadow: 0 12px 35px rgba(0,0,0,0.1);
      @media screen and (max-width:$medium-display){
    width: 100%;
    padding: 10px 10px;
  }

}
.price-input{
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  // margin: 30px 0 35px;
}
.price-input .field{
  display: flex;
  width: 100%;
  height: 35px;
  align-items: center;
}
.field input{
  width: 100px;
  height: 40px;
  outline: none;
  font-size: 16px;
  padding: 4px 6px;
  margin-left: 4px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #999;
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.price-input .separator{
  width: 100%;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
}
.slider{
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}
.slider .progress{
  height: 100%;
  left: 0%;
  right: 0%;
  position: absolute;
  border-radius: 5px;
  background: $black;
}
.range-input{
  position: relative;
}
.range-input input{
  
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
input[type="range"]::-webkit-slider-thumb{
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: $mainColor;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}
input[type="range"]::-moz-range-thumb{
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: $mainColor;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
}

* {
  scrollbar-width: thin;
  scrollbar-color: $mainColor;
}

/* для Chrome/Edge/Safari */
*::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
*::-webkit-scrollbar-track {
  background: $white;
}
*::-webkit-scrollbar-thumb {
  background-color: $mainColor;
  border-radius: 5px;
  border: 3px solid $mainColor;
}

.cd-filter-content{
    max-height: 140px;
  overflow: auto;
  scrollbar-width: thin;          /* "auto" или "thin"  */
  scrollbar-color: $mainColor;   /* плашка скролла и дорожка */ 
}
.cd-filter-content div{
  margin-top: 8px;
}

.cd-filter-block{
  margin-top: 20px;
}


.checkbox-label{
      cursor: pointer;
      width: auto;
  &.active{
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 4px 6px;
    border: 1px solid #1e1e1e;
    border-radius: 5px;
    cursor: pointer;
    color: #000;
    transition: 0.24s;
  }
}

.cd-filter-block-title{
  cursor: pointer;
}

.more-filters{
 cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

</style>