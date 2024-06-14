const html = document.querySelector('html');
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBT = document.querySelector("#start-pause");
const playPause = document.querySelector(".app__card-primary-butto-icon");
const tempoNatela = document.querySelector("#timer");
const comecarParar = document.querySelector("#button-text");
const musicaFocoImput = document.querySelector("#alternar-musica");

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioPause = new Audio("/sons/pause.mp3");
const audioTempoFinalizado = new Audio("/sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.volume = 0.5;
musica.loop = true; //A MÚSICA TEM APENAS 6 MIN POR ISSO O LOOP
musicaFocoImput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});
console.log('Toca musica: ', musica);

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focoBt.classList.add("active");
});
curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 10;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  console.log(`alterar contexto chamado: ${contexto}` );
  mostrarTempo();
  botoes.forEach(function(contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`); // NÃO havia CONSEGUI PASSAR AS IMAGENS AQUI
  
  
    banner.onload = () => {
      console.log(`Imagem carregada com sucesso:,`, "src",`/imagens/${contexto}.png`);
    };
    banner.onerror = () => {
      console.error(`Erro ao carregar imagem`);
    };
    console.log(`Alterando para o contexto:`, 'src', `/imagens/${contexto}.png`);
    console.log(`Caminho da imagem: `, "src", `/imagens/${contexto}.png`);
    
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Maximize sua eficiência, <br>
            <strong class= "app__title-strong"> concentre-se no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
                Que tal uma pausa? <strong class="app__title-strong">Respire fundo e faça uma pausa.</strong>
                `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Maximize sua eficiência, <br>
                <strong class= "app__title-strong"> concentre-se no que é fundamental.</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
                    Hora do descanso! <strong class="app__title-strong">Faça uma pausa longa.</strong>
                    `;
    default:
      break;
  }
}
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    //audioTempoFinalizado.play()
    alert("Tempo finalizado");
    const focoAtivo = getAttribute("data-contexto") == 'foco'
    if(focoAtivo) {
      const evento = new CustomEvent('FocoFinalizado')
      document.dispatchEvent(evento)
    }
      zerar();
  
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log('Temporizador ' + tempoDecorridoEmSegundos)
  console.log("Id: " + intervaloId)
  mostrarTempo();
};

startPauseBT.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerar();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000); //um segundo
  audioPlay.play();
}
function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

console.log("Script carregado");
//const playPause = document.querySelector('.app__card-primary-butto-icon');

console.log("Elementos encontrados:", startPauseBT, playPause);

function alterarIconeTitulo(icone, texto) {
  if (startPauseBT && playPause && comecarParar) {
    playPause.setAttribute("src", `/imagens/${icone}.png`);
    comecarParar.textContent = texto;
    if (icone === "play_arrow") {
      console.log("Ícone de play definido");
    } else {
      console.log("Ícone de pause definido");
    }
  } else {
    console.error("Elementos não encontrados.");
  }
}

function toggleIcone() {
  const currentIcon = playPause.getAttribute("src");
  console.log(`Ícone atual: ${currentIcon}`);
  if (currentIcon.includes("play_arrow")) {
    alterarIconeTitulo("pause", "Pausar");
  } else {
    alterarIconeTitulo("play_arrow", "Começar");
  }
  console.log( 'AQUI', currentIcon);
}
// Correção na adição do evento click
startPauseBT.addEventListener("click", toggleIcone);

// Definir o ícone inicial (opcional, depende do estado inicial desejado)
alterarIconeTitulo("play_arrow", "Começar");

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNatela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();
