import React, {useEffect, useState} from 'react'
import { db } from '../firebase/config'

function useFirestore(collection, condition) {
    const [documents, setDocuments] = useState([]);
    
    useEffect(() => {
        // tra ve mot doi tuong collectionReference: la doi tuong duoc su dung de them
        // du lieu, lay duy lieu, thuc hien truy 
        let collectionRef = db.collection(collection).orderBy('createdAt');

        // Cấu trúc của một condition
        /*
            {
                fieldName : 'abc',
                operator: '==',
                compareValue: 'abc,
            }
        */

        if(condition){
            // trong filestore không chấp nhận 1 compareValue là null hay một chuỗi rỗng
            if(!condition.compareValue || !condition.compareValue.length){
                return;
            }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }
        // onSnapshot la hanh dong lang nghe su kien, tra ve mot function unsubcribe
        const unsubcribe = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                // chuyen du lieu firebase ve dang du lieu data;
                ...doc.data(),
                id: doc.id
            }))
            setDocuments(documents);
        })

        // cleanUp function dung de xoa su kien nghe khi components unmount
        return unsubcribe;

    }, [collection, condition]);
    
    return documents;
}

export default useFirestore
