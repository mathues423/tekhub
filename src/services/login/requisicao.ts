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
      user_type = '';

      async loginReq(email: string, senha: string, erros : ERRO, lembrar: Boolean) {
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
            console.log('S>', lembrar);
            try {
                  const { data } = await http.post('/auth', this.usuario);
                  
                  this.usuario.token = data.data.token;
                  this.usuario.perfilUsuario = data.data.perfilUsuario;
                  if (lembrar) {
                        localStorage.setItem("TOKEN", this.usuario.token);
                  }
                  APPCONFIG.authToken = this.usuario.token;

                  this.user_type = data.data.perfilUsuario;
                  if (lembrar) {
                        localStorage.setItem("USER_TYPE", this.user_type);
                  }
                  APPCONFIG.authType = this.user_type;
                  //Requisição dos dados                    //Avanço para a pagina inicial
                  // await this.getDados();
                  router.push('/dashboard');
                  return data
            } catch (error) {
                  throw error
            }
      }

      async getToken(){
            if(localStorage.getItem('TOKEN') != null){
                  this.usuario.token = (localStorage.getItem('TOKEN') || '');
                  APPCONFIG.authToken = this.usuario.token;  

                  this.user_type = (localStorage.getItem('USER_TYPE') || '');
                  APPCONFIG.authType = this.user_type;
                  // this.getDados();
                  if (router.options.history.state['current' as keyof typeof router.options.history.state]) {
                        const rota = (router.options.history.state['current' as keyof typeof router.options.history.state] || '/dashboard') as string;
                        router.push(rota);
                  }else{
                        router.push('/dashboard')
                  }
            }else{
                  router.push('/');
            }
      }

      async logOut(){
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('USER_TYPE');
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
