<template>
  <div class="card" v-if="data">
      <div class="info__head">
      <div class="name">{{ data.name }}</div>
    </div>
    <client-only>
      <mini-card-slider :images="data.images"/>
      <nuxt-link class="mark_icon_wrapper" :to="'/'+this.$config.used_page+'/'+data.mark.slug">
        <svg-icon class="mark_icon" :name="'emblems/'+data.mark.slug+'-logo'" />
      </nuxt-link>
    </client-only>
    <div class="info__head">
      <!-- <div class="name">{{ data.name }}</div> -->
      <div class="price">
        <div class="price__actual">{{ data.price | toCurrency }}</div>
	      <div class="price__old" v-if="data.price === data.price_old">
		      {{data.price | old_price_generation | toCurrency}}*
	      </div>
	      <div class="price__old" v-else>
		      {{data.price_old | toCurrency}}*
	      </div>
      </div>
	    <div class="price__credit" v-if="!credit">
		    <span class="red">{{ data.price | access_acredit }}</span> без первого взноса
	    </div>
    </div>
    <div class="info__body">
      <div class="item">{{ data.run | run }} км</div>
      <div class="item">{{ data.engine_volume | engineVolume }} / {{ data.engine_power }} л.с.</div>
      <div class="item">{{ data.gearbox.title}}</div>
      <div class="item">{{ data.owner.title}}</div>
      <div class="item">{{ data.engineType.title }}</div>
      <div class="item">VIN проверен</div>
    </div>
    <div class="info__footer" v-if="!credit">
      <div class="button" @click.prevent="$emit('creditClick', data)">
        Купить в кредит
      </div>
      <div class="button opacity">
        Подробнее
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
      default:() => {}
    },
    credit: {
      type: Boolean,
      default:false
    },
  },
}
</script>

<style scoped lang="scss">
  .card{
    width: 100%;
    background: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;
    overflow: hidden;
    box-shadow: 0 1px 45px -12px rgb(0 0 0 / 40%);
    position: relative;
  }
  .mark_icon_wrapper{
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 16px;
    transition: .24s;
    .mark_icon{
      transition: .24s;
      width: 50%;
      height: 50%;
    }
    &:hover{
      transform: scale(1.1);
      .mark_icon{
        transform: scale(1.2);
      }
    }
  }

  .info__footer{
    display: flex;
    padding: 16px 8px;
    justify-content: space-between;
    flex-direction: column;
  }
  .price__credit{
    width: 100%;
	  margin-bottom: 8px;
    font-size: 10px;
    text-align: left;
    @media screen and (max-width:$small-display){
      font-size: 12px;
    }
    span{
      color: $mainColor;
      font-weight: bold;
    }
  }
  .button{
    justify-content: center;
    font-size: 12px;
    height: 42px;
    width: 100%;
    padding: 0;
    margin-bottom: 10px;
    &:last-child{
      margin-right: 4px;
    }
    @media screen and (max-width:$xx-large-display){
      height: 34px;
    }
    @media screen and (max-width:$small-display){
      font-size: 16px;
      height: 42px;
    }
  }
  .info__body{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: $grey;
    padding: 8px 0;
    .item{
      width: 33%;
      font-size: 10px;
      text-align: center;
      padding: 6px;
      
      @media screen and (max-width: $xx-large-display){
        font-size: 9px;
      }
      @media screen and (max-width:$small-display){
        font-size: 12px;
      }
      &:nth-child(2n){
        background: snow;
      }
    }
  }
  .info__head{
    padding: 8px 16px 0;
    @media screen and (max-width:$small-display){
      padding: 8px 8px 0;
    }
  }
  .name{
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px 0;
    transform: translate3d(0,-3px,0);
  }
  .price{
    padding: 8px 0;
    display: flex;
    align-items: center;
    font-size: 20px;
  }
  .price__old{
    position: relative;
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
  .price__actual{
    margin-right: 16px;
    color: $mainColor;
    font-weight: bold;
    @media screen and (max-width: $xx-large-display){
      margin-right: 10px;
      font-size: 18px;
    }
  }
</style>
