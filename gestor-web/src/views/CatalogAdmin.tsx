import {  useState,useEffect } from "react";
import { bandsApi} from "../api/client"
import type {Band} from "../api/client"



export default function CatalogoAdmin({ onBack }: { onBack: () => void }){
const handleImgError= (e)=>{
  e.target.one = null;
  e.target.src = 'https://placeholder.com'
};


const [bands,setBands] = useState<Band[]>([]);    // crea un vector llamado bands
const [songs,setSongs] = useState<any[]>([]);

useEffect(() => {
    // Al meterlo dentro de useEffect con [], SOLO se ejecuta una vez al cargar la pantalla
    bandsApi.findAll()
      .then(data => setBands(data))
      .catch(err => console.error(err));

    // TODO: acá conectar tu API de temas, por ejemplo:
    // songsApi.findAll().then(data => setSongs(data)).catch(err => console.error(err));
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
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="row g-2">
              <div className="col-md-8">
                <div className="row g-2">

                  <div className="col-12 form-field">
                    <label htmlFor="fieldBanda" className="form-label small mb-1">Banda</label>
                    <select className="form-select form-select-sm" id="fieldBanda">
                      { bands.map((o)=>(
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-sm-6 form-field">
                    <label htmlFor="fieldNombre" className="form-label small mb-1">Nombre</label>
                    <input className="form-control form-control-sm" id="fieldNombre" placeholder="Nombre"/>
                  </div>

                  <div className="col-sm-6 form-field">
                    <label htmlFor="fieldGenero" className="form-label small mb-1">Genero</label>
                    <input className="form-control form-control-sm" id="fieldGenero" placeholder="genero"/>
                  </div>

                  <div className="col-sm-6 form-field">
                    <label htmlFor="fieldLanzamiento" className="form-label small mb-1">Lanzamiento</label>
                    <input type="date" className="form-control form-control-sm" id="fieldLanzamiento" aria-label="Date picker" value=""/>
                  </div>

                  <div className="col-sm-6 form-field">
                    <label htmlFor="fieldISRC" className="form-label small mb-1">ISRC</label>
                    <input className="form-control form-control-sm" id="fielISRC" placeholder="codigo Isrc"/>
                  </div>

                  <div className="col-sm-4 form-field">
                    <label htmlFor="fieldSpotify" className="form-label small mb-1">Spotify</label>
                    <input className="form-control form-control-sm" id="fieldSpotify" placeholder="UrlSpotify"/>
                  </div>

                  <div className="col-sm-4 form-field">
                    <label htmlFor="fieldApple" className="form-label small mb-1">Apple</label>
                    <input className="form-control form-control-sm" id="fieldApple" placeholder="UrlApple"/>
                  </div>

                  <div className="col-sm-4 form-field">
                    <label htmlFor="fieldYoutube" className="form-label small mb-1">Youtube</label>
                    <input className="form-control form-control-sm" id="fieldYoutube" placeholder="UrlYoutube"/>
                  </div>

                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <img onError={handleImgError} src="..." className="img-thumbnail mb-2" style={{ maxWidth: 160 }} alt="..."/>
                  <label htmlFor="formFile" className="form-label small mb-1 d-block">Portada</label>
                  <input className="form-control form-control-sm" type="file" id="formFile"/>
                </div>
                <div className="">
                  <button className="btn btn-sm btn-outline-secondary w-100" onClick={onBack}>
                    Registrar Tema
                  </button>           
                </div> 
              </div>

            </div>
          </div>                      
      </form>

        <div className="container mt-4">
        <div className="table-responsive">
        <table className="table table-sm table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Banda</th>
              <th scope="col">Genero</th>
              <th scope="col">Lanzamiento</th>
              <th scope="col">ISRC</th>
            </tr>
          </thead>
          <tbody>
            {songs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-3">
                  Sin datos
                </td>
              </tr>
            ) : (
              songs.map((s) => (
     // Ajustar los nombres de los campos a lo que devuelva tu API
                <tr key={s.id}>
                  <th scope="row">{s.id}</th>
                  <td>{s.name}</td>
                  <td>{s.band}</td>
                  <td>{s.genre}</td>
                  <td>{s.releaseDate}</td>
                  <td>{s.isrc}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div> 

      
    <div className="row p-3 justify-content-end">
      <button className="btn btn-outline-secondary w-25 h-25" onClick={onBack}>
        ← Volver al menú
      </button>           
    </div>   


    
   </main>
  
   
   
   </>
  );}
