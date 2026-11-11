import { useEffect, useState } from "react"
import { songApi,albumApi,bandsApi,playlistApi } from "../api/client"
import type { Song,Album,Band,Playlist } from "../api/client"
import "../pitchStyle.css";
import test from "node:test";

const crearCancionVacia = (): Song => ({
  name: "",
  isrc: "",
  genere: "",
  release: "",
  band: { id: 0 },
  album: { name: "", amountsongs:0, release:"",band:{name:""} },
  appleurl: "",
  spotifyurl: "",
  youtubeurl: "",
});

export default function PitchPlaylist({ onBack }: { onBack: () => void }) {

const LinkCelda = ({ url, label }: { url?: string | null; label: string }) =>
  url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" title={url}>
      {label}
    </a>
  ) : (
    <span className="text-muted">-</span>
  );



const [bands,setBands] = useState<Band[]>([]); 
const [songs,setSongs] = useState<Song[]>([]);
const [albums,setAlbums] = useState<Album[]>([]); 
const [playlists,setPlaylists]= useState<Playlist[]>([]);
const [playlistsTable,setPlaylistsTable]= useState<Playlist[]>([]);

const [songsForm,setSongsForm] = useState<Song[]>([crearCancionVacia()]);

const cargarDatos= async()=>{
    await bandsApi.findAll()
      .then(data => setBands(data))
      .catch(err => console.error(err));

    await  songApi.findAll()
    .then(data => setSongs(data))
    .catch(err => console.error(err));

    await  albumApi.findAll()
    .then (data => setAlbums(data) )
    .catch(err => console.error(err));

    await playlistApi.findAll()
    .then(data=>setPlaylists(data))
    .catch(err=> console.error(err));
    
    
    
};

const tableFilter = (f: string) => {
  
  if (!f || !f.trim()) {
    setPlaylistsTable(playlists);
    return; 
  }

  
  const values = f.split(",").map((item) => item.trim()).filter(Boolean);

  
  const filtradas = playlists.filter((p) =>
    values.some((v) => {
      const busqueda = v.toLowerCase();
    
        const generoPlaylist = p.genres?.toLowerCase() || "";
        const ubicacionPlaylist = p.location?.toLowerCase() || "";

      
      return generoPlaylist.includes(busqueda) || ubicacionPlaylist.includes(busqueda);
    })
  );
 setPlaylistsTable(filtradas);
};




useEffect(() => {
    cargarDatos()
    
  }, []);// rellena el vector con los datos de la db
 


 return(<>
    <header>
        <div className="container text-center">
            <h1 className="h1 ">PITCH A PLAYLIST</h1>
        </div>
    
    </header>

    <main>
        <form className="form form-control-sm" action="">
        <div className="container" style={{maxWidth:1020}}>
            <div className="row" >
                
                    <div className="col align-content-center">
                        <select className="form-select form-select-sm " name="" id="">
                            {songs.map((s,i)=>
                                <option key={s.id} value={s.id}>{s.name}</option>
                            )}
                        </select>
                    </div>
                    
                    <div className="col">
                        <select className="form-select form-select-sm " name="" id="">{ bands.map((b)=><option value={b.id}>{b.name}</option>)}</select>
                    </div>
                    
            </div>

            
        </div>
        </form>

        <div>
            <form action="">
                <div className="container" style={{maxWidth:1020}}>
                    <div className="row">
                    <div className="col mt-2">
                        <label className="form-label" htmlFor="">BUSCAR</label>
                        <input className= "form-control form-control-sm"type="text" name="" id="" placeholder="Buscar por genero,pais,nombre (siempre seguido de una coma)" onChange={(e)=>tableFilter(e.target.value)} />
                    </div>
                </div>
                </div>
            </form>

            <div className="container mt-3" style={{maxWidth:1580}}>    
            <div className="table-responsive " style={{ maxHeight: "60vh" }}>           
                <table className="table table-hover tabla-compacta table-dark table-sm align-middle mb-0">
                
                    <thead className="sticky-top bg-light">
                        <tr>
                            <th scope="col">Seleccion</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Generos</th>
                            <th scope="col">Seguidores</th>
                            <th scope="col">Ubicacion</th>
                            <th scope="col">Spoty Url</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Contacto</th>
                            <th scope="col">para Envio</th>
                            <th scope="col">Instagram</th>
                            <th scope="col">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistsTable.map((p)=>
                        
                            <tr>
                                <th scope="row"></th>
                                <td >{p.title}</td>
                                <td> <div className="desc-corta" title={p.description ?? ""}> {p.description}</div>   </td>
                                <td>{p.genres}</td>
                                <td>{p.followers}</td>
                                <td>{p.location}</td>
                                <td><LinkCelda url={p.playlistUrl} label="PlayList URL"/></td>
                                <td>{p.emailAddress}</td>
                                <td>{p.contact}</td>
                                <td><LinkCelda url={p.submissionPage} label="Envio"/></td>
                                <td><LinkCelda url={p.instagram} label="Instagram"/></td>
                                <td><LinkCelda url={p.website} label="WebSite"/></td>
                            </tr>
                        
                        
                        
                        )}
                    </tbody>
                
                </table>
            </div>
            </div>
        </div>
        <div className="row p-3 justify-content-end">
            <button className="btn btn-outline-secondary w-25 h-25" onClick={onBack}>
                ← Volver al menú
            </button>           
        </div>   

    </main>
    
    
    
    
    </>)
}