import http from '@/services/http';
/* eslint-disable */
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
                  return data;
            } catch (error) {             
                  throw error;
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
                  return data;
            } catch (error) {                
                  throw error;
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
                  return data;
            } catch (error) {               
                  throw error;
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
                  return data;
            } catch (error) {              
                  throw error;
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
                  return data;
            } catch (error) {              
                  throw error;
            }
      }

      /**
       * Pega os dados do banco com paginação.
       * 
       * @example 
       *   getDadoPaginado('/empresa', '?pagina=99&...') // object | null
       * 
       * @param   {string} path   
       * @param   {string} request   
       * @returns {object | null}
       */
      async getDadoPaginado(path : string, request : string){
            try {
                  const { data } = await http.get(path+'/'+request);
                  return data;
            } catch (error) {                
                  throw error;
            }
      }
}

const fetch_ = new fetch_padrao();

export default fetch_;