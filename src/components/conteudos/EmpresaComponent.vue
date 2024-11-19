<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/LoaderListaComponent.vue';
import FiltroComponent from '../util/FiltroComponent.vue';


export default defineComponent({
      template: '#Empre_comp',
      data() {
          return {
            lista_estado: 'Loader',
            itsOnFilter: false,
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'ordem':{'on': true,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'on': false, 'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Código Tek', 'key_body': 'codigoTek',
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'on': false, 'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Razão Social', 'key_body': 'descricao',
                        'ordem':{'on': false,'tipo_obj': 'String', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'on': false, 'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'CNPJ', 'key_body': 'cnpj',
                        'ordem':{'on': false,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'on': false, 'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Versão API', 'key_body': 'versaoApiTek',
                        'isfiltrable': false, 'isordenable':false},

                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
          }
      },
      components:{
            LoaderListaComponent,
            ListaComponent,
            FiltroComponent
      },
      async mounted() {
            if(store.getters.getEmpresas != undefined){
                  this.dado_paginado.body = await store.getters.getEmpresas
                  store.dispatch('getPaginas', 'empresas').then((value) => this.pagina_atual = value)
                  this.NUMERO_PAGINA = Math.ceil(await store.getters.getEmpresasLength / this.ITEM_PAGINA_MAX);
                  this.lista_estado = 'Lista'
            }else{
                  this.requestDados()
            }
      },
      methods:{
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'empresa', 'id': objeto.codigo, 'roter_interna': 'empresas'}
                  Promise.resolve(store.dispatch('delDadosID', aux))
                  .then(
                        () => this.requestDados()
                  ).catch((error)=> { console.warn(error) })
            },
            avancaPagina(){
                  if (this.pagina_atual < this.NUMERO_PAGINA) {
                        this.pagina_atual++;
                        this.requestDados();
                  }
            },
            recuarPagina(){
                  if (this.pagina_atual > 1) {
                        this.pagina_atual--;
                        this.requestDados();
                  }
            },
            async requestDados(){
                  this.lista_estado = 'Loader'
                  store.dispatch('getDadosPaginados', {
                        'roter_interna': 'empresas',
                        'roter_externa': 'empresa',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`,
                        'pagina_atual': this.pagina_atual
                        })
                  .then(() => {
                        this.dado_paginado.body = store.getters.getEmpresas;
                        this.NUMERO_PAGINA = Math.ceil(store.getters.getEmpresasLength / this.ITEM_PAGINA_MAX);
                        this.lista_estado = 'Lista'
                  })
            },
            ordenaEmpresa(title: {ordem: {tipo_ordenacao : string, on: boolean, tipo_obj: string}, key_body: string}){
                  this.dado_paginado.header.forEach(
                        (valor) => {
                              if(valor.ordem?.on != undefined){
                                    valor.ordem.on = false;
                              }
                        })
                  if (title.ordem.tipo_ordenacao == 'Asc') {
                        title.ordem.tipo_ordenacao = 'Desc'
                  }else{
                        title.ordem.tipo_ordenacao = 'Asc'
                  }
                  title.ordem.on = true;
                  store.commit('ordenarDadosInterno', {
                        'ordem': title.ordem.tipo_ordenacao,
                        'rota_interna': 'empresas',
                        'nome_dado': title.key_body,
                        'tipo': title.ordem.tipo_obj
                  })
            },
            filtraEmpresa(title: any){
                  this.itsOnFilter = true;
                  console.log(title);
                  
            }
      },
})
</script>

<template id="Empre_comp">
      <div class="row">
            <FiltroComponent 
            :isAtivo="itsOnFilter"
            />
            <LoaderListaComponent v-if="lista_estado == 'Loader'"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <ListaComponent v-if="lista_estado == 'Lista'"
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'empresas'"
                  :ModalContent_Remocao="[
                        {'nome': 'Código Tek', 'key': 'codigoTek'},
                        {'nome': 'Razão Social', 'key': 'descricao'},
                        {'nome': 'CNPJ', 'key': 'cnpj'},
                        {'nome': 'Verção', 'key': 'versaoApiTek'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaEmpresa(arg)"
                  @filtrarDadoPai="(arg : any) => filtraEmpresa(arg)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina"
            />
      </div>
</template>

<style scoped>

</style>