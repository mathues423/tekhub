import router from "@/router";
import fetch_ from "../fetch/requisicao";

class Empresa {
      descricao= '';
      cnpj= '';
      codigoTek= ''; 
      versaoApiTek= ''; 
      integracoes= [];
}

class newEmpresa{
      async _add(path : string, dado : Empresa, erros_msg : Array<string>){
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
                        await fetch_.postDado(path,dado);
                        router.push('/empresas');
                  }catch(error){
                        erros_msg.push('400');
                  }
            }
      }
}

const empresa = new newEmpresa();

export default empresa;