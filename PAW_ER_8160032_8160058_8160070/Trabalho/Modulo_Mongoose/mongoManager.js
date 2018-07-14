
'use-strict';

const client = require('mongoose');


class mongoManager {


    constructor(dbName, collectionName) {
        this.dbName = dbName;
        client.connect(`mongodb://localhost/${this.dbName}`);
        client.Promise = global.Promise; 
        this.db=client.connection;
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }

    static connect(Schema, collectionName){   
           return client.model(collectionName,Schema); 
    }

    disconnect(){
        client.disconnect();
    }

    close(){
        client.connection.close();
    }
    
   
}


module.exports = {
    mongoManager: mongoManager
};


