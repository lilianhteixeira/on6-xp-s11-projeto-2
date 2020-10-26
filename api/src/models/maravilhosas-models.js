const { request, response } = require("../app");
const fs = require("fs")
//não pode ser const pq os dados vão ser alterados
let dados = require("../data/data.json");

// selectAllData, ñ precisa de request, response pq vão vir todos os dados
const selectAllData = () => {
    return dados;
}

//selectDataById
const selectDataById = (id) => {

    const mulheresID = id;
    const dadoEncontrado = dados.find(item => item.id == mulheresID);
    if(dadoEncontrado){
        return {data: dadoEncontrado}
    }else{
        return {error: {message: "Mulher maravilhosa não encontrada na base de dados."}, data: null}
    }
    
}


//insertData
const insertData = (novaMaravilhosa) => {
    
    const maravilhosaFound = dados.find(maravilhosa => maravilhosa.name == novaMaravilhosa.name);
    
    if (!novaMaravilhosa.id) {
        novaMaravilhosa.id = Math.random().toString(36).substr(-8);
    }
 
    if(maravilhosaFound) {
       return {error: {message: "Registro duplicado."}} 
    } else {
        fs.writeFileSync('./src/data/data.json', JSON.stringify([...dados, novaMaravilhosa]), 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        })
    
        return {error: null}
    }
}

//updateData
const updateData = (id, dataUpdate) => {

    const maravilhosaId = id;
    const maravilhosaFound = dados.find(item => item.id == maravilhosaId); 
    const maravilhosaIndex = dados.indexOf(maravilhosaFound);

    if (maravilhosaIndex >= 0) { 
        dados.splice(maravilhosaIndex, 1, dataUpdate);
        fs.writeFileSync('./src/data/data.json', JSON.stringify([dados]), 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        })

        return {error: null, data: selectDataById(id)}
    } else {
        return {error: {message: "Registro não encontrado, não foi possível fazer a alteração."}, data: null}
    }
}

//deleteData
const deleteData = (id) => {

    const maravilhosaId = id;
    const maravilhosaFound = dados.find(item => item.id == maravilhosaId);
    const maravilhosaIndex = dados.indexOf(maravilhosaFound);

    if (maravilhosaIndex >= 0) { 
        dados.splice(maravilhosaIndex, 1);
        fs.writeFileSync('./src/data/data.json', JSON.stringify([dados]), 'utf8', (err) => {
            if (err) {
                console.log(err);
            }
        })
        return {error: null}
    } else {
        return {error: {message: "Registro não encontrado, não foi possível deletá-lo."}}
    }
}

module.exports = {
    selectAllData,
    selectDataById,
    insertData,
    updateData,
    deleteData
}