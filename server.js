//const math = require("math.js");
const { json } = require('express');
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
    res.status(200).end(JSON.stringify(giocatoriFiltered));
});

//7. top 10 portieri
app.get("/top10portieri", (req, res) => {
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Ruolo.includes("P")});
    let giocatoriOrdered = giocatoriFiltered.sort(giocatoriFiltered.Valore);
    res.status(200).end(JSON.stringify(giocatoriOrdered.slice(0, 10)));
});

//8. età media dei migliori 15 giocatori di una data squadra
app.get("/etaTop15/:club", (req, res) =>{
    let maxValue = 15;
    var somma = 0;
    let clubGiocatore = req.params.club;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Club.includes(clubGiocatore)});
    let giocatoriOrdered = giocatoriFiltered.sort(giocatoriFiltered.Eta);
    let giocatoriSliced = giocatoriOrdered.slice(0, maxValue);
    giocatoriSliced.forEach(element => {somma = somma + element.Eta;});
    let etaMedia = somma/maxValue;
    let valoreRounded = Math.round(etaMedia);
    res.status(200).end(valoreRounded.toString());
});

//9. Valore medio dei migliori 15 giocatori di una data squadra
app.get("/valoreTop15/:club", (req, res) =>{
    let maxValue = 15;
    var somma = 0;
    let clubGiocatore = req.params.club;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Club.includes(clubGiocatore)});
    let giocatoriOrdered = giocatoriFiltered.sort(giocatoriFiltered.Valore);
    let giocatoriSliced = giocatoriOrdered.slice(0, maxValue);
    giocatoriSliced.forEach(element => {somma = somma + element.Valore;});
    let etaMedia = somma/maxValue;
    let valoreRounded = Math.round(etaMedia);
    res.status(200).end(valoreRounded.toString());
});

//10. Elenco dei giocatori di un certo ruolo in ordine di valore crescente
app.get("/ruoli/:ruolo", (req, res) =>{
    let ruoloGiocatore = req.params.ruolo;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Ruolo.includes(ruoloGiocatore)});
    let giocatoriOrdered = giocatoriFiltered.sort(giocatoriFiltered.Valore);
    res.status(200).end(JSON.stringify(giocatoriOrdered));
});

//11. I 10 giocatori più forti di una data nazione
app.get("/top10/:nazione", (req, res) => {
    let naziGiocatore = req.params.nazione;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Nazionalita.includes(naziGiocatore)});
    let giocatoriOrdered = giocatoriFiltered.sort(giocatoriFiltered.Valore);
    res.status(200).end(JSON.stringify(giocatoriOrdered.slice(0, 10)));
});

//12. La percentuale di attaccanti che usano di preferenza il piede sinistro
app.get("/piedi", (req, res)=>{
    var somma = 0;
    let giocatoriFiltered = giocatori.filter((g)=>{return g.Ruolo.includes("A")});
    giocatoriFiltered.forEach(element => {
        if (element.Piede == "Left") {
            somma++;
        }
    });
    let percentuale = Math.round((somma/giocatoriFiltered.length)*100);
    //console.log(somma, giocatoriFiltered.length, percentuale);
    res.status(200).end(percentuale.toString() + "%");
});

//13. Aumentare l'età di tutti i giocatori di un anno
app.get("/giocatoriVecchi", (req, res)=>{
    giocatori.forEach(element =>{
        element.Eta++;
    });
    res.status(200).end(JSON.stringify(giocatori));
});

//14. Eliminazione di tutti i giocatori di valore inferiore a 78

//15. Inserimento di un nuovo giocatore
//16. Prevedere una pagina iniziale ed una risposta di default

app.listen(5000, () => console.log("sono in ascolto sulla porta 5000"));