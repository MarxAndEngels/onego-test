<template>
 <div class="wrapper">
   <Header/>
   <CallBack/>
   <Nuxt />
   <Footer/>
 </div>
</template>
<script>
import regions from '~/apollo/queries/regions'
import usedMarks from '~/apollo/queries/usedMarks'
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      locations:'regions/locations'
    })
  },
  mounted() {
    this.getUrlParams()
    this.clearLocalStorage()

    let ym_script = document.createElement("script");
    ym_script.innerHTML = `
         _tmr.push({id: "3249275", type: "pageView", start: (new Date()).getTime(), pid: "USER_ID"});
            (function (d, w, id) {
              if (d.getElementById(id)) return;
              var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
              ts.src = "https://top-fwz1.mail.ru/js/code.js";
              var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
              if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
            })(document, window, "topmailru-code");


        (function(m, e, t, r, i, k, a) {
                m[i] = m[i] || function() {
                    (m[i].a = m[i].a || []).push(arguments)
                };
                m[i].l = 1 * new Date();
                k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${this.$config.ym}, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ecommerce: "dataLayer"
            });
        `;
    document.body.appendChild(ym_script);
  },
  methods:{
    ...mapMutations({
      setLocations:'regions/setLocations',
      setMarks:'regions/setMarks'
    }),
    async getLocations(){
      await this.$apollo.query({
        query : regions,
        variables: {
          site_id: this.$config.site_id_used
        }
      })
        .then(({ data }) => {
          this.$store.commit('setLocations',data.regions)
        })
    },
    async getMarks(){
      await this.$apollo.query({
        query : usedMarks,
        variables: {
          site_id: this.$config.site_id_used
        }
      })
        .then(({ data }) => {
          this.$store.commit('setMarks',data.marks)
        })
    },


    getUrlParams(){
      if(this.$route.query){
        for (let param in this.$route.query) {
          if(
               param === 'utm_source'
            || param === 'utm_medium'
            || param === 'utm_term'
            || param === 'utm_content'
            || param === 'utm_campaign'){
            localStorage.setItem(param, this.$route.query[param])
          }
        }
      }
    },
    clearLocalStorage(){
      localStorage.removeItem('modificationTop');
      localStorage.removeItem('firstCome');
      localStorage.removeItem('modificationLeft');
    },
  },
  created() {
   this.getLocations();
   this.getMarks();
  },
}
</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    // font-family: Helvetica;
  }
  .hide_title{
    position: absolute;
    z-index: -1;
  }
  .wrapper{
    padding-top: 121px;
    @media screen and (max-width:$large-display){
      padding-top: 67px;
    }
  }
  .container{
    width: $xx-large;
    margin: 0 auto;
    @media screen and (max-width: $xx-large-display){
      width: $large;
    }
    @media screen and (max-width:$large-display){
      width: $small;
    }
    @media screen and (max-width:$small-display){
      width: $extra-small;
      padding: 0 8px;
    }
  }
  .content{
    width: 100%;
    padding: 16px;
    color: $black;
    line-height: 140%;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
  }
  .h2_title{
    .upper{
      text-transform: uppercase;
    }
    @media screen and (max-width:$large-display){
      font-size: 18px;
    }
  }
  .slider_nav_arrow{
    position: absolute;
    // z-index: 5;
    width: 32px;
    height: 32px;
    background: $mainColor;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    transition: .24s;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    @media screen and (max-width:$small-display){
      &.main{
        top: 80%;
      }
    }
    &:after{
      content: '';
      position: relative;
      width: 16%;
      height: 16%;
      border-left: 2px solid #fff;
      border-bottom: 2px solid #fff;
    }
    &.next{
      right: 8px;
      &:after{
        transform: rotate(-135deg);
      }
    }
    &.prev{
      &:after{
        transform: rotate(45deg);
      }
      left: 8px;
    }
    &:hover{
      background: $mainColorHover;
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    list-style: none;
    padding-bottom: 24px;
    margin-top: 32px;
    li{
      border: none;
      padding: 0 4px;
      margin: 0 4px;
      border-radius: 5px;
      color: $mainColor;
      &:first-child{
        border-radius: 5px;
        background: $lightGrey;
      }
      &:last-child{
        border-radius: 5px;
        background: $lightGrey;
      }
      &.disabled{
        display: none;
      }
      &.active{
        background: $mainColor;
        color: #fff;
      }
      &:hover{
        background-color: transparentize( $mainColor, 0.8 );
        color: #fff;
      }
    }
    li a{
      padding: 4px 8px;
      display: block;
      cursor: pointer;
    }
  }
</style>
