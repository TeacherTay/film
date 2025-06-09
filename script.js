let campoGenero, campoIdade, tela = "inicio", botaoComecar;
let filmeAtual;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("interface-p5");

  textFont("Georgia");

  botaoComecar = createButton("Começar");
  botaoComecar.position(width / 2 - 50, height / 2 + 80);
  botaoComecar.mousePressed(() => {
    tela = "principal";
    botaoComecar.hide();
    iniciarInterface();
  });
}

function iniciarInterface() {
  createElement("h2", "TAYNAFLIX – Recomendador de Filmes").position(50, 20);
  createSpan("Sua idade: ").position(50, 80);
  campoIdade = createInput("12");
  campoIdade.position(130, 80);

  createSpan("Gênero favorito: ").position(50, 120);
  campoGenero = createSelect();
  campoGenero.position(200, 120);
  campoGenero.option("Animação");
  campoGenero.option("Romance");
  campoGenero.option("Terror");
}

function draw() {
  clear();

  if (tela === "inicio") {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Bem-vindo ao TAYNAFLIX", width / 2, height / 2 - 60);
    textSize(20);
    text("Descubra filmes incríveis com base em sua idade e gosto!", width / 2, height / 2);
  } else if (tela === "principal") {
    let idade = int(campoIdade.value());
    let genero = campoGenero.value();
    filmeAtual = recomendarFilme(idade, genero);

    fill(255);
    textAlign(LEFT, TOP);
    textSize(28);
    text(filmeAtual.titulo, 50, 180);
    textSize(16);
    text(filmeAtual.sinopse, 50, 220, 500);

    if (filmeAtual.imagem) {
      loadImage(filmeAtual.imagem, img => {
        image(img, width - 360, 180, 300, 180);
      });
    }

    if (filmeAtual.trailer) {
      let link = createA(filmeAtual.trailer, "Assistir Trailer", "_blank");
      link.position(50, 350);
    }

    tela = "exibindo";
  }
}

function recomendarFilme(idade, genero) {
  let filmes = {
    "Animação": [
      {
        titulo: "Divertida Mente",
        idadeMin: 0,
        sinopse: "As emoções ganham vida na mente de uma menina.",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/3/39/Inside_Out_p%C3%B4ster.png",
        trailer: "https://www.youtube.com/watch?v=JYpD2L_8jG0"
      }
    ],
    "Romance": [
      {
        titulo: "Para Todos os Garotos que Já Amei",
        idadeMin: 10,
        sinopse: "Cartas secretas de amor viram um caos na vida de Lara Jean.",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/0/0e/To_All_the_Boys_I%27ve_Loved_Before.png",
        trailer: "https://www.youtube.com/watch?v=mTLc_RzqaJc"
      }
    ],
    "Terror": [
      {
        titulo: "Coraline e o Mundo Secreto",
        idadeMin: 10,
        sinopse: "Coraline encontra uma porta para um mundo assustadoramente perfeito.",
        imagem: "https://upload.wikimedia.org/wikipedia/pt/6/6f/Coraline_poster.jpg",
        trailer: "https://www.youtube.com/watch?v=m9bOpeuvNwY"
      }
    ]
  };

  let lista = filmes[genero];
  for (let i = lista.length - 1; i >= 0; i--) {
    if (idade >= lista[i].idadeMin) return lista[i];
  }

  return {
    titulo: "Nenhum filme disponível",
    sinopse: "Nenhum filme encontrado para essa idade e gênero.",
    imagem: "",
    trailer: ""
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
