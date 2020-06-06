function populateUFs(){
    const  ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?OrderBy=nome")
    .then(res => res.json())
    .then(states => {

        for(state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }        
    })
}

populateUFs()

function getCities(event) {
    const  citySelect = document.querySelector("[name=city]")
    const  stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex    
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }         

        citySelect.disabled = false
    })
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// Itens de coleta

// get todos os elementos li
const itemsToCollect = document.querySelectorAll(".items-grid li")

// evento click
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

// elemento hidden para os itens
const collectedItems = document.querySelector("input[name=items]")

// let pode ser alterado ... const = constante
let selectedItems = [];

// verifica id do item de coleta selecionado
function handleSelectedItem(event) {

    const itemLi = event.target
    
    // add or remove uma classe com javascript
    itemLi.classList.toggle("selected") // add, remove e toggle

    const itemId = itemLi.dataset.id    
    
    
    // verificar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {        
        const itemFound = item == itemId 
        return itemFound
    })

    // se já estiver selecionado
    if (alreadySelected >= 0) {
        // remover dos itens selecionados
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        // adicionar itens ao array de selecionados
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}