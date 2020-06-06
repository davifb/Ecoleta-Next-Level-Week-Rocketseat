const buttonSearch = document.querySelector("#page-home main a")

const modal = document.querySelector("#modal")

const close = document.querySelector("#modal .header a")

// ao clicar no botão de pesquisa, remove o class "hide" do modal
buttonSearch.addEventListener("click" , () => {
    modal.classList.remove("hide")
})

// ao clicar no close (x), adiciona o class "hide" ao modal
close.addEventListener("click", () => {
    modal.classList.add("hide")
})