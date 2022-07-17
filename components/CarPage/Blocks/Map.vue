<template>
  <div class="map_wrapper">
    <div class="map_block">
      <div class="map_block_title">
        Автомобиль в наличии в автосалоне
      </div>
      <div class="map_block_address">
<!--        <img src="~/static/address.png" alt="">-->
      </div>
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
      
        <div class="map">
          <div style="position:relative;overflow:hidden; width: 100%;"><a href="https://yandex.ru/maps/org/uaz_onego/224448036478/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">УАЗ Онего</a><a href="https://yandex.ru/maps/18/petrozavodsk/category/car_dealership/184105322/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:14px;">Автосалон в Петрозаводске</a><iframe src="https://yandex.ru/map-widget/v1/-/CCUNb2EA3A" width="560" height="360" frameborder="0" allowfullscreen="true" style="position:relative;width: 100%; height:260px"></iframe></div>
          <!-- <div style="position:relative;overflow:hidden;"><a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;">Москва</a><a href="https://yandex.ru/maps/213/moscow/house/ulitsa_vasiliya_petushkova_3/Z04YcgdiTEcCQFtvfXRycntkbQ==/?ll=37.402525%2C55.833779&utm_medium=mapframe&utm_source=maps&z=17.08" style="color:#eee;font-size:12px;position:absolute;top:14px;">Улица Василия Петушкова, 3 — Яндекс Карты</a><iframe src="https://yandex.ru/map-widget/v1/-/CCUNaHQ8DB" width="100%" height="260px" frameborder="1" allowfullscreen="true" style="position:relative;"></iframe></div> -->
          </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.map_block{
  padding: 0px 7px;
}
.map_block_title{
  font-size: 22px;
  margin-bottom: 24px;
  margin-left: 20px;
  position: relative;
  &::after{
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background-color: rgb(75, 226, 75);
    position: absolute;
    left: -22px;
    top:8px;
    border-radius: 50%;
    
  }
  @media screen and (max-width: 980px) {
    margin-bottom: 16px;
  }
}
.map_img{
  width: 100%;
}
.time{
  padding-bottom: 16px;
  font-size: 14px;
}
.map_block_address{
  font-size: 16px;
  margin-bottom: 8px;
  margin-left: -4px;
  img{
    height: 18px;
  }
  @media screen and (max-width: 980px) {
    margin-bottom: 16px;
  }
}

.h2-title{
  margin: 32px 0 16px;
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
  width: 100%;
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
    width: 16px;
    height: 16px;
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
.contacts_info a{
  text-decoration: none;
  color:#1e1e1e;
}
</style>
