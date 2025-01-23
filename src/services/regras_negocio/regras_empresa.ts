class DadoEmpresa {
      descricao= '';
      cnpj= '';
      codigoTek= ''; 
      versaoApiTek= ''; 
      integracoes= [];
}

class Empresa {
      async _add(dado : DadoEmpresa, erros_msg : Array<string>){
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
      }

      async _edit(old_dado : DadoEmpresa, new_dado : DadoEmpresa, erros_msg : Array<string>){
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
            if(this.compObject(old_dado, new_dado)){
                  erros_msg.push('igual');
            }
      }
      private compObject(old_obj: object, new_ob: object): boolean {
            const chave_old = Object.keys(old_obj),
                  chave_new = Object.keys(new_ob);
                  
            if (chave_old.length != chave_new.length) {
                  return true;
            }
            
            const saoDiferentes = chave_old.some((chave) => {
                  return old_obj[chave as keyof typeof old_obj] !== new_ob[chave as keyof typeof new_ob];
            });
            
            return !saoDiferentes
      }
}

const empresa = new Empresa();

export default empresa;