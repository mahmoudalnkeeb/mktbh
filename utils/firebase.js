require('dotenv').config();
const { ref, uploadBytes, getDownloadURL, getStorage, getMetadata } = require('firebase/storage');
const { app, firebaseConfig } = require('../configs/firebase.config');

const storage = getStorage(app, 'gs://' + firebaseConfig.storageBucket);

async function uploadFile(file) {
  let storageRef = ref(storage, `images/${file.originalname}`);
  let metadata = {
    contentType: file.mimetype,
  };
  let uploadedFile = await uploadBytes(storageRef, file.buffer, metadata);
  let url = getDownloadURL(uploadedFile.ref);
  return { url, fileMetaData: uploadedFile.metadata };
}

async function deleteFile(file) {}
module.exports = uploadFile;
