<template>
 <div>
  <div class="call_block" @click="$emit('callbackClick')">
    <div class="number"> {{$config.phone}} </div>
    <div class="call_button">Обратный звонок</div>
  </div>

   <car-page-blocks-map />
  </div>
</template>

<script>

</script>

<style scoped lang="scss">

  .number{
    font-size: 20px;
    font-weight: bold;
    color: $mainColor;
    @media screen and (max-width: $xx-large-display){
      font-size: 14px;
    }
  }
  .call_button{
    color: $black;
    cursor: pointer;
    margin-left: 32px;
    @media screen and (max-width: $xx-large-display){
      margin-left: 16px;
    }

    &:hover{
      opacity: .8;
    }
  }
  .call_block{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    @media screen and (max-width:$large-display){
      position: fixed;
      background-image: url("~/static/icons/phone.svg");
      background-size: 50%;
      background-position: center center;
      background-repeat: no-repeat;
      background-color: #fff;
      border-radius: 48px;
      border: 5px solid $mainColor;
      cursor: pointer;
      right: 16px;
      bottom: 48px;
      width: 48px;
      height: 48px;
      z-index: 5;

      div{
        display: none;
      }
    }
  }
</style>
