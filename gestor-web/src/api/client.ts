

export const BASE_URL = "http://localhost:8080/api"; // en el celular: la IP de tu PC

export interface Band {
  id?: number;
  name: string;
  ubication: string;
  genere: string;
}

export interface Album {
  id?: number;
  name: string;
  release: string;
  amountsongs: number;
  band: { id: number; name?: string };
}

export interface Song {
  id?: number;
  name: string;
  isrc: string;
  genere: string;
  release: string;
  band: { id: number; name?: string };
  album?: { id: number; name?: string };
  spotifyurl?: string;
  youtubeurl?: string;
  appleurl?: string;
}

export interface Playlist {
  id?: number;
  title?: string;
  appleMusic?: string;
  contact?: string;
  deezer?: string;
  description?: string;
  emailAddress?: string;
  facebook?: string;
  followers?: number;
  genres?: string;
  instagram?: string;
  linkedIn?: string;
  location?: string;
  playlistUrl?: string;
  playlistsCount?: number;
  property?: string;
  soundCloud?: string;
  submissionPage?: string;
  twitter?: string;
  website?: string;
  youtube?: string;
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

  }
}

export const bandsApi= crud<Band>("/band");
export const songApi=crud<Song>("/song");
export const albumApi=crud<Album>("/album");
export const playlistApi=crud<Playlist>("/playlist");