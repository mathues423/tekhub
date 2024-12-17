class DadoMapeamento {
      empresa= {};
      canal= {};
      produtoErp= '';
      produtoSite= '';
      produtoPai= '';
}

class Mapeamento {
      public async _add(dado : DadoMapeamento, erros_msg : Array<string>){
            console.log('Dado ',dado);
            console.log('Erro ', erros_msg);
            
            console.log('1if ',Object.keys(dado.empresa).length == 0);
            console.log('2if ',Object.keys(dado.canal).length == 0);
            console.log('3if ',dado.produtoErp == '');
            console.log('4if ',dado.produtoSite == '');
            
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

            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }
      }

      public async _edit(old_dado : DadoMapeamento, new_dado : DadoMapeamento, erros_msg : Array<string>){
            // console.log('newEmpresa ', new_dado.empresa);
            // console.log('oldEmpresa ', old_dado.empresa);
            // console.log('obj_vazio ', obj_vazio);
            // console.log('if_empresa ', Object.keys(new_dado.empresa).length);
            // console.log('if_canal ', Object.keys(new_dado.canal).length);
            // console.log('if_igual ', this.compObject(new_dado, old_dado));
            
            if(Object.keys(new_dado.empresa).length == 0){
                  erros_msg.push('empresa');
            }
            if(Object.keys(new_dado.canal).length == 0){
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
            if(this.compObject(new_dado, old_dado)){
                  erros_msg.push('igual');
            }
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }
            
      }
      public async _pesquisa(empresa: object, canal: object, erros: Array<string>){
            if(!empresa['codigo' as keyof typeof empresa] || !canal['codigo' as keyof typeof canal]){
                  if(!empresa['codigo' as keyof typeof empresa])
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
            
            return !saoDiferentes
      }
}

const regra_mapeamento = new Mapeamento();

export default regra_mapeamento;