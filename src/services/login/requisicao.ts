import http from '@/services/http';
import router from '@/router';
import { APPCONFIG } from '@/components/constants/Config'
import fetch_ from '../fetch/requisicao';
import store from '@/store';
class ERRO{
      vericação = false;
      mensagem = '';
}
/* eslint-disable */
class UserDados {
      usuario = {
            email: '',
            senha: '',
            token: '',
            perfilUsuario: ''
      };

      async loginReq(email: string, senha: string, erros : ERRO) {
            this.usuario.email = email;
            this.usuario.senha = senha;   
            try {
                  const { data } = await http.post('/auth', this.usuario);
                  this.usuario.token = data.data.token;
                  this.usuario.perfilUsuario = data.data.perfilUsuario;
                  localStorage.setItem("TOKEN", this.usuario.token);
                  APPCONFIG.authToken = this.usuario.token;
                  //Requisição dos dados
                  this.getDados();
                  // Avançar para a pagina conteudo
                  router.push('/dashboard');
            } catch (error) {
                  erros.vericação = true;
                  erros.mensagem = 'Usuário ou senha inválidos!'
            }
      }

      async getToken(){
            if(localStorage.getItem('TOKEN') != null){
                  this.usuario.token = (localStorage.getItem('TOKEN') || '');
                  APPCONFIG.authToken = this.usuario.token;  
                  this.getDados();
                  router.push('/dashboard');
            }else{
                  router.push('/');
            }
      }

      async logOut(){
            localStorage.removeItem('TOKEN');
            router.push('/');
      }

      async getDados(){
            store.commit('setDadosInterno', {'dado': await fetch_.getDado('/empresa'), 'roter_interna': 'empresas'});
            store.commit('setDadosInterno', {'dado': await fetch_.getDado('/canal'), 'roter_interna': 'canais'});
            store.commit('setDadosInterno', {'dado': await fetch_.getDado('/ambiente'), 'roter_interna': 'ambientes'});
            store.commit('setDadosInterno', {'dado': await fetch_.getDado('/usuario'), 'roter_interna': 'usuarios'});

            //  store.commit(log_att = await fetch_.getDado('/atualizacaoecommerce'));
            //  store.commit(log_req = await fetch_.getDado('/atualizacaoecommerce'));
      }
}

const user = new UserDados();

export default user;
