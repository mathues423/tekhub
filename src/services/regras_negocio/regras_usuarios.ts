class DadoUsuario {
      email='';
      empresaCodigo= -1;
      senha='';
      perfil= '';
}

class Usuario {
      async _add(dado : DadoUsuario, erros_msg : Array<string>){ 
            if (dado.email == '') {
                  erros_msg.push('email');
            }
            if (dado.senha == '') {
                  erros_msg.push('senha');
            }
            if (dado.perfil == '') {
                  erros_msg.push('perfil');
            }
            if (dado.empresaCodigo == -1) {
                  erros_msg.push('empresa');
            }
            if (erros_msg.length != 0) {
                  console.warn("ERRO: " , erros_msg);
            }
      }

      async _edit(old_dado : DadoUsuario, new_dado : DadoUsuario, erros_msg : Array<string>){
            if (new_dado.email == '') {
                  erros_msg.push('email');
            }
            if (new_dado.senha == '') {
                  erros_msg.push('senha');
            }
            if (new_dado.perfil == '') {
                  erros_msg.push('perfil');
            }
            if (new_dado.empresaCodigo == -1) {
                  erros_msg.push('empresa');
            }
            
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

const usuarios = new Usuario();

export default usuarios;