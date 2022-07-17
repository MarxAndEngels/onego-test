<template>
  <div class="container">
    <advantages/>
    <div class="credit">
       <div class="credit_line">
         <div class="left">
           <forms-main-installments/>
         </div>
         <div class="right">
           <h3 class="h3_title">
             Как мы работаем?
           </h3>
                     <steps-credit :steps="steps" class="steps" column='false'/>
            <div class="credit_info">
              <div class="text">
                В автосалоне {{ $config.mark_title }} вы сможете взять рассрочку на автомобиль без переплат и процентов. Главное требование для расстрочки - первоначальный взнос не меньше 20% от цены автомобиля.
                <br/>
                <br/>
                Рассрочка - это удобный способ приобрести автомобиль с пробегом и идеальное решение в случае, если возможно погашения за срок до 2 лет. Если же выплата всей суммы автомобиля за 2 года не возможна, лучшее решение -
                <Nuxt-link to="/credit">автокредит</Nuxt-link>
                {{$config.credit_percent}} со скидкой до 100 000 ₽.
              </div>
            </div>
         </div>
       </div>
     </div>
    <sliders-banks class="banks"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      steps:[
        {
          title:'Выберите автомобиль',
          text:'Подберите автомобиль на нашем сайте и выберите его для оформления рассрочки',
          open:false,
        },
        {
          title:'Заполните заявку на рассрочку',
          text:'Заполните внимательно все поля формы рассрочки, рассчитайте условия рассрочки',
          open:false,
        },
        {
          title:'С вами свяжется менеджер',
          text:'По указанным контактным данным, с вами свяжется наш менеджер',
          open:false,
        },
        {
          title:'Езжайте на оформление',
          text:'Приезжайте к нам автосалон и не забудьте с собой документы!',
          open:false,
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .credit,.banks{
    margin-top: 32px;
  }
  .h2_title, .h3_title{
    margin-bottom: 24px;
  }
  .left{
    min-width: 480px;
    width: 480px;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    @media screen and (max-width: $xx-large-display){
      width: 400px;
      min-width: 400px;
    }
    @media screen and (max-width:$large-display){
      min-width: 100%;
      padding: 16px;
      width: 100%;
    }
  }
  .right{
    width: 100%;
    margin-left: 24px;
    @media screen and (max-width:$large-display){
      margin-left: 0;
      margin-top: 24px;
    }
  }
  .steps{
    margin-bottom: 24px;
  }
  .credit_line{
    display: flex;
    align-items: flex-start;
    @media screen and (max-width:$large-display){
      flex-direction: column;
    }
  }
  .credit_info{
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    margin-bottom: 24px;
  }
</style>
