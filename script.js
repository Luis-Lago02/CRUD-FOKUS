const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startBtn = document.querySelector('#start-pause');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const imgIniciarOuPausarBtn = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');
const inputMusica = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('sons/play.wav');
const musicaPause = new Audio('sons/pause.mp3');
const musicaFinal = new Audio('sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

inputMusica.addEventListener('change', () => {
     if (musica.paused) {
          musica.play();
     } else {
          musica.pause();
     }
})

focoBtn.addEventListener('click', () => {
     tempoDecorridoEmSegundos = 1500;
     alterarContexto('foco');
     focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
     tempoDecorridoEmSegundos = 300;
     alterarContexto('descanso-curto');
     curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
     tempoDecorridoEmSegundos = 900;
     alterarContexto('descanso-longo');
     longoBtn.classList.add('active');
});

const alterarContexto = (contexto) => {
     mostrarTempo();
     botoes.forEach((contexto) =>{
          contexto.classList.remove('active');
     })
     html.setAttribute('data-contexto', contexto);
     banner.setAttribute('src', `imagens/${contexto}.png`);
     switch (contexto) {
          case "foco":
               titulo.innerHTML = `
                    Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
               `
               break;
          case "descanso-curto":
               titulo.innerHTML = `
                    Que tal dar uma respirada?<br>
                    <strong class="app__title-strong">Faça uma pausa curta!</strong>
               `
               break;
          case "descanso-longo":
               titulo.innerHTML = `
                    Hora de voltar à superfice.<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>
               `
               break;
          default:
               break;
     }
}

const contagemRegressiva = () => {
     if (tempoDecorridoEmSegundos <= 0) {
          musicaFinal.play();
          const activeFocus = html.getAttribute('data-contexto') == 'foco';
          if (activeFocus) {
               const evento = new CustomEvent('focusFinished');
               document.dispatchEvent(evento);
          }
          zerar();
          alert('Tempo finalizado!');
          return
     }
     tempoDecorridoEmSegundos -= 1;
     mostrarTempo();
}

startBtn.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
     if (intervaloId) {
          zerar();
          musicaPause.play();
          return
     }
     musicaPlay.play();
     intervaloId = setInterval(contagemRegressiva, 1000);
     iniciarOuPausarBtn.textContent = 'Pausar';
     imgIniciarOuPausarBtn.setAttribute('src', 'imagens/pause.png');
}

function zerar() {
     clearInterval(intervaloId);
     intervaloId = null;
     iniciarOuPausarBtn.textContent = 'Começar';
     imgIniciarOuPausarBtn.setAttribute('src', 'imagens/play_arrow.png');

}

function mostrarTempo() {
     const tempo = new Date(tempoDecorridoEmSegundos * 1000);
     const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
     tempoNaTela.innerHTML =`${tempoFormatado}`;
}
mostrarTempo()
