<template>
  <div class="credit_form">
    <h2 class="h2_title">
      Заявка на рассрочку
    </h2>
    <div class="selects">
      <div class="select_wrapper">
        <inputs-select :items="this.$store.state.marks"
                       :selected-data="currentMark"
                       title="Марка"
                       @selected="markSelect"
                       class="select"/>
      </div>
      <div class="select_wrapper">
        <inputs-select :items="models"
                       :selected-data="currentModel"
                       title="Модель"
                       :disabled="models.length === 0"
                       @selected="modelSelect"
                       class="select"/>
      </div>
    </div>
    <div class="cars" v-if="currentModel.hasOwnProperty('id')">
      <div class="choosen_car_block" v-if="currentCar.hasOwnProperty('id')">
        <div @click="carClick({})" class="current_car">
          {{currentCar.name}}
        </div>
        <div class="car_card">
          <mini-card credit :data="currentCar"/>
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
    <div class="conditions">
      <h3 class="h3_title">
        Условия рассрочки
      </h3>
      <inputs-range @rangeInput="rangeInputTime()" :max="installmentsRange.length - 1"
                    :value="3"
                    :min="0" :step="1"
                    :dimension="installmentsRange"
                    title="Срок рассрочки:"/>
      <inputs-range @rangeInput="rangeInputContribution()" :max="contributionRange.length - 1"
                    :min="0"
                    :value="0"
                    :step="1"
                    :dimension="contributionRange"
                    title="Первоначальный взнос:"/>
      <div class="conditions_info">
        <div class="conditions_info_line">
          <div class="conditions_info_line_item">
            Ваша ставка
          </div>
          <div class="conditions_info_line_dots"></div>
          <div class="conditions_info_line_item">
            {{ $config.installment_percent }}
          </div>
        </div>
        <div class="conditions_info_line">
          <div class="conditions_info_line_item">
            Платеж в месяц
          </div>
          <div class="conditions_info_line_dots"></div>
          <div class="conditions_info_line_item price">
            {{ credit.range_sum }}
          </div>
        </div>
      </div>
    </div>
    <div class="personal_data">
      <h3 class="h3_title">
        Укажите свои данные
      </h3>
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
      <div @click="send" class="button send_button">
        <span class="flare"></span>
     Оставить заявку
            
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
  data(){
    return {
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
      installmentsRange:[
        '61 дн',
        '6 мес',
        '12 мес',
        '24 мес'
      ],
      contributionRange:[
        '20 %',
        '30 %',
        '40 %',
        '50 %',
        '60 %',
        '70 %',
        '80 %',
      ],
      credit: {
        range_payment: "20 %",
        range_period: "24 мес",
        year_percent: "0",
        range_sum : '',
        payment_sum: ''
      },
      error:'',
    }
  },
  props: {
    choosenMark: {
      type: String,
      default: ''
    },
    choosenModel: {
      type: String,
      default: ''
    },
  },
  computed:{
    currentCount(){
      return this.count ? this.count : false
    }
  },
  mounted() {
    this.annuityCalc()
  },
  methods:{
    checkForm(){
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
    async send(){
      if (this.checkForm()) {
        let formData = {
          // todo -- external_id поменять на external_unique_id на всех сайтах
          external_id: this.currentCar.external_id,
          site_id: this.$config.site_id_used,
          type: 'hire-purchase',
          client_name: this.name,
          client_phone: this.phone,
          client_age: this.bdate,
          client_region: this.location,
          credit_initial_fee: this.credit.range_payment,
          credit_period:this.credit.range_period,
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
    rounded(number){
      return +number.toFixed(2);
    },
    annuityCalc() {
      if(this.currentCar.hasOwnProperty('id')){
        let creditProc = parseFloat(this.$config.installment_percent);
        let car_price = parseInt(this.currentCar.price);
        let creditTime = parseInt(this.credit.range_period);
        let firstPay = parseInt(this.credit.range_payment);
        let A = 0;

        var i = creditProc / 12 / 100;
        if(creditTime === 61){
          creditTime = 2;
        }
        var n = creditTime

        if(firstPay !== 0){
          firstPay = car_price*firstPay/100
        }
        var payment_sum = (car_price - firstPay) / creditTime

        this.credit.range_sum =
           String(Math.round(payment_sum))
          .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽"
      }
      else{
        this.credit.range_sum = '-'
      }
    },
    rangeInputTime(){
      this.credit.range_period= this.installmentsRange[event.target.value]
      this.annuityCalc()
    },
    rangeInputContribution(){
      this.credit.range_payment = this.contributionRange[event.target.value]
      this.annuityCalc()
    },
    carClick(car){
      this.currentCar = car
      this.annuityCalc()
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
      this.currentModel = model
      this.getCars()
    }
  },
}
</script>

<style scoped lang="scss">
@import "~/static/scss/form.scss";
.select_wrapper{
  margin-bottom: 16px;
  width: 100%;
}
.h3_title{
  margin-top: 16px;
  margin-bottom: 16px;
}
.h2_title{
  margin-bottom: 24px;
}
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
.conditions_info{
  margin-top: 32px;
}
.conditions_info_line{
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  font-size: 14px;
  color: $darkGrey;
}
.conditions_info_line_item{
  &.price{
    color: $mainColor;
  }
}
.conditions_info_line_dots{
  flex: 1;
  margin: 0 8px;
  position: relative;
  top: -2px;
  border-bottom: 1px dotted $darkGrey;
}

  .button{
        position: relative; 
    overflow-x: hidden; 
  }
</style>
