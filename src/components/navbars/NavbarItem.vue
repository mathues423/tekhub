<script lang="ts">

export default{
      template: '#Item',
      props: ['nav_item'],
      methods:{
            change(obj : any){
                  let svg_in= '<svg xmlns="http://www.w3.org/2000/svg" width="{wid}" height="{hei}" fill="currentColor" class="{#class}" viewBox="0 0 16 16">'+
                        '{#path}'+
                  '</svg>';
                  svg_in = svg_in.replace('{wid}', obj.width).replace('{hei}', obj.height)
                  .replace('{#class}', obj.class).replace('{#path}', obj.path);
                  return svg_in;
            }   
      }
}
</script>

<template :item="nav_item" id="Item">
      <button class="btn col-12 navbar_itens">
            <span v-html="change(nav_item.icon)"></span>
            {{ nav_item.abrev }}
      </button>
</template>

<style scoped>
.navbar_itens{
      margin: 0;
      padding-left: 24px;
      font-size: 14px;
      color: var(--bs-gray-500);
}
</style>