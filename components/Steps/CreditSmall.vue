<template>
  <div :class="{'steps_line': true, 'row': column == 'true' ? true : false}">
    <div v-for="(step,index) in steps" :key="index" :class="{step: true, alternativeC: index % 2 == 0 ? true : false }">
      <div class="step_circle">{{index+1}}</div>
      <div class="step_title">{{ step.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:
  
  {
    steps:{
      type: Array,
      default:()=>[]
    },
    column:{
         type: String,
      default:()=>[]
    }
  }

}
</script>

<style scoped lang="scss">

  .steps_line{
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // align-items: stretch;
    @media screen and (min-width:$small-display){
      // display: none;
      // flex-direction: row;
    }
    &.row{
      flex-direction: column;
    }

     @media screen and (min-width:$small-display){
      &.row{
      flex-direction: row;
    }
     }
  }
  .step{
    // width: calc(25% - 16px);
    width: 100%;
    // box-shadow: 0 1px 48px -12px rgb(0 0 0 / 40%);
    transition: .24s linear;
    
          padding: 12px 8px;
    background-color: $lightGrey;
    cursor: default;
    &.mobile{
      display: none;
    }
    &.alternativeC{
      background-color: $greenHover;
    }

    &:hover{
      transform: translate3d(0,-4px,0)
      // box-shadow: 0 0 24px 0 rgb(0 0 0 / 40%);
    }
    @media screen and (min-width: $xx-large-display){

          padding: 22px 8px;
    //  width: 25%;
    }
  }
  .step_circle{
    border: 0px solid black;
    border-radius: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 20px;
    font-weight: 300;
    width: 32px;
    height: 32px;
    margin: 8px auto;
  }
  .step_title{
    text-align: center;
    font-size: 16px;
    color: $black;
    font-weight: 600;
    margin-bottom: 8px;
    @media screen and (max-width: $xx-large-display){
      font-size: 14px;
    }
  }
  .step_text{
    text-align: center;
    font-size: 15px;
    line-height: 16px;
    color: $black;
    font-weight: 300;
    @media screen and (max-width: $xx-large-display){
      font-size: 12px;
    }
  }
</style>
