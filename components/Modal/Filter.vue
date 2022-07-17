<template>
  <div class="modal" :class='{ active: modalState }'>
    <div class="modal_content">
        <div v-if='typeModal == "mark"'>
          <lists-marksModal/>
        </div>
        <div v-if='typeModal == "models"'>
           <lists-models :mark-slug="this.$route.params.mark" class="models"/>
        </div>
        <div v-if='typeModal == "genarations"'>
            <lists-generations :model-slug="this.$route.params.model" :mark-slug="this.$route.params.mark" class="generations"/>
        </div>
        <div v-if='typeModal == "kpp"'>
            <lists-generations :model-slug="this.$route.params.model" :mark-slug="this.$route.params.mark" class="generations"/>
        </div>
      <!-- <div class="title">
        311111111111112
      </div> -->
      <div class="close" @click='changeState'>×</div>
      <!-- <button class='button'>Применить</button> -->
    </div>
  </div>
</template>

<script>
export default {
     computed:{
    modalState(){
        return this.$store.state.modal
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
    typeModal:{
         type: String,
      default: ''
    }
  },
  methods:{
     changeState(){
       this.$store.commit('setModal', true)
    },
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
    z-index: 555;
  }
</style>
