<template>
  <input
    type="tel"
    :value="value"
    @change="$emit('input', $event.target.value)"
    ref="phone"
    class="input"
    placeholder="Дата рождения"
    inputmode="numeric"
    required=""
  />
</template>
<script>
export default {
  props: ["value"],
  mounted() {
    let im = new Inputmask({
      mask: "99/99/9999",
      // definitions: {
      //   "#": {
      //     validator: "[1234569]",
      //   },
      // },
    });
    im.mask(this.$refs.phone);
  },
};
</script>
