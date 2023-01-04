const express = require('express');
const app = express();
const fs = require("fs");
let fileJsonRaw = fs.readFileSync("fifa23.json", "utf8");
let giocatori = [];

giocatori = JSON.parse(fileJsonRaw);

//1. elenco giocatori
app.get("/giocatori", (req, res) => {
    res.status(200).end(JSON.stringify(giocatori));
});

//2. elenco giocatori di squadra
app.get("/giocatori/:club", (req, res)=>{
    let squadra = req.params.club;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Club.includes(squadra)});
    res.status(200).end(JSON.stringify(giocatoriFiltered));
});

//3. elenco squadre
app.get("/squadre", (req, res)=>{
    let squadre = [...new Set(giocatori.map((g)=>g.Club))];
    res.status(200).end(JSON.stringify(squadre));
});

//4. elenco nazioni
app.get("/nazioni", (req, res)=>{
    let nazioni = [...new Set(giocatori.map((g)=>g.Nazionalita))];
    res.status(200).end(JSON.stringify(nazioni));
});

//5. elenco posizioni
app.get("/posizioni", (req, res)=>{
    let posizioni = [...new Set(giocatori.map((g)=>g.Posizione))];
    res.status(200).end(JSON.stringify(posizioni));
});

//6. scheda giocatore
app.get("/giocatori/scheda/:id", (req, res)=>{
    let idGiocatore = req.params.id;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.id==idGiocatore});
    console.log(idGiocatore);
    res.status(200).end(JSON.stringify(giocatoriFiltered));
});

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