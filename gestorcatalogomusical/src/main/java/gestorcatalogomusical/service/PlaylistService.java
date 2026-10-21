package gestorcatalogomusical.service;

import gestorcatalogomusical.model.Playlist;
import gestorcatalogomusical.persistence.PlaylistRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class PlaylistService implements StructService<Playlist, Long> {

    private final PlaylistRepository repo;

    public PlaylistService(PlaylistRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Playlist> findAll() {
        return repo.findAll();
    }

    @Override
    public List<Playlist> findByName(String name) {
        return repo.findByTitleContainingIgnoreCase(name);
    }

    @Override
    public Playlist findById(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Playlist no encontrada"));
    }

    @Override
    public Playlist add(Playlist playlist) {
        playlist.setId(null); // que la base genere el id
        return repo.save(playlist);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Playlist no encontrada");
        }
        repo.deleteById(id);
    }

    @Override
    @Transactional
    public Playlist update(Playlist p) {
        Playlist e = repo.findById(p.getId()).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Playlist no encontrada"));

        e.setTitle(p.getTitle());
        e.setAppleMusic(p.getAppleMusic());
        e.setContact(p.getContact());
        e.setDeezer(p.getDeezer());
        e.setDescription(p.getDescription());
        e.setEmailAddress(p.getEmailAddress());
        e.setFacebook(p.getFacebook());
        e.setFollowers(p.getFollowers());
        e.setGenres(p.getGenres());
        e.setInstagram(p.getInstagram());
        e.setLinkedIn(p.getLinkedIn());
        e.setLocation(p.getLocation());
        e.setPlaylistUrl(p.getPlaylistUrl());
        e.setPlaylistsCount(p.getPlaylistsCount());
        e.setProperty(p.getProperty());
        e.setSoundCloud(p.getSoundCloud());
        e.setSubmissionPage(p.getSubmissionPage());
        e.setTwitter(p.getTwitter());
        e.setWebsite(p.getWebsite());
        e.setYoutube(p.getYoutube());
        return repo.save(e);
    }

    // Varios géneros: devuelve las que coinciden con ALGUNO, sin duplicados
    public List<Playlist> searchByGenres(List<String> genres, boolean onlyWithEmail) {
        Set<Playlist> result = new LinkedHashSet<>();
        for (String g : genres) {
            String term = g.trim();
            if (term.isEmpty()) continue;
            result.addAll(onlyWithEmail
                    ? repo.findByGenreWithEmail(term)
                    : repo.findByGenresContainingIgnoreCase(term));
        }
        return new ArrayList<>(result);
    }

    public List<Playlist> findAllWithEmail() {
        return repo.findAllWithEmail();
    }
}
