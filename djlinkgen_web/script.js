document.addEventListener('DOMContentLoaded', () => {
    const djLinkForm = document.getElementById('djLinkForm');
    const oabNumberInput = document.getElementById('oabNumber');
    const oabUFInput = document.getElementById('oabUF');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const dateFilterRadios = document.querySelectorAll('input[name="dateFilter"]');
    const customDateFieldsDiv = document.getElementById('customDateFields');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const resultAreaDiv = document.getElementById('resultArea');
    const generatedLinkAnchor = document.getElementById('generatedLink');
    const copyLinkButton = document.getElementById('copyLinkButton');
    const messageAreaDiv = document.getElementById('messageArea');

    // Load saved OAB data
    if (localStorage.getItem('rememberMe') === 'true') {
        oabNumberInput.value = localStorage.getItem('oabNumber') || '';
        oabUFInput.value = localStorage.getItem('oabUF') || '';
        rememberMeCheckbox.checked = true;
    }

    // Toggle custom date fields visibility
    dateFilterRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'custom') {
                customDateFieldsDiv.style.display = 'block';
            } else {
                customDateFieldsDiv.style.display = 'none';
            }
        });
    });

    // Form submission handler
    djLinkForm.addEventListener('submit', (event) => {
        event.preventDefault();
        clearMessages();
        resultAreaDiv.style.display = 'none';

        const oabNumber = oabNumberInput.value.trim();
        const oabUF = oabUFInput.value.trim().toUpperCase();
        const dateFilter = document.querySelector('input[name="dateFilter"]:checked').value;

        // Validate OAB UF
        if (!/^[A-Z]{2}$/.test(oabUF)) {
            showMessage('UF da OAB inválida. Use 2 letras (ex: SP, RJ).', 'error');
            return;
        }

        // Save OAB data if "Remember me" is checked
        if (rememberMeCheckbox.checked) {
            localStorage.setItem('oabNumber', oabNumber);
            localStorage.setItem('oabUF', oabUF);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('oabNumber');
            localStorage.removeItem('oabUF');
            localStorage.setItem('rememberMe', 'false');
        }

        let dataInicioStr = null;
        let dataFimStr = null;

        if (dateFilter === 'last5') {
            const today = new Date();
            const endDate = new Date(today);
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 4);

            dataInicioStr = formatDate(startDate);
            dataFimStr = formatDate(endDate);

        } else if (dateFilter === 'custom') {
            const startDateValue = startDateInput.value;
            const endDateValue = endDateInput.value;

            if (!startDateValue || !endDateValue) {
                showMessage('Por favor, preencha as datas de início e fim.', 'error');
                return;
            }
            // Basic validation for date format is handled by type="date",
            // but more specific validation (e.g. YYYY-MM-DD) might be needed if not using native date picker
            const startDateObj = new Date(startDateValue + "T00:00:00"); // Add time to avoid timezone issues
            const endDateObj = new Date(endDateValue + "T00:00:00");

            if (startDateObj > endDateObj) {
                showMessage('A data de início não pode ser posterior à data de fim.', 'error');
                return;
            }
            dataInicioStr = startDateValue;
            dataFimStr = endDateValue;
        }

        // Generate URL
        const baseURL = 'https://comunica.pje.jus.br/consulta';
        const params = new URLSearchParams();
        params.append('meio', 'D');
        params.append('numeroOab', oabNumber);
        params.append('ufOab', oabUF);

        if (dataInicioStr) {
            params.append('dataDisponibilizacaoInicio', dataInicioStr);
        }
        if (dataFimStr) {
            params.append('dataDisponibilizacaoFim', dataFimStr);
        }

        const generatedURL = `${baseURL}?${params.toString()}`;

        generatedLinkAnchor.href = generatedURL;
        generatedLinkAnchor.textContent = generatedURL;
        resultAreaDiv.style.display = 'block';
        showMessage('Link gerado com sucesso!', 'success');
    });

    // Copy link to clipboard
    copyLinkButton.addEventListener('click', () => {
        if (navigator.clipboard && generatedLinkAnchor.href && generatedLinkAnchor.href !== '#') {
            navigator.clipboard.writeText(generatedLinkAnchor.href)
                .then(() => {
                    showMessage('Link copiado para a área de transferência!', 'success');
                })
                .catch(err => {
                    showMessage('Falha ao copiar o link. Tente manualmente.', 'error');
                    console.error('Error copying to clipboard:', err);
                });
        } else {
            // Fallback for older browsers or if link is not generated
            try {
                const textArea = document.createElement('textarea');
                textArea.value = generatedLinkAnchor.href;
                textArea.style.position = 'fixed'; // Prevent scrolling to bottom
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showMessage('Link copiado para a área de transferência! (fallback)', 'success');
            } catch (err) {
                showMessage('Não foi possível copiar o link. Por favor, copie manualmente.', 'error');
            }
        }
    });

    // Helper function to format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Helper function to show messages
    function showMessage(message, type) {
        messageAreaDiv.textContent = message;
        messageAreaDiv.className = `message-${type}`; // e.g., message-success or message-error
        
        // Clear message after some time
        setTimeout(() => {
            clearMessages();
        }, 5000); // Message visible for 5 seconds
    }
    
    function clearMessages() {
        messageAreaDiv.textContent = '';
        messageAreaDiv.className = '';
    }

    // Initial check for custom date fields based on loaded radio state (e.g. if 'custom' is checked by default)
    if (document.querySelector('input[name="dateFilter"]:checked').value === 'custom') {
        customDateFieldsDiv.style.display = 'block';
    }
});
