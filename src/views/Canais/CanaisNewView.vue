<script lang="ts">
import router from '@/router';
import NavbarComplet from '@/components/util/navbars/NavbarComplet.vue';
import VersaoMaximisada from '@/components/versionamento/VersaoMaximisada.vue';
import { defineComponent } from 'vue';
import ErroFormComponent from '@/components/mensagem/ErroFormComponent.vue';
import canal from '@/services/regras_negocio/regras_canais';
import store from '@/store';
import fetch_ from '@/services/fetch/requisicao';
import LoaderSkeleton from '@/components/util/Loaders/LoaderSkeleton.vue';

export default defineComponent({
      data(){
            return {
                  canal_new:{
                        descricao: '',
                        alias: '',
                        aliastekprot: '', 
                        tipo: '', 
                        canalAssociado: -1
                  },
                  errors: [] as Array<string>,
                  tipo_canal: ['MARKETPLACE', 'ECOMMERCE', 'LOGISTICA', 'PAGAMENTO'],
                  canal_assossiado_req: [] as Array<object>,
                  requested: false,
                  request_new_canal: false
            }
      },
      components:{
            NavbarComplet,
            VersaoMaximisada,
            LoaderSkeleton,
            ErroFormComponent
      },
      mounted(){
            Promise.resolve(fetch_.getDado('/canal')).then(
                  (args) => {
                        this.canal_assossiado_req = args.data;
                        this.requested = true;
                  }
            )
      },
      methods:{
            async criacaoRequest(){
                  this.errors = [];
                  this.request_new_canal = true;
                  canal._add(this.canal_new, this.errors)
                  if(this.errors.length == 0){
                        // if(this.canal_new.codigo == -1){
                        //       this.canal_new.codigo = this.canal_assossiado_req[this.canal_assossiado_req.length - 1]['codigo' as keyof typeof this.canal_assossiado_req[0]] + 1;
                        // }
                        Promise.resolve(
                              store.dispatch('putDados', {'roter_externa': 'canal', 'dado': this.canal_new, 'roter_interna': 'canais'})
                              .then(()=> this.voltarCanal())
                        ).catch((error)=> {
                              // this.errors?.push('400')
                              console.warn(error) 
                              this.request_new_canal = false;
                        })
                  }
                  
            },
            voltarCanal(){
                  router.push('/canais');
            }
      }
})
</script>

<template>
      <div class="row">
            <NavbarComplet :lateral="'canais'"/>
            <div class="col-12 col-lg-10" id="content">
                  <div class="row">
                        <div class="col-1"></div>
                        <div class="Card-Body col-8">
                              <form @submit.prevent="criacaoRequest()" class="row form_content" novalidate>
                                    <!-- Descrição -->
                                    <div class="col-2 form_text">
                                          *Descrição:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="canal_new.descricao" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe a Descrição.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='descricao') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Alias -->
                                    <div class="col-2 form_text">
                                          *Alias:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="canal_new.alias" required>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o Alias.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='alias') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Alias TekPropt -->
                                    <div class="col-2 form_text">
                                          Alias TekPropt:
                                    </div>
                                    <div class="col-8">
                                          <input type="text" class="form-control" v-model="canal_new.aliastekprot">
                                          <!-- <ErroFormComponent
                                          :mensagem="'Por favor informe o Alias TekPropt.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='alias_tekprot') != -1}]"
                                          /> -->
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Tipo -->
                                    <div class="col-2 form_text">
                                          *Tipo:
                                    </div>
                                    <div class="col-8">
                                          <select class="custom-select" v-model="canal_new.tipo" required>
                                                <option selected disabled :value="{}"> Selecione o campo</option>
                                                <option v-for="header in tipo_canal" :key="header" :value="header"> {{ header }}</option>
                                          </select>
                                          <ErroFormComponent
                                          :mensagem="'Por favor informe o Tipo.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='tipo') != -1}]"
                                          />
                                    </div>
                                    <div class="col-2"></div>
                                    <!-- Canal Associado -->
                                    <div class="col-2 form_text">
                                          Canal Associado:
                                    </div>
                                    <!-- Como linkar o canal associado ?? -->
                                    <div class="col-8">
                                          <span v-if="requested">
                                                <select class="custom-select" v-model="canal_new.canalAssociado">
                                                      <option selected disabled :value="{}"> Selecione o campo</option>
                                                      <option v-for="header in canal_assossiado_req" :key="header" :value="header['codigo' as keyof typeof header]"> {{ header['descricao' as keyof typeof header] }}</option>
                                                </select>
                                          </span>
                                          <span v-else>
                                                <LoaderSkeleton 
                                                      :tipo_loader="'select'"
                                                />
                                          </span>
                                          <!-- <ErroFormComponent
                                          :mensagem="'Por favor informe o Canal Associado.'"
                                          :class="['alert-danger desativada',{'ativada' : errors.findIndex((x) => x =='canal_ass') != -1}]"
                                          /> -->
                                    </div>
                                    <div class="col-2"></div>

                                    <!-- Botao -->
                                    <div style="margin-top: 16px;" class="col-12">
                                          <button :class="['btn', 'btn-primary', 'col-2', {'disabled' : !requested}, {'disabled' : request_new_canal}]">
                                                <span>Criar</span>
                                          </button>
                                          <button class="btn btn-light col-2" style="margin-left: 24px;" @click="voltarCanal()">
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