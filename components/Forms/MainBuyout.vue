<template>
  <div class="credit_form">
    <h1 class="h2_title">
     {{ pageTitle }}
    </h1>
    <div class="blocks">
      <div class="block">
        <h4 class="h4_title">
          Ваш автомобиль
        </h4>
        <div class="input_wrapper long">
          <input class="input" type="text" placeholder="Марка" v-model="mark">
        </div>
        <div class="input_wrapper long">
          <input class="input" type="text" placeholder="Модель" v-model="model">
        </div>
        <div class="input_wrapper long">
          <inputs-year class="input" type="tel" :placeholder="'Год'" v-model="year"/>
        </div>
        <div class="input_wrapper long">
          <input class="input" type="tel" placeholder="Количество владельцев" v-model="owners">
        </div>
        <div class="input_wrapper long">
          <input class="input" type="tel" placeholder="Пробег" v-model="run">
        </div>
              <div class="input_wrapper long">
          <inputs-select @selected='gearboxSelect' title="КПП" :items="gearboxOptions"/>
        </div>
      </div>
      <div class="block">
        <h4 class="h4_title">
          Личные данные
        </h4>
        <div class="input_wrapper long">
          <input @change="error=''" :class="{input_error: error === 'name'}" class="input" type="text" placeholder="ФИО" v-model="name">
        </div>
        <div class="input_wrapper long">
          <inputs-phone :error="error === 'phone'" @input="error=''" v-model="phone"/>
        </div>
        <div class="input_wrapper long">
          <inputs-date v-model="bdate"/>
        </div>
        <div class="input_wrapper long">
          <inputs-select :items="this.$store.state.locations" class="select" title="Прописка" @selected="locationSelect"/>
        </div>
        <inputs-check privacy :title="`Согласен на обработку <a href='/privacy' target='_blank'>персональных данных</a>`"/>
        <div @click="sendForm" class="button">Отправить заявку</div>
      </div>
    </div>
  </div>
</template>

<script>
import FEEDBACK from '~/apollo/queries/feedback'

export default {
   props: {
    pageTitle:{
      type:String,
      default:() => ''
    }
   },

  data(){
    return {
      mark:'',
      model:'',
      year:'',
      gearbox:'',
      gearboxOptions:[
        {
          title:'Механическая',
        },
        {
          title:'Автомат',
        },
        {
          title:'Автомат вариатор',
        },
        {
          title:'Автомат робот',
        },
      ],
      owners:'',
      run:'',
      bdate:'',
      location:'',
      name:'',
      phone:'',
      error:'',
    }
  },
  methods:{
    gearboxSelect(item){
      this.gearbox = item.title
    },
    locationSelect(location){
      this.location = location.title
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
    async sendForm(){
      if (this.checkForm()) {
        let formData = {
          site_id: this.$config.site_id_used,
          type: 'buyout',
          client_name: this.name,
          client_phone: this.phone,
          client_age: this.bdate,
          client_region: this.location,
          client_vehicle_mark: this.mark,
          client_vehicle_model: this.model,
          client_vehicle_run: this.run,
          client_vehicle_year: this.year,
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
    @media screen and (max-width:$small-display){
      flex-direction: column;
    }
    .block{
      width: calc(50% - 12px);
      @media screen and (max-width:$small-display){
        width: 100%;
      }
    }
  }
  .button{
    margin: 16px 0;
  }
</style>
