SUPSI 2023-24  
Corso d’interaction design, CV428.01  
Docenti: A. Gysin, G. Profeta  

Elaborato 1: XS 

# ExplorSigns
Autore: Walter De Nicola<br>
[ExplorSigns](https://walterdn03.github.io/exploresigns/#)<BR>
[Video](https://walterdn03.github.io/documentazione/registrazione.mov#)



## Introduzione e tema
Nel primo elaborato l'obiettivo era realizzare un'interfaccia per mostrare 100 immagini legate da un tema comune, rendendola interattiva.
<br>
Il tema è quello delle insegne di negozi, in particolare selezionando solo le insegne che si trovavano sopra alle attività commerciali, nella città di Como. L'archivio mira ad essere un portale accessibile a tutti, il quale mostra a seconda della città selezionata, le varie insegne che sono state catalogate in base a diversi fattori come la tipologia di attività, se si tratta di una catena o negozio proprietario, posizione e altri dati.


## Riferimenti progettuali
Per lo sviluppo del progetto ho integrato alcune conoscenze apprese in classe, e indagando alcuni aspetti legati alla user experience.

- [https://medium.com/tripaneer-techblog/improving-the-usability-of-multi-selecting-from-a-long-list-63e1a67aab35](url)
- [https://uxdesign.cc/selection-controls-ui-component-series-3badc0bdb546)](url)
- [https://www.nngroup.com/articles/listbox-dropdown/](url)
- [https://www.nngroup.com/articles/drop-down-menus/](url)
- [https://www.linkedin.com/pulse/designing-filter-sort-better-ux-muslimbek-vosidiy/](url)
- [https://medium.com/design-bootcamp/multiple-checkboxes-vs-multi-select-dropdown-bf50dfe70761
](url)




## Design dell’interfaccia e modalità di interazione
Ho realizzato l'interfaccia in modo tale da rendere efficace l'esplorazione delle varie insegne per l'utente. All'apertura del sito vengono caricate tutte le insegne, le quali possono essere filtrate attraverso due bottoni, uno dedicato al tipo di attività (abbigliamento, bar...), mentre l'altro permette di selezionare la tipologia di negozio (catena o negozio proprietario).
<img src="documentazione/screen01.png" width="800">
<br><br>Per filtrare le insegne ho utilizzato un menu **multi-select dropdown**, in questo modo il processo con il quale l'utente sceglie tra le varie attività risulta più semplice e veloce visto che sono presenti numerosi opzioni.
<br>È possibile ordinare le insegne utilizzando il bottone "Ordina per", il quale ha un'aspetto diverso dai filtri per distinguerlo correttamente ed evitare errori.
All'interno dell' "Ordina per" l'utente può scegliere tra un ordinamento di tipo alfabetico "A-Z", "Z-A" e poi "random".
<br>Attraverso il bottone "reset" è possibile resettare tutti i filtri, anche in questo caso l'obiettivo è rendere l'esperienza dell'utente **più intuitiva** e meno macchinosa, l'aspetto del bottone è fatto in modo da **prevenire** click accidentali.
L'utente può interagire con le insegne cliccando su di esse, e gli verranno mostrati i metadati associati completi.
<img src="documentazione/screen02.png" width="800">

Attraverso la pagina "mappa" vengono mostrate le varie insegne sul territorio di proprio interesse, cliccando sull'icona verranno mostrate le informazioni principali.

<img src="documentazione/screen03.png" width="800">
## Tecnologia usata
Per lo sviluppo del sito web, ho adottato la libreria Bootstrap per ottimizzare il processo di creazione dell'HTML e la gestione del CSS, anche se ho personalizzato ulteriormente lo stile. Per le interazioni dinamiche del sito, ho scritto uno script in JavaScript. Inoltre, per la gestione della mappa, ho integrato la libreria Leaflet.
<br><br>
Il filtraggio delle insegne viene gesttito attraverso la funzione renderInsegne(), che in base alla selezione dell'utente (document.getElementById) aggiorna la pagina e i relativi filtri.

```JavaScript
function renderInsegne() {
    const tipoAttivitaSelezionata = document.getElementById('tipo-attivita').value;
    const catenaSelected = document.getElementById('checkboxCatena').checked;
    const proprietarioSelected = document.getElementById('checkboxProprietario').checked;

    mainElement.innerHTML = '';  // Pulizia dell'elemento principale

    data.forEach(insegna => {
        // Verifica se l'insegna soddisfa i criteri di filtraggio
        if ((tipoAttivitaSelezionata === 'Tutte' || insegna.Attività === tipoAttivitaSelezionata) &&
            ((catenaSelected && insegna["Tipologia di insegna"] === "Catena") ||
            (proprietarioSelected && insegna["Tipologia di insegna"] === "Negozio proprietario"))) {
            
            // Creazione dell'HTML per l'insegna
            const elementHTML = `
                <div class="sign" data-bs-toggle="modal" data-bs-target="#exampleModal-${insegna.IMMAGINE}">
                    <img src="assets/images/${insegna.IMMAGINE}.jpg" alt="Insegna">
                </div>
            `;

            const modalHTML = `
                <!-- Modal per i dettagli dell'insegna -->
                <div class="modal fade" id="exampleModal-${insegna.IMMAGINE}" tabindex="-1" aria-labelledby="exampleModalLabel-${insegna.IMMAGINE}" aria-hidden="true">
                    <!-- ... (Contenuto del modal) ... -->
                </div>
            `;

            const element = document.createElement('div');
            element.innerHTML = elementHTML;
            mainElement.appendChild(element);

            // Aggiunta del modal al body del documento
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    });
}
```
Attraverso l'istruzione "if" presente nella funzione renderInsegne() viene verificato se l'insegna presente nel file json soddisfa i criteri di selezione scelti dall'utente (```tipoAttivitaSelezionata === 'Tutte' || insegna.Attività === tipoAttivitaSelezionata```), se il tipo di attività corrisponde al tipo di attività selezionata la condizione viene verificata e quindi l'insegna viene mostrata (```catenaSelected && insegna["Tipologia di insegna"] === "Catena") ||
(proprietarioSelected && insegna["Tipologia di insegna"] === "Negozio proprietario"```).
<br><br>
```L'ordinamento delle insegne è gestito attraverso il metodo sort.
function ordinaAlfabeticoAZ() {
    data.sort(function(a, b) {
        return a.Nome.localeCompare(b.Nome);
    });
    renderInsegne();
}
```


## Target e contesto d’uso
Il progetto è rivolto principalmente ai designer, grafici o comunque altri professionisti del settore creativo. Può essere utile per trovare ispirazione per i propri progetti, ma anche per visualizzare un'ampia varietà di insegne che possono essere utili per comprendere le tendenze di design locali ed internazionali nel caso il progetto venisse esteso.
<BR><br>
Inoltre, le insegne offrono una visione storica sull'evoluzione del design nel tempo e anche sulla presenza maggiore o minore di determinate attività, offrendo così un quadro interessante sul panorama commerciale e creativo.

<!--[<img src="doc/munari.jpg" width="300" alt="Supplemento al dizionario italiano">]()-->
