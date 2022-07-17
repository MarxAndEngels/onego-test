<template>
  <div class="cars">
    <mini-card-mock class="card_wrapper"/>
    <mini-card-mock class="card_wrapper"/>
    <mini-card-mock class="card_wrapper"/>
    <mini-card-mock class="card_wrapper"/>
  </div>
</template>

<script>
export default {
  props:{
    cars: {
      type: Array,
      default: () => []
    },
  }
}
</script>

<style scoped lang="scss">

.cars{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
}
.card_wrapper{
  text-decoration: none;
  color: $black;
  width: calc(25% - 24px);
  margin: 12px;
}
</style>
