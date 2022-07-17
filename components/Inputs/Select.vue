<template>
  <div class="select" :class="{disabled:disabled}" >
    <div class="select_placeholder" @click="isOpen = !isOpen">
      <div class="selected_data" v-if="selected">
        {{selected}}
      </div>
      <div class="placeholder" v-else>
        {{title}}
      </div>
      <div class="rec_icon" :class="{selected: isOpen}"></div>
    </div>
    <div class="select_options" v-if="isOpen">
      <div class="no-data" v-if="!items">
        нет данных
      </div>
      <div
        v-if="isRange"
        class="select_option"
        @click="onSelect(item)"
        v-for="item in itemsRange">
        <span>{{item}}</span>
      </div>
      <div
        v-else
        class="select_option"
        :class="{hasCount:hasCount}"
        @click="onSelect(item)"
        v-for="(item, index) in items" :key="index">
        <span>{{item.title || item.name || item}}</span>
        <span class="count" v-if="hasCount">({{item.offers_count}})</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isOpen: false,
      selected: null,
    }
  },
  // watch:{
  //   items(){
  //     this.selected = this.title
  //   },
  //   selectedData(){
  //     this.onSelect(this.selectedData)
  //   }
  // },
  computed:{
    itemsRange(){
      let start = this.items[0]
      let end = this.items[this.items.length - 1]
      let options = []
      while(end >= start){
        options.push(end)
        end--
      }
      return options
    }
  },
  props: {
    hasCount:{
      type: Boolean,
      default: false
    },
    isRange:{
      type: Boolean,
      default: false
    },

    currentData:{
      type: Object,
      default:()=> {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default:()=> []
    },
    title: {
      type: String,
      default: ''
    },
  },
  methods:{
    onSelect(item){
      this.isOpen = false
      this.selected = item.title || item.name || item
      this.$emit('selected', item)
    }
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
    .rec_icon{
      opacity: 0;
    }
  }
}
.select_placeholder{
  width: 100%;
  height: 48px;
  border: none;
  display: flex;
  padding: 0 16px;
  // border-radius: 5px;
  align-items: center;
  background: white;
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
   z-index: 2;
  .selected_data{
    color: #000;
    width: calc(100% - 8px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.select_options{
  max-height: 240px;
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
  .select_option{
    cursor: pointer;
    padding: 8px 32px 8px 24px;
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
  .no-data{
    margin: 24px auto;
    width: 100%;
    font-size: 24px;
    text-align: center;
  }
}
.rec_icon{
  position: absolute;
  top: 20px;
  height: 0;
  right: 8px;
  width: 0;
  border: 4px solid transparent; border-top: 5px solid $mainColor;
  &.selected{
    transform: rotate(-180deg);
    top: 13px;
  }
}
</style>
