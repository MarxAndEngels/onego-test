<template>
  <div class="form">
    <div class="input_title">
      Автомбоиль:
    </div>
    <input class="input" type="text" v-model="data.name" placeholder="Автомобиль" readonly>
    <div class="input_title">
      Укажите свои данные:
    </div>
    <div class="inputs">
      <div class="input_wrapper">
        <input :class="{input_error: error === 'name'}" class="input" @input="error=''" v-model="name" placeholder="ФИО"/>
      </div>
      <div class="input_wrapper">
        <inputs-phone  :error="error === 'phone'"  class="input" @input="error=''" v-model="phone" placeholder="Телефон"/>
      </div>
    </div>
    <div class="inputs">
      <div class="input_wrapper">
        <inputs-date class="input" type="text" placeholder="Дата рождения" v-model="bdate"/>
      </div>
      <div class="input_wrapper">
        <inputs-select :items="this.$store.state.locations" class="select" title="Прописка" @selected="isSelect"/>
      </div>
    </div>
    <inputs-check privacy :title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`"/>
    <div @click="sendCreditForm" class="button">Оставить заявку</div>
  </div>
</template>

<script>
import FEEDBACK from '~/apollo/queries/feedback'
export default {
  props: {
    data: {
      type: Object,
      default:()=> {}
    },
  },
  data(){
    return{
      check1: true,
      error:'',
      phone:'',
      name:'',
      bdate:'',
      region:'',
    }
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
