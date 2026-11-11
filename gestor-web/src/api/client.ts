

export const BASE_URL = "http://localhost:8080/api"; // en el celular: la IP de tu PC

export interface Band {
  id?: number;
  name?: string;
  ubication?: string;
  genere?: string;
}

export interface Album {
  id?: number;
  name?: string;
  release?: string;
  amountsongs?: number;
  band?: { id?: number; name?: string };
}

export interface Song {
  id?: number;
  name?: string;
  isrc?: string;
  genere?: string;
  release?: string;
  band: { id?: number; name?: string };
  album: { id?: number; name?: string; release?: string; amountsongs?:number; band?:{id?:number;name?:string};  };
  spotifyurl?: string;
  youtubeurl?: string;
  appleurl?: string;
}

export interface Playlist {
  id: number;
  title?: string | null;
  appleMusic?: string | null;
  contact?: string | null;
  deezer?: string | null;
  description?: string | null;
  emailAddress?: string | null;
  facebook?: string | null;
  followers?: number | null;
  genres?: string | null;
  instagram?: string | null;
  linkedIn?: string | null;
  location?: string | null;
  playlistUrl?: string | null;
  playlistsCount?: number | null;
  property?: string | null;
  soundCloud?: string | null;
  submissionPage?: string | null;
  twitter?: string | null;
  website?: string | null;
  youtube?: string | null;
}

export function crud<T>(endpoint: string){
  return{
    findAll: async(): Promise<T[]> =>{
    const res= await fetch (`${BASE_URL}${endpoint}`);
    if(!res.ok) throw new Error (`Error Http: (${res.status})`);
    return res.json();
  },

  search: async(query :string):Promise<T[]> => {
    const res = await fetch (`${BASE_URL}${endpoint}/search?name=${encodeURIComponent(query)}`)
    if(!res.ok) throw new Error (`Error HTTP: (${res.status})`);
    return res.json();
  },

  create: async(data: Partial<T>):Promise<T> =>{
    const res = await fetch(`${BASE_URL}${endpoint}`,{
      method: "POST",
      headers:{"content-type":"application/json"},
      body: JSON.stringify(data),
    });
    if(!res.ok) throw new Error (`Error al crear: (${res.status})`);
    return res.json();
  },
  delete: async (id: number): Promise<void> => {
      const res = await fetch(`${BASE_URL}${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Error al eliminar: (${res.status})`);
    },

  }
}

export const bandsApi= crud<Band>("/band");
export const songApi=crud<Song>("/song");
export const albumApi=crud<Album>("/album");
export const playlistApi=crud<Playlist>("/playlist");