const express = require ('express') //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
//const {v4: uuidv4} = require ('uuid') // aqui estou chamando a biblioteca do uuid
const cors = require ('cors') // aqui estou trazendo o pacote cors que pertime consumir essa API no front-end
const conectaBancoDeDados = require ('./bancoDeDados') //aqui estou ligando ao arquivo bancoDeDados
conectaBancoDeDados() //aqui estou chamandoa função que conecta o banco de dados

const Mulher = require('./mulherModel') //importa modelo no servidor
const app = express() //aqui estou iniciando o app
app.use (cors()) //chamando a função que libera o app para ser usado a partir do front-end
app.use(express.json())
const porta = 3333 //aqui estou criando a porta

//GET
async function mostraMulheres(request, response) {
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()
        
        response.json (mulheresVindasDoBancoDeDados)
    }catch (erro){
        console.log (erro)
    }
}

//POST
async function criaMulher (request , response){
    const novaMulher = new Mulher ({
        nome: request.body.nome ,
        imagem: request.body.imagem ,
        citacao: request.body.citacao ,
        minibio: request.body.minibio
    })
    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada) //aqui será enviada uma resposta em formato json
    }catch (erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response) {
    try{
        const mulherEncontrada = await Mulher.findById (request.params.id) //operação para encontrar mulher com a função find() do javascript que serve para encontrart e retornar dados num array

        //Para o slide resumimos o código
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }
        if (request.body.minibio) {
            mulherEncontrada = request.body.minibio
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados) //envio da resposta
        } catch (erro) {
            console.log (erro)
        }
}

//DELETE
async function deletaMulher(request, response) {
    try{
        await Mulher.findByIdAndDelete (request.params,id) // criamos a função findByIdAndDelete que serve para encontrar e deletar o objeto pelo Id
        
        response.json ({message: 'mulher deletada com sucesso!'})
    } catch (erro) {
        console.log (erro)
    } 
}

app.use(router.get('/mulher' , mostraMulheres)) //segunda configuração da rota configurei rota GET /mulher
app.use(router.post('/mulher' , criaMulher)) //terceira configuração da rota - POST /mulher
app.use(router.patch('/mulher/:id' , corrigeMulher)) //quarta configuração da rota configutei rota PATCH /mulher/:id
app.use(router.delete('/mulher/:id' , deletaMulher)) // quinta configuração da rota - configurei rota DELETE /mulher/:id
//PORTA
function mostraPorta() {
    console.log ('Servidor criado e rodando na porta', porta)
}


app.listen(porta, mostraPorta) //primeira configuração de rota - servidor ouvindo a porta