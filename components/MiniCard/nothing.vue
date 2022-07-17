<template>
    <div class="car_item nothing">
              <div class="car_item_noting-text">Автомобиль еще не выбран!</div>
              <div class="car_item_line">
                <img class="car_item_image nothing" src="img/exchange/car-nothing.png" alt="image">
                <div class="car_item_info">
                  <div>
                    Название...
                  </div>
                  <div class="car_item_info_line">
                    <div class="car_item_info_line_item">
                      Описание...
                    </div>
                    <div class="car_item_info_line_item">
                      
                    </div>
                  </div>
                  <div class="car_item_info_price">
                    Цена...
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
     .cars_list{
    max-height: 240px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 8px;
    &::-webkit-scrollbar {
      width: 4px;
      background-color: $grey; /* or add it to the track */
    }
    &::-webkit-scrollbar-thumb {
      background: $mainColor;
      border-radius: 2px;
    }
  }
  .car_item{
    padding: 16px 0;
    cursor: pointer;
    border-bottom: 2px solid $grey;
    &:hover{
      .car_item_info_name{
        font-weight: bold;
        font-size: 14px;
        color: $mainColor;
      }
    }
     &.nothing{
    cursor: auto;
    overflow: hidden;
  }
  }
.car_item_image.nothing{
  max-width: 200px;
  padding: 16px;
}
.car_item_noting-text{
  color: $mainColor;
  margin-top: 0px;
  margin-bottom: 20px;
}

.car_item_noting-text{
  color: $mainColor;
  margin-top: 0px;
  margin-bottom: 20px;
}

  .send_button{
    width: 100%;
    margin: 24px 0 0;
  }
  .car_item_info_name{
    font-weight: bold;
    font-size: 14px;
  }
  .car_item_line{
    display: flex;
    align-items: flex-start;
  }
  .car_item_image{
    max-width: 160px;
    aspect-ratio: 16/10;
    -o-object-fit: cover;
    object-fit: cover;
    background: $grey;
    margin-right: 16px;
  }
  .car_item_info_line{
    display: flex;
    margin-top: 8px;
  }
  .car_item_info_line_item{
    font-size: 14px;
    margin-right: 8px;
    font-weight: 300;
    color: $darkGrey;
    @media screen and (max-width:$x-large-display){
      font-size: 12px;
      margin-right: 6px;
    }
  }
  .car_item_info_price{
    margin-top: 16px;
    font-size: 18px;
    font-weight: bold;
    color: $mainColor;
  }
  .current_car{
    height: 48px;
    border-radius: 5px;
    background: $lightGrey;
    display: flex;
    align-items: center;
    padding: 0 16px;
    font-weight: 300;
    cursor: pointer;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      top: 20px;
      height: 0;
      right: 8px;
      width: 0;
      border: 4px solid transparent; border-top: 5px solid $mainColor;
    }
  }
  .conditions_info{
    margin-top: 32px;
  }
  .conditions_info_line{
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    font-size: 14px;
    color: $darkGrey;
  }
  .conditions_info_line_item{
    &.price{
      color: $mainColor;
    }
  }
  .conditions_info_line_dots{
    flex: 1;
    margin: 0 8px;
    position: relative;
    top: -2px;
    border-bottom: 1px dotted $darkGrey;
  }
  .button{
        position: relative; 
    overflow-x: hidden; 
  }
</style>