class DadoMapeamentonew {
      empresa= {};
      canal= {};
      produtoErp= '';
      produtoSite= '';
      produtoPai= '';
}

class DadoMapeamentoedit {
      empresa= {};
      canal= {};
      empresa_codigo = -1;
      canal_codigo = -1;
      produtoErp= '';
      produtoSite= '';
      produtoPai= '';
}
class Mapeamento {
      public async _add(dado : DadoMapeamentonew, erros_msg : Array<string>){
            if(Object.keys(dado.empresa).length == 0){
                  erros_msg.push('empresa');
            }
            if(Object.keys(dado.canal).length == 0){
                  erros_msg.push('canal');
            }
            if(dado.produtoErp == ''){
                  erros_msg.push('produtoErp');
            }
            // if(dado.produtoPai == ''){
            //       erros_msg.push('produtoPai');
            // }
            if(dado.produtoSite == ''){
                  erros_msg.push('produtoSite');
            }
      }

      public async _edit(old_dado : DadoMapeamentoedit, new_dado : DadoMapeamentoedit, erros_msg : Array<string>){
            if(Object.keys(new_dado.empresa).length == 0 && new_dado.empresa_codigo == -1){
                  erros_msg.push('empresa');
            }
            if(Object.keys(new_dado.canal).length == 0 && new_dado.canal_codigo == -1){
                  erros_msg.push('canal');
            }
            if(new_dado.produtoErp == ''){
                  erros_msg.push('produtoErp');
            }
            // if(new_dado.produtoPai == ''){
            //       erros_msg.push('produtoPai');
            // }
            if(new_dado.produtoSite == ''){
                  erros_msg.push('produtoSite');
            }
            if(!this.compObject(new_dado, old_dado)){
                  erros_msg.push('igual');
            }
      }
      public async _pesquisa(empresa: object, canal: object, erros: Array<string>, user_type: string){
            if(!empresa['codigo' as keyof typeof empresa] || !canal['codigo' as keyof typeof canal]){
                  if(!empresa['codigo' as keyof typeof empresa] && user_type != 'ROLE_USER')
                        erros.push('empresa')
                  if(!canal['codigo' as keyof typeof canal])
                        erros.push('canal')
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
            
            return saoDiferentes
      }
}

const regra_mapeamento = new Mapeamento();

export default regra_mapeamento;