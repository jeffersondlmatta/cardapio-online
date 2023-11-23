
$(document).ready(function() { 
    cardapio.eventos.init();

})

var cardapio = {};

var MEU_CARRINHO = [];

cardapio.eventos = {

    init: () => { // essa e uma função e pode ter qualquer nome 
       
        cardapio.metodos.obterItensCardapio(); 
    }

}

cardapio.metodos = {
    // OBTEM A LISTA DE ITENS DO CARDAPIO
    obterItensCardapio: (categoria = 'burgers', vermais = false) => {
        
        var filtro = MENU[categoria];
        console.log(filtro);

        if (!vermais) {
            $('#itensCardapio').html('') // LIMPAR O HTML PARA NAO SOBREPOR TODOS OS ITENS, SEPARA POR CATEGORIAS
            $('#btnVerMais').removeClass('hidden')

        }

        

        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${nome}/g, e.name)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.', (',')))
            .replace(/\${id}/g, e.id)

            // BTN VER MAIS clicado
            if (vermais && i >= 8 && i < 12 ) {
                $('#itensCardapio').append(temp)

            }
            //PAGINAÇÃO  INICIAL 8 ITENS 
            if (!vermais && i < 8 ) {
                $('#itensCardapio').append(temp)
                
                
            }

        })

        // REMOVE  O ACTIVE 
        $(".container-menu a").removeClass('active');

        //SETA O MENU PARA O ATIVO 
        $("#menu-" + categoria).addClass('active')

    },
    //CLICK NO VER MAIS 
    verMais: () => {

        var ativo = $('.container-menu a.active').attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);

        $("#btnVerMais").addClass('hidden');

    },
    //BTN (-)
    diminuirQuantidade: (id) => {

        let qntdAtual = parseInt( $('#qntd-' + id).text());

        if (qntdAtual > 0 ) {
            $('#qntd-' + id).text(qntdAtual - 1)
        }

    },
    //BTN (+)
    aumentarQuantidade: (id) => {

        let qntdAtual = parseInt( $('#qntd-' + id).text());
        $('#qntd-' + id).text(qntdAtual +  1)
        
    },
    //adcionar item ao carrinho o item do cardapio
    adcionarAoCarrinho: (id) => {

        let qntdAtual = parseInt( $('#qntd-' + id).text());

        if (qntdAtual > 0 ) {
            //obter catg. Ativa 
            var categoria =  $('.container-menu a.active').attr('id').split('menu-')[1];
            //obtem a lista de itens - filtro dos itens 
            let filtro = MENU[categoria];
            // obtem o iten 
            let item = $.grep(filtro, (e,i) => { return e.id == id});

            if (item.length > 0) {

                // validar se ja existe o item no carrinho 

                let existe = $.grep(MEU_CARRINHO, (elem,index) => { return elem.id == id});
                // se eciste no carrinho altera a qntd
                if(existe.length > 0) {
                    let objIndex = MEU_CARRINHO.findIndex((obj => obj.id == id));
                    MEU_CARRINHO[objIndex].qntd = MEU_CARRINHO[objIndex].qntd + qntdAtual;
                }
                //se nao, adciona o mesmo 
                else {

                }

                item[0].qntd = qntdAtual;
                MEU_CARRINHO.push(item[0])
            }

            cardapio.metodos.mensagem("Iten adcionado ao carrinho")
            $('#qntd-' + id ).text(0);

            cardapio.metodos.atualizarBadgeTotal();




        }



    },
    //atualiza o badge de totais  dos botoes " meu carrinho" 
    atualizarBadgeTotal: () => {
        var total = 0 


        $.each(MEU_CARRINHO, (i,e) => {
            total += e.qntd
        })

            if (total > 0) {
                $(".botao-carrinho").removeClass('hidden')
                $(".container-total-carrinho").removeClass('hidden')
            }
            else {
                $(".botao-carrinho").addClass('hidden') 
                $(".container-total-carrinho").addClass('hidden') 
            }
            $(".badge-total-carrinho").html(total);




    }, 

    mensagem: (texto, cor='red', tempo = 3500) => {
          
        let msg = `<div class="toast ${cor}"> ${texto}</div>`;
        
        $("#container-mensagens").append(msg);
        

    }

}

cardapio.templates = {

    item: `<div class="col-3 mb-5">
    <div class="card card-item" id="\${id}">
        <div class="img-produto">
            <img src="\${img}" >
        </div>  
        <p class="title-produto text-center mt-4">
            <b>\${nome}</b>
        </p>
        <p class="price-produto text-center">
            <b>R$ \${preco}</b>
        </p>
        <div class="add-carrinho">
            <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade('\${id}')"><i class="fas fa-minus"></i></span>
            <span class="add-numero-itens" id="qntd-\${id}">0</span>
            <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade('\${id}')"><i class="fas fa-plus"></i></span>
            <span class="btn btn-add" onclick="cardapio.metodos.adcionarAoCarrinho('\${id}')" ><i class="fa fa-shopping-bag"></i></span>
        </div>
    </div>
</div>

            `

    


}

