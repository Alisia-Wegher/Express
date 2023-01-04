const express = require('express');
const app = express();
const fs = require("fs");
let fileJsonRaw = fs.readFileSync("fifa23.json", "utf8");
let fileJson = [];

fileJson = JSON.parse(fileJsonRaw);

//1. elenco giocatori
app.get("/", (req, res) => {
    res.status(200).end(JSON.stringify(fileJson));
});
//2. elenco giocatori di squadra
//3. elenco squadre
//4. elenco nazioni
//5. elenco posizioni
//6. scheda giocatore
//7. top 10 portieri
//8. età media dei migliori 15 giocatori di una data squadra
//9. Valore medio dei migliori 15 giocatori di una data squadra
//10. Elenco dei giocatori di un certo ruolo in ordine di valore crescente
//11. I 10 giocatori più forti di una data nazione
//12. La percentuale di attaccanti che usano di preferenza il piede sinistro
//13. Aumentare l'età di tutti i giocatori di un anno
//14. Eliminazione di tutti i giocatori di valore inferiore a 78
//15. Inserimento di un nuovo giocatore
//16. Prevedere una pagina iniziale ed una risposta di default

app.listen(5000, () => console.log("sono in ascolto sulla porta 5000"));