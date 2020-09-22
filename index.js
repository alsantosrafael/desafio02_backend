//Requisição de bibliotecas
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");

const server = new Koa();
//Pacotes de funções externas feitas por mim
const pacProdutos = require("./produtos.js");
const pacPedidos = require("./pedidos.js");

//Declarando variáveis de lista
const produtos = [];
const pedidos = [];

//Convertendo informação
server.use(bodyparser());

//Criando servidor
server.use((ctx) => {
  //Procura das rotas
  if (ctx.url.includes("/produtos")) {
    if (ctx.url.includes("/produtos/:")) {
      const id = Number(ctx.url.split("/:")[1]);
      const produtoProcurado = pacProdutos.procuraProduto(id, produtos);

      if (!id) {
        ctx.status = 400;
        ctx.body = {
          status: "Erro",
          dados: {
            mensagem: "Requisição mal-formatada.",
            descricao: "Ausência ou inexistência de id.",
          },
        };
      } else {
        if (!produtoProcurado) {
          ctx.status = 404;
          ctx.body = {
            status: "Erro",
            dados: {
              mensagem: "Produto não encontrado.",
            },
          };
        } else {
          if (ctx.method === "GET") {
            if (!produtoProcurado) {
              ctx.status = 404;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Produto não encontrado.",
                },
              };
            } else {
              ctx.status = 200;
              ctx.body = {
                status: "Sucesso!",
                dados: {
                  mensagem: "Produto encontrado.",
                  conteudo: produtoProcurado,
                },
              };
            }
          } else if (ctx.method === "DELETE") {
            if (produtos[id - 1].deletado) {
              ctx.status = 404;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Produto não encontrado.",
                  descricao: "Produto já deletado ou não cadastrado.",
                },
              };
            } else {
              produtos[id - 1].deletado = true;
              ctx.status = 200;
              ctx.body = {
                status: "Sucesso!",
                dados: {
                  mensagem: "Produto deletado com sucesso.",
                  conteudo: produtoProcurado,
                },
              };
            }
          } else if (ctx.method === "PUT") {
            if (produtos[id - 1].deletado) {
              ctx.status = 404;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Produto não encontrado.",
                  descricao: "Produto já deletado ou não cadastrado.",
                },
              };
            } else {
              (produtos[id - 1].nome = !ctx.request.body.nome
                ? produtos[id - 1].nome
                : ctx.request.body.nome),
                (produtos[id - 1].valor = !ctx.request.body.valor
                  ? produtos[id - 1].valor
                  : Number(ctx.request.body.valor)),
                (produtos[id - 1].quant = !ctx.request.body.valor
                  ? produtos[id - 1].quant
                  : Number(ctx.request.body.quant));
              ctx.status = 200;
              ctx.body = {
                status: "Sucesso!",
                dados: {
                  mensagem: "Produto alterado com sucesso.",
                  conteudo: produtos[id - 1],
                },
              };
            }
          } else {

            ctx.status = 400;
            ctx.body = {
              status: "Erro",
              dados: {
                mensagem: "Requisição mal-formatada.",
                descricao: "Ausência ou inexistência de id.",
              },
            };
          }
        }
      }
    } else if (ctx.method === "POST") {

      produtos.push({
        id: pacProdutos.geraId(produtos),
        nome: ctx.request.body.nome,
        quant: Number(ctx.request.body.quant),
        valor: Number(ctx.request.body.valor),
        deletado: false,
      });
      ctx.status = 201;
      ctx.body = {
        status: "Sucesso!",
        dados: {
          mensagem: "Produto registrado com sucesso.",
          conteudo: produtos[produtos.length - 1],
        },
      };
    } else if (ctx.method === "GET") {
      const produtosOrganizados = pacProdutos.mostraProdutos(produtos);
      console.log(produtosOrganizados)
      if (!produtosOrganizados) {
        ctx.status = 404;
        ctx.body = {
          status: "Erro",
          dados: {
            mensagem: "Conteúdo não encontrado.",
            descricao: "Não há produtos cadastrados.",
          },
        };
      } else {
        if (produtos.length === 0) {
          ctx.status = 404;
          ctx.body = {
            status: "Erro",
            dados: {
              mensagem: "Conteúdo não encontrado.",
              descricao: "Não há produtos cadastrados",
            },
          };
        } else {
          if (produtosOrganizados.length === 0) {
            ctx.status = 404;
            ctx.body = {
              status: "Erro",
              dados: {
                mensagem: "Conteúdo não encontrado.",
                descricao: "Não há produtos cadastrados",
              },
            };
          } else {
            ctx.status = 200;
            ctx.body = {
              status: "Sucesso!",
              dados: {
                mensagem: "Produtos encontrados.",
                conteudo: produtosOrganizados,
              },
            };
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
  } else if (ctx.url.includes("/pedidos")) {
    if(ctx.url.includes("/pedidos/:")) {
      const id = Number(ctx.url.split("/:")[1])
      const pedidoProcurado = pacPedidos.procuraPedido(id, pedidos)
      if(!id) {
        ctx.status = 400;
        ctx.body = {
          status: "Erro",
          dados: {
            mensagem: "Requisição mal-formatada.",
            descricao: "Ausência ou inexistência de id.",
          },
        };
      } else {
          if(!pedidoProcurado) {
            ctx.status = 404;
            ctx.body = {
              status: "Erro",
              dados: {
                mensagem: "Pedido não encontrado.",
              },
            };
          } else {
            if(ctx.method === 'GET') {
                ctx.status = 200;
                ctx.body = {
                  status: "Sucesso!",
                  dados: {
                    mensagem: "Pedido encontrado.",
                    conteudo: pedidoProcurado,
                  },
                };
            } else if(ctx.method === 'PUT') {

              const prod = pacProdutos.procuraProduto(Number(ctx.request.body.idProduto), produtos)
              const ped = pacPedidos.procuraPedido(Number(ctx.url.split("/:")[1]), pedidos)
              const adicionado = pacPedidos.addProduto(prod, Number(ctx.request.body.quant), produtos, ped.id, ped, pedidos)

              const estado = ctx.request.body.estado;
              if(!prod && !estado) {
                 ctx.status = 404
                 ctx.body = {
                   status: "Erro",
                   dados: {
                     mensagem: "Produto não encontrado.",
                   },
                 };
                }else {
                  if(!ped && !estado) {
                   ctx.status = 404
                   ctx.body = {
                    status: "Erro",
                    dados: {
                        mensagem: "Pedido não encontrado."
                      }
                    }
                  } else {
                    if(!adicionado && !estado) {
                      ctx.status = 400
                      ctx.body = {
                       status: "Erro",
                       dados: {
                           mensagem: "Pedido mal-formatado.",
                           descricao: "Ausência de dados"
                         }
                       }
                    } else {
                      if(!estado && adicionado && pedidos[ped.id-1].estado === 'incompleto'){
                        ctx.status = 200;
                        pedidos[ped.id-1].valorTotal = pacPedidos.calculaTotal(ped.id, pedidos)
                        ctx.body = {
                          status: "Sucesso!",
                          dados: {
                            mensagem: "Produto adicionado ao pedido com sucesso.",
                            conteudo: pedidos[ped.id-1]
                          },
                        };
                      } else if(!adicionado && estado) {
                        ctx.status = 200;
                        pedidos[ped.id-1].estado = estado
                        ctx.body = {
                          status: "Sucesso!",
                          dados: {
                            mensagem: "Pedido teve seu status alterado com sucesso.",
                            conteudo: pedidos[ped.id-1]
                          },
                        };
                      } else if(pedidos[ped.id-1].estado === 'incompleto') {
                        ctx.status = 200;
                        pedidos[ped.id-1].estado = estado
                        pedidos[ped.id-1].valorTotal = pacPedidos.calculaTotal(ped.id, pedidos)
                        ctx.body = {
                          status: "Sucesso!",
                          dados: {
                            mensagem: "Produto adicionado ao pedido e estado alterado com sucesso.",
                            conteudo: pedidos[ped.id-1]
                          },
                        };
                      } else {
                        ctx.status = 400
                        ctx.body = {
                         status: "Erro",
                         dados: {
                             mensagem: "Pedido mal-formatado.",
                             descricao: "Adiciona-se itens ao pedido apenas enquanto seu estado for 'incompleto'."
                           }
                         }
                      }
                    }
                  }
                }
            } else if(ctx.method === 'DELETE') {
              if(pedidos[id-1].deletado === true) {
                ctx.status = 404
                ctx.body = {
                  status: "Erro",
                  dados: {
                    mensagem: "Pedido não encontrado.",
                    descri: "Pedido nunca cadastrado ou já foi deletado."
                  },
                };
              } else {
                pedidos[id-1].deletado = true
                ctx.status = 200;
                    ctx.body = {
                      status: "Sucesso!",
                      dados: {
                        mensagem: "Pedido deletado com sucesso.",
                        conteudo: pedidos[id-1]
                      },
                    };
                  }
            } else {
              ctx.status = 400;
              ctx.body = {
                status: "Erro",
                dados: {
                  mensagem: "Requisição mal-formatada.",
                  descricao: "Ausência ou inexistência de id.",
                },
              };
            }
          }
        }
    }else if (ctx.method === "POST") {

      pedidos.push({
        id: pacPedidos.geraId(pedidos),
        produtos: [],
        estado: "incompleto",
        idCliente: Math.floor(Math.random() * 100),
        deletado: false,
        valorTotal: 0
      });
      ctx.status = 201;
      ctx.body = {
        status: "Sucesso!",
        dados: {
          mensagem: "Pedido registrado com sucesso.",
          conteudo: pedidos[pedidos.length - 1],
        },
      };
    } else if (ctx.method === "GET") {
      const query = ctx.query.estado;
      const pedidosAtivos = pacPedidos.mostraPedidos(pedidos, query);
      if (!pedidosAtivos) {
        ctx.status = 404;
        ctx.body = {
          status: "Erro",
          dados: {
            mensagem: "Conteúdo não encontrado.",
            descricao: "Não há pedidos cadastrados.",
          },
        };
      } else {
        if (pedidosAtivos.length === 0 || pedidos.length === 0) {
          ctx.status = 404;
          ctx.body = {
            status: "Erro",
            dados: {
              mensagem: "Conteúdo não encontrado.",
              descricao: "Não há pedidos cadastrados.",
            },
          };
        } else {
          if(query !== undefined && (query !== 'entregue' || query !== 'pago' || query !== 'processando' || query !== 'cancelado')) {
            ctx.status = 400;
            ctx.body = {
              status: "Erro",
              dados: {
                mensagem: "Pedido mal-formatado.",
              },
            };
          } else {
            ctx.status = 200;
            ctx.body = {
              status: "Sucesso!",
              dados: {
                mensagem: "Pedidos encontrados.",
                conteudo: pedidosAtivos,
              },
            };
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
});
//Liberando porta para servidor
server.listen(8081, () => {
  console.log("Server rodando na porta 8081.");
});
