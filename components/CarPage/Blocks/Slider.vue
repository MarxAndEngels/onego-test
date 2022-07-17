<template>
  <div class="slider">
    <div id="mainCarousel" class="carousel w-10/12 max-w-5xl mx-auto">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="carousel__slide"
        :data-src="image.medium"
        data-fancybox="gallery"
      >
        <img :src="image.src" class='mainCarousel__image'/>
      </div>
    </div>
    <div id="thumbCarousel" class="carousel max-w-xl mx-auto">
      <div class="carousel__slide"
           v-for="(image, index) in images"
           :key="index">
        <img class="panzoom__content"
             :src="image.tiny" />
      </div>
    </div>
  </div>

</template>

<script>
import { Carousel }  from "@fancyapps/ui";

export default {
  props: {
    images: {
      type: Array,
      default:()=>[]
    }
  },
  mounted() {
    // Initialise Carousel
    const mainCarousel = new Carousel(document.querySelector("#mainCarousel"), {
      Dots: false,
    });

// Thumbnails
    const thumbCarousel = new Carousel(document.querySelector("#thumbCarousel"), {
      Sync: {
        target: mainCarousel,
        friction: 0,
      },
      Dots: false,
      Navigation: false,
      center: true,
      slidesPerPage: 1,
      infinite: false,
    });
  }
}
</script>

<style scoped lang="scss">

  ::v-deep{
    .carousel__slide img{
      border-radius: 10px;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
    .carousel__slide{
      overflow-x: hidden;
      overflow-y: hidden;
    }
    .carousel__button{
      @media screen and (max-width: 1200px) {
        width: 24px;
        height: 24px;
        svg{
          width: 50%;
        }
      }
    }
  }
  #mainCarousel {
    width: 100%;
    --carousel-button-color: #170724;
    --carousel-button-bg: #fff;
    --carousel-button-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%),
    0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
    --carousel-button-svg-width: 20px;
    --carousel-button-svg-height: 20px;
    --carousel-button-svg-stroke-width: 2.5;
  }
  #mainCarousel .carousel__slide {
    width: 100%;
    padding: 0;
    img{
      width: 100%;
    }
  }
  #mainCarousel .carousel__button.is-prev {
    left: -1.5rem;
  }
  #mainCarousel .carousel__button.is-next {
    right: -1.5rem;
  }
  #mainCarousel .carousel__button:focus {
    outline: none;
    box-shadow: 0 0 0 4px #A78BFA;
  }
  #thumbCarousel .carousel__slide {
    opacity: 0.5;
    padding: 0;
    margin: 0.25rem;
    width: 96px;
    height: 64px;
    cursor: pointer;
  }
  #thumbCarousel .carousel__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #thumbCarousel .carousel__slide.is-nav-selected {
  opacity: 1;
  overflow: hidden!important;
}
</style>
