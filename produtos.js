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
    const novosProdutos = produtos.map(produto => {
        if(!produto.deletado) {
            return produto
        }
    })
    return novosProdutos;
}




module.exports = {
    geraId: geraId,
    mostraProdutos: mostraProdutos,
}