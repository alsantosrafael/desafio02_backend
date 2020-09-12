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

          const id = Number(ctx.url.split("/:")[1])
          const produtoProcurado = pacProdutos.procuraProduto(id, produtos)
          if(!id) {
            ctx.status = 400;
            ctx.body = {
              status: "Erro",
              dados: {
                mensagem: "Requisição mal-formatada.",
                descricao:"Ausência ou inexistência de id."
              }
            }
          } else {
            if(!produtoProcurado) {
              ctx.status = 404;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Produto não encontrado.",
                }
              }
            } else {
              if(ctx.method === 'GET') {
                if(!produtoProcurado.prod) {
                  ctx.status = 404;
                  ctx.body = {
                    status: "Erro",
                    dados: {
                      mensagem: "Produto não encontrado.",
                    }
                  }
                } else {
                  ctx.status = 200;
                  ctx.body = {
                    status: "Sucesso!",
                    dados: {
                      mensagem: "Produto encontrado.",
                      conteudo: produtoProcurado.prod
                    }
                  }
                }
            } else if (ctx.method === 'DELETE') {
              if(produtos[produtoProcurado.index].deletado){
                ctx.status = 404;
                ctx.body = {
                  status: "Erro",
                  dados: {
                    mensagem: "Produto não encontrado.",
                    descricao: "Produto já deletado ou não cadastrado."
                  }
                }
              } else {
                produtos[produtoProcurado.index].deletado = true
                ctx.status = 200;
                ctx.body = {
                  status: "Sucesso!",
                  dados: {
                    mensagem: "Produto deletado com sucesso.",
                    conteudo: produtoProcurado.prod
                  }
                }
              }
            } else if(ctx.method === 'PUT') {
              if(produtos[produtoProcurado.index].deletado){
                ctx.status = 404;
                ctx.body = {
                  status: "Erro",
                  dados: {
                    mensagem: "Produto não encontrado.",
                    descricao: "Produto já deletado ou não cadastrado."
                  }
                }
              } else {
                (produtos[produtoProcurado.index].nome = !ctx.request.body.nome 
                  ? produtos[produtoProcurado.index].nome
                  : ctx.request.body.nome),
                (produtos[produtoProcurado.index].valor = !ctx.request.body.valor
                  ? produtos[produtoProcurado.index].valor
                  : ctx.request.body.valor),
                (produtos[produtoProcurado.index].quant = !ctx.request.body.valor
                  ? produtos[produtoProcurado.index].quant
                  : ctx.request.body.quant)
                  ctx.status = 200
                  ctx.body = {
                    status: "Sucesso!",
                    dados: {
                      mensagem: "Produto alterado com sucesso.",
                      conteudo: produtos[produtoProcurado.index]
                    }
                  }
                }
            } else {//NÃO SEI SE ESSE ELSE É NECESSÁRIO
              ctx.status = 400;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Requisição mal-formatada.",
                  descricao:"Ausência ou inexistência de id."
                }
              }
            }
          }
        }
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
                descricao:"Não há produtos cadastrados."
              },
            };
          } else {
            if(produtos.length === 0) {
              ctx.status = 404;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Conteúdo não encontrado.",
                  descricao: "Não há produtos cadastrados"
                }
              };
            } else {//TENDO PROBLEMAS COM O RETORNO DOS PRODUTOS ELE RETORNA os NULL
              if(produtosOrganizados.length === 0) {
                ctx.status = 404;
                ctx.body = {
                  status: "Erro",
                  dados: {
                    mensagem: "Conteúdo não encontrado.",
                    descricao: "Não há produtos cadastrados"
                  }
                };
              } else {
                ctx.status = 201;
                ctx.body = {
                  status: "Sucesso!",
                  dados: {
                    mensagem: "Produtos encontrados.",
                    conteudo: produtosOrganizados
                  }
                }
              }
            }
          }
      } else {
        ctx.status = 400;
        ctx.body = {
          status: "Erro",
          dados: {
            mensagem: "Pedido mal-formatado.",
          },
        };
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

