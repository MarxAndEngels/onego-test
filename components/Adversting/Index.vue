<template>
    <div class="advesting">
      <div class="container">
        <div class="advesting__content">
              <h1 class="advesting__h2-title">Об автосалоне</h1>
      <div class="advesting-line"></div>
    <div >
      <p>
        Посетив наш автосалон по адресу <span class='mainText'>{{$config.address}}</span> Вы увидите большое количество автомобилей самого широкого спектра классов, начиная от автомобилей «бизнес» и среднего классов, семейные универсалы и минивэны, внедорожников от ведущих мировых производителей, так и автомобилей класса «VIP». Разобраться во всём этом разнообразии автомобилей Вам помогут наши менеджеры, а индивидуальный подход и дружественная атмосфера – мы надеемся, сделают Вашу покупку, ещё более приятной.
      </p>
      <!-- <parallax :text='parallaxText'/> -->
      </div>
    </div>
    </div>
    </div>
</template>
<script>
export default {
     data(){
      return{
        parallaxText: `Посетив наш автосалон по адресу `+this.$config.address +` Вы увидите большое количество автомобилей самого широкого спектра классов, начиная от автомобилей «бизнес» и среднего классов, семейные универсалы и минивэны, внедорожников от ведущих мировых производителей, так и автомобилей класса «VIP». Разобраться во всём этом разнообразии автомобилей Вам помогут наши менеджеры, а индивидуальный подход и дружественная атмосфера – мы надеемся, сделают Вашу покупку, ещё более приятной.`
      }
     }
}
</script>
<style scoped lang="scss">
    .advesting{
        padding: 20px 30px;
        width: 100%;
        height: 100%;
        // background-color: $lightGrey;
    }
    .advesting-line{
      width: 70px;
      height: 4px;
      background-color: $mainColor;
      margin-top: 14px;
      margin-bottom: 22px;
    }
    .advesting__content{
        background-color: $lightGrey;
        border-radius: 20px;
       padding: 20px 30px;
       padding-bottom: 30px;
         display: flex;
        justify-content: center;
           align-items: center;
          flex-direction: column;
    }
    .mainText{
        font-weight: 600;
    }
</style>