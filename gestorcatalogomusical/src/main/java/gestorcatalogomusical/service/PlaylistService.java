package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Playlist;
import gestorcatalogomusical.persistence.AlbumRepository;
import gestorcatalogomusical.persistence.PlaylistRepository;

import java.util.List;

public class PlaylistService implements StructService<Playlist,Long>{
    private PlaylistRepository repo;



    @Override
    public List<Playlist> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Playlist> findByName(String n) {

    }

    @Override
    public Playlist findById(Long aLong) {
        return null;
    }

    @Override
    public Playlist add(Playlist playlist) {
        return null;
    }

    @Override
    public void deleteById(Long aLong) {

    }

    @Override
    public Playlist update(Playlist playlist) {
        return null;
    }
}

