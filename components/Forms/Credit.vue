<template>
  <div class="form">
    <div class="input_title">
      Укажите свои данные
    </div>
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

    <div class="input_title">
      Кредитные условия
    </div>
    <inputs-range @rangeInput="rangeInputTime()"
                          :max="creditRange.length - 1"
                          :value="8"
                          :min="0" :step="1"
                          :dimension="creditRange"
                          title="Срок кредитования:"/>
    <inputs-range @rangeInput="rangeInputContribution()"
                          :max="contributionRange.length - 1"
                          :min="0"
                          :value="0"
                          :step="1"
                          :dimension="contributionRange"
                          title="Первоначальный взнос:"/>
    <div class="credit_info">
      <div class="credit_info_item">
        <div class="item_title">
          Ваша ставка:
        </div>
        <div class="credit_info_data">
          {{ credit.year_percent }}
        </div>
      </div>
      <div class="credit_info_item">
        <div class="item_title">
          Первоначальный взнос:
        </div>
        <div class="credit_info_data">
          {{ credit.payment_sum }}
        </div>
      </div>
      <div class="credit_info_item">
        <div class="item_title">
          Ежемесячный платеж:
        </div>
        <div class="credit_info_data">
          {{credit.range_sum}}
        </div>
      </div>
    </div>

    <inputs-check title="Подтверждаю, что являюсь гражданином РФ"/>
    <inputs-check privacy :title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`"/>
    <div class="button" @click="sendCreditForm">
    Оставить заявку

    </div>
  </div>
</template>

<script>
import FEEDBACK from '~/apollo/queries/feedback'
export default {
  data(){
    return{
      phone:'',
      bdate:'',
      name:'',
      region:'',
      error:'',
      creditRange:[
        '61 дн',
        '6 мес',
        '12 мес',
        '24 мес',
        '36 мес',
        '48 мес',
        '60 мес',
        '72 мес',
        '84 мес'
      ],
      contributionRange:[
        '0 %',
        '10 %',
        '20 %',
        '30 %',
        '40 %',
        '50 %',
        '60 %',
        '70 %',
        '80 %',
      ],
      procent_credit: '4.9%',
      creditRangeValue:'12 мес.',
      contributionRangeValue:'20 %',
      credit: {
        range_payment: "0%",
        range_period: "84 мес",
        year_percent: "4.9%",
        range_sum : '',
        payment_sum: ''
      }
    }
  },
  props: {
    data: {
      type: Object,
      default:()=> {}
    },
  },

  methods:{
    isSelect(location){
      this.region = location.title
    },
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
    async sendCreditForm(){
      if (this.checkForm()) {
        let formData = {
          external_id: this.data.external_id,
          site_id: this.$config.site_id_used,
          type: 'credit',
          client_name: this.name,
          client_phone: this.phone,
          client_age: this.bdate,
          client_region: this.region,
          credit_initial_fee: this.contributionRangeValue,
          credit_period:this.creditRangeValue,
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
              ecommerceProductsId: this.data.external_id,
              ecommerceProductsName: this.data.name,
              ecommerceProductsPrice: this.data.price,
              ecommerceProductsBrand: this.data.mark.title,
              ecommerceProductsCategory: `С пробегом/${this.data.mark.title}/${this.data.folder.title}/${this.data.name}`,
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
    annuityCalc() {
      var creditProc = parseFloat(this.procent_credit);
      var car_price = parseInt(this.data.price);
      var creditTime = parseInt(this.credit.range_period);
      var firstPay = parseInt(this.credit.range_payment);

      if (!car_price) {
        car_price = 0;
      }
      var A = 0;
      var rounded = function (number) {
        return +number.toFixed(2);
      };
      creditProc = parseFloat(this.procent_credit);
      this.credit.year_percent = rounded(creditProc) + "%";
      var i = creditProc / 12 / 100;
      var n = creditTime;
      if(n === 61){
        var n = 2;
      }
      if (firstPay !== "NaN") {
        var S = car_price - (car_price * firstPay) / 100;
      } else {
        var S = car_price;
      }
      var K = 0;
      if (n <= 0) {
        this.credit.range_sum = " - ";
        //$('.mounth_pay').html(' - ');
      } else {
        if (car_price) {
          var payment_sum = car_price * firstPay / 100;
          this.credit.payment_sum =  String(payment_sum).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽";
          K = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
          A = Math.round(K * S);
          this.credit.range_sum =
            String(A).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " ₽";
        }
      }
      //this.range_sum = String(A).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' ₽';
      //$('.range_sum').val(String(A).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' руб.');
    },
    rangeInputTime(){
      this.credit.range_period= this.creditRange[event.target.value]
      this.annuityCalc()
    },
    rangeInputContribution(){
      this.credit.range_payment = this.contributionRange[event.target.value]
      this.annuityCalc()
    }
  },
  mounted() {
    this.annuityCalc()
  }
}
</script>

<style scoped lang="scss">

  @import "~/static/scss/form.scss";
  .credit_info_item{
    .item_title{
      font-size: 12px;
    }
    .credit_info_data{
      font-size: 16px;
      color: $mainColor;
      font-weight: bold;
      margin-top: 8px;
    }
  }
  .button{
       position: relative; 
    overflow-x: hidden;
  }
</style>
