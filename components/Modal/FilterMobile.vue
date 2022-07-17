<template>
  <div class="modal" :class='{ active: modalState }'>
    <div class="modal_content">
       <filters-main-filters @changeState='mainChangeState' @changeSort='mainChangeSort'/>
      <div class="close" @click='changeState'>×</div>
      <button class='button'>Применить</button>
    </div>
  </div>
</template>

<script>
export default {
     computed:{
    modalState(){
        return this.$store.state.modalMobile
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    stateProps:{
        type: Boolean,
      default: false
    },
  },
  methods:{
     changeState(){
       this.$store.commit('setModalMobile', true)
    },

      mainChangeState(param){
        let number = param
        console.log(param)
     this.$emit('mainChangeStateM', param)
   },
   mainChangeSort(param){
     let number = param
    this.$emit('mainChangeSortM', number)
   }
  },
}
</script>

<style scoped lang="scss">
  @import "~/static/scss/modal.scss";
  .close{
    font-size: 40px;
  }
  .active{
    display: none;
  }
  .modal{
    height: 100%;
    z-index: 455;
  }
</style>
