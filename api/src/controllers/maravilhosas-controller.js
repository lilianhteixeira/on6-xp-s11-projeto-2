const { request, response } = require("express");
const mulheres = require("../models/maravilhosas-models");

//Nomes dos métodos para implementação:
//getMaravilhosas
const getMaravilhosas = (request, response) => {
    getMulheres = mulheres.selectAllData(); //ñ esquecer de colocar os ()depois do selectAllData, pq ele é uma função
    response.status(200).send(getMulheres);
}

//getMaravilhosaById
//request e response são responsabilidades do controller
const getMaravilhosaById = (request, response) => {

    const id = request.params.id;
    const mulheresById = mulheres.selectDataById(id);

    if(mulheresById){
        response.status(200).send(mulheresById);
    } else{
        response.status(404).send("Mulher maravilhosa não encontrada.");
    }
}

//addMaravilhosa 
const addMaravilhosa = (request, response) => {
    
    const {error} = mulheres.insertData(request.body);
    if(error === null) {
        response.status(201).json("Mulher maravilhosa adicionada com sucesso.");
    } else {
        response.status(400).json({"Não foi possível adicionar a mulher maravilhosa.": error.message})
    }
}
//updateMaravilhosa 
const updateMaravilhosa = (request, response) => {

    const {error, data} = mulheres.updateData(request.params.id, request.body  )
     if(error=== null) {
         response.status(201).send(data)
    } else {
        response.status(404).json({"Não foi possivel atualizar a mulher maravilhosa.": error.message})
    }
}

//deleteMaravilhosa
const deleteMaravilhosa = (request, response) => {
    
    const {error} = mulheres.deleteData(request.params.id)
    if(error===null) {
        response.status(204).send("Mulher maravilhosa removida com sucesso.")
    } else {
        response.status(404).json({"Não foi possivel remover a mulher maravilhosa.": error.message})
    }
}

module.exports = {
    getMaravilhosas,
    getMaravilhosaById,
    addMaravilhosa,
    updateMaravilhosa,
    deleteMaravilhosa
}