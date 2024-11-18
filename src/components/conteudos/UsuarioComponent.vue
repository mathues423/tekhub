<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';
import ListaComponent from '../util/lista/ListaComponent.vue';
import LoaderListaComponent from '../util/LoaderListaComponent.vue';


export default defineComponent({
      template: '#Usua_comp',
      data() {
          return {
            lista_estado: 'Loader',
            ITEM_PAGINA_MAX : 10,
            NUMERO_PAGINA: 1,
            pagina_atual: 1,
            dado_paginado:{
                  header:[
                        {'header': 'Código', 'key_body': 'codigo',
                        'ordem':{'on': true,'tipo_obj': 'Number', 'tipo_ordenacao': 'Asc'}, //Ascendente => true | Descendente => false
                        'filtro':{'on': false, 'tipo_obj': 'Number', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':true},

                        {'header': 'Email', 'key_body': 'email',
                        'filtro':{'on': false, 'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Perfil', 'key_body': 'perfil',
                        'filtro':{'on': false, 'tipo_obj': 'String', 'tipo_filtro': 'pre'},
                        'isfiltrable': true, 'isordenable':false},

                        {'header': 'Empresa', 'key_body': 'empresaDescricao',
                        'filtro':{'on': false, 'tipo_obj': 'String', 'tipo_filtro': 'all'},
                        'isfiltrable': true, 'isordenable':false},
                        
                        {'header': 'Ações', 'key_body': 'button',
                        'isfiltrable': false, 'isordenable':false}
                  ],
                  body: [] as Array<object>
            },
          }
      },
      components:{
            LoaderListaComponent,
            ListaComponent
      },
      mounted() {
            this.requestDados()
      },
      methods:{
            deletar(objeto: {codigo: string}){
                  let aux = {'roter_externa': 'usuario', 'id': objeto.codigo, 'roter_interna': 'usuarios'}
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
                        'roter_interna': 'usuarios',
                        'roter_externa': 'usuario',
                        'request': `?pagina=${this.pagina_atual}&porPagina=${this.ITEM_PAGINA_MAX}&ordenacao=codigo&direcao=Asc`
                        })
                  .then(() => {
                        this.dado_paginado.body = store.getters.getUsuarios;
                        this.NUMERO_PAGINA = Math.ceil(store.getters.getUsuariosLength / this.ITEM_PAGINA_MAX);
                        this.lista_estado = 'Lista'
                  })
            },
            ordenaUsuario(title: {ordem: {tipo_ordenacao : string, on: boolean, tipo_obj: string}, key_body: string}){
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
                        'rota_interna': 'usuarios',
                        'nome_dado': title.key_body,
                        'tipo': title.ordem.tipo_obj
                  })
            }
      },
})
</script>

<template id="Usua_comp">
      <div class="row">
            <!-- Duvida se ediçaõ seria um modal tbm ou so uma div msm -->
            <LoaderListaComponent v-if="lista_estado == 'Loader'"
                  :header="dado_paginado.header"
                  :quantidade_dados="ITEM_PAGINA_MAX"
            />
            <ListaComponent v-if="lista_estado == 'Lista'"
                  :dados="dado_paginado"
                  :pagina="pagina_atual"
                  :pagina_max="NUMERO_PAGINA"
                  :rota_edicao="'usuarios'"
                  :ModalContent_Remocao="[
                        {'nome': 'Email', 'key': 'email'},
                        {'nome': 'Perfil', 'key': 'perfil'},
                        {'nome': 'Empresa', 'key': 'empresaDescricao'},
                  ]"
                  @deletarDadoPai="(arg : any) => deletar(arg)"
                  @ordenarDadoPai="(arg : any) => ordenaUsuario(arg)"
                  @avancar="avancaPagina" 
                  @recuar="recuarPagina" 
            />
      </div>
</template>

<style scoped>

</style>