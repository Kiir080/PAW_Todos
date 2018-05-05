
'use-strict';

const client = require('mongoose');


class mongoManager {


    constructor(dbName, collectionName) {
        this.dbName = dbName;
        this.collectionName = collectionName;
        this.db=null;
      
        
    }

    connect(Schema){   
        client.connect(`mongodb://localhost/${this.dbName}`);
        client.Promise = global.Promise; 
        this.db=client.connection;
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        return client.model(this.collectionName,Schema);
    }

    disconnect(){
        client.disconnect();
    }
    
}


module.exports = {
    mongoManager: mongoManager
};