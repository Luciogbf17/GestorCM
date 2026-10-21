import {  useState,useEffect } from "react";
import { bandsApi} from "../api/client"
import type {Band} from "../api/client"










export default function PitchPlaylist({ onBack }: { onBack: () => void }){



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
    <head></head>
    <body>
      
    
      <form action="">
          <div className="container text-center">
              <div className="row row-cols-4">
                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Nombre</label>
                      <input className="form-control" id="fieldText" placeholder="Nombre"/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Genero</label>
                      <input className="form-control" id="fieldText" placeholder="genero"/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Fecha de Lanzamiento</label>
                      <input type="date" className="form-control" aria-label="Date picker" value=""/>
                    </div>
                  </div>

                   <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">ISRC</label>
                      <input className="form-control" id="fieldText" placeholder="codigo Isrc"/>
                    </div>
                  </div>
              </div>
              <div className="row row-cols-4">
                <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Spotify</label>
                      <input className="form-control" id="fieldText" placeholder="UrlSpotify"/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Apple</label>
                      <input className="form-control" id="fieldText" placeholder="UrlApple"/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Youtube</label>
                      <input className="form-control" id="fieldText" placeholder="UrlYoutube"/>
                    </div>
                  </div>
              </div>

              <div className="row row-cols-4">
                  <div className="form-field">
                    <label htmlFor="exampleFormControlSelect2" className="form-label">Banda</label>
                      <select className="form-control" id="exampleFormControlSelect2">
                      { bands.map((o)=>(
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                      </select>
                  </div>
                </div>
                  

            </div>
                    

            
              
            
             
                    
      </form>
      </body>
      <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
        ← Volver al menú
    </button>

                      
   </main>

   
   
   </>
  );}

