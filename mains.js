const html = document.querySelector('html');
const pauseBt = document.querySelector('.app__card-primary-button')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const timer = document.querySelector('.app__card-timer');
const img = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const playPauseBt = document.querySelector('.app__card-primary-butto-icon')

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('./sons/play.wav');
const musicaPause = new Audio('./sons/pause.mp3');
const musicaEnd = new Audio('./sons/beep.mp3');
let focoTp = 1500;
const curtoTp = 300;
const longoTp = 900;
musica.loop = true;
let intervaloId = null;

//escutador de eventos para adicionar lista
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})
//escutador de eventos para adicionar lista
focoBt.addEventListener('click', () => {
    focoTp = 1500
    alterarContexto('foco');

})
curtoBt.addEventListener('click', () => {
    focoTp = 300
    alterarContexto('descanso-curto');
})
longoBt.addEventListener('click', () => {
    focoTp = 900
    alterarContexto('descanso-longo');
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', `${contexto}`);
    img.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            focoBt.classList.add('active');
            break
        case 'descanso-curto':
            titulo.innerHTML = 'Que tal dar uma recuperada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
            curtoBt.classList.add('active');
            break
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            longoBt.classList.add('active');
            break
    }

}

const contagemRegressiva = () => {
    if (focoTp == 0) {
        musicaEnd.play();
        zerar();
        return
    }
    focoTp--;
    mostrarTempo()
}

pauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        musicaPause.play();
        zerar();
        playPauseBt.setAttribute('src', './imagens/play_arrow.png');
        return
    }
    iniciarOuPausarBt.textContent = 'Pausar';
    musicaPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    playPauseBt.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
}

function mostrarTempo() {
    const tempo = new Date(focoTp * 1000);
    const tempoFormato = tempo.toLocaleString('pt-Br', { minute: '2-digit', second: '2-digit' })
    timer.innerHTML = `${tempoFormato}`
}

mostrarTempo()