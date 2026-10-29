//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Segundo Arrhenius, o que é um ácido?",
        alternativas: ["Substância que libera OH⁻ em água", "Substância que libera H⁺ como único cátion em água", "Substância que não conduz corrente elétrica", "Substância sempre sólida e incolor"],
        correta: 1,
        explicacao: "Para Arrhenius, ácido é toda substância que, em solução aquosa, libera como único tipo de cátion o íon H⁺ (representado por H₃O⁺)."
    },
    {
        pergunta: "Qual valor de pH caracteriza uma solução ácida a 25 °C?",
        alternativas: ["Maior que 7", "Igual a 7", "Menor que 7", "Igual a 14"],
        correta: 2,
        explicacao: "Soluções com pH menor que 7 são ácidas; pH igual a 7 é neutro e pH maior que 7 é básico."
    },
    {
        pergunta: "Qual dos ácidos abaixo é um hidrácido, ou seja, não possui oxigênio?",
        alternativas: ["H₂SO₄", "HNO₃", "H₃PO₄", "HCl"],
        correta: 3,
        explicacao: "O HCl (ácido clorídrico) é formado apenas por hidrogênio e cloro. Os demais possuem oxigênio e são oxiácidos."
    },
    {
        pergunta: "Qual é a fórmula do ácido sulfúrico?",
        alternativas: ["H₂SO₄", "HCl", "HNO₃", "H₂CO₃"],
        correta: 0,
        explicacao: "O ácido sulfúrico tem fórmula H₂SO₄. HCl é o clorídrico, HNO₃ é o nítrico e H₂CO₃ é o carbônico."
    },
    {
        pergunta: "Que cor assume o papel de tornassol azul em contato com um ácido?",
        alternativas: ["Verde", "Amarelo", "Vermelha", "Permanece incolor"],
        correta: 2,
        explicacao: "O papel de tornassol azul fica vermelho em meio ácido."
    },
    {
        pergunta: "Qual ácido está presente no suco gástrico e auxilia na digestão?",
        alternativas: ["Ácido sulfúrico", "Ácido clorídrico", "Ácido acético", "Ácido fosfórico"],
        correta: 1,
        explicacao: "O estômago produz ácido clorídrico (HCl), que ajuda a digerir proteínas e a eliminar microrganismos."
    },
    {
        pergunta: "Por que a chuva natural, mesmo sem poluição, já é levemente ácida (pH em torno de 5,6)?",
        alternativas: ["Porque o CO₂ da atmosfera se dissolve na água formando ácido carbônico", "Porque contém grande quantidade de ácido clorídrico", "Porque absorve o sal do mar", "Porque a água pura é muito ácida"],
        correta: 0,
        explicacao: "O CO₂ dissolvido na água da chuva forma ácido carbônico (H₂CO₃), o que deixa o pH natural da chuva em torno de 5,6."
    },
    {
        pergunta: "Se o pH de uma solução diminui em uma unidade, o que acontece com sua acidez?",
        alternativas: ["Diminui 10 vezes", "Aumenta 2 vezes", "Não se altera", "Aumenta 10 vezes"],
        correta: 3,
        explicacao: "A escala de pH é logarítmica: cada unidade a menos corresponde a uma solução 10 vezes mais ácida."
    },
    {
        pergunta: "Qual é o procedimento seguro para diluir um ácido concentrado?",
        alternativas: ["Adicionar água rapidamente ao ácido", "Adicionar o ácido lentamente à água", "Aquecer o ácido antes de misturar", "Misturar tudo de uma só vez"],
        correta: 1,
        explicacao: "O ácido deve ser adicionado lentamente à água, com cuidado, para evitar respingos e aquecimento brusco."
    },
    {
        pergunta: "Segundo Brønsted-Lowry, como se define um ácido?",
        alternativas: ["Espécie que recebe prótons", "Espécie que doa elétrons", "Espécie que doa prótons (H⁺)", "Espécie que libera OH⁻"],
        correta: 2,
        explicacao: "Na teoria de Brønsted-Lowry, ácido é a espécie química capaz de doar prótons (H⁺), e base é a que recebe prótons."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
