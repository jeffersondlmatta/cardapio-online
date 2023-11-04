
$(document).ready(function() { 
    cardapio.eventos.init();

})

var cardapio = {};

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

}

cardapio.templates = {

    item: `<div class="col-3 mb-5">
    <div class="card card-item">
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
            <span class="btn-menos"><i class="fas fa-minus"></i></span>
            <span class="add-numero-itens">0</span>
            <span class="btn-mais"><i class="fas fa-plus"></i></span>
            <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
        </div>
    </div>
</div>

            `

    


}