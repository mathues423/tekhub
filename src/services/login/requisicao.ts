import http from '@/services/http';
import router from '@/router';
import { APPCONFIG } from '@/components/constants/Config'
/* eslint-disable */
class UserDados {
      usuario = {
            email: '',
            senha: '',
            token: '',
            perfilUsuario: '',
      }

      async loginReq(email: string, senha: string) {
            this.usuario.email = email;
            this.usuario.senha = senha;            
            try {
                  const { data } = await http.post('/auth', this.usuario);
                  this.usuario.token = data.data.token;
                  this.usuario.perfilUsuario = data.data.perfilUsuario;
                  localStorage.setItem("TOKEN", this.usuario.token);
                  APPCONFIG.authToken = this.usuario.token;

                  router.push('/dashboard');

                  // Avançar para a pagina conteudo
            } catch (error) {
                  console.warn(error)
            }
      }

      async getToken(){
            if(localStorage.getItem('TOKEN') != null){
                  this.usuario.token = (localStorage.getItem('TOKEN') || '');
                  APPCONFIG.authToken = this.usuario.token;  
                  router.push('/dashboard');
            }else{
                  router.push('/');
            }
      }

      async logOut(){
            localStorage.removeItem('TOKEN');
            router.push('/');
      }
}

const user = new UserDados();

export default user;
