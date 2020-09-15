const { procuraProduto } = require("./produtos");
//Funcionalidades referentes à entidade "Pedido"

const produtos = require("./produtos");


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
    if(pedidos) {
        pedido = pedidos.reduce((ped,pedidoAtual) => {
            if(pedidoAtual.id === id && !pedidoAtual.deletado && pedidoAtual.estado !== 'cancelado') {
                ped = pedidoAtual;
            }
            return ped
        },0)
    } else {
        return false
    }
    
    return pedido
}   //Requisitar produto, recuperar id e requisitar quantidade desse produto
    //Existe produto?
    //Ele está com status deletado?
    //Se existir produto, ele já foi adicionado a pedidos?
    //Se não foi adicionado, adicionar
    //se já foi adicionado, alterar quantidade

    //uso a função para achar o produto
    //uso a outra função para achar o pedido

const addProduto = (produto, quantidade, produtos, idPedido, pedido, pedidos) => {

    if(!produto) {
        return false;
    } else {
        if(!idPedido){
            return false;
        } else {
            if(Number(produtos[produto.id -1].quant) < Number(quantidade)) {
                return false;
            } else {
                if(pedido.produtos.length === 0 && produto.deletado !== true && pedido.estado === 'incompleto'){
                    pedidos[idPedido - 1].produtos.push({id: produto.id, nome: produto.nome, quant: Number(quantidade), valor: Number(produto.valor), deletado: produto.deletado})
                    produtos[produto.id-1].quant -= Number(quantidade)
                } else {
                    for(let i = 0; i < pedido.produtos.length; i++) {
                        if(pedido.produtos[i].id === produto.id && produto.deletado !== true) {
                            produtos[produto.id-1].quant -= quantidade
                            pedidos[idPedido-1].produtos[i].quant += quantidade;
                        }
                    }
                }

            }
        }
    }

    return true;
}


const calculaTotal = (idPed, pedidos) => {
    let somaTotal = 0;
    const pedido = procuraPedido(idPed, pedidos);

    if(pedido.produtos.length !== 0){
        for(let i = 0; i < pedido.produtos.length; i++){
            somaTotal += (pedido.produtos[i].quant * pedido.produtos[i].valor)
        }
    }
    return somaTotal;
}


module.exports = {
    geraId: geraId,
    mostraPedidos: mostraPedidos,
    procuraPedido: procuraPedido,
    addProduto: addProduto,
    calculaTotal: calculaTotal

}