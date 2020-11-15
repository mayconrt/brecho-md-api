const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore({ projectId:
    'gta-production', keyFilename: '../backend/src/resources/credentials/firestore/gta-production.json'
    });

module.exports = firestore