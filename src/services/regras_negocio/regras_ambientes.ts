class DadoAmbiente {
      ambiente= '';
      canalAlias= ''; 
      status= ''
      url= '';
      versao= ''; 
}

class Ambiente {
      // Não esta adicionando canal e sim substituindo um per existente
      async _add(dado : DadoAmbiente, erros_msg : Array<string>){ 
            if(dado.ambiente == ''){
                  erros_msg.push('ambiente');
            }
            if(dado.canalAlias == ''){
                  erros_msg.push('canalAlias');
            }
            // if(dado.status == ''){
            //       erros_msg.push('status');
            // }
            if(dado.url == ''){
                  erros_msg.push('url')
            }
            if(dado.versao == ''){
                  erros_msg.push('versao');
            }
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }
      }

      async _edit(old_dado : DadoAmbiente, new_dado : DadoAmbiente, erros_msg : Array<string>){
            if(new_dado.ambiente == ''){
                  erros_msg.push('ambiente');
            }
            if(new_dado.canalAlias == ''){
                  erros_msg.push('canalAlias');
            }
            // if(new_dado.status == ''){
            //       erros_msg.push('status');
            // }
            if(new_dado.url == ''){
                  erros_msg.push('url')
            }
            if(new_dado.versao == ''){
                  erros_msg.push('versao');
            }
            console.log('old ', old_dado);
            console.log('new ', new_dado);
            
            if(this.compObject(old_dado, new_dado)){
                  erros_msg.push('igual');
            }
            
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
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

const ambiente = new Ambiente();

export default ambiente;