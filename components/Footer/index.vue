<template>
  <div class="footer">
    <div class="container">
      <div class="footer_inner">
        <div class="footer_nav">
          <div class="nav_item">
            <div class="nav_item_title">
              АВТОМОБИЛИ
              <div class="line-circle"></div>
            </div>
            <nuxt-link :to="'/'+$config.used_page" class="nav_item_link">C пробегом</nuxt-link>
          </div>
          <div class="nav_item">
            <div class="nav_item_title">
              УСЛУГИ
                   <div class="line-circle"></div>
            </div>
            <nuxt-link :to="'/credit'" class="nav_item_link">Автокредитование</nuxt-link>
            <nuxt-link :to="'/exchange'" class="nav_item_link">Trade-in</nuxt-link>
            <nuxt-link :to="'/buyout'" class="nav_item_link">Выкуп</nuxt-link>
          </div>
          <!-- <div class="nav_item">
            <div class="nav_item_title">
              О КОМПАНИИ
            </div>
            <nuxt-link :to="'/about'" class="nav_item_link">Об автосалоне</nuxt-link>
            <nuxt-link :to="'/contacts'" class="nav_item_link">Контакты</nuxt-link>
          </div> -->
          <div class="nav_item">
            <div class="nav_item_title">
              ПОПУЛЯРНЫЕ МАРКИ
                   <div class="line-circle"></div>
            </div>
            <nuxt-link :to="'/'+$config.used_page+'/skoda'" class="nav_item_link">Skoda</nuxt-link>
            <nuxt-link :to="'/'+$config.used_page+'/ford'" class="nav_item_link">Ford</nuxt-link>
            <nuxt-link :to="'/'+$config.used_page+'/volkswagen'" class="nav_item_link">Volkswagen</nuxt-link>
            <nuxt-link :to="'/'+$config.used_page+'/hyundai'" class="nav_item_link">Hyundai</nuxt-link>
          </div>
          <div class="nav_item">
            <div class="nav_item_title">
              КОНТАКТЫ
                   <div class="line-circle"></div>
            </div>
            <nuxt-link :to="'/'+$config.used_page+'/skoda'" class="nav_item_link">Телефон:{{$config.phone}}</nuxt-link>
            <nuxt-link :to="'/'+$config.used_page+'/ford'" class="nav_item_link">{{$config.address}}</nuxt-link>
          </div>
        </div>
        <div class="footer_legal">
          <div class="footer_legal_item">ИНН 7733375645</div>
          <div class="footer_legal_item">КПП 773301001</div>
          <div class="footer_legal_item">ОГРН 1217700507045</div>
          <div class="footer_legal_item">
            Физический адрес: {{$config.address}}
          </div>
        </div>
        <div class="footer_text">
          Данный Интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса РФ. Для получения подробной информации о наличии и стоимости указанных товаров и (или) услуг, пожалуйста, обращайтесь к менеджерам автосалонов-партнеров.
          Годовая ставка автокредита варьируется от 4.9% до 16,5% и зависит от конкретного банка, суммы займа и кредитной программы. Минимальный срок погашения от 61 дня, максимальный - 84 месяца. При этом любые дополнительные комисси автопорталом
          {{ $config.mark_title }} не взимаются.
          <br/>
          В случае невозвращения в условленный срок суммы автокредита или суммы процентов по автокредиту банк-партнер оставляет за собой право начислить штраф за просрочку платежа в среднем размере 0,1% от первоначальной суммы автокредита. При несоблюдении условий погашения автокредита данные о нарушителе могут быть переданы в специальный реестр должников и коллекторское агентство для взыскания задолженности.
          <br/>
          <br/>
          Кредит предоставляется банком АО «Тинькофф Банк» (Лицензия ЦБ РФ № 2673 от 24.03.2015).
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .footer_legal{
    margin-top: 16px;
    font-weight: 300;
    display: flex;
    font-size: 14px;
    color: $darkGrey;
    flex-wrap: wrap;
    @media screen and (max-width:$small-display){
      margin-bottom: 16px;
    }
  }
  .footer_legal_item{
    padding: 4px 0;
    margin-right: 16px;
    @media screen and (max-width:$small-display){
      margin-right: 8px;
      width: calc(50% - 16px);
    }
  }
  .footer{
    background: $lightGrey;
    border-top: 3px solid $grey;
    padding-top: 24px;
    margin-top: 48px;
    @media screen and (max-width:$large-display){
      margin-top: 32px;
    }
    @media screen and (max-width:$small-display){
      padding-top: 0;
    }
  }
  .footer_inner{
    padding: 24px;
    @media screen and (max-width:$large-display){
      padding: 16px;
    }
  }
  .footer_text{
    font-size: 13px;
    color: $darkGrey;
    font-weight: 300;
    margin-top: 32px;
    @media screen and (max-width:$small-display){
      margin-top: 8px;
    }
  }
  .footer_nav{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    @media screen and (max-width:$small-display){
      display: none;
    }
  }
  .nav_item{

  }
  .nav_item_title{
    font-size: 18px;
    color: $black;
    font-weight: 300;
    margin-bottom: 8px;
    @media screen and (max-width:$large-display){
      font-size: 14px;
    }
  }
  .nav_item_link{
    padding: 6px 0;
    text-decoration: none;
    color: $darkGrey;
    font-weight: 300;
    display: block;
         transition-duration: 0.4s;
    @media screen and (max-width:$large-display){
      font-size: 13px;
      padding: 3px 0;
    }
    &:hover{
            color: $black;
      transform: translate3d(4px,0,0);
    }
  }
  .line-circle{
    width: 40px;
    margin-top: 6px;
    display: block;
	height: 0;
	border: none;
	border-top: 2px dotted $mainColor;
  }
</style>
