<template>
  <input
    type="tel"
    :value="value"
    @change="$emit('input', $event.target.value)"
    ref="year"
    class="input"
    :placeholder="placeholder"
    inputmode="numeric"
    required=""
  />
</template>
<script>
export default {
  props: ["value",'placeholder'],
  mounted() {
    let im = new Inputmask({
      mask: "9999",
      // definitions: {
      //   "#": {
      //     validator: "[1234569]",
      //   },
      // },
    });
    im.mask(this.$refs.year);
  },
};
</script>
