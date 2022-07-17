<template>
  <div class="container">
    <div class="contacts_block">
            <h1 class="h2-title"> {{ page_title }}</h1>
      <div class="content">
        <div class="map_line">
          <div class="map">
          <!-- <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Москва</a><a href="https://yandex.ru/maps/213/moscow/house/ulitsa_vasiliya_petushkova_3/Z04YcgdiTEcCQFtvfXRycntkbQ==/?ll=37.402525%2C55.833779&utm_medium=mapframe&utm_source=maps&z=17.08" style="color:#eee;font-size:12px;position:absolute;top:14px;">Улица Василия Петушкова, 3 — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/-/CCUNaHQ8DB" width="560" height="360" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div> -->
        
         <div style="position:relative;overflow:hidden; width: 100%;"><a href="https://yandex.ru/maps/org/uaz_onego/224448036478/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">УАЗ Онего</a><a href="https://yandex.ru/maps/18/petrozavodsk/category/car_dealership/184105322/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Автосалон в Петрозаводске</a><iframe src="https://yandex.ru/map-widget/v1/-/CCUNb2EA3A" width="560" height="360" frameborder="0" allowfullscreen="true" style="position:relative;width: 560px;"></iframe></div>
         
         </div>
          <div class="contacts">
            <div class="contacts_info">
              <div class="contacts_item">
                <svg-icon name="time" />
                <div class="schedule">{{$config.work_shedule}}</div>
              </div>
              <a :href="'tel:' + $config.phone">
              <div class="contacts_item">
                <svg-icon name="phone" />
                <div class="number">{{$config.phone}}</div>
              </div>
              </a>
              <div class="contacts_item">
                <svg-icon name="map" />
<!--                <canvas ref="address" width="800px" height="60px" class="address" ></canvas>-->
                {{$config.address}}
              </div>
            </div>
            <div class="contacts_form">
              <div class="form_title">
                Обратная связь
              </div>
              <forms-callback/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import seoTags from "~/mixins/seoTags";
export default {
    mixins: [seoTags]
}
</script>

<style scoped lang="scss">
.h2-title{
  margin: 32px 0 16px;
}
.contacts_info a{
  text-decoration: none;
  color:#1e1e1e;
}

.contacts{
  width: 100%;
  margin-left: 24px;
  margin-top: 20px;
  .address{
    height: 16px;
    width: auto;
  }
  @media screen and (max-width:$large-display){
    margin-left: 0;
  }
}
.contacts_block{
  min-height: calc(100vh - 300px);
}
.form_title{
  font-size: 24px;
  margin: 24px 0 8px;
}
.map_line{
  display: flex;
  @media screen and (max-width:$large-display){
    flex-direction: column;
  }
}
.map{
  display: block;
  width: 50%;
  margin-bottom: 16px;
  @media screen and (max-width:$large-display){
    width: 100%;
  }
}

.contacts_item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
  padding-bottom: 8px;
  // border-bottom: 1px solid $lightGrey;
  svg{
    width: 32px;
    height: 32px;
    padding: 4px;
    background: $mainColor;
    border-radius: 30px;
    fill:#fff;
    margin-right: 8px;
    @media screen and (max-width:$x-large-display){
      width: 24px;
      height: 24px;
    }
  }
}
</style>
