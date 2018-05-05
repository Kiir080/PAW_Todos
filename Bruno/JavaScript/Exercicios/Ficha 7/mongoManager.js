'use-strict';


const client = require('mongodb').MongoClient;

class mongoManager {


    constructor(dbName, collectionName) {
        this.mongo_url = 'mongodb://localhost:27017';
        this.dbName = dbName;
        this.collectionName = collectionName;

    }


    insertDocument(document) {

        client.connect(this.mongo_url, (err, db) => {

            if (err) {

                console.log("Connection Error");

            } else {

                const mydb = db.db(this.dbName);

                const collection = mydb.collection(this.collectionName);

                collection.insertOne(document, (err, r) => {

                    if (!err) {

                        console.log("Documento inserido com sucesso");


                    } else {
                        console.log(err);
                    }

                });

                db.close();


            }
        });


    }

    findDocument(query,callback) {
        client.connect(this.mongo_url, (err, db) => {

            if (err) {

                console.log("Connection Error");

            } else {
                const mydb = db.db(this.dbName);

                const collection = mydb.collection(this.collectionName);

               callback(collection.find(query));

            }

            db.close();
        });
    }



}

module.exports = {
    mongoManager: mongoManager
};