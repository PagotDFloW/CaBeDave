<template>
    <div>
        <products-list/>
    </div>
</template>

<script>
import ProductsList from '../components/Products/ProductsList.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductsList,
  },
};
</script>
