async function enviarPregunta() {
    const input = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const pregunta = input.value;

    // Mostrar pregunta del usuario
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = `Tú: ${pregunta}`;
    chatMessages.appendChild(userMessageDiv);

    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pregunta: pregunta })
        });

        const data = await response.json();

        // Mostrar respuesta del chatbot
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.textContent = `Chatbot: ${data.respuesta}`;
        chatMessages.appendChild(botMessageDiv);

        // Limpiar input
        input.value = '';
    } catch (error) {
        console.error('Error:', error);
    }
}