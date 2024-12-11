<script lang="ts">
import router from '@/router';
import NavbarComplet from '@/components/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import { defineComponent } from 'vue';
import ambiente from '@/services/regras_negocio/regras_ambientes';
import store from '@/store';
import fetch_ from '@/services/fetch/requisicao';

export default defineComponent({
      data(){
            return {
                  isEditing: false,
                  ambiente:{
                        ambiente : '',
                        canalAlias : '',
                        status : 'INATIVO',
                        url : '',
                        versao : '' 
                  },
                  old_ambiente:{
                        ambiente : '',
                        canalAlias : '',
                        status : 'INATIVO',
                        url : '',
                        versao : '' 
                  },
                  status_aux: false,
                  requested: false,
                  canais_requested: [] as Array<object>,
                  ambientes: [{name: 'Homologação', value: 'HOMOLOGACAO'}, {name: 'Produção', value: 'PRODUCAO'}],
                  errors: []
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            ErroFormComponent
      },
      methods:{
            async editRequest(){
                  this.isEditing = true;
                  this.errors = [];
                  const id = (this.$route.params['id'] || '-1') as string;
                  if (this.status_aux) {
                        this.ambiente.status = 'ATIVO'
                  }else{
                        this.ambiente.status = 'INATIVO'
                  }
                  ambiente._edit(this.old_ambiente, this.ambiente, this.errors)
                  if (this.errors.length == 0) {
                        Promise.resolve(
                              store.dispatch('setDadosID', {'roter_externa': 'ambiente', 'id': id, 'roter_interna': 'ambientes', 'new_dado': this.ambiente}))
                        .then(()=> 
                              this.voltarAmbiente()
                        )
                  }else{
                        this.isEditing = false;
                  }
            },
            voltarAmbiente(){
                  router.push('/ambientes');
            },
      },
      async mounted(){
            this.requested = false;
            const rota_id = (this.$route.params['id'] || '-1') as string;
            Promise.resolve(store.dispatch('getAmbientesID', rota_id))
            .then((value) => {
                  this.old_ambiente.ambiente = this.ambiente.ambiente = value.ambiente;
                  this.old_ambiente.canalAlias = this.ambiente.canalAlias = value.canalAlias;
                  this.old_ambiente.status = this.ambiente.status = value.status;
                  if (this.old_ambiente.status == 'ATIVO') {
                        this.status_aux = true;
                  }else{
                        this.status_aux = false;
                  }
                  this.old_ambiente.url = this.ambiente.url = value.url;
                  this.old_ambiente.versao = this.ambiente.versao = value.versao;
                  Promise.resolve(fetch_.getDado('/canal'))
                  .then((args)=> {
                        this.requested = true;
                        this.canais_requested = args.data
                  })
            });
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'ambiente'"/>
            <div class="col-10" id="content">
                  <div class="row">
                        <div class="col-1"></div>
                        <div class="Card-Body col-8">
                              <form @submit.prevent="editRequest" class="row form_content" novalidate>
                                   <!-- Canal -->
                                   <div class="col-2 form_text">
                                          *Canal:
                                    </div>
                                    <div class="col-8">
                                          <span v-if="requested">
                                                <select class="custom-select" v-model="ambiente.canalAlias">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="header in canais_requested" :key="header['codigo' as keyof typeof header]" :value="header['alias' as keyof typeof header]"> {{ header['descricao' as keyof typeof header] }} | {{ header['tipo' as keyof typeof header] }}</option>
                                                </select>
                                          </span>
                                          <span v-else>
                                                <select class="custom-select">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                </select>
                                          </span>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o canal.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='canalAlias') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Url -->
                                    <div class="col-2 form_text">
                                          *Url:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="ambiente.url">
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o URL.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='url') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Versão -->
                                    <div class="col-2 form_text">
                                          *Versão:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="ambiente.versao">
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o versão.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='versao') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Ambiente -->
                                    <div class="col-2 form_text">
                                          *Ambiente:
                                    </div>
                                    <div class="col-8">
                                          <select class="custom-select" v-model="ambiente.ambiente">
                                                <option selected disabled :value="{}"> Selecione o campo</option>
                                                <option v-for="header in ambientes" :key="header.name" :value="header.value"> {{ header.name }}</option>
                                          </select>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o ambiente.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='ambiente') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Status -->
                                    <div class="col-2 form_text">
                                          *Status:
                                    </div>
                                    <div class="col-8">
                                          <div class="form-check form-switch">
                                                <input style="height: 1.75em; width: 3.5em;" class="form-check-input" type="checkbox" role="switch" v-model="status_aux" aria-checked="mixed">
                                          </div>
                                    </div>
                                    <div class="col-2"></div>

                                    <div style="margin-top: 16px;" class="col-12">
                                          <ErroFormComponent
                                          :mensagem="'Edite antes de salvar'"
                                          :class="['alert-warning desativada',{'ativada' : errors.findIndex((x) => x =='igual') != -1}]"
                                          />
                                          <button class="btn btn-primary col-2" :disabled="isEditing || !requested">
                                                <span>Iditar</span>
                                          </button>
                                          <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarAmbiente()">
                                                <span>Cancelar</span>
                                          </button>
                                    </div>
                              </form>
                        </div>
                        <div class="col-3"></div>
                        {{ old_ambiente }} <br>
                        {{ ambiente }}
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
.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem 1.75rem .375rem .75rem;
    line-height: 1.5;
    color: #495057;
    vertical-align: middle;
    background: #fff url(data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E) no-repeat right .75rem center;
    background-size: 8px 10px;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
/* @media (prefers-color-scheme: dark) {
      #content{
            background-color: var(--dark-blue);
            color: var(--bs-white);
      }
} */
</style>