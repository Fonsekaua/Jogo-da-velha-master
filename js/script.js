let gridareas = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
let arrayDivs = [];
let currentPlayer = "X";
let isGameOver = false;

// Função para verificar se há um vencedor
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            arrayDivs[a].querySelector("p")?.innerHTML === currentPlayer &&
            arrayDivs[b].querySelector("p")?.innerHTML === currentPlayer &&
            arrayDivs[c].querySelector("p")?.innerHTML === currentPlayer
        ) {
            return currentPlayer;
        }
    }
    return null;
}

// Função para verificar se o tabuleiro está cheio
function checkDraw() {
    return arrayDivs.every(div => div.querySelector("p")); // Verifica se todos os divs têm um símbolo
}

// Função para reiniciar o jogo
function resetGame() {
    arrayDivs.forEach(div => {
        div.innerHTML = ''; // Limpa o conteúdo dos divs
    });
    currentPlayer = "X"; // Reseta o jogador atual
    isGameOver = false; // Reseta o status do jogo
}

// Função para lidar com o clique dos divs
function handleClick() {
    if (isGameOver) return; // Não faz nada se o jogo já acabou

    if (this.querySelector("p")) return; // Ignora se o div já tem um símbolo

    const p = document.createElement("p");
    p.innerHTML = currentPlayer;
    this.appendChild(p);

    const winner = checkWinner();
    if (winner) {
        const jogadorVencedor = document.getElementById('win').innerHTML = "Vencedor é: "+ winner
        isGameOver = true;
        // Reinicia o jogo após um breve atraso
        setTimeout(resetGame, 2000);
        return;
    }

    if (checkDraw()) {
        const jogadorVencedor = document.getElementById('win').innerHTML = "DEU EMPATE!!!"
        isGameOver = true;
        // Reinicia o jogo após um breve atraso
        setTimeout(resetGame, 2000);
        return;
    }

    // Alterna o jogador
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Cria e adiciona os divs
for (let c = 0; c < 9; c++) {
    const main = document.querySelector("main");
    const div = document.createElement("div");
    div.style.gridArea = gridareas[c];
    arrayDivs.push(div);
    main.appendChild(div);
}

arrayDivs.forEach(divs => {
    divs.addEventListener("click", handleClick);
});
