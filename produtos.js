//Funcionalides para produtos

const geraId = (produtos) => {
    let id;
    if(produtos.length === 0) {
        id = 1;
    } else{
        id = produtos[produtos.length - 1].id +1;
    }
    return id;
}

const mostraProdutos = (produtos) => {
    const produtosDisponiveis = []

    produtos.forEach(produto => {
        if(!produto.deletado && produto.quantidade !== 0) {
            produtosDisponiveis.push(produto)
        }
    } )
    return produtosDisponiveis
}

const procuraProduto = (id, produtos) => {
    let produto = {}
    if(produtos.length !==0 ) {
        produto = produtos.reduce((prod,produtoAtual,index) => {
            if(produtoAtual.id === id && !produtoAtual.deletado && produto.quantidade !== 0) {
                prod = produtoAtual;
            }
            return {
                prod,
                index
            }
        },0)
    }
    return produto
}




module.exports = {
    geraId: geraId,
    mostraProdutos: mostraProdutos,
    procuraProduto: procuraProduto,
}