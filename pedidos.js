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

const mostraPedidos = (produtos, query) => {
    const pedidosDisponiveis = []
    if(query === undefined){
        produtos.forEach(pedido => {
            if(!pedido.deletado) {
                pedidosDisponiveis.push(pedido)
            }
        })
    } else {
        produtos.forEach(pedido => {
            if(!pedido.deletado && pedido.estado === query) {
                pedidosDisponiveis.push(pedido);
            }
        })
    }
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

const addProduto = (produto, pedido, pedidos) => {
    let resposta;
    //Existe produto X?
    //Ele está com status deletadoX?
    //Se existir produto, ele já foi adicionado a pedidos?
    //Se não foi adicionado, adicionar
    //se já foi adicionado, alterar quantidade

    //uso a função para achar o produto
    //uso a outra função para achar o pedido

    if(!produto || !pedido) {
        resposta = false;
        return resposta
    } else {
        pedidos.forEach((ped, index) => {
            for(let i = 0; i < ped.produtos.length; i++) {
                if(ped.estado !== 'incompleto') {
                    return resposta;
                } else {
                    if(Number(ped.produtos[i].id) === Number(produto.id)) {
                        pedidos[index].produtos[i].quant += produto.quant
                    } else {
                        pedidos.produtos.push(produto)
                    }
                    resposta = true;
                }
            }
        })
    }
    return resposta;
}


module.exports = {
    geraId: geraId,
    mostraPedidos: mostraPedidos,
    procuraPedido: procuraPedido,
    addProduto: addProduto,

}