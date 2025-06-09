let campoGenero;
let campoIdade;
let tela = "inicio";
let botaoComecar;

function setup() {
  createCanvas(800, 500);
  textFont("Georgia");
  botaoComecar = createButton("Começar");
  botaoComecar.position(width / 2 - 40, height / 2 + 50);
  botaoComecar.mousePressed(() => {
    tela = "principal";
    botaoComecar.hide();
    iniciarInterface();
  });
}

function iniciarInterface() {
  createElement("h2", "Recomendador de Filmes");
  createSpan("Sua idade: ");
  campoIdade = createInput("12");
  createSpan("  Gênero favorito: ");
  campoGenero = createSelect();
  campoGenero.option("Animação");
  campoGenero.option("Romance");
  campoGenero.option("Terror");
}

function draw() {
  drawGradient();

  noStroke();
  fill(255, 255, 255, 180);
  stroke(120, 100, 255);
  strokeWeight(2);
  rect(30, 30, width - 60, height - 60, 20);
  noStroke();

  if (tela === "inicio") {
    fill(30, 0, 90);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Bem-vindo ao Recomendador de Filmes!", width / 2, height / 2 - 60);
    textSize(18);
    text("Selecione seu gênero e idade para receber uma sugestão incrível!", width / 2, height / 2);
  } else if (tela === "principal") {
    let idade = int(campoIdade.value());
    let genero = campoGenero.value();
    let filme = recomendarFilme(idade, genero);

    fill(30, 0, 90);
    textAlign(CENTER, TOP);
    textSize(24);
    text(filme.titulo, width / 2, 50);

    textSize(16);
    textAlign(LEFT, TOP);
    text(filme.sinopse, 50, 100, 700);
  }
}

function drawGradient() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(100, 0, 150), color(200, 180, 255), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

function recomendarFilme(idade, genero) {
  let filmes = {
    "Animação": [
      { titulo: "Aventuras Coloridas", classificacao: "Livre", idadeMin: 0, sinopse: "Um mundo mágico cheio de criaturas divertidas." },
      { titulo: "Viagem Encantada", classificacao: "10 anos", idadeMin: 10, sinopse: "Uma jovem descobre um portal secreto." },
      { titulo: "O Reino Esquecido", classificacao: "12 anos", idadeMin: 12, sinopse: "Um garoto precisa salvar um reino antigo." },
      { titulo: "Heróis da Galáxia", classificacao: "14 anos", idadeMin: 14, sinopse: "Ação e coragem em uma missão intergaláctica." },
      { titulo: "Cidade Invisível", classificacao: "16 anos", idadeMin: 16, sinopse: "Animação sombria sobre um mundo secreto." },
    ],
    "Romance": [
      { titulo: "Amor de Verão", classificacao: "Livre", idadeMin: 0, sinopse: "Dois jovens se conhecem nas férias." },
      { titulo: "Corações em Paris", classificacao: "10 anos", idadeMin: 10, sinopse: "Um romance inesperado na cidade luz." },
      { titulo: "Promessa de Outono", classificacao: "12 anos", idadeMin: 12, sinopse: "Segredos do passado voltam à tona." },
      { titulo: "Além do Destino", classificacao: "14 anos", idadeMin: 14, sinopse: "Um casal tenta mudar o futuro." },
      { titulo: "Noite sem Fim", classificacao: "16 anos", idadeMin: 16, sinopse: "Amor proibido e decisões difíceis." },
    ],
    "Terror": [
      { titulo: "Sombra da Meia-Noite", classificacao: "Livre", idadeMin: 0, sinopse: "Assombros leves para os pequenos corajosos." },
      { titulo: "A Vila Silenciosa", classificacao: "10 anos", idadeMin: 10, sinopse: "Mistérios em uma vila isolada." },
      { titulo: "Olhos na Escuridão", classificacao: "12 anos", idadeMin: 12, sinopse: "Um garoto sente presenças em sua casa." },
      { titulo: "Espelhos Partidos", classificacao: "14 anos", idadeMin: 14, sinopse: "Reflexos que revelam segredos sombrios." },
      { titulo: "A Maldição do Lago", classificacao: "16 anos", idadeMin: 16, sinopse: "Lenda de terror revive entre os jovens." },
    ]
  };

  let lista = filmes[genero];
  for (let i = lista.length - 1; i >= 0; i--) {
    if (idade >= lista[i].idadeMin) {
      return lista[i];
    }
  }

  return {
    titulo: "Nenhum filme disponível",
    sinopse: "Nenhum filme encontrado para essa idade e gênero."
  };
}
