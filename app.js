const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const folderBtn = document.getElementById('folderBtn');
const recordedVideo = document.getElementById('recordedVideo');

let mediaRecorder;
let recordedChunks = [];

startBtn.addEventListener('click', async () => {
    // Solicita permisos para capturar la pantalla
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
            mediaSource: 'screen',
            width: { ideal: 1920 },  // Ancho ideal
            height: { ideal: 1080 }, // Alto ideal
            frameRate: { ideal: 30 } // Velocidad de fotogramas ideal
        }
    });

    // Configura el MediaRecorder con la tasa de bits deseada
    const options = {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000 // Tasa de bits de 5 Mbps
    };
    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = function() {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        recordedChunks = [];
        const url = URL.createObjectURL(blob);
        recordedVideo.src = url;

        // Guardar el video en el directorio de descargas (solo para demostración)
        const a = document.createElement('a');
        a.href = url;
        a.download = 'grabacion_pantalla.webm';
        a.click();

        // Habilitar el botón para abrir la carpeta de videos
        folderBtn.disabled = false;
    };

    mediaRecorder.start();

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    if (mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        pauseBtn.textContent = 'Reanudar Grabación';
    } else if (mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        pauseBtn.textContent = 'Pausar Grabación';
    }
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    pauseBtn.textContent = 'Pausar Grabación';
});

folderBtn.addEventListener('click', () => {
    alert('Busca los videos en tu carpeta de Descargas y muévelos a la carpeta deseada.');
});

document.addEventListener('keydown', function(event) {
    // Verifica qué tecla se ha presionado
    switch (event.key) {
        case 's':
            // Tecla 's' para iniciar grabación
            startRecording();
            break;
        case 'p':
            // Tecla 'p' para pausar grabación
            pauseRecording();
            break;
        case 'd':
            // Tecla 'd' para detener grabación
            stopRecording();
            break;
        default:
            // No hacer nada si no se presiona una tecla configurada
            break;
    }
});

// Funciones para iniciar, pausar y detener la grabación
function startRecording() {
    // Lógica para iniciar la grabación
    console.log('Iniciar grabación');
    // Aquí deberías implementar la lógica para iniciar la grabación de pantalla
}

function pauseRecording() {
    // Lógica para pausar la grabación
    console.log('Pausar grabación');
    // Aquí deberías implementar la lógica para pausar la grabación de pantalla
}

function stopRecording() {
    // Lógica para detener la grabación
    console.log('Detener grabación');
    // Aquí deberías implementar la lógica para detener la grabación de pantalla
}