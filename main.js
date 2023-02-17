// let ListaDeCompras = ['arroz', 'feijão','frango'];


//     item1 : 'frango' , 
//     item2 : 'arroz',
//     quandidade1 : 3,
//     quandidade2 : 5,
//     mostrarItens : function () {
//         alert('Comprei' + ListaDeItens.quandidade1 + 'Pacotes de ' + ListaDeItens.item1)
//     }
// }

// ListaDeItens.mostrarItens();


 let ListaDeItens = []
 let itemAEditar 



 const form = document.getElementById("form-itens");
 const itensInput = document.getElementById("receber-item")
 const ulItens = document.getElementById("lista-de-itens")
 const ulItensComprados = document.getElementById("itens-comprados")
 const listaRecuperada = localStorage.getItem('listaDeItens')

 function atualizaLocalStorage() {
    localStorage.setItem('ListaDeItens', JSON.stringify(ListaDeItens))
 }

 if (listaRecuperada) {
    ListaDeItens = JSON.parse(listaRecuperada)
    mostrarItem()

 }else{
    ListaDeItens = []
 }
 



 form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    salvarItem()
    mostrarItem()
    itensInput.focus
 })

 function salvarItem() {
    const comprasItem = itensInput.value
    const verificarDuplicado  = ListaDeItens.some((elemento) => elemento.valor.toUpperCase()=== comprasItem.toUpperCase())

    if(verificarDuplicado) {
        alert("Este item ja existe!")

    } else {
    

    ListaDeItens.push({
        valor : comprasItem,
        checar: false
    })
}


    itensInput.value = ''


}

 

 
function mostrarItem(){
    ulItens.innerHTML = ''
    ulItensComprados.innerHTML = ''
    ListaDeItens.forEach((elemento,index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
            `

        } else {

        
        ulItens.innerHTML += ` 
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}" ${index!== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>

        <div>
        ${ index === Number(itemAEditar) ? '<button onClick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
        <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li
    `
    }

    })

    const inputCheck = document.querySelectorAll('input[type = "checkbox"]')

    inputCheck.forEach(i => {
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            ListaDeItens[valorDoElemento].checar = evento.target.checked
            console.log(ListaDeItens[valorDoElemento].checar)
            mostrarItem()

            




        })

    })

    const deletarObjetos = document.querySelectorAll(".deletar")


    deletarObjetos.forEach(i => {
            i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            ListaDeItens[valorDoElemento].checar = evento.target.checked
            ListaDeItens.splice(valorDoElemento,1,)
            mostrarItem()

            




        })

    })

    const editaritens = document.querySelectorAll(".editar")
    editaritens.forEach(i => {
        i.addEventListener('click', (evento) => {
         itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
         mostrarItem()
    })

});

atualizaLocalStorage()

}
    

       
function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    ListaDeItens[itemAEditar].valor = itemEditado.value
    console.log(ListaDeItens);
    itemAEditar = -1
    mostrarItem()
}

