import { useState } from "react";
import PitchPlaylist from "./views/PitchPlaylist";
import CatalogAdmin from "./views/CatalogAdmin";

type View = "menu" | "catalogo" | "pitch" | "contactos";

function Placeholder({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <main className="container py-4">
      <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
        ← Volver al menú
      </button>
      <h2>{title}</h2>
      <p className="text-muted">Vista pendiente.</p>
    </main>
  );
}

function App() {
  const [view, setView] = useState<View>("menu");
  const back = () => setView("menu");
  if (view === "pitch") return (<PitchPlaylist onBack={back} />);
  if (view === "catalogo") return (<CatalogAdmin onBack={back} />);
  if (view === "contactos")return <Placeholder title="Administrador de contactos" onBack={back} />;

  return (
    <>
      <header className="bg-dark text-white py-4">
        <div className="container">
          <h1 className="h3 m-0">Bienvenido al Gestor Musical</h1>
          <small>Develop by: Lucho Farah</small>
        </div>
      </header>

      <main className="container py-5">
        <div className="d-grid gap-3 col-12 col-md-6 mx-auto">
          <button className="btn btn-primary btn-lg" onClick={() => setView("catalogo")}>
            Administrador de catálogo
          </button>
          <button className="btn btn-primary btn-lg" onClick={() => setView("pitch")}>
            Pitch a playlist
          </button>
          <button className="btn btn-primary btn-lg" onClick={() => setView("contactos")}>
            Administrador de contactos
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
