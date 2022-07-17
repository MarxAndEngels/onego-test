<template>
  <input
    type="tel"
    :value="value"
    @change="$emit('input', $event.target.value)"
    ref="phone"
    class="input"
    :class="{input_error: error}"
    placeholder="Телефон"
    inputmode="numeric"
    required=""
  />
</template>
<script>
export default {
  props: ["value","error"],
  mounted() {
    let im = new Inputmask({
      mask: "+7 (#99) 999-99-99",
      definitions: {
        "#": {
          validator: "[1234569]",
        },
      },
    });
    im.mask(this.$refs.phone);
  },
};
</script>
