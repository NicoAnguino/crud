import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'


const db = firebase.firestore(firebaseApp)

export const leerColeccion = async(collection) => {
    const resultado = {statusResponse : false, data : null, error: null}
    try {
        const datos = await db.collection(collection).get()
        const arrayDatos = datos.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        resultado.statusResponse = true
        resultado.data = arrayDatos
    } catch (error){
         resultado.error = error
    }
    return resultado
}


export const insertarDocumento = async(collection, data) => {
    const resultado = {statusResponse : false, data : null, error: null}
    try{
        const respuesta = await db.collection(collection).add(data)
        resultado.data = {id: respuesta.id}
        resultado.statusResponse = true
    } catch(error){
        resultado.error = error
    }
    return resultado
}

export const buscarDocumento = async(collection, id) => {
    const resultado = {statusResponse : false, data : null, error: null}
    try{
        const respuesta = await db.collection(collection).doc(id).get()
        resultado.data = {id: respuesta.id, ...respuesta.data}
        respuesta.statusResponse = true
    } catch(error){
        resultado.error = error
    }
    return resultado
}

export const actualizarDocumento = async(collection, id, data) => {
    const resultado = {statusResponse : false, error: null}
    try{
        await db.collection(collection).doc(id).update(data)
        resultado.statusResponse = true       
    } catch(error){
        resultado.error = error
    }
    return resultado
}

export const eliminarDocumento = async(collection, id) => {
    const resultado = {statusResponse : false, error: null}
    try{
        await db.collection(collection).doc(id).delete()
        resultado.statusResponse = true       
    } catch(error){
        resultado.error = error
    }
    return resultado
}