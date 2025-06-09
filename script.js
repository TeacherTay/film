let campoGenero;
let campoIdade;
let tela = "inicio";
let botaoComecar;
let filmeAtual;

function setup() {
  createCanvas(800, 600);
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
  stroke(80, 80, 255);
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
    filmeAtual = recomendarFilme(idade, genero);

    fill(30, 0, 90);
    textAlign(CENTER, TOP);
    textSize(26);
    text(filmeAtual.titulo, width / 2, 40);

    textSize(16);
    textAlign(LEFT, TOP);
    text(filmeAtual.sinopse, 50, 100, 400);

    // imagem
    if (filmeAtual.imagem) {
      loadImage(filmeAtual.imagem, img => {
        image(img, 480, 100, 250, 150);
      });
    }

    // link trailer
    if (filmeAtual.trailer) {
      let link = createA(filmeAtual.trailer, "Ver Trailer", "_blank");
      link.position(50, 280);
      link.style("background-color", "#fff");
      link.style("padding", "8px 12px");
      link.style("border-radius", "5px");
      link.style("text-decoration", "none");
      link.style("color", "#333");
    }

    // impedir múltiplos links
    tela = "finalizado";
  }
}

function drawGradient() {
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(50, 0, 150), color(200, 180, 255), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

function recomendarFilme(idade, genero) {
  let filmes = {
    "Animação": [
      {
        titulo: "Divertida Mente",
        classificacao: "Livre",
        idadeMin: 0,
        sinopse: "As emoções de uma garota ganham vida em uma divertida jornada.",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/3/39/Inside_Out_p%C3%B4ster.png",
        trailer: "https://www.youtube.com/watch?v=JYpD2L_8jG0"
      }
    ],
    "Romance": [
      {
        titulo: "A Cinco Passos de Você",
        classificacao: "12 anos",
        idadeMin: 12,
        sinopse: "Dois adolescentes com fibrose cística se apaixonam apesar da distância obrigatória.",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/e/e1/Five_Feet_Apart.png",
        trailer: "https://www.youtube.com/watch?v=FeA9Bse5nMk"
      }
    ],
    "Terror": [
      {
        titulo: "Coraline e o Mundo Secreto",
        classificacao: "10 anos",
        idadeMin: 10,
        sinopse: "Coraline descobre um mundo alternativo que esconde segredos sombrios.",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/6/6f/Coraline_poster.jpg",
        trailer: "https://www.youtube.com/watch?v=m9bOpeuvNwY"
      }
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
    sinopse: "Nenhum filme encontrado para essa idade e gênero.",
    imagem: "",
    trailer: ""
  };
}
