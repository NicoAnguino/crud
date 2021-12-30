
import React, {useState} from "react";
import { isEmpty } from "lodash";
import shortid from "shortid";

//npm i --save lodash
//npm i --save shortid

function App() {
  const [task, setTask] = useState('')//ESTADO QUE ALMACENA EL NOMBRE DE LA TAREA NUEVA
  const [tareas, setTareas] = useState([])


const addTask = (e) => {
  e.preventDefault();
  if(isEmpty(task)){
    console.log("Tarea vacía.");
    return
  }

  const nuevaTarea = {
     id:shortid.generate(),
     titulo: task
  }

  setTareas([...tareas, nuevaTarea])
  
  setTask('')
}

  return (
    <div className="container mt-5">
      <h1>Aplicación React de Tareas!</h1>
      <hr />

      <div className="row">
        <div className="col-8">
            <h4 className="text-center">Lista de Tareas</h4>
            <ul className="list-group">

              {
                tareas.map((tarea) => ( 
                  <li className="list-group-item" key={tarea.id}>
                  <span className="lead">{tarea.titulo}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>    
                  <button className="btn btn-primary btn-sm float-right">Editar</button>               
                  </li>
                ))          
              }
          
            </ul>
        </div>
        <div className="col-4">
            <h4 className="text-center">Formulario</h4>
            <form onSubmit={addTask}>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Ingrese la tarea..."
                onChange={(text) => setTask(text.target.value)}
                value={task}
              />
              <button 
                className="btn btn-dark btn-block"
                type="submit"
                >Agregar
                </button>
            </form>
        </div>
      </div>

    </div>
  );
}

export default App;
