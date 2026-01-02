function escolherTable() {
    // uma table para cada letra do alfabeto.
    const gruposAlfabeto = document.querySelectorAll(".date-posts .caixa_corte")
    // Objeto obtido é uma table com os jogos para a letra do numero gerado
    const jogosTable = gruposAlfabeto.item(Math.random() * gruposAlfabeto.length)

    return jogosTable;
}

function escolherJogo(/** @type HTMLTableElement */ jogosTable) {
    // === Escolher a linha ===
    const rows = jogosTable.querySelectorAll("tr")
    const quantRows = rows.length / 2
    const numRow = Math.round(Math.random() * (quantRows - 1))

    console.log({ rows, quantRows, numRow })

    // Obter a row de link
    const rowDeLink = rows.item(numRow * 2)
    // Obter a row de nome
    const rowDeNome = rows.item(numRow * 2 + 1)

    console.log({ rowDeLink, rowDeNome })

    // == Escholher o jogo em si ==
    const jogosLinks = rowDeLink.querySelectorAll("th")
    const jogosNomes = rowDeNome.querySelectorAll("td")
    const numJogo = Math.round(Math.random() * (jogosLinks.length - 1))

    return {
        nome: jogosNomes.item(numJogo).textContent,
        link: jogosLinks.item(numJogo).querySelector("a").href,
        imagem: jogosLinks.item(numJogo).querySelector("a > img").cloneNode()
    }
}

function mostrarResultado(jogoEscolhido) {
    /** @type HTMLImageElement */
    const imagem = jogoEscolhido.imagem
    
    // Estilo imagem
    imagem.style.margin = "12px auto"
    imagem.style.display = "block"
    imagem.style.width = "80%"
    imagem.style.border = "5px dashed purple"
    imagem.style.borderRadius = "15px"
    console.log({imagem})
    
    const textoLegal =
        `<h1>Jogo escolhido com sucesso!</h1>
        <hr/>
        <b>Nome</b>: ${jogoEscolhido.nome}<br>
        <b>Link</b>: <a href="${jogoEscolhido.link}">Clica aqui, ó</a><br>
        Boa jogatina :D
        ${imagem.outerHTML}`

    const modal = document.createElement('dialog')
    modal.innerHTML = textoLegal;

    // Estilo
    modal.style.textAlign = "center"
    modal.style.fontSize = "18px"
    modal.style.position = "absolute"
    modal.style.top = "50%"
    modal.style.left = "50%"
    modal.style.transform = "translate(0 -50%)"
    modal.style.width = "25vw"
    modal.style.borderRadius = "20px"

    const botaoEscolherOutro = document.createElement("button")
    botaoEscolherOutro.innerHTML = "<b>Escolher outro...</b>"
    botaoEscolherOutro.addEventListener("click", () => {
        modal.remove();
        mostrarResultado(escolherJogo(escolherTable()));
    })

    botaoEscolherOutro.style.display = "block"
    botaoEscolherOutro.style.margin = "auto"
    botaoEscolherOutro.style.fontSize = "20px"

    modal.appendChild(botaoEscolherOutro)


    document.querySelector('body').appendChild(modal)
    modal.show()
}

console.log("Escolhendo jogo...")
mostrarResultado(escolherJogo(escolherTable()))