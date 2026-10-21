import {  useState } from "react";
import { bandsApi} from "../api/client"
import type {Band} from "../api/client"










export default function PitchPlaylist({ onBack }: { onBack: () => void }){



const [bands,setBands] = useState<Band[]>([]);    // crea un vector llamado bands
bandsApi.findAll().then((data)=>setBands(data)); // rellena el vector con los datos de la db



  return (
   <>
   <header>
      <div className="container text-center p-3">
      <h1>Administrador de Catalogo</h1>
      </div>
   </header>
   
   <main>
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
                      <label htmlFor="fieldText" className="form-label">Pais</label>
                      <input className="form-control" id="fieldText" placeholder="Genero"/>
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-field">
                      <label htmlFor="fieldText" className="form-label">Genero</label>
                      <input className="form-control" id="fieldText" placeholder="Pais"/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="align-content-end ">
                    <button className="btn btn-outline-secondary mb-3 ">Registrar</button>
                    </div>
                  </div>

                  
            
                    
            
              </div>
            </div>
             
                    
      </form>


   </main>

   
   
   </>
  );}

