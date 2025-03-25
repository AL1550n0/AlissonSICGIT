// URL del backend (ajusta según tu configuración)
const BACKEND_URL = 'http://localhost:5000/predict';

// Elementos del DOM
const inputElement = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Función para enviar preguntas al chatbot
function enviarPregunta() {
    const pregunta = inputElement.value.trim();

    if (!pregunta) return; // Evita enviar preguntas vacías

    agregarMensajeAlChat(`Tú: ${pregunta}`, 'user-message');
    inputElement.value = ''; // Limpiar input

    fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json();
    })
    .then(data => agregarMensajeAlChat(`Chatbot: ${data.respuesta}`, 'bot-message'))
    .catch(() => agregarMensajeAlChat('Error: No se pudo obtener respuesta', 'error-message'));
}

// Función para agregar mensajes al chat
function agregarMensajeAlChat(texto, clase) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', clase);
    messageDiv.textContent = texto;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar al fondo del chat
}

// Función para mostrar recomendaciones iniciales
function mostrarRecomendaciones() {
    const recomendaciones = [
        "¿Cómo puedo aplicar a universidades en EE.UU.?",
        "¿Qué carreras tienen mayor demanda en el futuro?",
        "¿Cómo aprender a programar desde cero?",
        "¿Cuáles son los beneficios de aprender inglés?"
    ];

    agregarMensajeAlChat('🤖 ¡Hola! Aquí tienes algunas preguntas sugeridas:', 'bot-message');

    const recommendationsDiv = document.createElement('div');
    recommendationsDiv.classList.add('recommendations');

    recomendaciones.forEach(pregunta => {
        const btn = document.createElement('button');
        btn.textContent = pregunta;
        btn.classList.add('recommendation-btn');
        btn.onclick = () => {
            inputElement.value = pregunta;
            enviarPregunta();
        };
        recommendationsDiv.appendChild(btn);
    });

    chatMessages.appendChild(recommendationsDiv);
}

// Inicializar el chat al cargar la página
function inicializarChat() {
    chatMessages.innerHTML = '';
    mostrarRecomendaciones();
}

// Eventos
document.addEventListener('DOMContentLoaded', inicializarChat);
inputElement.addEventListener('keypress', e => { if (e.key === 'Enter') enviarPregunta(); });
