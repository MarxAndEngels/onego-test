<template>
  <div class="credit_form">
      <h1 class="h2_title">
        {{ pageTitle }}
    </h1>
    <div class="blocks">
      <div class="block">
        <h4 class="h4_title">Выбрать автомобиль</h4>
        <div class="input_wrapper long">
          <inputs-select :class="{input_error:error === 'currentMark'}"
                         :items="this.$store.state.marks"
                         :selected-data="currentMark"
                         title="Марка"
                         @selected="markSelect"
                         class="select"/>
        </div>
        <div class="input_wrapper long">
          <inputs-select :items="models"
                         :class="{input_error:error === 'currentModel'}"
                         :selected-data="currentModel"
                         title="Модель"
                         :disabled="models.length === 0"
                         @selected="modelSelect"
                         class="select"/>
        </div>

<!-- Автомобиль еще не выбран! -->
          <div v-if="!currentModel.hasOwnProperty('id')">
        <mini-card-nothing/>
        </div>
        <!-- Автомобиль еще не выбран! -->

        <div :class="{input_error:error === 'currentCar'}" class="cars" v-if="currentModel.hasOwnProperty('id')">
          <div class="choosen_car_block" :class="{input_error:error === 'currentCar'}"  v-if="currentCar.hasOwnProperty('id')" >
            <div @click="carClick({})" class="current_car">
              {{currentCar.name}}
            </div>
            <div class="car_card">
              <mini-card class="car_card" credit :data="currentCar"/>
            </div>
          </div>
          <div class="cars_list" v-else>
            <div @click="carClick(item)" class="car_item" v-for="(item, index) in carsList" :key="index">
              <div class="car_item_line">
                <img class="car_item_image" :src="item.images[0].thumb" alt="image">
                <div class="car_item_info">
                  <div class="car_item_info_name">
                    {{item.name}}
                  </div>
                  <div class="car_item_info_line">
                    <div class="car_item_info_line_item">
                      {{item.year}} г.
                    </div>
                    <div class="car_item_info_line_item">
                      {{item.gearbox.title}}
                    </div>
                    <div class="car_item_info_line_item">
                      {{item.run}} км
                    </div>
                  </div>
                  <div class="car_item_info_price">
                    {{item.price | toCurrency}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block">
        <h4 class="h4_title">
          Ваш автомобиль
        </h4>
        <div class="inputs">
          <div class="input_wrapper">
            <input  class="input" type="text" placeholder="Марка" v-model="personMark">
          </div>
          <div class="input_wrapper">
            <input  class="input" type="text" placeholder="Модель" v-model="personModel">
          </div>
        </div>
        <h4 class="h4_title">
          Личные данные
        </h4>
        <div class="inputs">
          <div class="input_wrapper">
            <input @change="error=''" :class="{input_error: error === 'name'}" class="input" type="text" placeholder="ФИО" v-model="name">
          </div>
          <div class="input_wrapper">
            <inputs-date v-model="bdate"/>
          </div>
        </div>
        <div class="inputs">
          <div class="input_wrapper">
            <inputs-phone :error="error === 'phone'" @input="error=''" v-model="phone"/>
          </div>
          <div class="input_wrapper">
            <inputs-select :items="this.$store.state.locations" class="select" title="Прописка" @selected="isSelect"/>
          </div>
        </div>
        <inputs-check title="Подтверждаю, что являюсь гражданином РФ"/>
        <inputs-check privacy :title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`"/>
        <div @click="sendTradeInForm" class="button send_button">
           <span class="flare"></span>
        Оставить заявку
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FEEDBACK from '~/apollo/queries/feedback'
import usedOffers from '~/apollo/queries/usedOffers'
import usedFolders from '~/apollo/queries/usedFolders'
import usedMarks from '~/apollo/queries/usedMarks'
import filters from '~/mixins/filters'
export default {
  mixins:[filters],
    props: {
    pageTitle:{
      type:String,
      default:() => ''
  },
    },
  data(){
    return {
      personMark:'',
      personModel:'',
      bdate:'',
      location:'',
      name:'',
      phone:'',
      currentMark:{},
      currentModel:{},
      currentCar:{},
      marks:[],
      models:[],
      carsList:[],
      error:'',
    }
  },
  computed:{
    currentCount(){
      return this.count ? this.count : false
    }
  },
  methods:{
    checkForm(){
      if(!this.currentMark.id){
        this.error = 'currentMark';
        return false;
      }
      if(!this.currentModel.id){
        this.error = 'currentModel';
        return false;
      }
      if(!this.currentCar.id){
        this.error = 'currentCar';
        return false;
      }
      if(!this.name){
        this.error = 'name';
        return false;
      }
      if(!this.phone || this.phone.split('_').length !== 1){
        this.error = 'phone';
        return false;
      }
      return true;
    },
    async sendTradeInForm(){
      if (this.checkForm()) {
        let formData = {
          external_id: this.currentCar.external_id,
          site_id: this.$config.site_id_used,
          type: 'trade-in',
          client_name: this.name,
          client_phone: this.phone,
          client_vehicle_mark: this.personMark,
          client_vehicle_model: this.personModel,
          utm_source: localStorage.utm_source || '',
          utm_medium: localStorage.utm_medium || '',
          utm_campaign: localStorage.utm_campaign || '',
          utm_term: localStorage.utm_term || '',
          utm_content: localStorage.utm_content || '',
        }
        try {
          const res = await this.$apollo.mutate({
            mutation: FEEDBACK,
            variables: formData
          }).then((response) => {
            let metrikParams = {
              eventName: 'thanks',
              ecommerceId: response.data.feedback.id,
              ecommerceProductsId: this.currentCar.external_id,
              ecommerceProductsName: this.currentCar.name,
              ecommerceProductsPrice: this.currentCar.price,
              ecommerceProductsBrand: this.currentCar.mark.title,
              ecommerceProductsCategory: `С пробегом/${this.currentCar.mark.title}/${this.currentCar.folder.title}/${this.currentCar.name}`,
              ecommerceProductsQuantity: "1",
            }
            this.$router.push({name: 'thanks', params:{metrikParams}});
          });
        }
        catch (e) {
          console.error(e)
        }
      }
    },
    isSelect(location){
      this.location = location.title
    },
    carClick(car){
      this.error = ''
      this.currentCar = car
    },
    showResult(){
      let model_slug = this.currentModel.slug || ''
      let mark_slug = this.currentMark.slug || ''
      this.$router.push('/auto/'+mark_slug+'/' + model_slug)

    },
    async getMarks(){
      await this.$apollo.query({
        query : usedMarks,
        variables: {
          site_id: this.$config.site_id_used
        }
      })
        .then(({ data }) => {
          this.$store.commit('setMarks', data.marks)
          this.marks = data.marks
          // if(this.choosenMark){
          //   this.currentMark = this.marks.filter(item => item.slug === this.choosenMark)[0]
          // }
        })
    },
    async getCars(){
      await this.$apollo.query({
        query : usedOffers,
        variables: {
          limit: 0,
          page: 1,
          site_id: this.$config.site_id_used,
          mark_slug: this.currentMark.slug,
          folder_slug: this.currentModel.slug,
        }
      })
        .then(({ data }) => {
          this.carsList =  data.offers.data
        })
    },
    async markSelect(mark){
      this.error = ''
      this.carsList = []
      this.currentModel = {}
      this.currentMark = mark
      await this.$apollo.query({
        query : usedFolders,
        variables: {
          site_id: this.$config.site_id_used,
          mark_id: mark.id
        }
      })
        .then(({ data }) => {
          this.models = data.folders
        })
    },
    modelSelect(model){
      this.error = ''
      this.currentModel = model
      this.getCars()
    }
  },
}
</script>

<style scoped lang="scss">
@import "~/static/scss/form.scss";
//.car_card{
//  max-width: 320px;
//}
.cars_list{
  max-height: 240px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 8px;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: $grey; /* or add it to the track */
  }
  &::-webkit-scrollbar-thumb {
    background: $mainColor;
    border-radius: 2px;
  }
}
.car_item{
  padding: 16px 0;
  cursor: pointer;
  border-bottom: 2px solid $grey;
  &:hover{
    .car_item_info_name{
      font-weight: bold;
      font-size: 14px;
      color: $mainColor;
    }
  }
  &.nothing{
      overflow: hidden;
    cursor: auto;
  }
}
.send_button{
  width: 100%;
  margin: 24px 0 0;
}
.car_item_info_name{
  font-weight: bold;
  font-size: 14px;
}
.car_item_line{
  display: flex;
  align-items: flex-start;
}
.car_item_image{
  max-width: 160px;
  aspect-ratio: 16/10;
  -o-object-fit: cover;
  object-fit: cover;
  background: $grey;
  margin-right: 16px;
}
// .car_item_image.nothing{
//   max-width: 200px;
//   padding: 16px;
// }
// .car_item_noting-text{
//   color: $mainColor;
//   margin: 20px 0;
// }
.car_item_info_line{
  display: flex;
  margin-top: 8px;
}
.car_item_info_line_item{
  font-size: 14px;
  margin-right: 8px;
  font-weight: 300;
  color: $darkGrey;
  @media screen and (max-width:$x-large-display){
    font-size: 12px;
    margin-right: 6px;
  }
}
.car_item_info_price{
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
  color: $mainColor;
}
.current_car{
  height: 48px;
  border-radius: 5px;
  background: $lightGrey;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-weight: 300;
  cursor: pointer;
  position: relative;
  &:after{
    content: '';
    position: absolute;
    top: 20px;
    height: 0;
    right: 8px;
    width: 0;
    border: 4px solid transparent; border-top: 5px solid $mainColor;
  }
}

.h2_title{
  font-size: 24px;
  margin-bottom: 24px;
}
.h3_title{
  margin-top: 16px;
  margin-bottom: 16px;
}
.h4_title{
  color: $darkGrey;
  margin-bottom: 16px;
}
.blocks{
  display: flex;
  justify-content: space-between;
  @media screen and (max-width:$large-display){
    flex-direction: column;
  }
  .block{
    width: calc(50% - 12px);
    @media screen and (max-width:$large-display){
      width: 100%;
      &:last-child{
        margin-top: 16px;
      }
    }
  }
}
.button{
  margin: 16px 0;
    position: relative; 
    overflow-x: hidden; 
}

</style>
