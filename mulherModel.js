const mongoose = require ('mongoose')

const MulherSchema = new mongoose.Schema({ //estamos definindo um objeto
    nome: {
        type: String, //definimos o tipo de dado da propriedade
        require: true // definimos se o campo é obrigatório ou não - true obrigatório, false não obrigatório
    }
})

module.exports = mongoose.model('diva', MulherSchema) // exportamos a função mongoose.model ()