<template>
    <div></div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    // eslint-disable-next-line no-return-assign
    setTimeout(() => this.loading = false, 2000);
  },
  data() {
    return {
      loading: true,
    };
  },
};
</script>
