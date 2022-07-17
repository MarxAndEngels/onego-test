<template>
  <div class="checkbox_wrap">
    <label class="checkbox_label">
      <input class="checkbox" v-model="checked" type="checkbox" required>
      <span class="custom"></span>
      <span class="text" v-html="title"></span>
    </label>
  </div>
</template>

<script>
export default {
  data(){
    return{
      checked:true
    }
  },
  computed: {
    items(){
      return this.max/this.step
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    privacy:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    // goPrivacy(){
    //   if(this.privacy){
    //     this.$router.push('/privacy')
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>

.checkbox_wrap{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
}
.checkbox{
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
  visibility: hidden;
}
.custom{
  min-width: 16px;
  width: 16px;
  height: 16px;
  display: block;
  background: $mainColor;
  // border: 0px solid $lightGrey;
  transition: .32s;
  position: relative;
  margin-right: 8px;
  border-radius: 3px;
  transform: translate3d(0px,-2px,0);
  &:after{
    content: "";
    display: block;
    margin-right: 3px;
    position: absolute;
    transition: all 0.32s;
    width: 8px;
    height: 4px;
    transform: rotate(-55deg);
    border-bottom: 2px solid $white;
    border-left: 2px solid $white;
    top: 4px;
    left: 3px;
    opacity: 0;
  }
}
.text{
  ::v-deep a{
    color: #000;
  }
}
.checkbox_label{
  cursor: pointer;
  display: flex;
  align-items: center;
}
.checkbox:checked + .custom{
  &:after{
    opacity: 1;
  }
}

</style>
