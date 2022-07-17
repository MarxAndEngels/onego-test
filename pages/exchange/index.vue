<template>
  <div class="container">
    <advantages-traid-in/>
    <div class="tradein">
          <forms-main-tradein  :page-title="page_title"/>
     </div>
      <steps-credit-small :steps="steps" class="steps" column='true'/>


              <div class="space-content-lg"></div>
             <!-- <parallax-little/> -->
                         <div class="credit_info">
              <div class="text">
               <center>   <h3 class="h3_title">
             Об услуге <svg-icon class="icon-information" name="information" />
           </h3></center> 



  <div class="wrapper__credit_info">
          <div class="wrapper__credit_info_text">
          <p>
              Автосалон {{ $config.mark_title }} предостаставляет вам отличную услугу, которая уже давно показала свою значимость, уровень, удобство и популярность — Trade-In. 
           
           Вы можете продать свою старую машину с огромной выгодой
            <!-- до {{ $config.discount }}, -->
             и купить автомобиль с пробегом из множества качественных машин, существующих у нас.

Также вы можете протестировать понравившийся автомобиль благодаря бесплатному тест-драйву в нашем автосалоне.
          </p>

  </div>

         <div class='wrapper__credit_info_image'>
          <center>
             <img class="wrapper__credit_info_image-buyout" src='img/exchange/traid-single.png' />
          </center>
          
            </div>
         </div>


           <div class="wrapper__credit_info">
         <div class="credit_info__list pr-0">
          <div>        <h2> Необходимые документы</h2>

                <ul class="credit_info__list-ul">
                  <li>
                   ПТС и паспорт гражданина Российской Федерации
                  </li>
                  <li>
                   Cвидетельство о регистрации ТС
                  </li>
                  <li>
                   Генеральная доверенность, если вы не собственик
                  </li>
                  <li>
                 Все комплекты ключей
                  </li>
                </ul>
         </div>
         </div>
         
         <div>
               <img src="/img/exchange/traid-in.webp" class='credit_info_image-trade-in'>
           </div>

             </div>
             </div>
            </div>
               <div class="space-content-lg"></div>
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
        
          open:false,
        },
        {
          title:'Заполните заявку',

          open:false,
        },
        {
          title:'С вами свяжется менеджер',
       
          open:false,
        },
        {
          title:'Езжайте на оформление',

          open:false,
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .tradein{
    padding: 24px;
    margin: 32px 0;
    border-radius: 10px;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    @media screen and (max-width:$small-display){
      padding: 16px;
      margin: 24px 0;
    }
  }

    .h3_title{
    margin-bottom: 10px;
    font-size: 22px;
  }

  .credit_info{
    padding: 24px;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    margin-bottom: 24px;
  }
  .text{
    line-height: 1.5;
  }

    .icon-information{
    fill: $mainColor;
       width: 26px;
    height: 26px;
    transform: translate3d(6px,7px,0);
  
  }
  .wrapper__credit_info{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  @media(min-width: $large-display){
     .wrapper__credit_info{
    display: flex;
    justify-content: space-between;
     flex-direction: row;
     padding: 0 30px;
  }
  }

  .credit_info_image-trade-in{
    margin-top: 20px;
    width: 100%;
    height: 100%;
    max-width: 540px;
    border-radius: 30px;
    max-height: 360px;
     border: 1px solid #ddd;
  border-radius: 20px;
    padding: 5px;
  }
  .credit_info__list{
    padding: 20px;
    padding-left: 30px;
    display: flex;
    align-items: center;
  }
  .credit_info__list-ul{
    margin-top: 14px;
    padding-left: 40px;
    font-size: 18px;
  }

  .credit_info__list-ul {
  // list-style: none; /* Remove default bullets */
  list-style-type:decimal;

}

p{
  padding: 0px;
      text-indent: 30px;
}

@media(min-width: $large-display){
p{
  padding: 12px 20px;
      text-indent: 30px;
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
  }
</style>
