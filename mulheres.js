const express = require ('express')
const router = express.Router()

const app = express()
const porta = 2222

function mostraMulheres(request, response) {
    response.json ({
        nome: "Simara da Conceição" , 
        imagem: "https://github.com/simaraconceicao.png" ,
        minibio: "Desenvolvedora e Instrutora"
    })
}


function mostraPorta() {
    console.log ('Servidor criado e rodando na porta', porta)
}

app.use(router.get('/ml' , mostraMulheres))
app.listen(porta, mostraPorta)