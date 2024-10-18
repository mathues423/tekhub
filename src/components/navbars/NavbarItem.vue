<script lang="ts">

export default{
      template: '#Item',
      props: ['nav_item']
}
</script>

<template :item="nav_item" id="Item">
      <div class="col-12 navbar_itens">
            <span v-html="nav_item.icon"></span>
            {{ nav_item.abrev }}
      </div>
</template>

<style scoped>
.navbar_itens{
      /* color: --bs-blue;
      font-size: 16px; */
}
</style>