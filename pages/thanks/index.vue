<template>
  <div class="thanks">
    <div class="container">
      <div class="inner">
        <div class="title_line">
          <svg-icon name="check2"/>
          <h2 class="h2_title">Заявка успешно отправлена.</h2>
        </div>

        <div class="text">Спасибо! В ближайшее время наши специалисты свяжутся с вами.</div>
        <nuxt-link to="/" class="back">На главную</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      params: null,
      onlyMetrik: null
    }
  },
  mounted() {
    this.params = this.$route.params.metrikParams
    this.onlyMetrik = this.$route.params.onlyMetrik
    if(this.params) {
      this.sendYandexCommercial()
      this.sendMyTarget()
      this.sendYandexMetrikaEvent(this.params.eventName)
    } else if(this.onlyMetrik) {
      this.sendYandexMetrikaEvent(this.onlyMetrik.eventName)
    }
  },
  methods: {
    sendYandexMetrikaEvent(data) {
      ym(this.$config.ym, 'reachGoal', data)
    },
    sendMyTarget(){
      _tmr.push({
        type: 'itemView',
        productid: this.params.ecommerceProductsId,
        pagetype: 'purchase',
        list: '1',
        totalvalue: this.params.ecommerceProductsPrice
      })
    },
    sendYandexCommercial(){
      dataLayer.push( {
        "ecommerce": {
          "purchase": {
            "actionField": {
              "id" : this.params.ecommerceId,
              "goal_id" : this.$config.goal_id,
            },
            "products": [
              {
                "id": this.params.ecommerceProductsId,
                "name" :   this.params.ecommerceProductsName,
                "price": this.params.ecommerceProductsPrice,
                "brand":  this.params.ecommerceProductsBrand,
                "category" : this.params.ecommerceProductsCategory,
                "quantity" : this.params.ecommerceProductsQuantity
              }
            ]
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .thanks{
    min-height: calc(100vh - 240px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .inner{
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
  }
  .title_line{
    display: flex;
    align-items: center;
    svg{
      fill:$mainColor;
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }
  .text{
    color: $darkGrey;
    margin-top: 8px;
  }
  .back{
    color: $mainColor;
    margin-top: 8px;
    display: block;
  }
</style>
