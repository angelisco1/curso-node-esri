const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const usuario = 'TU_USUARIO'
const password = 'TU_PASSWORD'

let bbdd;


const getBBDD = () => {
  if (!bbdd) {
    throw new Error('No tenemos la BBDD');
  }
  return bbdd;
}

const connectToMongo = (cb) => {

  MongoClient.connect(`mongodb+srv://${usuario}:${password}@clustercursos-8pxuw.mongodb.net/coches?retryWrites=true&w=majority`)
    .then(client => {
      bbdd = client.db();
      cb();
    })

}

module.exports = {
  connectToMongo,
  getBBDD
}
