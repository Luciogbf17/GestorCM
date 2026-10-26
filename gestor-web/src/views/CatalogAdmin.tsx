import {  useState,useEffect } from "react";
import { bandsApi} from "../api/client"
import type {Band} from "../api/client"



export default function CatalogoAdmin({ onBack }: { onBack: () => void }){
const handleImgError= (e)=>{
  e.target.one = null;
  e.target.src = 'https://placeholder.com'
};


const [bands,setBands] = useState<Band[]>([]);    // crea un vector llamado bands

useEffect(() => {
    // Al meterlo dentro de useEffect con [], SOLO se ejecuta una vez al cargar la pantalla
    bandsApi.findAll()
      .then(data => setBands(data))
      .catch(err => console.error(err));
  }, []); // rellena el vector con los datos de la db



  return (
   <>
   <header>
      <div className="container text-center p-3">
      <h1>Administrador de Catalogo</h1>
      </div>
   </header>
   
    
   
   <main>
      <form action="" className="" >
          <div className="container " >
            <div className=" row" >
              <div className=" col-4 justify-content-start ">
    
                  <div className="form-field ">
                    <label htmlFor="exampleFormControlSelect2" className="form-label">Banda</label>
                      <select className="form-control" id="fieldBanda">
                      { bands.map((o)=>(
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                      </select>
                  </div>
                
                  
                    <div className="form-field ">
                      <label htmlFor="fieldText" className="form-label">Nombre</label>
                      <input className="form-control" id="fieldNombre" placeholder="Nombre"/>
                    </div>
                  
                  
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Genero</label>
                      <input className="form-control" id="fieldGenero" placeholder="genero"/>
                    </div>
                  

                  
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Lanzamiento</label>
                      <input type="date" className="form-control" id="fieldLanzamiento" aria-label="Date picker" value=""/>
                    </div>
                  

                   
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">ISRC</label>
                      <input className="form-control" id="fielISRC" placeholder="codigo Isrc"/>
                    </div>
                 
              
                
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Spotify</label>
                      <input className="form-control" id="fieldSpotify" placeholder="UrlSpotify"/>
                    </div>
                  

                  
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Apple</label>
                      <input className="form-control" id="fieldApple" placeholder="UrlApple"/>
                    </div>
                 
                 
                    <div className="col form-field">
                      <label htmlFor="fieldText" className="form-label">Youtube</label>
                      <input className="form-control" id="fieldYoutube" placeholder="UrlYoutube"/>
                    </div>
                  
              </div>
                <div className="col-4">
                  <div className="mb-3">
                    <img onError={handleImgError} src="..." className="img-thumbnail" alt="..."/>
                    <label htmlFor="formFile" className="form-label">Portada</label>
                    <input className="form-control" type="file" id="formFile"/>
                  </div>
                  <div className="">
                    <button className="btn btn-outline-secondary w-25 h-25" onClick={onBack}>
                      Registrar Tema
                    </button>           
                  </div> 
                </div>
              
              
            </div>
          </div>                      
      </form>

        <div className="container">             
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>John</td>
              <td>Doe</td>
              <td>@social</td>
            </tr>
          </tbody>
      </table>
      </div> 

      
    <div className="row p-3 justify-content-end">
      <button className="btn btn-outline-secondary w-25 h-25" onClick={onBack}>
        ← Volver al menú
      </button>           
    </div>   


    
   </main>
  
   
   
   </>
  );}

