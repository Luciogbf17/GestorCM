import {  useState,useEffect} from "react";
import type {ChangeEvent, ChangeEventHandler, FormEvent } from "react";            
import { albumApi, bandsApi,songApi,crud} from "../api/client"
import type {Album, Band,Song} from "../api/client"

 
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
  





export default function CatalogoAdmin({ onBack }: { onBack: () => void }){



const [bands,setBands] = useState<Band[]>([]); 
const [songs,setSongs] = useState<Song[]>([]);
const [albums,setAlbums] = useState<Album[]>([]); 


const [songsForm,setSongsForm]=useState<Song[]>([crearCancionVacia()]);




const agregarCancion = ()=> setSongsForm(prev=>[...prev,crearCancionVacia()]);
const quitarCancion = (posicion:number)=>  {console.log('posicion recibida:', posicion);setSongsForm((prev)=>prev.filter((_,i)=>{ return i!==posicion; }))}









useEffect(() => {
    
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


  
 
  const handleChange =(e:ChangeEvent<HTMLInputElement>,i:number)=>{
    const {name,value} = e.target;
    setSongsForm((prev)=> prev.map((s,p)=>i==p?{...s,[name]:value}:s));

  }

  const handleBand=(e:ChangeEvent<HTMLSelectElement>)=>{
    const id = Number(e.target.value);
    setSongsForm((prev)=> prev.map((s) => ({ ...s, band: { ...s.band, id } })))
  }

   

  

 const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    

    const dAlbum : Album ={
      name: songsForm[0].album.name,
      amountsongs: songsForm.length
    };

    const a= (await albumApi.create(dAlbum)).id;

    
    const comprobacion= () =>{songsForm[0].band.id==null? alert("Ingresar Banda"): 
      songsForm[0].album.name==null? alert("ingrese Nombre de Album"): true}
    



   const s= songsForm.map((s)=>({...s,album:{...s.album,id:a}}));
   comprobacion();
    await Promise.all(s.map((s)=>songApi.create(s))); //el promise.all espera a que se carguen todas sin error

    setSongsForm([crearCancionVacia()]);


  }
  


  const handleAlbum = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSongsForm((prev) =>prev.map((s) => ({...s,album: {...s.album,name: value,} })));
  }


  


  


  return (
   <>

   <header>
      <div className="container text-center p-3">
      <h1>Administrador de Catalogo</h1>
      </div>
   </header>
   
    
   
   <main>
      <form action=""  >
          <div className="container" style={{ maxWidth: 820 }}>
           

            
              
             <div className="row">
                    <div className="col mb-2">
                      <label htmlFor="fieldBanda" className="form-label small mb-1">Banda</label>
                      <select value={songsForm[0].band.id}    onChange={(e)=>handleBand(e)}         id="fieldBanda"  className="form-select form-select-sm"  >
                        <option value={0}>Elegir...</option>
                        { bands.map((o)=>(<option key={o.id} value={o.id}>{o.name}</option>))}
                      </select>
                    </div>
            </div>

            
            <div className="row">
                <div className="col mb-2">
                  <label htmlFor="fieldalbum" className="form-label small mb-1">Nombre AlBum</label>
                   <input name="name" id="fieldAlbum" value={songsForm[0].album?.name ?? ""} onChange={(e)=>handleAlbum(e)} className="form-control form-control-sm" placeholder="Nombre"      id="fieldNombre"     className="form-control form-control-sm"  placeholder="Nombre"/>
                </div>
            </div>


                  
             <div id="formCancion" className="row align-items-end">
                
              
                  <div className="col mb-2">
                    <button type="button" id="btnAgregar" className="btn btn-success d-flex align-items-center justify-content-center btn-sm  " onClick={agregarCancion} style={{ height: 30, width: 30 }}>+</button>
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldNombre" className="form-label small mb-1">Nombre</label>
                    <input name="name"          value={songsForm[0].name}      onChange={(e)=>(handleChange(e,0))}       id="fieldNombre"     className="form-control form-control-sm"  placeholder="Nombre"/>
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldGenero" className="form-label small mb-1">Genero</label>
                    <input name="genere" value={songsForm[0].genere}      onChange={(e)=>(handleChange(e,0))} className="form-control form-control-sm" id="fieldGenero" placeholder="genero"/>
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldLanzamiento" className="form-label small mb-1">Lanzamiento</label>
                    <input name="release" value={songsForm[0].release}      onChange={(e)=>(handleChange(e,0))} type="date" className="form-control form-control-sm" id="fieldLanzamiento" aria-label="Date picker" />
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldISRC" className="form-label small mb-1">ISRC</label>
                    <input name="isrc" value={songsForm[0].isrc}      onChange={(e)=>(handleChange(e,0))} className="form-control form-control-sm" id="fielISRC" placeholder="codigo Isrc"/>
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldSpotify" className="form-label small mb-1">Spotify</label>
                    <input name="spotifyurl" value={songsForm[0].spotifyurl}      onChange={(e)=>(handleChange(e,0))} className="form-control form-control-sm" id="fieldSpotify" placeholder="UrlSpotify"/>
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldApple" className="form-label small mb-1">Apple</label>
                    <input name="appleurl" value={songsForm[0].appleurl}      onChange={(e)=>(handleChange(e,0))} className="form-control form-control-sm" id="fieldApple" placeholder="UrlApple"/>
                  </div>

                  <div className="col mb-2">
                    <label htmlFor="fieldYoutube" className="form-label small mb-1">Youtube</label>
                    <input name="youtubeurl" value={songsForm[0].youtubeurl}      onChange={(e)=>(handleChange(e,0))} className="form-control form-control-sm" id="fieldYoutube" placeholder="UrlYoutube"/>
                  </div>
            </div>
          
          
      
              {songsForm.map((p,l)=>(
                0==l? null :
                <div id="formCancion" className="row">
                  <div className="col mb-2">
                    <button type="button" id="btnAgregar" className="btn btn-danger btn-sm d-flex align-items-center justify-content-center" style={{ height: 30, width: 30 }} onClick={()=>quitarCancion(l)}> -</button>
                  </div>
                  
                  <div className="col mb-2">
                    <input name="name"          value={songsForm[l].name}      onChange={(e)=>(handleChange(e,l))}       id="fieldNombre"     className="form-control form-control-sm"  placeholder="Nombre"/>
                  </div>

                  <div className="col mb-2">
                    <input name="genere" value={songsForm[l].genere}      onChange={(e)=>(handleChange(e,l))} className="form-control form-control-sm" id="fieldGenero" placeholder="genero"/>
                  </div>

                  <div className="col mb-2">  
                    <input name="release" value={songsForm[l].release}      onChange={(e)=>(handleChange(e,l))} type="date" className="form-control form-control-sm" id="fieldLanzamiento" aria-label="Date picker" />
                  </div>

                  <div className="col mb-2">
                    
                    <input name="isrc" value={songsForm[l].isrc}      onChange={(e)=>(handleChange(e,l))} className="form-control form-control-sm" id="fielISRC" placeholder="codigo Isrc"/>
                  </div>

                  <div className="col mb-2">
                    
                    <input name="spotifyurl" value={songsForm[l].spotifyurl}      onChange={(e)=>(handleChange(e,l))} className="form-control form-control-sm" id="fieldSpotify" placeholder="UrlSpotify"/>
                  </div>

                  <div className="col mb-2">
                   
                    <input name="appleurl" value={songsForm[l].appleurl}      onChange={(e)=>(handleChange(e,l))} className="form-control form-control-sm" id="fieldApple" placeholder="UrlApple"/>
                  </div>

                  <div className="col mb-2">
                    
                    <input name="youtubeurl" value={songsForm[l].youtubeurl}      onChange={(e)=>(handleChange(e,l))} className="form-control form-control-sm" id="fieldYoutube" placeholder="UrlYoutube"/>
                  </div>

                </div>))}
            




          <div className="">
                <div>
                  <button type="submit" className="btn btn-sm btn-outline-secondary w-100" onClick={(e)=>(handleSubmit(e))}> Registrar Tema </button>           
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
