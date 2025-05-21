document.addEventListener("DOMContentLoaded", function () {
    console.log("Jogo da Memória carregado!");
    iniciarJogoMemoria();
});

const imagens = ["🐱", "🐶", "🐰", "🦊", "🐻", "🐼", "🐯", "🦁"];
let cartas = [];
let cartaVirada = null;
let bloqueio = false;
let tentativas = 0;
let acertos = 0;

function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

function criarCartas() {
    cartas = embaralhar([...imagens, ...imagens]);
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";
    cartas.forEach((imagem, index) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.imagem = imagem;
        carta.innerHTML = "❓";
        carta.addEventListener("click", virarCarta);
        tabuleiro.appendChild(carta);
    });
}

function virarCarta() {
    if (bloqueio || this.innerHTML !== "❓") return;
    this.innerHTML = this.dataset.imagem;
    if (!cartaVirada) {
        cartaVirada = this;
    } else {
        tentativas++;
        document.getElementById("tentativas").innerText = `Tentativas: ${tentativas}`;
        if (cartaVirada.dataset.imagem === this.dataset.imagem) {
            acertos++;
            cartaVirada = null;
            if (acertos === imagens.length) {
                alert("🎉 Parabéns! Você venceu!");
            }
        } else {
            bloqueio = true;
            setTimeout(() => {
                cartaVirada.innerHTML = "❓";
                this.innerHTML = "❓";
                cartaVirada = null;
                bloqueio = false;
            }, 1000);
        }
    }
}

function iniciarJogoMemoria() {
    tentativas = 0;
    acertos = 0;
    document.getElementById("tentativas").innerText = "Tentativas: 0";
    criarCartas();
}
