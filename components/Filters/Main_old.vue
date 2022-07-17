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
        <inputs-select class="select"
                       :items="generations"
                       :selected-data="currentCeneration"
                       @selected="generationSelect"
                       :disabled="generations.length === 0"
                       title="Поколение"/>
      </div>
      <div class="select__wrapper">
        <inputs-select class="select"
                       :items="generations"
                       :selected-data="currentCeneration"
                       @selected="generationSelect"
                       :disabled="generations.length === 0"
                       title="Двигатель"/>
      </div>
      <div class="button"
           @click="showResult">
        Показать
        <span v-if="currentCount" class="count">{{currentCount}} авто</span>
      </div>
    </div>
  </div>
</template>

<script>
import usedFolders from '~/apollo/queries/usedFolders'
import usedMarks from '~/apollo/queries/usedMarks'
import usedGeneration from '~/apollo/queries/usedGeneration'
export default {
  data(){
    return {
      currentMark:{},
      currentModel:{},
      currentCeneration:{},
      marks:[],
      models:[],
      generations:[],
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
      let generation_slug = this.currentCeneration.slug || ''
      this.$router.push('/'+ this.$config.used_page +'/' + mark_slug +'/' + model_slug + '/' + generation_slug)

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
        })
    },
    async modelSelect(model){
      this.currentModel = model
      this.count = model.offers_count
      await this.$apollo.query({
        query : usedGeneration,
        variables: {
          site_id: this.$config.site_id_used,
          mark_id: this.currentMark.id,
          folder_id: this.currentModel.id
        }
      })
        .then(({ data }) => {
          this.generations = data.generations
        })
    },
   async generationSelect(generation){
      this.currentCeneration = generation
      this.count = generation.offers_count
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
.selects {
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media screen and (max-width:$large-display){
    padding: 16px;
  }
}
.select__wrapper{
  width: 25%;
  padding: 8px;
  @media screen and (max-width:$large-display){
    width: 100%;
    padding: 0;
    margin-bottom: 8px;
  }
}
.button{
  margin-left: 16px;
  @media screen and (max-width:$large-display){
    margin-left: 0;
  }
}
</style>
