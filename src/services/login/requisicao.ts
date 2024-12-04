import http from '@/services/http';
import router from '@/router';
import { APPCONFIG } from '@/components/constants/Config'
import fetch_ from '../fetch/requisicao';
import store from '@/store';
class ERRO{
      vericação = false;
      message = '';
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
            if (email == '') {
                  erros.message = 'Forneça um email'
                  erros.vericação = true;
                  return erros
            }
            if (senha == '') {
                  erros.message = 'Forneça uma senha'
                  erros.vericação = true;
                  return erros
            }
            this.usuario.email = email;
            this.usuario.senha = senha;   
            try {
                  const { data } = await http.post('/auth', this.usuario);
                  this.usuario.token = data.data.token;
                  this.usuario.perfilUsuario = data.data.perfilUsuario;
                  localStorage.setItem("TOKEN", this.usuario.token);
                  APPCONFIG.authToken = this.usuario.token;
                  //Requisição dos dados                    //Avanço para a pagina inicial
                  // await this.getDados();
                  router.push('/dashboard');
                  return data
            } catch (error) {
                  erros.vericação = true;
                  return error
            }
      }

      async getToken(){
            if(localStorage.getItem('TOKEN') != null){
                  this.usuario.token = (localStorage.getItem('TOKEN') || '');
                  APPCONFIG.authToken = this.usuario.token;  
                  // this.getDados();
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
            let aux;
            aux = await fetch_.getDado('/empresa');
            store.commit('setDadosInterno', {'dado': aux, 'roter_interna': 'empresas'});

            aux = await fetch_.getDado('/canal');
            store.commit('setDadosInterno', {'dado': aux, 'roter_interna': 'canais'});

            aux = await fetch_.getDado('/ambiente');
            store.commit('setDadosInterno', {'dado': aux, 'roter_interna': 'ambientes'});

            aux = await fetch_.getDado('/usuario');
            store.commit('setDadosInterno', {'dado': aux, 'roter_interna': 'usuarios'});

            //  store.commit(log_att = await fetch_.getDado('/atualizacaoecommerce'));
            //  store.commit(log_req = await fetch_.getDado('/atualizacaoecommerce'));
      }
}

const user = new UserDados();

export default user;
