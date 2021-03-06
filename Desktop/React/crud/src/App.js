
import React, {useState, useEffect} from "react";
import { isEmpty, size } from "lodash";
//import shortid from "shortid";
import { actualizarDocumento, eliminarDocumento, insertarDocumento, leerColeccion } from "./acciones";

//https://yarnpkg.com/?
//npm i --save lodash
//npm i --save shortid

function App() {
  const [tarea, setTarea] = useState('')//ESTADO QUE ALMACENA EL NOMBRE DE LA TAREA NUEVA
  const [tareas, setTareas] = useState([])
  const [modoEditar, setModoEditar] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)


 useEffect(() => {
   (async () => {
      const resultado = await leerColeccion("tareas")
      if(resultado.statusResponse){
        setTareas(resultado.data)
      }    
   })()
 }, [])


  const validarFomulario = () => {
    let esValido = true;
    setError(null);

    if(isEmpty(tarea)){  
      setError("Debes ingresar una tarea.")
      esValido = false;
    }

    return esValido;
  }

const agregarTarea = async(e) => {
  e.preventDefault();

  if(!validarFomulario()){
      return
  }

const resultado = await insertarDocumento("tareas", {titulo: tarea})
if(!resultado.statusResponse){
  setError(resultado.error)
  return
}

  //const nuevaTarea = {
    // id:shortid.generate(),
     //titulo: tarea
  //}

  //setTareas([...tareas, nuevaTarea])

  setTareas([...tareas, {id: resultado.data.id, titulo:tarea}])
  setTarea('')
}

const guardarEditarTarea = async(e) => {
  e.preventDefault();

  if(!validarFomulario()){
    return
  }

  const resultado = await actualizarDocumento("tareas", id, {titulo:tarea})
  if(!resultado.statusResponse){
    setError(resultado.error)
    return
  }

  const tareasEditada = tareas.map(item => item.id === id ? { id, titulo: tarea} : item)
  setTareas(tareasEditada)
  
  setModoEditar(false)
  setTarea('')
  setId("")
}



const eliminarTarea = async(id) => {
const resultado = await eliminarDocumento("tareas", id)
if(!resultado.statusResponse){
  setError(resultado.error)
  return
}

  const tareasFiltradas = tareas.filter(tarea => tarea.id !== id)
  setError(null);
  setTareas(tareasFiltradas)
}

const editarTarea = (laTarea) => {
  setError(null);
  setTarea(laTarea.titulo)
  setModoEditar(true)
  setId(laTarea.id)
}

  return (
    <div className="container mt-5">
      <h1>Aplicaci??n React de Tareas!</h1>
      <hr />

      <div className="row">
        <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
                   
           {   

           size(tareas) == 0  ? (

              <ul>
                <li className="list-group-item">A??n no hay tareas programadas.</li>
              </ul>
           ) : (
            <ul className="list-group">
            {
              tareas.map((tarea) => ( 
                <li className="list-group-item" key={tarea.id}>
                <span className="lead">{tarea.titulo}</span>
                <button 
                  className="btn btn-danger btn-sm float-right mx-2"
                  onClick={() => eliminarTarea(tarea.id)}
                  >
                  Eliminar
                </button>    
                <button 
                  className="btn btn-primary btn-sm float-right"
                  onClick={() => editarTarea(tarea)}
                  >
                    Editar
                </button>               
                </li>
              ))          
            }      
          </ul>
           )  
          }

        </div>
        <div className="col-4">
            <h4 className="text-center">
              { modoEditar ? "Modificar Tarea" : "Agregar Tarea"}
            </h4>
            <form onSubmit={ modoEditar ? guardarEditarTarea : agregarTarea}>
            {
                error && <span className="text-danger mb-2">{error}</span>
              }
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Ingrese la tarea..."
                onChange={(text) => setTarea(text.target.value)}
                value={tarea}
              />
            
              <button 
                className= { modoEditar ? "btn btn-warning btn-block" : "btn btn-dark btn-block"}
                type="submit"
                >
                  {modoEditar ? "Guardar" : "Agregar"}
                </button>
            </form>
        </div>
      </div>

    </div>
  );
}

export default App;
