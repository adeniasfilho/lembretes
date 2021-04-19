const axios = require("axios");
const express = require('express');
const app = express();
app.use(express.json());
const lembretes = {};
var contador = 0;

app.get("/lembretes", (req, res, next) => {
    res.send(lembretes);
});

app.put("/lembretes", async (req, res) => {
    contador++;
    const {
        texto
    } = req.body;
    lembretes[contador] = {
        contador,
        texto
    }

    await axios.post("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados: {
            contador,
            texto,
        },
    });
    res.status(201).send(lembretes[contador]);
});

app.listen(4000, () => {
    console.log('Lembretes. Porta 4000');
});