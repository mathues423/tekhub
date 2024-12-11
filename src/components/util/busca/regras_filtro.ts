class DadoFiltro {
      campo = {key_body: '', filtro:{tipo_obj: ''}};
      operacao = {opc: ''};
      valor = '';
}
class Filtro {
      erros_obj = {campo: false, operacao: false, valor: false, valor_incompativel: false};

      _verifica(dado : DadoFiltro, erros_msg : Array<string>): {campo: boolean, operacao: boolean, valor: boolean, valor_incompativel: boolean}{
            this.erros_obj = {campo: false, operacao: false, valor: false, valor_incompativel: false};
            
            if(dado.campo.filtro.tipo_obj == ''){
                  erros_msg.push('campo')
                  this.erros_obj.campo = true;
            }

            if (dado.campo.filtro['tipo_filtro' as  keyof typeof dado.campo.filtro] == 'all') {
                  if(dado.campo.key_body == ''){
                        erros_msg.push('campo');
                        this.erros_obj.campo = true;
                  }
                  if(dado.operacao.opc == ''){
                        erros_msg.push('operacao');
                        this.erros_obj.operacao = true;
                  }
                  if(dado.valor == ''){
                        erros_msg.push('valor');
                        this.erros_obj.valor = true;
                  }
            }
            if (dado.campo.filtro['tipo_filtro' as  keyof typeof dado.campo.filtro] == 'pre') {
                  if(dado.campo.key_body == ''){
                        erros_msg.push('campo');
                        this.erros_obj.campo = true;
                  }
            }

            console.log('Teste', dado.campo);
            
            if (dado.campo.filtro.tipo_obj == 'Number' && Number.isNaN(parseInt(dado.valor))) {
                  erros_msg.push('valor');
                  this.erros_obj.valor_incompativel = true;
            }
            return this.erros_obj;
      }
}

const filtro = new Filtro();

export default filtro;