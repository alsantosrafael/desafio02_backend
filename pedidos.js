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
    let pedido = 0
    if(pedidos.length !== 0) {
        pedido = pedidos.reduce((ped,pedidoAtual) => {
            if(pedidoAtual.id === id && !pedidoAtual.deletado && pedidoAtual.estado !== 'cancelado') {
                ped = pedidoAtual;
            }
            return ped
        },0)
    }
    
    return pedido
}


module.exports = {
    geraId: geraId,
    mostraPedidos: mostraPedidos,
    procuraPedido: procuraPedido
}