from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
import joblib

app = Flask(__name__)
CORS(app)  # Permite solicitudes de cualquier origen

# Cargar modelo
rf_model = joblib.load('modelo_preguntas.pkl')
vectorizer = joblib.load('vectorizador.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    pregunta = data.get('pregunta', '')
    
    # Vectorizar pregunta
    pregunta_vectorizada = vectorizer.transform([pregunta])
    
    # Predecir respuesta
    respuesta = rf_model.predict(pregunta_vectorizada)[0]
    
    return jsonify({'respuesta': respuesta})

if __name__ == '__main__':
    app.run(debug=True)