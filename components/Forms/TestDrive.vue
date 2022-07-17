<template>
  <div class="form">
    <div class="inputs">
      <div class="input_wrapper">
        <input :class="{input_error: error === 'name'}" class="input" @input="error=''" v-model="name" placeholder="ФИО"/>
      </div>
      <div class="input_wrapper">
        <inputs-phone :error="error === 'phone'" @input="error=''" v-model="phone"/>
      </div>
    </div>
    <div @click="sendCallBackForm" class="button">Оставить заявку</div>
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
      name:'',
      phone:'',
      error:''
    }
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
    async sendCallBackForm(){
      if (this.checkForm()) {
        this.$emit('sendForm')
        let formData = {
          site_id: this.$config.site_id_used,
          type: 'callback',
          client_name: this.name,
          client_phone: this.phone,
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
          }).then(() => {
            let onlyMetrik = {
              eventName: 'thanks',
            }
            this.$router.push({name: 'thanks', params:{onlyMetrik}});
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
.button{
  width: 276px;
  justify-content: center;
  @media screen and (max-width:$x-large-display){
    width: 204px;
  }
}
</style>
