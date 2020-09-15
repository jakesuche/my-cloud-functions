const Datastore = require('@google-cloud/datastore');
const Storage = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');

const datastore = Datastore();
const storage = Storage();
const client = new vision.ImageAnnotatorClient();

exports.imageTagger = (event, callback) => {
    const object = event.data;
    console.log(object);

    if(!object.contentType.startsWith('image/')){
        console.log('This is not an image');
        callback();
        return;
    }


}    

function processLabels(bucketObject){
    const storagePath = `gs://${bucketObject.bucket}/${bucketObject.name}`
    const query = datastore.createQuery('Images').select('__key__').limit(1);
    query.filter('storagePath','=',storagePath);

    return query.run().then(data => {
        const objectExists =data[0].length > 0;
        const key =objectExists ? data[0] [0][datastore.KEY] : datastore.key('image');

        if(objectExist && bucketObject.resource == 'not_exist'){
            return datastore.delete(key).then(() =>{
                console.log('successfully deleted entity.');
            })
        }
    })
    .catch(err=>{
        console.error('Query run received an error',err)
    })
}