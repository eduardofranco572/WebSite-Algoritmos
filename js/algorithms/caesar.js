function initCaesarCipherAnimation() {
    const container = document.getElementById('caesar-animation-container');
    if (!container) return;

    container.innerHTML = `
    <div class="caesar-card w-100 h-100 d-flex flex-column align-items-center justify-content-center">
        <div class="caesar-controls d-flex justify-content-center align-items-center mb-3">
            <div class="form-group flex-shrink-1">
                <label for="caesar-input">Texto de Entrada:</label>
                <input type="text" id="caesar-input" value="DBJM" maxlength="20">
            </div>
            <div class="form-group">
                <label for="caesar-shift">Chave (deslocamento):</label>
                <input type="number" id="caesar-shift" value="0" min="-25" max="25">
            </div>
            <div class="form-group">
                <label for="caesar-operation">Operação:</label>
                <select id="caesar-operation">
                    <option value="encrypt">Criptografar</option>
                    <option value="decrypt">Descriptografar</option>
                </select>
            </div>
        </div>

        <div class="animation-area w-100 text-center position-relative">
            <div class="alphabet-display fs-5 mb-2 d-flex justify-content-center flex-wrap" id="original-alphabet"></div>
            <div class="shifted-alphabet-display fs-5 mb-2 d-flex justify-content-center flex-wrap" id="shifted-alphabet"></div>
        </div>

        <div class="result-area w-100 text-center mt-3">
            <h3>Resultado:</h3>
            <div id="caesar-output" class="d-flex align-items-center justify-content-center w-100"></div>
        </div>

        <div class="animation-controls d-flex justify-content-center pt-2">
             <button id="animate-btn" class="btn-animate d-flex align-items-center justify-content-center fs-6 rounded-3 user-select-none">
                <span class="material-symbols-outlined">play_arrow</span>
                <span class="btn-text">Animar</span>
            </button>
        </div>
    </div>
    `;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const originalAlphabetDiv = document.getElementById('original-alphabet');
    const shiftedAlphabetDiv = document.getElementById('shifted-alphabet');
    
    originalAlphabetDiv.innerHTML = alphabet.map(l => `<div class="letter-box d-inline-flex align-items-center justify-content-center" id="orig-${l}">${l}</div>`).join('');

    function updateShiftedAlphabet(shiftValue, operation) {
        let actualShift = shiftValue;
        if (operation === 'decrypt') {
            actualShift = -shiftValue;
        }
        const normalizedShift = (actualShift % 26 + 26) % 26;

        shiftedAlphabetDiv.innerHTML = alphabet.map((l, i) => {
            const shiftedIndex = (i + normalizedShift) % 26;
            const shiftedLetter = alphabet[shiftedIndex];
            return `<div class="letter-box d-inline-flex align-items-center justify-content-center" id="shifted-${l}" data-original="${l}" data-shifted-target="${shiftedLetter}">${shiftedLetter}</div>`;
        }).join('');
    }

    const shiftInput = document.getElementById('caesar-shift');
    const operationSelect = document.getElementById('caesar-operation');
    const outputDiv = document.getElementById('caesar-output');

    const updateDisplay = () => {
        const currentValue = shiftInput.value;
        
        if (currentValue === '' || currentValue === '-') {
            updateShiftedAlphabet(0, operationSelect.value); 
            return;
        }

        let shift = parseInt(currentValue, 10);

        if (isNaN(shift)) {
            shift = 0;
        } else if (shift > 25) {
            shift = 25;
            shiftInput.value = 25;
        } else if (shift < -25) {
            shift = -25;
            shiftInput.value = -25;
        }
        
        updateShiftedAlphabet(shift, operationSelect.value);
        outputDiv.textContent = '';
        document.querySelectorAll('.letter-box.highlight').forEach(el => el.classList.remove('highlight'));
    };

    shiftInput.addEventListener('input', updateDisplay);
    operationSelect.addEventListener('change', updateDisplay);

    const animateBtn = document.getElementById('animate-btn');
    const btnIcon = animateBtn.querySelector('.material-symbols-outlined');
    const btnText = animateBtn.querySelector('.btn-text');

    animateBtn.addEventListener('click', async () => {
        const text = document.getElementById('caesar-input').value.toUpperCase();
        let shift = parseInt(document.getElementById('caesar-shift').value, 10);
        if (isNaN(shift)) shift = 0;
        const operation = document.getElementById('caesar-operation').value;
        
        outputDiv.textContent = '';
        let result = '';

        document.querySelectorAll('.letter-box.highlight').forEach(el => el.classList.remove('highlight'));
        animateBtn.disabled = true;
        btnText.textContent = 'Animando...';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            let currentShift = operation === 'decrypt' ? -shift : shift;

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
            const shiftedLetterBox = document.querySelector(`.shifted-alphabet-display .letter-box[data-original='${char}']`);

            if (originalLetterBox) originalLetterBox.classList.add('highlight');
            if (shiftedLetterBox) shiftedLetterBox.classList.add('highlight');

            await new Promise(resolve => setTimeout(resolve, 800));

            if (originalLetterBox) originalLetterBox.classList.remove('highlight');
            if (shiftedLetterBox) shiftedLetterBox.classList.remove('highlight');

            result += newChar;
            outputDiv.textContent = result;
            outputDiv.scrollLeft = outputDiv.scrollWidth;

            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        btnIcon.textContent = 'replay';
        btnText.textContent = 'Reiniciar';
        animateBtn.disabled = false;
    });

    updateDisplay();
}