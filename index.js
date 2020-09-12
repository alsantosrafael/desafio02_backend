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
    if(ctx.url.includes("/produtos")) {

        if(ctx.url.includes("/produtos/:")) {
            ctx.body = 'Entrou aqui'
        } else if(ctx.method === 'POST') {
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