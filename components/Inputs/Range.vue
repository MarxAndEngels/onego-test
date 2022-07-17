<template>
  <div class="range">
    <div class="range_title" v-if="title">
      <span>{{ title }}</span>
    </div>
    <div class="progressed_line" :style="{width: progress + '%'}"></div>
    <input @input="$emit('rangeInput')" type="range" v-model="val" :min="min" :max="max" :step="step">
    <div class="range_dimension">
      <div class="range_dimension_item" v-for="item in dimension">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      val: this.value
    }
  },

  computed: {
    progress(){
      return Number(this.val)*100 / this.max
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ''
    },
    max:{
      type: Number,
      default: 1
    },
    step:{
      type: Number,
      default: 1
    },
    dimension:{
      type: Array,
      default:()=> []
    },
    min:{
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped lang="scss">

.range{
  margin-top: 16px;
  width: 100%;
  position: relative;
  input{
    margin-top: 8px;
    width: 100%;
  }
}
.progressed_line{
  position: absolute;
  height: 6px;
  bottom: 16px;
  border-radius: 5px;
  left: 1px;
  background: $mainColor;
  z-index: 0;
  width: 50%;
  pointer-events: none;
}
.range_title{
  color: #8f8f8f;
  font-weight: 300;
  margin-bottom: 8px;
}
.range_dimension{
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
}
.range_dimension_item{
  width: 1px;
  border-right: 1px dashed #e1e4e9;
  height: 6px;
  margin-top: 6px;
  position: relative;
  span{
    position: absolute;
    font-size: 10px;
    white-space: nowrap;
    color: #8f8f8f;
    top: 6px;
    left: -50%;
    transform: translateX(-50%);
    @media screen and (max-width: 768px) {
      font-size: 9px;
    }
  }
}
input[type=range]  {
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  height: 7px;
}

input[type=range]::-webkit-slider-runnable-track {
  height: 7px;
  background-color: #fff;
  border: 1px solid $mainColor;
  border-radius: 5px;
}

input[type=range]::-webkit-slider-thumb {
  background: $mainColor;
  cursor: pointer;
  width: 24px;
  height: 24px;
  -webkit-appearance: none;
  border-radius: 15px;
  margin-top: -10px;
  transition: .24s;
  &:hover{
    transform: scale(1.1);
  }
}

</style>
