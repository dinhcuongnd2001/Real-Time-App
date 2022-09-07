import firebase, { db } from "./config"
const addDocument = (collection, data) => {
    const query = db.collection(collection);
    query.add(
        {
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            // lay thoi gian them vao hien tai
        }
    )
}

export {addDocument}