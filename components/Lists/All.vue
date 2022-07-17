<template>
    <div>
       
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

          console.log(this.gearboxes);

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
    },
    mounted(){
        this.getFilters('all')
    }
}
</script>
<style>
    
</style>