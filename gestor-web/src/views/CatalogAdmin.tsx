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
   
    
   
   <main className="row-cols-1">
      <form action="">
          <div className="container text-center">
              <div className="row row-cols-4 mb-3">
                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Nombre</label>
                      <input className="form-control" id="fieldNombre" placeholder="Nombre"/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Genero</label>
                      <input className="form-control" id="fieldGenero" placeholder="genero"/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Lanzamiento</label>
                      <input type="date" className="form-control" id="fieldLanzamiento" aria-label="Date picker" value=""/>
                    </div>
                  </div>

                   <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">ISRC</label>
                      <input className="form-control" id="fielISRC" placeholder="codigo Isrc"/>
                    </div>
                  </div>
              </div>
              <div className="row row-cols-4 mb-3">
                <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Spotify</label>
                      <input className="form-control" id="fieldSpotify" placeholder="UrlSpotify"/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Apple</label>
                      <input className="form-control" id="fieldApple" placeholder="UrlApple"/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="col form-field">
                      <label htmlFor="fieldText" className="form-label">Youtube</label>
                      <input className="form-control" id="fieldYoutube" placeholder="UrlYoutube"/>
                    </div>
                  </div>
              </div>

              <div className="row row-cols-4 mb-3">
                  <div className="col form-field ">
                    <label htmlFor="exampleFormControlSelect2" className="form-label">Banda</label>
                      <select className="form-control" id="fieldBanda">
                      { bands.map((o)=>(
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                      </select>
                  </div>
                  
                </div>

                <div className="row row-cols-4 mb-3 justify-content-end">
                  <div className="mb-3 ">
                    <img onError={handleImgError} src="..." className="img-thumbnail" alt="..."/>
                    <label htmlFor="formFile" className="form-label">Portada</label>
                    <input className="form-control" type="file" id="formFile"/>
                  </div>
                </div>

              <div className="row row-cols-4 mb-3 justify-content-end">
               <button className="btn btn-outline-secondary w-25 h-25" onClick={onBack}>
                 Registrar Tema
              </button>           
             </div> 

             
                  

            </div>
                            
      </form>
            <hr className="" />

    <div className="row p-3 justify-content-end">
      <button className="btn btn-outline-secondary w-25 h-25" onClick={onBack}>
        ← Volver al menú
      </button>           
    </div>   


    
   </main>
  
   
   
   </>
  );}

