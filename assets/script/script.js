async function run() {
    let data;

    // Carichiamo il file locale "100_insegne.json"
    await fetch("assets/data/100_insegne.json")
        .then(function(r) { return r.json(); })
        .then(json => {
            data = json;
        });

    const mainElement = document.querySelector('main'); // Seleziona l'elemento 'main'

    // Calcoliamo il conteggio delle insegne per ogni tipo di attività
    const conteggioPerTipoAttivita = {};
    data.forEach(insegna => {
        conteggioPerTipoAttivita[insegna.Attività] = (conteggioPerTipoAttivita[insegna.Attività] || 0) + 1;
    });

    // Ordiniamo il conteggio delle insegne per rendere il menu a discesa più ordinato
    const tipiAttivitaOrdinati = Object.keys(conteggioPerTipoAttivita).sort();

    // Ordina i dati in base al nome
    function ordinaAlfabeticoAZ() {
        data.sort(function(a, b) {
            return a.Nome.localeCompare(b.Nome);
        });
        renderInsegne();
    }

    function ordinaAlfabeticoZA() {
        data.sort(function(a, b) {
            return b.Nome.localeCompare(a.Nome);
        });
        renderInsegne();
    }

    function ordinaRandom() {
        data.sort(function() {
            return 0.5 - Math.random();
        });
        renderInsegne();
    }

    // Popoliamo le stringhe HTML in base alla categoria
    function renderInsegne() {
        const tipoAttivitaSelezionata = document.getElementById('tipo-attivita').value;
        const catenaSelected = document.getElementById('checkboxCatena').checked;
        const proprietarioSelected = document.getElementById('checkboxProprietario').checked;

        mainElement.innerHTML = '';
        data.forEach(insegna => {
            if ((tipoAttivitaSelezionata === 'Tutte' || insegna.Attività === tipoAttivitaSelezionata) &&
                ((catenaSelected && insegna["Tipologia di insegna"] === "Catena") ||
                (proprietarioSelected && insegna["Tipologia di insegna"] === "Negozio proprietario"))) {
                const elementHTML = `
                    <div class="sign" data-bs-toggle="modal" data-bs-target="#exampleModal-${insegna.IMMAGINE}">
                        <img src="assets/images/${insegna.IMMAGINE}.jpg" alt="Insegna">
                    </div>
                `;
                const modalHTML = `
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal-${insegna.IMMAGINE}" tabindex="-1" aria-labelledby="exampleModalLabel-${insegna.IMMAGINE}" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel-${insegna.IMMAGINE}">${insegna.IMMAGINE}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col">
                                            <img src="assets/images/${insegna.IMMAGINE}.jpg" width="500">
                                        </div>
                                        <div class="col">
                                            <h1>${insegna.Nome}</h1>
                                            <p><strong>Sottitotolo: </strong>${insegna["Sottotitolo"]}</p>
                                            <p><strong>Tipo di attività:</strong> ${insegna["Attività"]}</p>
                                            <p><strong>Tipo di negozio: </strong>${insegna["Tipologia di insegna"]}</p>
                                            <p><strong>Tipo di carattere:</strong> ${insegna["Carattere"]}</p>
                                            <p><strong>Colore principale:</strong> ${insegna["Colore principale"]}</p>
                                            <p><strong>Coordinate:</strong> ${insegna["Coordinate"]}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Torna alle immagini</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                const element = document.createElement('div');
                element.innerHTML = elementHTML;
                mainElement.appendChild(element);
                // Aggiungi il modal al body del documento
                document.body.insertAdjacentHTML('beforeend', modalHTML);
            }
            
        });
    }

    // Iniziale rendering di tutte le insegne
    renderInsegne();

    // Aggiungiamo le opzioni al menu a discesa con il conteggio delle insegne
    const tipoAttivitaSelect = document.getElementById('tipo-attivita');
    tipiAttivitaOrdinati.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = `${tipo} (${conteggioPerTipoAttivita[tipo]} foto)`;
        tipoAttivitaSelect.appendChild(option);
    });

    // Aggiungi un evento di ascolto per il cambio di selezione nel menu a discesa
    tipoAttivitaSelect.addEventListener('change', renderInsegne);

    // Aggiorna il testo del bottone "Tipo di negozio" per riflettere il numero di opzioni selezionate
    function updateTipoNegozioButtonText() {
        const catenaCheckbox = document.getElementById('checkboxCatena');
        const proprietarioCheckbox = document.getElementById('checkboxProprietario');
        const catenaSelected = catenaCheckbox.checked;
        const proprietarioSelected = proprietarioCheckbox.checked;

        const selectedCount = (catenaSelected ? 1 : 0) + (proprietarioSelected ? 1 : 0);

        const text = `Tipo di negozio (${selectedCount})`;

        document.getElementById('tipoNegozioButton').innerText = text;
    }

    // Aggiungi un evento di ascolto per il cambio di stato dei checkbox
    document.getElementById('checkboxCatena').addEventListener('change', function() {
        updateTipoNegozioButtonText();
        renderInsegne();
    });
    document.getElementById('checkboxProprietario').addEventListener('change', function() {
        updateTipoNegozioButtonText();
        renderInsegne();
    });
// Aggiungi un evento di ascolto per il click sul link "Reset"
document.querySelector('#resetLink').addEventListener('click', function() {
    // Reimposta il menu a discesa per il tipo di attività
    document.getElementById('tipo-attivita').value = 'Tutte';

    // Reimposta i checkbox per il tipo di negozio
    document.getElementById('checkboxCatena').checked = true;
    document.getElementById('checkboxProprietario').checked = true;

    // Aggiorna il testo del pulsante "Tipo di negozio"
    updateTipoNegozioButtonText();

    // Rendi nuovamente visibili tutte le insegne
    renderInsegne();
});


// Aggiungi un evento di ascolto per il cambio di selezione nell'ordinamento
document.querySelectorAll('.dropdown-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
        const selection = this.textContent.trim();
        switch (selection) {
            case 'Alfabeto (A-Z)':
                ordinaAlfabeticoAZ();
                break;
            case 'Alfabeto (Z-A)':
                ordinaAlfabeticoZA();
                break;
            case 'Random':
                ordinaRandom();
                break;
            default:
                break;
        }

        // Aggiorna il testo del pulsante con l'opzione selezionata
        document.getElementById('changeOrder').innerText = selection;
    });
});


    // Chiamata alla funzione per inizializzare il testo del bottone
    updateTipoNegozioButtonText();
}

run();
