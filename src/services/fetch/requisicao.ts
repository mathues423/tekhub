import http from '@/services/http';
import { APPCONFIG } from '@/components/constants/Config'

http.interceptors.request.use(
      config => {
            config.headers.authorization = `Bearer ${APPCONFIG.authToken}`
            return config;
      }
)

class fetch_padrao{
      async requisicao_empresa(){
            try {
                  const { data } = await http.get('/empresa');
                  return data.data;
            } catch (error) {
                  console.warn("Erroalert")
                  
            }
      }
}

const fetch_ = new fetch_padrao();

export default fetch_;