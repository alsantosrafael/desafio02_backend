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
    let novosProdutos = null;
    if(produtos.length!==0) {
        novosProdutos = produtos.map(produto => {
            if(!produto.deletado) {
                return produto
            }
        })
    }
    return novosProdutos;
}

const procuraProduto = (id, produtos) => {
    let produto = null;
    if(produtos.length !==0 ) {
        produto = produtos.reduce((prod,produtoAtual,index) => {
            if(produtoAtual.id === id && !produtoAtual.deletado) {
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