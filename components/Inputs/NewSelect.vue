<template>
  <div class="select" :class="{open:isOpen, disabled:disabled}" @mouseleave="isOpen = false">
   <div class="select_data" @click="isOpen = !isOpen">
     <div class="select_data_title">
       {{selectTitle}}
     </div>
     <div class="select_rec"></div>
   </div>
   <div v-if="isRange" class="select_options_wrapper">
      <div class="select_options">
        <div class="select_option"
             v-for="(item, index) in rangeItems"
             :key="index"
             @click="onSelect(item)">
          <span class="select_option_name">{{optionName(item)}}</span>
        </div>
      </div>
   </div>
   <div v-else class="select_options_wrapper">
      <div v-if="items.length" class="select_options">
        <div class="select_option"
             v-for="(item, index) in items"
             :key="index"
             @click="onSelect(item)">
          <span class="select_option_name">{{optionName(item)}}</span>
          <span v-if="hasCount" class="select_option_count">{{optionCount(item)}}</span>
        </div>
      </div>
      <div v-else class="select_nodata">
        НЕТ ДАННЫХ
      </div>
   </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isOpen:false
    }
  },
  props:{
    title:{
      type:String,
      default: ''
    },
    items:{
      type: Array,
      default: ()=> []
    },
    currentData:{
      type: Object,
      default: ()=> {}
    },
    hasCount:{
      type: Boolean,
      default: false
    },
    isRange:{
      type: Boolean,
      default: false
    },
    disabled:{
      type: Boolean,
      default: false
    },
  },
  computed:{
    selectTitle(){
      return this.currentData ? this.currentData.title : this.title
    },
    rangeItems(){
      let start = this.items[0]
      let end = this.items[this.items.length - 1]
      let options = []
      while(end >= start){
        options.push(end)
        end--
      }
      return options
    },
  },
  methods:{
    onSelect(item){
      this.isOpen = false
      this.$emit('selected', item)
    },
    optionName(item){
      return item.title || item.name || item
    },
    optionCount(item){
      return item.offers_count
    },
  }
}
</script>

<style scoped lang="scss">
.select{
  position: relative;
  width: 100%;
  border-radius: 5px;
  &.disabled{
    pointer-events: none;
    opacity: .64;
    .select_rec{
      opacity: 0;
    }
  }
  &.open{
    .select_options_wrapper{
      display: block;
    }
    .select_rec{
      transform: rotate(-180deg);
      top: 13px;
    }
    .select_data{
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.select_options_wrapper{
  display: none;
  max-height: 172px;
  position: absolute;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  // font-family: Helvetica;
  background: #fff;
  font-weight: 300;
  color: #757575;
  z-index:2;
  top: 48px;
  box-shadow: 0 8px 8px rgba(0,0,0,.16);
  border-bottom: 1px solid $lightGrey;
  border-right: 1px solid $lightGrey;
  border-left:1px solid $lightGrey;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
    border-radius: 0px 0px 14px 14px;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: $lightGrey;
  }
  &::-webkit-scrollbar-thumb {
    background: $mainColor;
    border-radius: 2px;
  }
}
.select_option{
  cursor: pointer;
  padding: 8px 32px 8px 16px;
  z-index: 11111;
  @media screen and (max-width:$small-display){
    padding: 8px 32px 8px 16px;
  }
  &.hasCount{
    display: flex;
    align-items: center;
    .count{
      margin-left: 8px;
      font-size: 12px;
      color: $mainColor;
    }
  }
  &:hover{
    background: $lightGrey;
    color: $mainColor;
  }
}
.select_nodata{
  margin: 24px auto;
  width: 100%;
  font-size: 16px;
  text-align: center;
}
.select_data{
  width: 100%;
  height: 48px;
  border: none;
  display: flex;
  padding: 0 16px;
  // border-radius: 5px;
  align-items: center;
  background: $white;
  position: relative;
  transition: 0.3s;
  font-weight: 300;
  // font-family: Helvetica;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  color: #757575;
  position: relative;
   border-bottom: 3px solid $mainColor;
}

.select_rec{
  position: absolute;
  top: 20px;
  height: 0;
  right: 8px;
  width: 0;
  border: 4px solid transparent; border-top: 5px solid $mainColor;
}
</style>
