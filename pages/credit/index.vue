<template>
  <div class="container">
    <advantages/>
    <div class="credit">
       <div class="credit_line">
         <div class="left">
                <forms-main-credit :page-title="page_title"/>
         </div>
         <div class="right">
           <h3 class="h3_title">
             Как мы работаем?
           </h3>
                    <steps-credit :steps="steps" class="steps" column='false'/>
   
            <!-- <parallax-little/> -->
    
                                 <!-- <parallax-little/> -->
           <div class="credit_info">
              <div class="text">
             <center>    <h3 class="h3_title-little">
             Об услуге <svg-icon class="icon-information" name="information" />
           </h3></center>
             
                    
          <div class="wrapper__credit_info">
          <div class="wrapper__credit_info_text">
             <p>
 Выберите, понравившийся Вам автомобиль , заполните заявку и наш менеджер свяжется с вами. Автоцентр {{ $config.mark_title }} работает с самыми стабильными, добросовестными, а главное качественными банками. А выплата небольшими платежами может стать хорошей возможностью и удачным решением для покупателей.

             </p>
            
             </div>

         <div class='wrapper__credit_info_image'>
          <center>
 <img class="wrapper__credit_info_image-buyout" src='img/credit/car-icon.png'/>
          </center>
           
         </div>
         </div>
         </div>



            </div>
         </div>
       </div>
     </div>
    <sliders-banks class="banks"/>
  </div>
</template>

<script>
   import seoTags from "~/mixins/seoTags";
export default {

    mixins: [seoTags],
  data(){
    return{
      steps:[
        {
          title:'Выберите автомобиль',
          text:'Определитесь с выбором автомобиля на нашем сайте и выберите его для оформления кредита',
          open:false,
        },
        {
          title:'Заполните заявку на кредит',
          text:'Заполните все поля, рассчитывая кредитные условия',
          open:false,
        },
        {
          title:'С вами свяжется менеджер',
          text:'Через указанные контактные данные, с вами установит связь наш менеджер',
          open:false,
        },
        {
          title:'Приезжайте на оформление',
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
      font-size: 22px;
  }

  .h3_title-little{
    margin-bottom: 0px;
      font-size: 22px;
  }

  .left{
    min-width: 480px;
    width: 480px;
    height: 100%;
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
    // align-items: flex-start;
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

    .icon-information{
    fill: $mainColor;
       width: 26px;
    height: 26px;
    transform: translate3d(6px,7px,0);
  
  }
    .text{
    line-height: 1.5;
  }

    @media(min-width: $large-display){
   .text{
    padding: 6px;
  }
}

.wrapper__credit_info_image-buyout{
    height: 100%;
    max-height: 140px;
    transform: translate3d(0,12px,0);
        margin-bottom: 20px;
    @media(min-width: $medium-display){
    margin-bottom: 0px;
    }
  }

  .wrapper__credit_info{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .wrapper__credit_info_text{
    order: 1;
  }
  @media(min-width: $x-large-display){
     .wrapper__credit_info{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
    .wrapper__credit_info_text{
    order: -1;
  }

   .h3_title-little{
    margin-bottom: 24px;
      font-size: 22px;
  }
  }

</style>
