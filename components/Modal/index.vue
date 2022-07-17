<template>
  <div class="modal">
    <div class="modal_content">
      <div class="title">
        {{title}}
      </div>
      <div class="close" @click="$emit('closeModal')">×</div>
      <client-only>
        <component @sendForm="$emit('sendForm')" :data="data" v-bind:is="currentForm"></component>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data:{
      type: Object,
      default:() => {}
    },
    title: {
      type: String,
      default: ''
    },
    credit:{
      type: Boolean,
      default: false
    },
    callback:{
      type: Boolean,
      default: false
    },
    tradeIn:{
      type: Boolean,
      default: false
    },
    cardCredit:{
      type: Boolean,
      default: false
    },
    installment:{
      type: Boolean,
      default: false
    },
    testDrive: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    currentForm(){
      if(this.credit) return 'forms-credit'
      if(this.tradeIn) return 'forms-trade-in'
      if(this.callback) return 'forms-callback'
      if(this.cardCredit) return 'forms-card-credit'
      if(this.installment) return 'forms-installment'
      if(this.testDrive) return 'forms-test-drive'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~/static/scss/modal.scss";
</style>
