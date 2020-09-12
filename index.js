//Requisição de bibliotecas
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const server = new Koa();

const pacProdutos = require("./produtos.js")


//Declarando variáveis
const produtos = [];

//Convertendo informação
server.use(bodyparser())

//Criando servidor
server.use(ctx => {
  //Procura das rotas
    if(ctx.url.includes("/produtos")) {
        if(ctx.url.includes("/produtos/:")) {
            ctx.body = 'Entrou aqui'
        } else if(ctx.method === 'POST') {
          //ADICIONAR FILTRO PARA NÃO DEIXAR O USUARIO CRIAR UM PRODUTO VAZIO
            produtos.push({
                id: pacProdutos.geraId(produtos),
                nome: ctx.request.body.nome,
                quant: Number(ctx.request.body.quant),
                valor: Number(ctx.request.body.valor),
                deletado: false
            })
            ctx.status = 201;
            ctx.body = {
              status: "Sucesso!",
              dados: {
                mensagem: "Produto registrado com sucesso.",
                conteudo: produtos[produtos.length - 1]
              },
            };
        } else if(ctx.method === 'GET') {
          const produtosOrganizados = pacProdutos.mostraProdutos(produtos);

          if(!produtosOrganizados) {
            ctx.status = 404;
            ctx.body = {
              status: "Erro",
              dados: {
                mensagem: "Conteúdo não encontrado.",
              },
            };
          } else {
            if(produtos.length === 0) {
              ctx.status = 404;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Conteúdo não encontrado.",
                }
              };
            } else {
              ctx.status = 201;
              ctx.body = {
                status: "Sucesso!",
                dados: {
                  mensagem: "Produtos encontrados com sucesso.",
                  conteudo: produtosOrganizados
                }
            }
          }
        }
      }
    } else {
        ctx.status = 404;
        ctx.body = {
          status: "Erro",
          dados: {
            mensagem: "Conteúdo não encontrado.",
          },
        };
    }
    

})

server.listen(8081, () => {
    console.log("Server rodando na porta 8081")
})

