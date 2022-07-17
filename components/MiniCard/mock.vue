<template>
  <div class="card_mock"></div>
</template>

<script>

</script>

<style scoped lang="scss">

  .card_mock{
    max-width: 280px;
    width: 280px;
    min-width: 280px;
    background: #fff;
    height: 417px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
    overflow: hidden;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    @media screen and (max-width:$large-display){
      max-width: 260px;
      width: 260px;
      min-width: 260px;
    }
    @media screen and (max-width:$small-display){
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    }
  }
</style>
