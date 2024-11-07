import http from '@/services/http';
import { APPCONFIG } from '@/components/constants/Config'

http.interceptors.request.use(
      config => {
            config.headers.authorization = `Bearer ${APPCONFIG.authToken}`
            return config;
      }
)

class fetch_padrao{

      /**
       * Pega um conjunto de dados do banco de dados
       * 
       * @example 
       *   getDado('/empresa') // object | null
       * 
       * @param   {string} path    
       * @returns {object | null}
       */
      async getDado(path : string){
            try {
                  const { data } = await http.get(path);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }

      /**
       * Pega um dado unico do banco de dados
       * 
       * OBS: Sem o ID no path
       * @example 
       *   getDado_ID('/empresa', '99') // object | null
       * 
       * @param   {string} path   
       * @param   {string} id   
       * @returns {object | null}
       */
      async getDado_ID(path : string, id : string){
            try {
                  const { data } = await http.get(path+'/'+id);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }

      /**
       * Posta o dado no banco de dados
       * 
       * @example 
       *   postDado('/empresa', {'codigo': 'x', ...}) // object | null
       * 
       * @param   {string} path   
       * @param   {object} dado   
       * @returns {object | null}
       */
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

      /**
       * Altera o dado no banco de dados.
       * 
       * OBS:   Aki o objeto passado não precisa de possuir o mesmo codigo do que o parametro id,
       * e Sem o ID no path.
       * @example 
       *   putDado('/empresa', '99' ,  {'codigo': '99', ...}) // object | null
       * 
       * @param   {string} path   
       * @param   {string} id   
       * @param   {object} dado   
       * @returns {object | null}
       */
      async putDado(path : string, id : string, dado : object){
            try {
                  const { data } = await http.put(path+'/'+id, dado);
                  return data.data;
            } catch (error) {
                  console.warn(error)
            }
      }

      /**
       * Remove o dado do banco de dados.
       * 
       * OBS: Sem o ID no path
       * @example 
       *   delDado('/empresa', '99') // object | null
       * 
       * @param   {string} path   
       * @param   {string} id   
       * @returns {object | null}
       */
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