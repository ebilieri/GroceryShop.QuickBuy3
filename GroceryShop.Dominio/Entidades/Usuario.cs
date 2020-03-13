using GroceryShop.Dominio.Entidades.Documentos;
using GroceryShop.Dominio.Enumeradores;
using System.Collections.Generic;

namespace GroceryShop.Dominio.Entidades
{
    public class Usuario : Entidade
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Nome { get; set; }
        public string SobreNome { get; set; }
        public TipoDocumentoEnum TipoPessoa { get; set; }
        public string Documento { get; set; }
        public bool EhAdministrador { get; set; }

        /// <summary>
        /// Usuario pode ter um ou mais pedidos
        /// </summary>
        public virtual ICollection<Pedido> Pedidos { get; set; }

        public override void Validate()
        {
            LimparMensagemValidacao();

            if (string.IsNullOrWhiteSpace(Email))
                AdicionarMensagem("Email é de preenchimento obrigatório");

            if (string.IsNullOrWhiteSpace(Senha))
                AdicionarMensagem("Senha é de preenchimento obrigatório");

            if ((int)TipoPessoa <= 0)
                AdicionarMensagem("Informe o tipo de pessoa");

            if (string.IsNullOrWhiteSpace(Documento))
                AdicionarMensagem("Documento é de preenchimento obrigatório");

            if (!string.IsNullOrWhiteSpace(Documento))
            {
                if (TipoPessoa == TipoDocumentoEnum.PessoaFisica && !CpfValidacao.IsCpf(Documento))
                    AdicionarMensagem("Cpf Inválido");

                if (TipoPessoa == TipoDocumentoEnum.PessoaJuridica && !CnpjValidacao.IsCnpj(Documento))
                    AdicionarMensagem("Cnpj Inválido");
            }
        }
    }

}
