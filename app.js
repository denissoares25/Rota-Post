const express = require("express");
const app = express();
const PORT = 8081;
const pathFile= "./livros.json";
const fs = require("fs");

app.use(express.json());

if (!fs.existsSync(pathFile)) {
fs.writeFileSync(pathFile, `[]`);
}

app.get("/livros", (req, res)=>{
    try{

        const data = fs.readFileSync(pathFile, "utf-8");

        let livros = JSON.parse(data);


        res.status(200).json(livros);
    }catch(error){
        console.error("Erro ao ler o arquivo JSON:", error);
        res.status(500).json({error: "Erro ao Erro interno no servidor ao processar os produtos!"});
     }
});


app.post("/livros", (req, res) => {
    try {
        const { titulo, autor, anoPublicação, qtdExemplares } = req.body;

        const livro = {
            titulo: titulo, 
            autor: autor,
            anoPublicação: anoPublicação,
            qtdExemplares: qtdExemplares

        };

        const data = fs.readFileSync(pathFile,"utf-8");
        const livros = JSON.parse(data);

        livros.push(livro);
        
        fs.writeFileSync(pathFile, JSON.stringify(livros, null, 4));
        
       
        res.status(201).json({
            message: "Livro cadastrado com sucesso!",
            livro: livro
        });
    } catch (error) {
        console.error("erro ao cadastrar livro:", error);
        res.status(500).json({ error: "erro interno no servidor ao cadastrar livro!" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});