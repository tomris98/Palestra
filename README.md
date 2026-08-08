# Palestra

App di allenamento che gira interamente nel browser del telefono. Nessun server, nessun account:
schede, pesi, ripetizioni e storico restano nella memoria locale del dispositivo che la apre.

## Installazione su iPhone

1. Apri l'indirizzo del sito in **Safari** (non in Chrome: solo Safari può installare le web app su iOS).
2. Tocca il pulsante **Condividi** (il quadrato con la freccia in su).
3. Scorri e scegli **Aggiungi a Home**.
4. Da quel momento la trovi tra le app. Si apre a schermo intero e funziona anche senza rete.

## Cosa contiene

| File | A cosa serve |
|---|---|
| `index.html` | L'app intera: interfaccia, logica, dati. |
| `manifest.webmanifest` | Nome, icona e modalità a schermo intero quando è installata. |
| `sw.js` | Service worker: tiene una copia in cache così l'app parte offline. |
| `icon-180/192/512.png` | Icone per la schermata Home e per il manifest. |

## Aggiornare l'app

Sostituisci `index.html` con la versione nuova e cambia la costante `V` in cima a `sw.js`
(es. da `palestra-v3-1` a `palestra-v3-2`): al primo avvio con rete il telefono scarica la
versione aggiornata e butta via la cache vecchia.

## Backup

I dati vivono solo sul telefono. In **Opzioni → Dati** ci sono il backup `.json` (ripristinabile
dall'app) e l'esportazione `.csv` dello storico. Se cancelli i dati di Safari, senza backup i dati
sono persi.
