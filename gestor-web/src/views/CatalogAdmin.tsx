import {  useState,useEffect} from "react";
import type {ChangeEvent, ChangeEventHandler, FormEvent } from "react";            
import { albumApi, bandsApi,songApi} from "../api/client"
import type {Album, Band,Song} from "../api/client"

 const emptySong: Song = { name: "", isrc: "", genere: "", release: "", band: { id: 0 } };
 type formCancioncantidad={id: number};
export default function CatalogoAdmin({ onBack }: { onBack: () => void }){



const [bands,setBands] = useState<Band[]>([]);    // crea un vector llamado bands
const [songs,setSongs] = useState<Song[]>([]);
const [albums,setAlbums] = useState<Album[]>([]); 
const [songform, setSongsform] = useState<Song>(emptySong);
const [guardando,setGuardando] = useState(false);
const [cantidadCanciones,setCantidadCanciones] = useState<formCancioncantidad[]>([])


const agregarCancion = () =>
  setCantidadCanciones(prev => [...prev, nuevaCancion()]);

const quitarCancion = (id: number) =>
  setCantidadCanciones(prev => prev.filter(c => c.id !== id));

useEffect(() => {
    // Al meterlo dentro de useEffect con [], SOLO se ejecuta una vez al cargar la pantalla
    bandsApi.findAll()
      .then(data => setBands(data))
      .catch(err => console.error(err));

    songApi.findAll()
    .then(data => setSongs(data))
    .catch(err => console.error(err));

    albumApi.findAll()
    .then (data => setAlbums(data) )
    .catch(err => console.error(err));

  }, []);// rellena el vector con los datos de la db


  const handleAlbum = (e: ChangeEvent<HTMLSelectElement>) => setSongsform({...songform, album:{id: Number(e.target.value)}});
  const handleBand =(e : ChangeEvent<HTMLSelectElement>)=>  setSongsform({...songform,band:{id: Number(e.target.value)}});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    if(songform.band.id === null  ) return alert ("elegi una banda");

    const res = await fetch("http://localhost:8080/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(songform) });

      if (!res.ok) return alert("Error al guardar");
      setSongsform(emptySong);
};
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => setSongsform({...songform,[e.target.name]:e.target.value});

  
 





  return (
   <>
   <header>
      <div className="container text-center p-3">
      <h1>Administrador de Catalogo</h1>
      </div>
   </header>
   
    
   
   <main>
      <form action="" onSubmit={handleSubmit} >
          <div className="container" style={{ maxWidth: 720 }}>
            <div className="row">
              

                  
                    <div className="col">
                      <label htmlFor="fieldBanda" className="form-label small mb-1">Banda</label>
                      <select         value={songform.band.id}    onChange={handleBand}         id="fieldBanda"  className="form-select form-select-sm"  >
                      <option value={0}>Elegir...</option>
                      { bands.map((o)=>(
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                      </select>
                    </div>

                    <div className="col">
                      <label htmlFor="fieldalbum" className="form-label small mb-1">Nombre AlBum</label>
                      <input name="name"          value={songform.album?.name}      onChange={handleChange}       id="fieldNombre"     className="form-control form-control-sm"  placeholder="Nombre"/>
                    </div>
                  
                




                <button id="btnAgregar" className="btn mt-2" onClick={AgregarCancion}>
                  Agregar Cancion 
                </button>
            </div>

            <div id="formCancion" className="row">
                  <div className="col">
                    <button type="button" className="btn btn-outline-danger" onClick={() => quitarCancion(i)} disabled={canciones.length === 1} aria-label="Quitar cancion">
                    </button>
                  </div>

                  <div className="col">
                    <label htmlFor="fieldNombre" className="form-label small mb-1">Nombre</label>
                    <input name="name"          value={songform.name}      onChange={handleChange}       id="fieldNombre"     className="form-control form-control-sm"  placeholder="Nombre"/>
                  </div>

                  <div className="col">
                    <label htmlFor="fieldGenero" className="form-label small mb-1">Genero</label>
                    <input name="genere" value={songform.genere}      onChange={handleChange} className="form-control form-control-sm" id="fieldGenero" placeholder="genero"/>
                  </div>

                  <div className="col">
                    <label htmlFor="fieldLanzamiento" className="form-label small mb-1">Lanzamiento</label>
                    <input name="release" value={songform.release}      onChange={handleChange} type="date" className="form-control form-control-sm" id="fieldLanzamiento" aria-label="Date picker" />
                  </div>

                  <div className="col">
                    <label htmlFor="fieldISRC" className="form-label small mb-1">ISRC</label>
                    <input name="isrc" value={songform.isrc}      onChange={handleChange} className="form-control form-control-sm" id="fielISRC" placeholder="codigo Isrc"/>
                  </div>

                  <div className="col">
                    <label htmlFor="fieldSpotify" className="form-label small mb-1">Spotify</label>
                    <input name="spotifyurl" value={songform.spotifyurl}      onChange={handleChange} className="form-control form-control-sm" id="fieldSpotify" placeholder="UrlSpotify"/>
                  </div>

                  <div className="col">
                    <label htmlFor="fieldApple" className="form-label small mb-1">Apple</label>
                    <input name="appleurl" value={songform.appleurl}      onChange={handleChange} className="form-control form-control-sm" id="fieldApple" placeholder="UrlApple"/>
                  </div>

                  <div className="col">
                    <label htmlFor="fieldYoutube" className="form-label small mb-1">Youtube</label>
                    <input name="youtubeurl" value={songform.youtubeurl}      onChange={handleChange} className="form-control form-control-sm" id="fieldYoutube" placeholder="UrlYoutube"/>
                  </div>
                </div>


                      
              {cantidadCanciones.map(()=>(
                <div id="formCancion" className="row">
                
                  <div className="col">
                    
                    <input name="name"          value={songform.name}      onChange={handleChange}       id="fieldNombre"     className="form-control form-control-sm"  placeholder="Nombre"/>
                  </div>

                  <div className="col">
                    
                    <input name="genere" value={songform.genere}      onChange={handleChange} className="form-control form-control-sm" id="fieldGenero" placeholder="genero"/>
                  </div>

                  <div className="col">
                    
                    <input name="release" value={songform.release}      onChange={handleChange} type="date" className="form-control form-control-sm" id="fieldLanzamiento" aria-label="Date picker" />
                  </div>

                  <div className="col">
                    
                    <input name="isrc" value={songform.isrc}      onChange={handleChange} className="form-control form-control-sm" id="fielISRC" placeholder="codigo Isrc"/>
                  </div>

                  <div className="col">
                    
                    <input name="spotifyurl" value={songform.spotifyurl}      onChange={handleChange} className="form-control form-control-sm" id="fieldSpotify" placeholder="UrlSpotify"/>
                  </div>

                  <div className="col">
                   
                    <input name="appleurl" value={songform.appleurl}      onChange={handleChange} className="form-control form-control-sm" id="fieldApple" placeholder="UrlApple"/>
                  </div>

                  <div className="col">
                    
                    <input name="youtubeurl" value={songform.youtubeurl}      onChange={handleChange} className="form-control form-control-sm" id="fieldYoutube" placeholder="UrlYoutube"/>
                  </div>

                </div>))}




          <div className="">
                  <button type="submit" className="btn btn-sm btn-outline-secondary w-100" disabled={guardando}> Registrar Tema </button>           
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
                  <td >{s.band.name}</td>
                  <td>{s.genere}</td>
                  <td>{s.release}</td>
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
