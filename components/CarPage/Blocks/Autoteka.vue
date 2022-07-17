<template>
  <div class="autoteka" ref='autoteka'>
<!--    <form class="autoteka__form">-->
<!--      <button class="autoteka-download"><svg class="icon" width="16" height="16" viewBox="0 0 16 16"><use xlink:href="#icon-download"></use></svg>Скачать</button>-->
<!--    </form>-->
    <div class="autoteka__top">
      <div class="autoteka__top-line"><img class="autoteka__top-image" src="~/static/img/autoteka/autoteka.svg" alt="autoteka">
        <div>
          <div class="autoteka__top-report"> Отчёт куплен на сайте Autoteka.ru </div>
          <div class="autoteka__top-little"> Автотека - сервис по проверке автомобиля по VIN</div>
        </div>
      </div>
      <div class="autoteka__line">
        <div>
          <div class="autoteka__top-little"> Отчет от {{ offer.createdAt }}</div>
          <div class="autoteka__top-title">{{ offer.name }}</div>
        </div>
      </div>
      <ul class="autoteka__line autoteka__table">
        <li class="autoteka__table-line"><span> VIN:</span><span> {{ offer.vin }}</span></li>
        <li class="autoteka__table-line"><span> Госномер:</span><span> Отсутствует</span></li>
        <li class="autoteka__table-line"><span> Номер кузова:</span><span> {{ offer.vin }}</span></li>
        <li class="autoteka__table-line"><span> Год выпуска:</span><span> {{ offer.year }}</span></li>
        <li class="autoteka__table-line"><span> Тип ТС: </span><span> {{ offer.bodyType.title }}</span></li>
        <li class="autoteka__table-line"><span> Цвет:</span><span>  {{ offer.color.title }}</span></li>
        <li class="autoteka__table-line"><span> Объём двигателя:</span><span> {{ offer.engine_volume | engineVolume }}</span></li>
        <li class="autoteka__table-line"><span> Мощность: </span><span> {{ offer.engine_power }} л.с.</span></li>
        <li class="autoteka__table-line"><span> Последний пробег:</span><span>  {{ offer.run | run }} км</span></li>
      </ul>
      <div class="row autoteka__line">
        <div class="col">
          <div class="autoteka__table-text">
            VIN номер скрыт из соображений безопасности.
          </div>
        </div>
      </div>
      <div class="autoteka-block"
           @click="item.isOpen = !item.isOpen"
           v-for="(item, index) in items"
           :key="index">
           <center> <div v-if="index === 1" class="button show" @click="openAutoteka($event)" ref="openAutotekaButton">Показать подробнее</div></center>
        <div class="autoteka-block-title autoteka-block-title--green" :class="{'autoteka-block-title--onlytitle': !item.text}">{{item.title}}</div>
        <div class="autoteka-block-text" :class="{open : item.isOpen}" v-if="item.text">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
function number_format(number, decimals, dec_point, thousands_sep) {
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    toFixedFix = function (n, prec) {
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      var k = Math.pow(10, prec);
      return Math.round(n * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
export default {
  data(){
    return {
      items:[
        {
          title:'Не найдены ограничения на регистрацию',
          text:'Запрет регистрационных действий на машину накладывается, если у автовладельца есть неоплаченные штрафы и налоги, либо если имущество стало предметом спора.',
          isOpen: false,
        },
        {
          title:'Нет сведений о розыске',
          text:'Покупка разыскиваемого автомобиля грозит тем, что его отберут в ГИБДД при регистрации, и пока будет идти следствие, а это может затянуться на долгий срок, автомобиль будет стоять на штрафплощадке.',
          isOpen: false,
        },
        {
          title:'Залог не найден',
          text:'Мы проверили базы данных Федеральной нотариальной палаты (ФНП) и Национального бюро кредитных историй (НБКИ).',
          isOpen: false,
        },
        {
          title:`${this.offer.owner.title} по ПТС`,
          text:'',
          isOpen: false,
        },
        {
          title:'ДТП не найдены',
          text:'В отчёт не попадут аварии, которые произошли раньше 2015 года или не оформлялись в ГИБДД.',
          isOpen: false,
        },
        {
          title:'Не найдены расчёты стоимости ремонта',
          text:'Мы проверяем, во сколько эксперты страховых компаний оценили восстановление автомобиля после ДТП. Расчёт не означает, что машину ремонтировали.',
          isOpen: false,
        },
        {
          title:'Не найдено разрешение на работу в такси',
          text:'Данные представлены из региональных баз по регистрации автомобиля в качестве такси.',
          isOpen: false,
        },
        {
          title:'Не найдены сведения об использовании в каршеринге',
          text:'На каршеринговых авто ездят практически круглосуточно. Они много времени проводят в пробках — от этого двигатель и сцепление быстро изнашиваются. Салон тоже страдает от большого количества водителей и пассажиров.',
          isOpen: false,
        },
        {
          title:'Не найдены сведения о диагностике',
          text:'В блоке представлены данные по оценке состояния автомобиля по результатам офлайн диагностики. В ходе диагностики специалисты проверяют состояние ЛКП, всех конструкций автомобиля, состояние салона, фактическую комплектацию и проводят небольшой тест-драйв.',
          isOpen: false,
        },
        {
          title:'Не найдены сведения о техосмотрах',
          text:'В данном блоке отображаются данные о прохождении техосмотра на основании данных диагностических карт ТС. Срок прохождения технического осмотра для автомобилей категории «B»: — первые четыре года — не требуется; — возраст от 4 до 10 лет — каждые 2 года; — старше 10 лет — ежегодно.',
          isOpen: false,
        },
        {
          title:'Нет сведений о ввозе из-за границы',
          text:'Данные из таможенной декларации, которую заполняет компания, осуществляющая ввоз транспортного средства на территорию РФ.',
          isOpen: false,
        },
        {
          title:'Нет полиса ОСАГО',
          isOpen: false,
        },
        {
          title:'Не найдены сведения об отзывных кампаниях',
          text:'Для данного автомобиля не проводилось или нет действующих отзывных кампаний. Отзыв автомобиля представляет собой устранение выявленного брака. Практически все автомобильные производители периодически отзывают свои продукты для устранения дефектов.',
          isOpen: false,
        },
      ]
    }
  },
  props: {
    offer: {
      type: Object,
      default:()=>{}
    }
  },
  filters: {
    run(value) {
      if (!value) return ''
      return new Intl.NumberFormat("ru-RU").format(value);
    },
    engineVolume: function (volume) {
      return number_format(volume, 1, '.', '');
    },
  },
  methods: {
     openAutoteka(e){
     let autoteka = this.$refs.autoteka;
     autoteka.classList.add('active')
     e.target.style.display='none'
  }
  },
}
</script>

<style scoped lang="scss">
.button.show{
       display: none;
   width: 190px;
   margin-bottom: 30px;
}
@media(min-width: $x-large-display){
 .button.show {
   display: flex;
    align-items: center;
    justify-content: center;
}
}
.autoteka {
  position: relative;
  background: #fff;
  line-height: 1.5;
  height: 100%;
}
@media(min-width: $x-large-display){
  .autoteka {
    max-height: 520px;
    overflow: hidden;
}
  .autoteka.active {
    max-height: 100%;
    overflow: hidden;
}
}


.autoteka__top-little {
  font-size: 12px;
   @media screen and (max-width: $xx-large-display){
    font-size: 10px;
  }
}

.autoteka__form {
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 2;
  right: 0;
  @media screen and (max-width:$large-display){
    top: 24px;
    right: 24px;
  }
}

.autoteka__top-line {
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: $xx-large-display){
    flex-direction: column;
  }
}

.autoteka__top-image {
  margin-right: 16px;
  @media screen and (max-width: $xx-large-display){
    margin-bottom: 16px;
  }
}

.autoteka-download {
  display: flex;
  border: none;
  background: none;
  align-items: center;
  margin-bottom: 16px;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  svg {
    margin-right: 8px;
}
  &:hover {
    opacity: .8;
  }
}

.autoteka__line {
  margin-top: 16px;
  @media screen and (max-width: $xx-large-display){
    margin-top: 8px;
  }
}

.autoteka__top-title {
  font-size: 24px;
  font-weight: bold;
  padding: 16px 0 0;
  @media screen and (max-width: $xx-large-display){
    font-size: 20px;
  }
  @media screen and (max-width:$large-display){
    padding: 16px 0 0;
    font-size: 16px;
  }
}

.autoteka__table {
  list-style: none;
  padding-left: 0;
  margin: 16px 0;
  column-count: 2;
   @media screen and (max-width: $xx-large-display){
    column-count: 1;
  }
}

.autoteka__table-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
   @media screen and (max-width: $xx-large-display){
    margin-bottom: 6px;
    font-size: 13px;
  }
  @media (min-width:700px) {
    margin-right: 32px;
  }
  span {
    &:nth-child(1) {
      font-size: 16px;
      color: #858585;
       @media screen and (max-width: $xx-large-display){
        font-size: 13px;
      }
    }
  }
}

.autoteka-block {
  margin-top: 24px;
  padding-left: 24px;
   @media screen and (max-width: $xx-large-display){
    padding-left: 16px;
    margin-top: 16px;
    
  }
}

.autoteka-block-title {
  font-size: 20px;
  font-weight: bold;
  position: relative;
  padding-right: 32px;
   @media screen and (max-width: $xx-large-display){
    padding-right: 24px;
    font-size: 18px;
  }
   @media screen and (max-width: $xx-large-display){
    padding-right: 16px;
  }
  &.autoteka-block--dropdown::after {
    content: '';
    min-width: 8px;
    height: 8px;
    display: block;
    position: absolute;
    right: 24px;
    top: 10px;
    border-bottom: 2px solid #000;
    border-right: 2px solid #000;
    transform: rotate(45deg);
    margin-left: 8px;
}
  &::before {
    content: '';
    width: 12px;
    height: 12px;
    position: absolute;
    top: 50%;
    left: -24px;
    border-radius: 16px;
    transform: translateY(-50%);
}
  &--green {
    &::before {
      background: #97cf26
  }
}
  &--active::after {
    top: 12px!important;
    transform: rotate(-135deg)!important;
}
  &--onlytitle {
    &::after {
      display: none;
    }
  }
}

.autoteka-block-text {
  @media (max-width:1070px) {
    font-size: 14px;
  }
  @media (max-width:720px) {
    margin: 8px 0 16px;
    display: none;
    &.open{
      display: block;
    }
  }
}
</style>
