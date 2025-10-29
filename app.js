const express = require("express");
const app = express();
const PORT = 8081;

app.use(express.json());

app.post("/livros", (req, res) => {
    try {
        const { titulo, autor, anoPublicação, qtdExemplares } = req.body;

        const produto = {
            titulo: titulo,
            autor: autor,
            anoPublicação: anoPublicação,
            qtdExemplares: qtdExemplares

        };

       
        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            produto: produto
        });
    } catch (error) {
        console.error("erro ao cadastrar produto:", error);
        res.status(500).json({ error: "erro interno no servidor ao cadastrar produto!" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});