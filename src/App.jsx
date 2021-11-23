import React,{useState,useEffect} from "react";
import {store} from './firebaseConfig'



function App() {
  const [modoedicion,setModoEdicion] = useState(null)
  const [idusuario,setIdUsuario] = useState('')
  const [nombre,setNombre] = useState('')
  const [phone,setPhone] = useState('') 
  const [usuario,setUsuario] = useState([])
  const [error,setError] = useState('')

  const setUsuarios =  async (evento)=>{ // funcion asincrona para trabajar con bases de DATOS,RECOMENDADO
    evento.preventDefault()

    if (!nombre.trim()){
      setError('El campo nombre esta vacio')
      return
    }
    if (!phone.trim()){
      setError('El campo telefono esta vacio')
      return
    }
    const usuarioUnico ={ // un objeto JS para que luego se parsee a JSON
      nombre:nombre,
      telefono:phone   // nombre y phone vienen del estado useState
    }

    try { 
      const data = await store.collection('(app-datos-usuarios)').add(usuarioUnico)// para crear la  coleccion 
                                                                                    //en la base de datos
      /// me lo traigo desde el useEffect para que se liste en la pantalla
        const {docs} = await store.collection('(app-datos-usuarios)').get()  // await genera hilos independientes 
                                                                            // del hilo principal,asincronia
        const nuevoArray = docs.map(item =>({id:item.id,...item.data()}))   
        setUsuario(nuevoArray)   
       // alert('Usuario añadido....')
        //////    
                                                                          
      console.log(`Tarea añadida: ${usuarioUnico.nombre}`)
    }catch(evento){ 
      console.log(`Este error: ${evento}`)
    }
    setNombre('');
    setPhone('');
    setError('');
  }

useEffect(()=>{
    const getUsuario = async()=>{ // arriba
      const {docs} = await store.collection('(app-datos-usuarios)').get() // object destructuring, 
                                                                        //await genera un hilo independiente
      const nuevoArray = docs.map(item =>({id:item.id,...item.data()}))   
      setUsuario(nuevoArray)  
    }
    getUsuario()
},[]);

//console.log(usuario)
const sinUsuarios = <span>No hay usuarios en tu agenda</span>;
const myError = <h6>{ error  ? (
                    <div>
                      <p>{error}</p>
                    </div>
                  ) 
                  : 
                  (
                    <span></span>
                  )}</h6>;

/* usuario.map(item=>{ 
  console.log(`${item.id}-- ${item.nombre} -- ${item.telefono}`)
})   */      

const borrarUsuario = async (id)=>{  // asincrona, borrar en base de datos
    try{
        await store.collection('(app-datos-usuarios)').doc(id).delete()
        const {docs} = await store.collection('(app-datos-usuarios)').get()  // await genera hilos independientes 
                                                                            // del hilo principal,asincronia
        const nuevoArray = docs.map(item =>({id:item.id,...item.data()}))   
        setUsuario(nuevoArray)   
    }catch(error){
      console.log(error)
    }
}
const actualizarUsuario = async (id)=>{
  try{
    const data = await store.collection('(app-datos-usuarios)').doc(id).get()
    const {nombre,telefono} = data.data()
    setNombre(nombre)
    setPhone(telefono)
    setIdUsuario(id)
    setModoEdicion(true)
    console.log(id)

  }catch(error){
    console.log(error)
  }
}
const actualizarBD = async (evento)=>{
  evento.preventDefault()

  if (!nombre.trim()){
    setError('El campo nombre esta vacio')
    return
  }
  if (!phone.trim()){
    setError('El campo telefono esta vacio')
    return
  }
  const usuarioActual ={ // un objeto JS para que luego se parsee a JSON
    nombre:nombre,
    telefono:phone   // nombre y phone vienen del estado useState
  }

  try { 
    const data = await store.collection('(app-datos-usuarios)').doc(idusuario).set(usuarioActual)// para actualizar  la  coleccion 
                                                                                  //en la base de datos
    /// me lo traigo desde el useEffect para que se liste en la pantalla
      const {docs} = await store.collection('(app-datos-usuarios)').get()  // await genera hilos independientes 
                                                                          // del hilo principal,asincronia
      const nuevoArray = docs.map(item =>({id:item.id,...item.data()}))   
      setUsuario(nuevoArray)   
     // alert('Usuario añadido....')
      //////    
                                                                        
    console.log(`Tarea añadida: ${usuarioActual.nombre}`)
  }catch(evento){ 
    console.log(`Este error: ${evento}`)
  }
  setNombre('');
  setPhone('');
  setError('');
  setIdUsuario('')
  setModoEdicion(false)
}
  return (
    <div className='container'>
      <div className='row'>
      <div className='col'>
        <h2>Formulario de Usuarios</h2>
            <form onSubmit={modoedicion ? actualizarBD : setUsuarios} className='form-group'>
              <input 
              value={nombre}
              onChange = {(evento)=>{setNombre(evento.target.value)}}
              className='form-control'
              placeholder='Introduce el Nombre'
              type="text" 
              />
              <input 
              value={phone}
              onChange = {(evento)=>{setPhone(evento.target.value)}}
              className='form-control mt-3'
              placeholder='Introduce el Numero de Telefono'
              type="text" 
              />
              {
                  modoedicion ?(
                    <input
                    type="submit" 
                    value='Editar'
                    className='btn btn-dark btn-block mt-3'
                    />
                  )
                  :
                  (
                    <input
                    type="submit" 
                    value='Registrar'
                    className='btn btn-dark btn-block mt-3'
                    />
                  )
              }
             
            </form>
            {/*fuera del formulario pero dentro de la columna donde se esta pintando el formulario, JSX */}
              { 
                  myError
              }
      </div>
      <div className='col'>
        <h2>Lista de tu Agenda</h2>
        <ul className='list-group'>
        {
           usuario.length !== 0 ? ( 
           usuario.map(item=>{ 
             return (<li className='list-group-item' key={item.id}>{item.nombre} -- {item.telefono}
             <button 
                type='button'
                onClick={(id)=>{borrarUsuario(item.id)}}
                className='btn btn-danger float-end btn-sm'>
                Borrar
              </button>
              <button  
              type='button'
                onClick={(id)=>{actualizarUsuario(item.id)}}
                className='btn btn-info float-end  btn-sm'>
                Actualizar
              </button>
             </li>)
            })
            ) : ( 
            sinUsuarios
            )
        }
        </ul>
      </div>
      </div>
    </div>
  );
}

export default App;