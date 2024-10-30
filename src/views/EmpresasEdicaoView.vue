<script lang="ts">
import router from '@/router';
import NavbarComplet from '@/components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import fetch_ from '@/services/fetch/requisicao';
import { defineComponent } from 'vue';


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
                  errors: []
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroFormComponent
      },
      methods:{
            editRequest(){
                  // while (this.errors.length) {
                  //       console.log(this.$data.errors.pop());
                  // }
                  // empresa._add('/empresa', this.$data.empresa, this.$data.errors);
            },
            voltarEmpresa(){
                  router.push('/empresas');
            },
      },
      props:{
            rota_id: String
      },
      async mounted(){
            const rota = (this.$route.params['id'] || '-1') as string;
            const a = await fetch_.getDado_ID('/empresa', rota);
            this.empresa.descricao = a.descricao;
            this.empresa.cnpj = a.cnpj;
            this.empresa.codigoTek = a.codigoTek;
            this.empresa.versaoApiTek = a.versaoApiTek;
            this.empresa.integracoes = a.integracoes;
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'empresas'"/>
            <div class="col-10" id="content">
                  <div class="row">
                        {{ empresa }}
                        <div class="col-1"></div>
                        <div class="Card-Body col-8">
                              <form @submit.prevent="editRequest()" :placeholder="$data.empresa.descricao" class="row form_content" novalidate>
                                    <!-- Razao -->
                                    <div class="col-2 form_text">
                                          *Razão social:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="$data.empresa.descricao" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe a Razão social.'"
                                          :class="['alert-danger desativada',{'ativada' : $data.errors.findIndex((x) => x =='razao') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- CNPJ -->
                                    <div class="col-2 form_text">
                                          *CNPJ:
                                    </div>
                                    <div class="col-8">
                                          <!-- <input type="text" class="form-control" v-model="empresa.cnpj" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o CNPJ.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='cnpj') != -1}]"
                                          /> -->
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
                                          <!-- <input type="number" class="form-control" v-model="empresa.codigoTek" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe um Codigo numerico.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='codigo') != -1}]"
                                          /> -->
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Versao -->
                                    <div class="col-2 form_text">
                                          *Verção API:
                                    </div>
                                    <div class="col-8">
                                          <!-- <input type="text" class="form-control" v-model="empresa.versaoApiTek" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe a Verção API.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='api') != -1}]"
                                          /> -->
                                    </div>
                                    <div class="col-2"></div>

                                    <div style="margin-top: 16px;" class="col-12">
                                          <button class="btn btn-primary col-2">
                                                <span>Iditar</span>
                                          </button>
                                          <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarEmpresa()">
                                                <span>Cancelar</span>
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