class DadoCanal {
      alias= '';
      aliastekprot= ''; 
      canalAssociado= -1; //?
      descricao= '';
      tipo= ''; 
}

class Canal {
      // Não esta adicionando canal e sim substituindo um per existente
      async _add(dado : DadoCanal, erros_msg : Array<string>){ 
            if(dado.descricao == ''){
                  erros_msg.push('descricao');
            }
            if(dado.alias == ''){
                  erros_msg.push('alias');
            }
            // if(dado.aliastekprot == ''){
            //       erros_msg.push('alias_tekprot');
            // }
            if(dado.tipo == ''){
                  erros_msg.push('tipo');
            }
            // if(dado.canalAssociado < 1){
            //       erros_msg.push('codigo')
            // }
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }
      }

      async _edit(old_dado : DadoCanal, new_dado : DadoCanal, erros_msg : Array<string>){
            if(new_dado.descricao == ''){
                  erros_msg.push('descricao');
            }
            if(new_dado.alias == ''){
                  erros_msg.push('alias');
            }
            // if(new_dado.aliastekprot == ''){
            //       erros_msg.push('alias_tekprot');
            // }
            if(new_dado.tipo == ''){
                  erros_msg.push('tipo');
            }
            // if(new_dado.canalAssociado < 1){
            //       erros_msg.push('codigo')
            // }
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

const canal = new Canal();

export default canal;