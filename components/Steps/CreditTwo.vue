<template>
  <center><div class="steps">
    <div v-for="(step,index) in steps" :key="index" class="step">
      <svg-icon class="icon" :name="step.icon" />
      <div class="step_title">{{ step.title }}</div>
      <div class="step_text">{{ step.text }}</div>
    </div>
  </div>
  </center>
</template>

<script>
export default {
  data(){
    return{
      steps:[
        {
          title:'Скидка на кредит до 100 000 ₽',
          text:'Вы можете получить дополнительную скидку в размере до 100 000 ₽ при оформлении автокредита',
          icon:'percent',
        },
        {
          title:'Досрочное погашение',
          text:'Вам не придется встречать дополнительные штрафы и пени при досрочном погашении кредита.',
          icon:'repair',
        },
        {
          title:'Первоначальный взнос от 0%',
          text:'У Вас есть возможность покупки автомобиля в кредит без первоначального взноса.',
          icon:'legal',
        },
        {
          title:'Кредит по 2 документам',
          text:'Чтобы оформить автомобиль в кредит Вам необходимы только паспорт и водительское удостоверение.',
          icon:'docs',
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">

.steps{
  display: flex;
  justify-content: center;
  align-items: stretch;
  overflow: auto;
  flex-direction: column;
}
@media(min-width: $large-display){
   .steps{
    text-align: center;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
}
}
.step{
  width: 100%;
  padding: 8px 8px 16px;
  border-radius: 10px;
  // box-shadow: 0 1px 48px -12px rgb(0 0 0 / 40%);
  transition: .24s linear;
  cursor: default;
  // &:hover{
  //   box-shadow: 0 0 24px 0 rgb(0 0 0 / 40%);
  // }
  @media(min-width: $large-display){
   width: 25%;
}
}
.icon{
  width: 64px;
  height: 64px;
  margin: 8px auto;
  display: block;
  fill:$mainColor
}
.step_title{
  text-align: center;
  font-size: 18px;
  color: $black;
  font-weight: 500;
  margin-bottom: 8px;
}
.step_text{
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  color: $darkGrey;
  font-weight: 300;
}
</style>
