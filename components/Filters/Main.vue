<template>
  <div class="filter">
    <div class="selects">
      <div class="select__wrapper">
        <inputs-new-select
                       :items="marks"
                       title="Марка"
                       :current-data="currentMark"
                       @selected="markSelect"/>
      </div>

      <div class="select__wrapper">
        <inputs-new-select
                       :items="models"
                       :current-data="currentModel"
                       title="Модель"
                       :disabled="models.length === 0"
                       @selected="modelSelect"/>
      </div>
      <div class="select__wrapper">
        <inputs-new-select :items="generations"
                       :current-data="currentGeneration"
                       title="Поколение"
                       :disabled="generations.length === 0"
                       @selected="generationSelect"/>
      </div>
      <div class="select__wrapper" >
        <inputs-new-select :items="yearsFrom"
                       :current-data="currentYearFrom"
                       title="Год от"
                       is-range
                       @selected="yearFromSelect"/>
      </div>
      <div class="select__wrapper" >
        <inputs-new-select :items="gearboxes"
                       :current-data="currentGearbox"
                       title="КПП"
                       @selected="gearboxSelect"/>
      </div>
      <div class="select__wrapper" >
        <inputs-new-select :items="bodyTypes"
                       :current-data="currentBodyType"
                       title="Тип кузова"
                       @selected="bodyTypeSelect"/>
      </div>
      <div class="select__wrapper" >
        <inputs-new-select :items="engineTypes"
                           :current-data="currentEngineType"
                           title="Тип двигателя"
                           @selected="engineTypeSelect"/>
      </div>
<!--      <div class="select__wrapper" >-->
<!--        <inputs-new-select :items="driveTypes"-->
<!--                           :current-data="currentDriveType"-->
<!--                           title="Привод"-->
<!--                           @selected="driveTypeSelect"/>-->
<!--      </div>-->
<!--      <div class="select__wrapper mobile_no_margin_bottom" >-->
<!--        <inputs-new-select :items="owners"-->
<!--                       :current-data="currentOwners"-->
<!--                       title="Владельцев"-->
<!--                       @selected="ownersSelect"/>-->
<!--      </div>-->
      <div class="button" @click="pick">Подобрать</div>
    </div>
  </div>
</template>

<script>
import offerFilters from '~/apollo/queries/offerFilters'
export default {
  data(){
    return {
      marks:[],
      currentMark: null,
      models:[],
      currentModel: null,
      yearsFrom:[],
      currentYearFrom: null,
      generations:[],
      currentGeneration: null,
      gearboxes:[],
      currentGearbox: null,
      bodyTypes: [],
      currentBodyType: null,
      owners: [],
      currentOwners: null,
      driveTypes: [],
      currentDriveType: null,
      engineTypes: [],
      currentEngineType: null
    }
  },
  mounted() {
    this.getFilters('all')
  },
  methods:{
    async getFilters(field){
       await this.$apollo.query({
        query : offerFilters,
        variables: {
          site_id: this.$config.site_id_used,
          mark_id: this.currentMark ? this.currentMark.id : null,
          folder_id: this.currentModel ? this.currentModel.id : null
        }
      })
        .then(({ data }) => {
          this.yearsFrom = data.offerFilters.year
          this.gearboxes = data.offerFilters.gearbox
          this.bodyTypes = data.offerFilters.bodyType
          this.driveTypes = data.offerFilters.driveType
          this.engineTypes = data.offerFilters.engineType
          this.owners = data.offerFilters.owner

          if(field === 'all'){
            this.marks = data.offerFilters.mark
          }
          if(field === 'models'){
            this.models = data.offerFilters.folder
          }
          if(field === 'generations'){
            this.generations = data.offerFilters.generation
          }
        })
    },
    resets(){
      this.currentYearFrom = null
      this.currentGearbox = null
      this.currentBodyType = null
      this.currentOwners = null
      this.currentEngineType = null
      this.currentDriveType = null
    },

    markSelect(mark){
      this.currentMark = mark
      this.currentModel = null
      this.currentGeneration = null
      this.generations = []

      this.resets()

      this.getFilters('models')
    },
    modelSelect(model){
      this.currentModel = model
      this.currentGeneration = null

      this.resets()

      this.getFilters('generations')
    },
    generationSelect(generation){

      this.resets()

      this.currentGeneration = generation
    },

    yearFromSelect(year){
      this.currentYearFrom = {title:String(year)}
    },
    gearboxSelect(gearbox){
      this.currentGearbox = gearbox
    },
    bodyTypeSelect(bodyType){
      this.currentBodyType = bodyType
    },
    ownersSelect(owners){
      this.currentOwners = owners
    },
    driveTypeSelect(driveType){
      this.currentDriveType = driveType
    },
    engineTypeSelect(engineType){
      this.currentEngineType = engineType
    },

    currentPath(params){
      let path = '/' + this.$config.used_page

      if(params.mark){
        path +=  '/' + params.mark.slug
      }
      if(params.model){
        path += '/' + params.model.slug
      }
      if(params.generation){
        path += '/' + params.generation.slug
      }
      return path
    },
    currentQueries(params){
      let queries = {}
      if(params.bodyType){
        queries.bodyType = params.bodyType.id
      }
      if(params.yearFrom){
        queries.yearFrom = params.yearFrom.title
      }
      if(params.owners){
        queries.owners = params.owners.id
      }
      if(params.gearbox){
        queries.gearbox = params.gearbox.id
      }
      if(params.driveType){
        queries.driveType = params.driveType.id
      }
      if(params.engineType){
        queries.engineType = params.engineType.id
      }
      return queries
    },

    pick(){
      let pathParams = {
        mark:this.currentMark,
        model:this.currentModel,
        generation:this.currentGeneration,

      }
      let queryParams = {
        yearFrom:this.currentYearFrom,
        owners:this.currentOwners,
        bodyType:this.currentBodyType,
        gearbox:this.currentGearbox,
        driveType:this.currentDriveType,
        engineType:this.currentEngineType
      }

      this.$router.push({path: this.currentPath(pathParams), query:this.currentQueries(queryParams)})
    }

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
    justify-content: space-between;
  }
}
.select__wrapper{
  width: 25%;
  padding: 8px;
  @media screen and (max-width:$large-display){
    width: calc(50% - 8px);
    padding: 0;
    margin-bottom: 8px;
    &.mobile_no_margin_bottom{
      margin-bottom: 0;
    }
  }
}
.button{
  margin-left: 8px;
  @media screen and (max-width:$large-display){
    margin-left: 0;
    width: calc(50% - 8px);
    justify-content: center;
  }
}
</style>
