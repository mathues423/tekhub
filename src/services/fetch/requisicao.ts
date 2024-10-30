import http from '@/services/http';
import { APPCONFIG } from '@/components/constants/Config'

http.interceptors.request.use(
      config => {
            config.headers.authorization = `Bearer ${APPCONFIG.authToken}`
            return config;
      }
)

class fetch_padrao{
      // Gets
      async getDado(path : string){
            try {
                  const { data } = await http.get(path);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }
      async getDado_ID(path : string, id : string){
            try {
                  const { data } = await http.get(path+'/'+id);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }
      //Adição ao banco
      async postDado(path : string, dado : object){
            try {
                  const { data } = await http.post(path, dado);
                  return data.data;
            } catch (error) {
                  console.warn(error);
                  const { data } = await http.post(path, dado);
                  return data;
            }
      }
      //Alteração no banco
      async putDado(path : string, id : string, dado : object){
            try {
                  const { data } = await http.put(path+'/'+id, dado);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }
      //Remoção do banco
      async delDado(path : string, id : string){
            try {
                  const { data } = await http.delete(path+'/'+id);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }
}

const fetch_ = new fetch_padrao();

export default fetch_;