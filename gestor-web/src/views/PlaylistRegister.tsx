import {  useState,useEffect} from "react";
import type {ChangeEvent, ChangeEventHandler, FormEvent } from "react";            
import { albumApi, bandsApi,songApi} from "../api/client"
import type {Album, Band,Song} from "../api/client"

export default function PlaylistRegister({ onBack }: { onBack: () => void }){

return (
    <>
    
    <header>
      <div className="container text-center p-3">
      <h1>Administrador de PlayList</h1>
      </div>
   </header>

   <main>
  <form>
    <div className="container" style={{ maxWidth: 720 }}>

        <fieldset className="mb-4">
      <legend className="fs-6 fw-semibold">Datos básicos</legend>

          <div className="row g-2">

         <div className="col-6">
          <label htmlFor="fieldNombre" className="form-label small mb-1">Nombre</label>
           <input id="fieldNombre" name="title" className="form-control form-control-sm" />

         </div>

        <div className="col-6">
          <label htmlFor="fieldDescripcion" className="form-label small mb-1">Descripcion</label>
           <input id="fieldDescripcion" name="description" className="form-control form-control-sm" />
           
        </div>

         <div className="col-6">
          <label htmlFor="fieldGenero" className="form-label small mb-1">Genero</label>
           <input id="fieldGenero" name="genre" className="form-control form-control-sm" />

         </div>

         <div className="col-6">
          <label htmlFor="fieldPropiedad" className="form-label small mb-1">Propiedad</label>
           <input id="fieldPropiedad" name="property" className="form-control form-control-sm" />

         </div>
      </div>
        
    </fieldset>

     
      
    </div>
  </form>
</main>
    
    
    
    
    
    
    </>
)





}