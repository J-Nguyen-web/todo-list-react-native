import { db } from "../firebaseconfig.js"

const docRef = await addDoc(collection  (db, "test"), {
    message: "Hello Firebase"
})

console.log(docRef.id)