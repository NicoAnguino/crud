
import React, {useState} from "react";
import { isEmpty, size } from "lodash";
import shortid from "shortid";

//npm i --save lodash
//npm i --save shortid

function App() {
  const [tarea, setTarea] = useState('')//ESTADO QUE ALMACENA EL NOMBRE DE LA TAREA NUEVA
  const [tareas, setTareas] = useState([])
  const [modoEditar, setModoEditar] = useState(false)
  const [id, setId] = useState('')

const agregarTarea = (e) => {
  e.preventDefault();
  if(isEmpty(tarea)){
    console.log("Tarea vacía.");
    return
  }

  const nuevaTarea = {
     id:shortid.generate(),
     titulo: tarea
  }

  setTareas([...tareas, nuevaTarea])
  
  setTarea('')
}

const guardarEditarTarea = (e) => {
  e.preventDefault();
  if(isEmpty(tarea)){
    console.log("Tarea vacía.");
    return
  }

  const tareasEditada = tareas.map(item => item.id === id ? { id, titulo: tarea} : item)
  setTareas(tareasEditada)
  
  setModoEditar(false)
  setTarea('')
  setId("")
}



const eliminarTarea = (id) => {
  const tareasFiltradas = tareas.filter(tarea => tarea.id !== id)
  setTareas(tareasFiltradas)
}

const editarTarea = (laTarea) => {
  setTarea(laTarea.titulo)
  setModoEditar(true)
  setId(laTarea.id)
}

  return (
    <div className="container mt-5">
      <h1>Aplicación React de Tareas!</h1>
      <hr />

      <div className="row">
        <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
                   
           {   

           size(tareas) == 0  ? (
              <h6 className="text-center">Aún no hay tareas programadas</h6>
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
