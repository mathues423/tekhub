<script lang="ts">
import { onClickOutside } from '@vueuse/core';
import { ref } from 'vue';
export default {
      setup(props){
            const isAtivo_interno = ref(true);
            const modal = ref(null);
            onClickOutside(modal, ()=> isAtivo_interno.value = false);
            console.log('PROPS: ', props);
            console.log('Interno: ', isAtivo_interno);
            return { isAtivo_interno }
      },
      props:{
            isAtivo:{
                  type: Boolean,
                  retuire: true
            }
      },
}
</script>

<template>
      <Teleport to="body">
            <div> PROPS: {{ isAtivo }} </div>
            <div ref="modal"> INTERNO: {{ isAtivo_interno }} </div>
            
      <transition name="modal" v-if="isAtivo">
            <div class="modal-mask">
            <div class="modal-wrapper">
            <div class="modal-container" ref="modal">

                  <div class="modal-header">
                        <slot name="header">
                              default header
                        </slot>
                  </div>

                  <div class="modal-body">
                        <slot name="body">
                              default body
                        </slot>
                  </div>

                  <div class="modal-footer">
                        <slot name="footer" class="row">
                              <button class="btn btn-cancelar col-xs-6 col-md-2" @click="isAtivo_interno = false">
                                    Cancelar
                              </button>
                              <div class="col-md-1"></div>
                              <button class="btn btn-primary col-xs-6 col-md-2" @click="$emit('deletar_item')">
                                    OK
                              </button>
                        </slot>
                  </div>
            </div>
            </div>
            </div>
      </transition>
      </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.9s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: -webkit-center;
}

.modal-container{
      background-color: var(--bs-white);
      top: 10%;
      width: 500px;

      transition: all 0.9s ease;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-header{
      background-color: var(--bs-danger);
      color: var(--bs-white);
      font-size: 24px;
      justify-content: center;
}

.modal-body {
  margin: 0 0;
}

.modal-footer{
      padding-top: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
}

.btn-cancelar{
      --bs-btn-color: #222;
      --bs-btn-border-color: #333;
      --bs-btn-hover-color: #2c3cd4;
      --bs-btn-hover-bg: #ffffff;

      --bs-btn-hover-border-color: #000;
      --bs-btn-focus-shadow-rgb: 220, 53, 69;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #c8c8df;
      --bs-btn-active-border-color: #000;
      
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #816d6f;
      --bs-btn-disabled-border-color: #584f50;
      --bs-btn-disabled-bg: transparent;
      --bs-gradient: none; 
}
</style>