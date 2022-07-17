<template>
  <div class="container">
    <advantages-buyout/>
    <div class="buyout">
      <forms-main-buyout :page-title="page_title"/>
     </div>
               <steps-credit-small :steps="steps" class="steps" column='true'/>
                            <!-- <parallax-little/> -->
                                      <div class="space-content-lg"></div>
                       <div class="credit_info">
              <div class="text">
                <center>
                 <h3 class="h3_title">
              Об услуге       <svg-icon class="icon-information" name="information" />
           </h3>
           </center> 
          
          
          <div class="wrapper__credit_info">
          <div class="wrapper__credit_info_text">
           <p>Наш автосалон выполнит оценку вашего автомобиля и сделает это быстро и по справедливым и достойным ценам.</p>
   <p>Вы должны лишь предоставить минимальный пакет документов со своим автомобилем. В свою очередь, наши специалисты выполнят все необходимые задачи и оформят Вам договор. Вам даже не придется тратить свое время и нервы. А весь процесс будет как можно результативен и отвественнен.
 </p> 
          </div>

         <div class='wrapper__credit_info_image'>
          <center>
 <!-- <nuxt-img class="wrapper__credit_info_image-buyout" src='img/buyout/buycar.png' format='webp' sizes="lg:300px"/> -->
 <img class="wrapper__credit_info_image-buyout" src='img/buyout/buycar.png'/>
          </center>
           
         </div>
         </div>


                 <!-- Автосалон {{ $config.mark_title }} предалагает выкуп вашего автомобиля с пробегом любой марки с бесплатной оценкой в удобном для вас месте и времени.. Автосалон {{ $config.mark_title }} сотрудничает с самыми надежными банками {{$config.inaddress}}, что позволяет предложить Вам лучшие условия по кредитным программам. Выбирайте автомобиль по вкусу, заполняйте заявку и специалист по автокредитованию перезвонит в ближайшее время. Зачастую единовременная выплата полной суммы за машину сильно бьет по семейному бюджету, потому внесение небольших платежей — оптимальный вариант. -->
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
  .buyout{
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
  .icon-information{
    fill: $mainColor;
       width: 26px;
    height: 26px;
    transform: translate3d(6px,7px,0);
  
  }
  .wrapper__credit_info_image-buyout{
    height: 100%;
    max-height: 140px;
    transform: translate3d(0,20px,0);
    margin-bottom: 20px;
    @media(min-width: $medium-display){
    margin-bottom: 0px;
    }
  }

  .credit_info{
    padding: 24px;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    margin-bottom: 24px;
  }
  p{
    text-indent: 30px;
    margin-top: 14px;
  }

  // .space-content-lg{
  //      margin-bottom: 16px;
  // }
    .text{
    line-height: 1.5;

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


  @media(min-width: $large-display){
   .text{
    padding: 10px 26px;
  }
}
</style>
