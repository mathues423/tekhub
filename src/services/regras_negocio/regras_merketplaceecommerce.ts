// class DadoMarketplaceEcommerce {
//       // codigo= -1; //codigo do dado

//       empresaCodigo= -1;

//       ambienteCodigo= -1;

//       usuario= "";

//       senha= "";

//       token= "";

//       appClienteId= "";

//       appClienteSecret= "";

//       urlRedirecionamento= "";
      
//       webserviceApi= "";

//       variacaoPrincipal= "";

//       transformaVariacaoEmProdutoSimples= false;

//       modoDebug= false;

//       versaoEcommerce= "";
      
//       usuarioApiCodigo= -1;

//       atributosDefault= "";
// }

class MarketplaceEcommerce {
      public async _add(dado : object, erros_msg : Array<string>){
            if(dado['empresaCodigo' as keyof typeof dado] == -1){
                  erros_msg.push('empresa');
            }
            if(dado['ambienteCodigo' as keyof typeof dado] == -1){
                  erros_msg.push('ambiente');
            }
            if (dado['token' as keyof typeof dado]== "") {
                  delete dado['token' as keyof typeof dado];
            }
            if (dado['appClienteId' as keyof typeof dado]== "") {
                  delete dado['appClienteId' as keyof typeof dado];
            }
            if (dado['appClienteSecret' as keyof typeof dado]== "") {
                  delete dado['appClienteSecret' as keyof typeof dado];
            }
            if (dado['urlRedirecionamento' as keyof typeof dado]== "") {
                  delete dado['urlRedirecionamento' as keyof typeof dado];
            }
            if (dado['webserviceApi' as keyof typeof dado]== "") {
                  delete dado['webserviceApi' as keyof typeof dado];
            }
            if (dado['variacaoPrincipal' as keyof typeof dado]== "") {
                  delete dado['variacaoPrincipal' as keyof typeof dado];
            }
            if (dado['versaoEcommerce' as keyof typeof dado]== "") {
                  delete dado['versaoEcommerce' as keyof typeof dado];
            }
            if (dado['usuarioApiCodigo' as keyof typeof dado]== -1) {
                  delete dado['usuarioApiCodigo' as keyof typeof dado];
            }
            if (dado['atributosDefault' as keyof typeof dado]== "") {
                  delete dado['atributosDefault' as keyof typeof dado];
            }
            
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }
      }

      public async _edit(old_dado : object, new_dado : object, erros_msg : Array<string>){
            
            if(new_dado['empresaCodigo' as keyof typeof new_dado] == -1){
                  erros_msg.push('empresa');
            }
            if(new_dado['ambienteCodigo' as keyof typeof new_dado] == -1){
                  erros_msg.push('ambiente');
            }
            if (new_dado['token' as keyof typeof new_dado]== "") {
                  delete new_dado['token' as keyof typeof new_dado];
            }
            if (new_dado['appClienteId' as keyof typeof new_dado]== "") {
                  delete new_dado['appClienteId' as keyof typeof new_dado];
            }
            if (new_dado['appClienteSecret' as keyof typeof new_dado]== "") {
                  delete new_dado['appClienteSecret' as keyof typeof new_dado];
            }
            if (new_dado['urlRedirecionamento' as keyof typeof new_dado]== "") {
                  delete new_dado['urlRedirecionamento' as keyof typeof new_dado];
            }
            if (new_dado['webserviceApi' as keyof typeof new_dado]== "") {
                  delete new_dado['webserviceApi' as keyof typeof new_dado];
            }
            if (new_dado['variacaoPrincipal' as keyof typeof new_dado]== "") {
                  delete new_dado['variacaoPrincipal' as keyof typeof new_dado];
            }
            if (new_dado['versaoEcommerce' as keyof typeof new_dado]== "") {
                  delete new_dado['versaoEcommerce' as keyof typeof new_dado];
            }
            if (new_dado['usuarioApiCodigo' as keyof typeof new_dado]== -1) {
                  delete new_dado['usuarioApiCodigo' as keyof typeof new_dado];
            }
            if (new_dado['atributosDefault' as keyof typeof new_dado]== "") {
                  delete new_dado['atributosDefault' as keyof typeof new_dado];
            }
            
            if(this.compObject(new_dado, old_dado)){
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

const regra_marketplace = new MarketplaceEcommerce();

export default regra_marketplace;