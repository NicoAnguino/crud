import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
//import { collection } from 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const leerColeccion = async(collection) => {
    const resultado = {statusResponse : false, data : null, error: null}
    try {
        const data = await db.collection(collection).get()
        console.log(data)
    } catch (error){
         resultado.error = error
    }
    return resultado
}