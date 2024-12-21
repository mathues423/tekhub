<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
      data() {
          return {
            click_delete: false
          }
      },
      props:{
            isAtivo:{
                  type: Boolean,
                  retuire: true
            }
      },
      methods:{
            deletarItem(){
                  this.click_delete = true;
                  this.$emit('deletar_item')
            }
      },
      emits:['close', 'deletar_item']
})
</script>

<template>
      <Teleport to="body">
      <transition name="modal" v-if="isAtivo">
            <div class="modal-mask">
            <div class="modal-wrapper">
            <div class="modal-container">

                  <div class="modal-header">
                        Exclusão de item
                  </div>

                  <div class="modal-body">
                        <slot name="body">
                              default body
                        </slot>
                  </div>

                  <div class="modal-footer">
                        <slot name="footer" class="row">
                              <button class="btn btn-cancelar col-5 col-lg-2" @click="$emit('close')">
                                    Cancelar
                              </button>
                              <div class="col-2 col-lg-1"></div>
                              <button class="btn btn-primary col-5 col-lg-2" @click="deletarItem" :disabled="click_delete">
                                    <span v-if="click_delete">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                                <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                                                      <stop offset="0" stop-color="#FFFFFF"></stop>
                                                      <stop offset=".3" stop-color="#FFFFFF" stop-opacity=".9"></stop>
                                                      <stop offset=".6" stop-color="#FFFFFF" stop-opacity=".6"></stop>
                                                      <stop offset=".8" stop-color="#FFFFFF" stop-opacity=".3"></stop>
                                                      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"></stop>
                                                </radialGradient>
                                                <circle transform-origin="center" fill="none" stroke="url(#a12)" stroke-width="11" stroke-linecap="round" stroke-dasharray="200 1000" stroke-dashoffset="0" cx="100" cy="100" r="70">
                                                      <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="1" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
                                                </circle>
                                                <circle transform-origin="center" fill="none" opacity=".2" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" cx="100" cy="100" r="70"></circle>
                                          </svg>
                                    </span>
                                    <span v-else>
                                          OK
                                    </span>
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
      width: min(500px, 75%);

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
      padding: 10px;
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