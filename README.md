# Palestra

App di allenamento che gira interamente nel browser del telefono. Nessun server, nessun account:
schede, pesi, ripetizioni e storico restano nella memoria locale del dispositivo che la apre.

## Installazione su iPhone

1. Apri l'indirizzo del sito in **Safari** (non in Chrome: solo Safari può installare le web app su iOS).
2. Tocca il pulsante **Condividi** (il quadrato con la freccia in su).
3. Scorri e scegli **Aggiungi a Home**.
4. Da quel momento la trovi tra le app. Si apre a schermo intero e funziona anche senza rete.

## Come è organizzato

Un **programma** è una *rotazione*: un elenco ordinato di schede che si ripete all'infinito,
più i giorni della settimana in cui ti alleni. Il segnaposto avanza solo quando completi un
allenamento, quindi se salti un giorno la rotazione slitta con te invece di perdere un turno.
Tre schede su cinque giorni chiudono il ciclo in tre settimane, ed è corretto così.

## Cosa contiene

| File | A cosa serve |
|---|---|
| `index.html` | L'app intera: interfaccia, logica, dati. |
| `manifest.webmanifest` | Nome, icona e modalità a schermo intero quando è installata. |
| `sw.js` | Service worker: tiene una copia in cache così l'app parte offline. |
| `icon-180/192/512.png` | Icone per la schermata Home e per il manifest. |

## Aggiornare l'app

Sostituisci i file cambiati e alza la costante `V` in cima a `sw.js` (es. da `palestra-v3-2`
a `palestra-v3-3`). La pagina viene presa dalla rete quando c'è, quindi la versione nuova
si vede al primo avvio; la cache serve solo da rete di sicurezza offline.
Se cambia l'icona, togli l'app dalla schermata Home e riaggiungila: iOS tiene l'icona vecchia.

## Backup

I dati vivono solo sul telefono. In **Opzioni → Dati** ci sono il backup `.json` (ripristinabile
dall'app) e l'esportazione `.csv` dello storico. Se cancelli i dati di Safari, senza backup i dati
sono persi.
