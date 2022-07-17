<template>
  <div>
    <div class="buttons_wrapper">
	    <div class="prise_line">
		    <div class="price_new">
			    {{data.price | toCurrency}}*
		    </div>
		    <div class="price__old" v-if="data.price === data.price_old">
			    {{data.price | old_price_generation | toCurrency}}*
		    </div>
		    <div class="price__old" v-else>
			    {{data.price_old | toCurrency}}*
		    </div>
		    <div class="price_credit">
			    От {{data.price | access_acredit}} / мес
		    </div>
	    </div>
      <div class="buttons_wrapper_head">
        <div class="buttons">
          <div class="button" @click="$emit('creditClick')">Купить</div>
          <div class="button opacity" @click="$emit('tradeInClick')"> Trade-in</div>
          <div class="button green long" @click="$emit('testDriveClick')">Заявка на тест-драйв</div>
        </div>
      </div>
      <div class="bottom_alert">
        *Цена актуальна при покупке в кредит
      </div>
    </div>
  </div>
</template>

<script>
  import filters from "~/mixins/filters";
  export default {
    mixins: [filters],
    props: {
      data: {
        type: Object,
        default:()=>{}
      }
    },
    mounted() {
      console.log(this.data)
    },
  }
</script>

<style scoped lang="scss">

  .buttons_wrapper_head{
    border-bottom: 1px solid $lightGrey;
  }
  .prise_line{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  margin-bottom: 16px;
    @media screen and (max-width:$small-display){
      display: flex;
      width: 100%;
      margin-bottom: 8px;
    }
  }
  .buttons{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (max-width:$small-display){
      margin: 8px 0;
      justify-content: space-between;
    }
    .button{
      width: calc(50% - 4px);
      display: flex;
      align-items: center;
      justify-content: center;
      background: $mainColor;
      cursor: pointer;
      transition: .24s;
      font-size: 13px;
      color: #fff;
      padding: 0 8px;
      &.long{
        width: 100%;
        margin-top: 8px;
      }
      &.green{
        background: $green;
        &:hover{
          background: $greenHover;
        }
      }
      @media screen and (max-width:$small-display){
        padding: 0 8px;
        font-size: 13px;
      }
      &:hover{
        background: $mainColorHover;
      }
      &.opacity{
        background: none;
        border: 2px solid $mainColor;
        color: $mainColor;
        margin-left: 8px;
         transition: all 0.5s ease-in-out;
        @media screen and (max-width:$small-display){
          margin-left: 4px;
        }
         &:hover{
      color: $white;
      background: $mainColor;
      
    }
      }
    }
  }
  .buttons_wrapper_head{
    display: flex;
    align-items: flex-start;
    padding-bottom: 8px;
    @media screen and (max-width:$small-display){
      flex-direction: column;
    }
  }
  .price_new{
    font-weight: bold;
    font-size: 20px;
    color: $mainColor;
    @media screen and (max-width:$small-display){
      font-size: 18px;
    }
  }
  .price__old{
	  font-size: 20px;
	  position: relative;
	  @media screen and (max-width:$small-display){
		  font-size: 18px;
	  }
	  &:after{
		  content: '';
		  position: absolute;
		  top: 50%;
		  left: -3px;
		  height: 2px;
		  width: calc(100% + 6px);
		  background: $mainColor;
	  }
  }
  .price_credit{
    font-size: 14px;
    color: $darkGrey;
    @media screen and (max-width:$small-display){
      font-size: 12px;
      margin-top: 0;
    }
  }
  .bottom_alert{
    color: $error;
    font-size: 12px;
    margin-top: 8px;
    @media screen and (max-width:$small-display){
      text-align: center;
    }
  }
</style>
