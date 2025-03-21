import http from '@/services/http';
import router from '@/router';
import { APPCONFIG } from '@/components/constants/Config'
class ERRO{
      vericação = false;
      message = '';
      type = '';
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
                  erros.type = 'warning';
                  return erros
            }
            if (senha == '') {
                  erros.message = 'Forneça uma senha'
                  erros.vericação = true;
                  erros.type = 'warning';
                  return erros
            }
            this.usuario.email = email;
            this.usuario.senha = senha;
            try {
                  const user_login = {
                        email: this.usuario.email,
                        senha: this.usuario.senha
                  };
                  const { data } = await http.post('/auth', user_login);
                  
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
}

const user = new UserDados();

export default user;
