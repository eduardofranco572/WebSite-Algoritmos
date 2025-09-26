function initCaesarCipherAnimation() {
    const container = document.getElementById('caesar-animation-container');
    if (!container) return;

    container.innerHTML = `
    <div class="caesar-card">
        <div class="caesar-controls">
            <div class="form-group">
                <label for="caesar-input">Texto de Entrada:</label>
                <input type="text" id="caesar-input" value="DBJM" maxlength="20">
            </div>
            <div class="form-group">
                <label for="caesar-shift">Chave (deslocamento):</label>
                <input type="number" id="caesar-shift" value="-5" min="-25" max="25">
            </div>
            <div class="form-group">
                <label for="caesar-operation">Operação:</label>
                <select id="caesar-operation">
                    <option value="encrypt">Criptografar</option>
                    <option value="decrypt">Descriptografar</option>
                </select>
            </div>
            <button id="caesar-animate-btn" class="caesar-btn">Animar</button>
        </div>

        <div class="animation-area">
            <div class="alphabet-display" id="original-alphabet"></div>
            <div class="shifted-alphabet-display" id="shifted-alphabet"></div>
        </div>

        <div class="result-area">
            <h3>Resultado:</h3>
            <div id="caesar-output"></div>
        </div>
    </div>
    `;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const originalAlphabetDiv = document.getElementById('original-alphabet');
    const shiftedAlphabetDiv = document.getElementById('shifted-alphabet');
    
    originalAlphabetDiv.innerHTML = alphabet.map(l => `<div class="letter-box" id="orig-${l}">${l}</div>`).join('');

    function updateShiftedAlphabet(shiftValue, operation) {
        let actualShift = shiftValue;

        if (operation === 'decrypt') {
            actualShift = -shiftValue;
        }

        shiftedAlphabetDiv.innerHTML = alphabet.map((l, i) => {
            const normalizedShift = (actualShift % 26 + 26) % 26;
            const shiftedIndex = (i + normalizedShift) % 26;
            const shiftedLetter = alphabet[shiftedIndex];
            
            return `<div class="letter-box" id="shifted-${l}" data-original="${l}" data-shifted-target="${shiftedLetter}">${shiftedLetter}</div>`;
        }).join('');
    }

    const shiftInput = document.getElementById('caesar-shift');
    const operationSelect = document.getElementById('caesar-operation');
    const outputDiv = document.getElementById('caesar-output');

    const updateDisplay = () => {
        let shift = parseInt(shiftInput.value, 10);
        if (isNaN(shift)) shift = 0;
        if (shift > 25) shift = 25;
        if (shift < -25) shift = -25;
        shiftInput.value = shift;
        
        updateShiftedAlphabet(shift, operationSelect.value);
        outputDiv.textContent = '';
        document.querySelectorAll('.letter-box.highlight').forEach(el => el.classList.remove('highlight'));
    };

    shiftInput.addEventListener('input', updateDisplay);
    operationSelect.addEventListener('change', updateDisplay);

    document.getElementById('caesar-animate-btn').addEventListener('click', async () => {
        const text = document.getElementById('caesar-input').value.toUpperCase();
        let shift = parseInt(document.getElementById('caesar-shift').value, 10);
        const operation = document.getElementById('caesar-operation').value;
        
        outputDiv.textContent = '';
        let result = '';

        document.querySelectorAll('.letter-box.highlight').forEach(el => el.classList.remove('highlight'));

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            let currentShift = shift;
            if (operation === 'decrypt') {
                currentShift = -shift;
            }

            if (char < 'A' || char > 'Z') {
                result += char;
                outputDiv.textContent = result;
                await new Promise(resolve => setTimeout(resolve, 300));
                continue;
            }
            
            const pos = char.charCodeAt(0) - 65;
            const newPos = (pos + currentShift % 26 + 26) % 26;
            const newChar = String.fromCharCode(65 + newPos);

            const originalLetterBox = document.getElementById(`orig-${char}`);
            if (originalLetterBox) {
                originalLetterBox.classList.add('highlight');
            }

            const shiftedLetterBox = document.querySelector(`.shifted-alphabet-display .letter-box[data-original='${char}']`);
            if (shiftedLetterBox) {
                shiftedLetterBox.classList.add('highlight');
            }

            await new Promise(resolve => setTimeout(resolve, 800));

            if (originalLetterBox) originalLetterBox.classList.remove('highlight');
            if (shiftedLetterBox) shiftedLetterBox.classList.remove('highlight');

            result += newChar;
            outputDiv.textContent = result;
            outputDiv.scrollLeft = outputDiv.scrollWidth;

            await new Promise(resolve => setTimeout(resolve, 300));
        }
    });

    updateDisplay();
}