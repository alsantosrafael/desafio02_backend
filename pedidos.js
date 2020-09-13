//Funcionalidades referentes à entidade "Pedido"


const geraId = (pedidos) => {
    let id;
    if(pedidos.length === 0){
        id = 1;
    } else {
        id = pedidos[pedidos.length - 1].id + 1
    }
    return id;
}

const mostraPedidos = (produtos) => {
    const pedidosDisponiveis = []

    produtos.forEach(pedido => {
        if(!pedido.deletado) {
            pedidosDisponiveis.push(pedido)
        }
    } )
    return pedidosDisponiveis
}

const procuraPedido = (id, pedidos) => {
    let pedido = {}
    if(pedidos.length !== 0) {
        produto = produtos.reduce((ped,pedidoAtual) => {
            if(pedidoAtual.id === id && !produtoAtual.deletado) {
                ped = produtoAtual;
            }
            return ped
        },0)
    }
    return produto
}


module.exports = {
    geraId: geraId,
    mostraPedidos: mostraPedidos,
    procuraPedido: procuraPedido
}