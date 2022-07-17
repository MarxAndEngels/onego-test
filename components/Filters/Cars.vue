<template>
  <div class="filter">
    <div class="selects">
      <div class="select__wrapper">
        <inputs-select :items="this.marks"
                       hasCount
                       :selected-data="currentMark"
                       title="Марка"
                       @selected="markSelect"
                       class="select"/>
      </div>
      <div class="select__wrapper">
        <inputs-select class="select"
                       hasCount
                       :selected-data="currentModel"
                       @selected="modelSelect"
                       :items="models"
                       :disabled="models.length === 0"
                       title="Модель"/>
      </div>
      <div class="select__wrapper">
        <inputs-select class="select" disabled title="Поколение"/>
      </div>
      <div class="select__wrapper">
        <inputs-select class="select" disabled title="Двигатель"/>
      </div>
      <div class="select__wrapper">
        <inputs-select class="select" disabled title="КПП"/>
      </div>
      <div class="buttons" v-if="count">
        <div class="button"
             @click="showResult">
          Показать
            <span v-if="currentCount" class="count">{{currentCount}} авто</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import usedFolders from '~/apollo/queries/usedFolders'
import usedMarks from '~/apollo/queries/usedMarks'
export default {
  data(){
    return {
      currentMark:{},
      currentModel:{},
      marks:[],
      models:[],
      count: null
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
  methods:{
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
    async markSelect(mark){
      this.currentMark = mark
      this.count = mark.offers_count
      await this.$apollo.query({
        query : usedFolders,
        variables: {
          site_id: this.$config.site_id_used,
          mark_id: mark.id
        }
      })
        .then(({ data }) => {
          this.models = data.folders
          // if(this.choosenModel){
          //   this.currentModel = this.models.filter(item => item.slug === this.choosenModel)[0]
          // }
        })
    },
    modelSelect(model){
      this.currentModel = model
      this.count = model.offers_count
    }
  },
  mounted() {
    this.getMarks()
  }
}
</script>
<style scoped lang="scss">

.filter{
  width: 100%;
}
.buttons{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  .button{
    background: $mainColor;
    color: #fff;
    padding: 12px;
    border-radius: 48px;
    cursor: pointer;
    transition: .24s;
    &.disabled{
      background: $grey;
      pointer-events: none;
    }
    &:hover{
      background: $mainColorHover;
    }
    &.reset{
      background: none;
      color: $black;
    }
  }
}
.selects{
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
  @media screen and (max-width:$large-display){
    padding:8px;
  }
}
.select__wrapper{
  margin-bottom: 16px;
  &:last-child{
    margin-bottom: 0;
  }
}
</style>
