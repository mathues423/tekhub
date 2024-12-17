<script lang="ts">
import NavbarComplet from '@/components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import router from '@/router';
import { defineComponent } from 'vue';
import EmpresaSelectComponent from '@/components/util/selects/EmpresaSelectComponent.vue';

export default defineComponent({
      data(){
            return {
                  empresa_select:{},
                  empresa_escolhida:{},

                  email:'',
            }
      },
      components:{
            NavbarComplet,
            EmpresaSelectComponent,
            VersaoMaximisada
      },
      methods:{
            voltarUsuario(){
                  router.push('/usuarios');
            },
            criacaoRequest(){
                  console.log('s');
                  
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'usuario'"/>
            <div class="col-10" id="content">
                  <div class="row">
                        <!-- Email -->
                        <div class="col-1"></div>
                        <div class="Card-Body col-8">
                              <form @submit.prevent="criacaoRequest" class="row form_content" novalidate>

                                    <!-- Email -->
                                    <div class="col-2 form_text">
                                          *Email:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="email">
                                    </div>
                                    <div class="col-2"></div>

                                    <div class="col-2 form_text">
                                          *Empresa:
                                    </div>
                                    <div class="col-8">
                                          <EmpresaSelectComponent 
                                                :have_erro="true"
                                                @empresa_escolhida="(arg)=> empresa_escolhida = arg"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                              </form>
                        </div>
                        <div class="col"></div>
                  </div>
            </div>
            <VersaoMaximisada />
      </div>
</template>

<style scoped>
#content{
      background-color: var(--bs-white);
      color: var(--bs-gray-600);
}
.Card-Body >div{
      padding-top: 10px;
}
.custom-select{
      background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
      background-size: 8px 10px;
      padding: .375rem .75rem .375rem .75rem;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #495057;
      vertical-align: middle;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      display: inline-block;
      
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>