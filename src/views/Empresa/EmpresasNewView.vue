<script lang="ts">
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import empresa from '@/services/regras_negocio/regras_empresa';
import store from '@/store';
export default defineComponent({
      data(){
            return {
                  empresa:{
                        descricao: '',
                        cnpj: '',
                        codigoTek: '',
                        versaoApiTek: '',
                        integracoes: []
                  },
                  errors: [] as Array<string>
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroFormComponent
      },
      methods:{
            async criacaoRequest(){
                  while (this.errors.length) {
                        this.errors.pop();
                  }
                  empresa._add(this.empresa, this.errors)
                  if(this.errors.length == 0){
                        Promise.resolve(
                              store.dispatch('putDados', {'roter_externa': 'empresa', 'dado': this.empresa, 'roter_interna': 'empresas'})
                              .then(()=> this.voltarEmpresa())
                        ).catch((error)=> {
                              this.errors?.push('400')
                              console.warn(error) 
                        })
                  }
                  
            },
            voltarEmpresa(){
                  router.push('/empresas');
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'empresas'"/>
            <div class="col-12 col-lg-10" id="content">
                  <div class="row">
                        <div class="col-1"></div>
                        <div class="Card-Body col-8">
                              <form @submit.prevent="criacaoRequest()" class="row form_content" novalidate>
                                    <!-- Razao -->
                                    <div class="col-2 form_text">
                                          *Razão social:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="empresa.descricao" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe a Razão social.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='razao') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- CNPJ -->
                                    <div class="col-2 form_text">
                                          *CNPJ:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="empresa.cnpj" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o CNPJ.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='cnpj') != -1}]"
                                          />
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o CNPJ valido.'"
                                          :class="['alert-warning desativada',{'ativada' : errors.findIndex((x) => x =='400') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Codigo -->
                                    <div class="col-2 form_text">
                                          *Codigo na Tek-System:
                                    </div>
                                    <div class="col-8">
                                          <input type="number" class="form-control" v-model="empresa.codigoTek" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe um Codigo numerico.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='codigo') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Versao -->
                                    <div class="col-2 form_text">
                                          *Verção API:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="empresa.versaoApiTek" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe a Verção API.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='api') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>

                                    <div style="margin-top: 16px;" class="col-12">
                                          <button class="btn btn-primary col-2">
                                                <span>Criar</span>
                                          </button>
                                          <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarEmpresa()">
                                                <span>Voltar</span>
                                          </button>
                                    </div>
                              </form>
                        </div>
                        <div class="col-3"></div>
                  </div>
            </div>
            <VersaoMaximisada />
      </div>
</template>

<style scoped>
#content{
      background-color: var(--bs-white);
      color: var(--bs-gray-600);
      padding-top: 24px;
}

.form_text{
      font-size: 14px;
      color: var(--bs-black);
      text-align: right;
}
.form_content > div{
      padding-top: 10px;
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>