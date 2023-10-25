
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
    obterItensCardapio: (categoria = 'burgers') => {
        
        var filtro = MENU[categoria];
        console.log(filtro);

        $('#itensCardapio').html('') // LIMPAR O HTML PARA NAO SOBREPOR TODOS OS ITENS, SEPARA POR CATEGORIAS

        $.each(filtro, (i, e) => {

            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${nome}/g, e.name)
            .replace(/\${preco}/g, e.price.toFixed(2).replace('.', (',')))


            $('#itensCardapio').append(temp)

        })

    }

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