const path = require ('path')
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore({ projectId:
    'gta-production', keyFilename: path.resolve(__dirname, 'gta-production.json')
    });

module.exports = firestore