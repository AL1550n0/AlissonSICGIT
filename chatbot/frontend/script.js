// URL del backend (ajusta según tu configuración)
const BACKEND_URL = 'http://localhost:5000/predict';

// Función para manejar el envío de preguntas
function enviarPregunta() {
    const input = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const pregunta = input.value.trim();

    // Validar que la pregunta no esté vacía
    if (pregunta === '') return;

    // Mostrar pregunta del usuario
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = `Tú: ${pregunta}`;
    chatMessages.appendChild(userMessageDiv);

    // Limpiar input
    input.value = '';

    // Enviar solicitud al backend
    fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pregunta: pregunta })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar respuesta del chatbot
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.textContent = `Chatbot: ${data.respuesta}`;
        chatMessages.appendChild(botMessageDiv);

        // Desplazar al fondo del chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('message', 'error-message');
        errorDiv.textContent = `Error: No se pudo obtener respuesta`;
        chatMessages.appendChild(errorDiv);
    });
}
// Función para mostrar recomendaciones iniciales
function mostrarRecomendaciones() {
    const recomendaciones = [
        "¿Cómo puedo aplicar a universidades en EE.UU.?",
        "¿Qué carreras tienen mayor demanda en el futuro?", 
        "¿Cómo aprender a programar desde cero?",
        "¿Cuáles son los beneficios de aprender inglés?"
    ];

    const chatMessages = document.getElementById('chat-messages');
    
    // Mensaje de bienvenida
    const welcomeDiv = document.createElement('div');
    welcomeDiv.classList.add('message', 'bot-message');
    welcomeDiv.innerHTML = '🤖 ¡Hola! Aquí tienes algunas preguntas sugeridas:';
    chatMessages.appendChild(welcomeDiv);

    // Crear contenedor de recomendaciones
    const recommendationsDiv = document.createElement('div');
    recommendationsDiv.classList.add('recommendations');

    // Agregar botones de recomendaciones
    recomendaciones.forEach(pregunta => {
        const recommendationBtn = document.createElement('button');
        recommendationBtn.textContent = pregunta;
        recommendationBtn.classList.add('recommendation-btn');
        recommendationBtn.onclick = () => {
            // Establecer la pregunta en el input
            document.getElementById('user-input').value = pregunta;
            // Enviar la pregunta automáticamente
            enviarPregunta();
        };
        recommendationsDiv.appendChild(recommendationBtn);
    });

    // Agregar contenedor de recomendaciones al chat
    chatMessages.appendChild(recommendationsDiv);

    // Desplazar al fondo del chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function inicializarChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    // Mostrar recomendaciones
    mostrarRecomendaciones();
}

// Llamar a inicializarChat cuando la página se carga
document.addEventListener('DOMContentLoaded', inicializarChat);
// Agregar evento de envío al presionar Enter
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enviarPregunta();
    }
});