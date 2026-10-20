import { useEffect, useMemo, useState } from "react";

const BASE_URL = "http://localhost:8080";
const PAGE_SIZE = 25;

export type Playlist = {
  id: number;
  title: string | null;
  appleMusic: string | null;
  contact: string;
  deezer: string | null;
  description: string | null;
  emailAddress: string | null;
  facebook: string | null;
  followers: number;
  genres: string;
  instagram: string | null;
  linkedIn: string | null;
  location: string | null;
  playlistUrl: string | null;
  playlists: number;
  property: string | null;
  soundCloud: string | null;
  submissionPage: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
};

type Song = { id: number; name: string };

export default function PitchPlaylist({ onBack }: { onBack: () => void }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [email, setEmail] = useState("");
  const [songId, setSongId] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set()); // IDs de playlists seleccionadas
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState("");

  // Temas desde tu Spring Boot
  useEffect(() => {
    fetch(`${BASE_URL}/song/all`)
      .then((r) => r.json())
      .then(setSongs)
      .catch(() => setSongs([]));
  }, []);

  // Playlists desde tu Spring Boot
  useEffect(() => {
    fetch(`${BASE_URL}/playlist/all`)
      .then((r) => r.json())
      .then(setPlaylists)
      .catch(() => setPlaylists([]));
  }, []);

  const rows = useMemo(() => {
    // Búsqueda filtrada por comas
    const terms = filter
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    // Si no hay términos de búsqueda, devolvemos todas las playlists
    if (terms.length === 0) return playlists;

    return playlists.filter((p) => {
      const text = [p.title, p.contact, p.genres, p.location]
        .join(" ")
        .toLowerCase();

      return terms.some((t) => text.includes(t)); // Coincide con ALGUNO
    });
  }, [playlists, filter]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const visible = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Verifica si la playlist tiene un email válido
  const hasMail = (p: Playlist) => !!p.emailAddress?.trim();

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Selecciona / deselecciona todas las playlists con mail de la página visible
  const selectable = visible.filter((p) => hasMail(p));

  const allVisibleSelected =
    selectable.length > 0 && selectable.every((p) => selected.has(p.id));

  const toggleVisible = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      selectable.forEach((p) =>
        allVisibleSelected ? next.delete(p.id) : next.add(p.id)
      );
      return next;
    });

  const send = () => {
    if (!email.trim() || !songId || selected.size === 0 || !message.trim()) {
      alert("Completá tu mail, el tema, al menos una playlist y el mensaje.");
      return;
    }

    const pitches = playlists
      .filter((p) => selected.has(p.id))
      .map((p) => ({
        from: email.trim(),
        songId: Number(songId),
        to: p.emailAddress,
        playlist: p.id,
        message: message.trim(),
      }));

    console.log("Pitches listos para enviar:", pitches); // TODO: POST a tu backend
    alert(`Pitch preparado para ${pitches.length} playlist(s)`);
  };

  return (
    <main className="container py-4">
      <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
        ← Volver al menú
      </button>
      <h2 className="mb-4">Pitch a playlist</h2>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="mail">
            Tu mail
          </label>
          <input
            id="mail"
            type="email"
            className="form-control"
            placeholder="vos@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="song">
            Tema
          </label>
          <select
            id="song"
            className="form-select"
            value={songId}
            onChange={(e) => setSongId(e.target.value)}
          >
            <option value="">Seleccionar tema...</option>
            {songs.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h3 className="h5">Seleccionar playlist</h3>
      <input
        className="form-control mb-3"
        placeholder="Separá con comas: rock, reggaeton, argentina, brasil"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(0);
        }}
      />

      <div className="table-responsive border rounded" style={{ maxHeight: 420 }}>
        <table className="table table-hover table-sm align-middle mb-0">
          <thead className="table-light sticky-top">
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="form-check-input"
                  title="Seleccionar todas las de esta página con mail"
                  checked={allVisibleSelected}
                  onChange={toggleVisible}
                />
              </th>
              <th>Playlist</th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Seguidores</th>
              <th>Géneros</th>
              <th>Ciudad</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => {
              const ok = hasMail(p);
              return (
                <tr
                  key={p.id}
                  className={
                    selected.has(p.id)
                      ? "table-primary"
                      : !ok
                      ? "text-muted"
                      : ""
                  }
                  onClick={() => ok && toggle(p.id)}
                  style={{ cursor: ok ? "pointer" : "not-allowed" }}
                  title={ok ? "" : "Falta el mail de esta playlist"}
                >
                  <td>
                    <span title={ok ? "" : "Falta el mail de esta playlist"}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        disabled={!ok}
                        checked={selected.has(p.id)}
                        onChange={() => toggle(p.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </span>
                  </td>
                  <td>{p.title}</td>
                  <td>{p.contact}</td>
                  <td>{p.emailAddress}</td>
                  <td>{p.followers}</td>
                  <td>{p.genres}</td>
                  <td>{p.location}</td>
                  <td>
                    {p.playlistUrl && (
                      <a
                        href={
                          p.playlistUrl.startsWith("http")
                            ? p.playlistUrl
                            : `https://${p.playlistUrl}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Abrir
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-muted py-3">
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center my-2">
        <small className="text-muted">
          {rows.length} playlists · {selected.size} seleccionadas
        </small>
        <div className="btn-group btn-group-sm">
          <button
            className="btn btn-outline-secondary"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </button>
          <span className="btn btn-outline-secondary disabled">
            {page + 1} / {pages}
          </span>
          <button
            className="btn btn-outline-secondary"
            disabled={page + 1 >= pages}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label className="form-label" htmlFor="msg">
          Mensaje del mail
        </label>
        <textarea
          id="msg"
          className="form-control"
          rows={6}
          placeholder="Escribí acá el mail para el curador..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-lg mt-3" onClick={send}>
        Mandar pitch a {selected.size} playlist(s)
      </button>
    </main>
  );
}