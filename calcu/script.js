let history = [];
let isHistoryVisible = false; // Para saber si el historial está visible o no

function appendToDisplay(value) {
    // Agregar el valor al display
    document.getElementById("display").value += value;
}

function clearDisplay() {
    // Limpiar el display
    document.getElementById("display").value = '';
}

function deleteLast() {
    // Eliminar el último carácter del display
    let currentValue = document.getElementById("display").value;
    document.getElementById("display").value = currentValue.slice(0, -1);
}

function calculate() {
    let currentValue = document.getElementById("display").value;
    if (currentValue) {
        try {
            // Validar divisiones por cero
            if (currentValue.includes('/')) {
                let parts = currentValue.split('/');
                for (let i = 1; i < parts.length; i++) {
                    if (parseFloat(parts[i]) === 0) {
                        throw new Error("División por cero");
                    }
                }
            }

            // Evaluar la expresión
            let result = eval(currentValue);
            document.getElementById("display").value = result;

            // Agregar la operación al historial
            addToHistory(currentValue + " = " + result);
        } catch (e) {
            // Manejo de errores
            document.getElementById("display").value = 'Error';

            // Mostrar error en el historial
            addToHistory(currentValue + " = Error: " + e.message);
        }
    }
}

function addToHistory(operation) {
    // Agregar la operación al historial
    history.push(operation);

    if (history.length > 10) {
        history.shift(); // Eliminar el elemento más antiguo si hay más de 10 operaciones
    }

    updateHistoryUI();
}

function updateHistoryUI() {
    // Actualizar la interfaz del historial
    let historyList = document.getElementById("history-list");
    historyList.innerHTML = ''; // Limpiar el historial actual

    history.forEach(op => {
        let listItem = document.createElement("li");
        listItem.textContent = op;
        historyList.appendChild(listItem);
    });
}

function toggleHistory() {
    // Mostrar u ocultar el historial
    let historyElement = document.getElementById("history");
    isHistoryVisible = !isHistoryVisible;

    if (isHistoryVisible) {
        historyElement.style.display = 'block'; // Mostrar el historial
    } else {
        historyElement.style.display = 'none';  // Ocultar el historial
    }
}
