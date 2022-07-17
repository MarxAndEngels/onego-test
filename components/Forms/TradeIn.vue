<template>
  <div class="form">
    <div class="input_title">
      Желаемый автомобиль
    </div>
    <div class="inputs">
      <div class="input_wrapper">
        <input class="input" type="text" placeholder="Марка" readonly v-model="data.mark.title">
      </div>
      <div class="input_wrapper">
        <input class="input" type="text" placeholder="Модель" readonly v-model="data.folder.title">
      </div>
    </div>
    <div class="input_title">
      Укажите свой автомобиль
    </div>
    <div class="inputs">
      <div class="input_wrapper">
        <input class="input" type="text" placeholder="Марка" v-model="client_vehicle_mark">
      </div>
      <div class="input_wrapper">
        <input class="input" type="text" placeholder="Модель" v-model="client_vehicle_model">
      </div>
    </div>
    <div class="input_title">
      Укажите свои данные
    </div>
    <div class="inputs">
      <div class="input_wrapper">
        <input class="input" :class="{input_error: error === 'name'}" @input="error=''" v-model="name" placeholder="ФИО"/>
      </div>
      <div class="input_wrapper">
        <inputs-phone :error="error === 'phone'" @input="error=''" v-model="phone"/>
      </div>
    </div>
    <inputs-check title="Подтверждаю, что являюсь гражданином РФ"/>
    <inputs-check privacy :title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`"/>
    <div @click="sendTradeInForm" class="button">Оставить заявку</div>
  </div>
</template>

<script>
import FEEDBACK from '~/apollo/queries/feedback'
export default {
  data(){
    return{
      phone:'',
      name:'',
      error: '',
      client_vehicle_mark:'',
      client_vehicle_model:''
    }
  },
  props: {
    data: {
      type: Object,
      default:()=> {}
    },
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
    async sendTradeInForm(){
      if (this.checkForm()) {
        let formData = {
          external_id: this.data.external_id,
          site_id: this.$config.site_id_used,
          type: 'trade-in',
          client_name: this.name,
          client_phone: this.phone,
          client_vehicle_mark: this.client_vehicle_mark,
          client_vehicle_model: this.client_vehicle_model,
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
  }
}
</script>
<style scoped lang="scss">
@import "~/static/scss/form.scss";
</style>
