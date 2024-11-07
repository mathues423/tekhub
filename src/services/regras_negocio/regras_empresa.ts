import fetch_ from "../fetch/requisicao";

class DadoEmpresa {
      descricao= '';
      cnpj= '';
      codigoTek= ''; 
      versaoApiTek= ''; 
      integracoes= [];
}

class Empresa {
      async _add(path : string, dado : DadoEmpresa, erros_msg : Array<string>){
            if(dado.descricao == ''){
                  erros_msg.push('razao');
            }
            if(dado.cnpj == ''){
                  erros_msg.push('cnpj');
            }
            if(dado.codigoTek == ''){
                  erros_msg.push('codigo');
            }
            if(dado.versaoApiTek == ''){
                  erros_msg.push('api');
            }
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }else{
                  try{
                        await Promise.resolve(fetch_.postDado(path,dado));
                  }catch(error){
                        erros_msg.push('400');
                  }
            }
      }

      async _edit(path : string, old_dado : DadoEmpresa, new_dado : DadoEmpresa, id : string, erros_msg : Array<string>){
            if(new_dado.descricao == ''){
                  erros_msg.push('razao');
            }
            if(new_dado.cnpj == ''){
                  erros_msg.push('cnpj');
            }
            if(new_dado.codigoTek == ''){
                  erros_msg.push('codigo');
            }
            if(new_dado.versaoApiTek == ''){
                  erros_msg.push('api');
            }
            if(new_dado == old_dado){
                  erros_msg.push('igual');
            }
            
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }else{
                  try{
                        await Promise.resolve(fetch_.putDado(path, id, new_dado));
                  }catch(error){
                        erros_msg.push('400');
                  }
            }
      }
}

const empresa = new Empresa();

export default empresa;