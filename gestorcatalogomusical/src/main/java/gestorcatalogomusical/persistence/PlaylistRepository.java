package gestorcatalogomusical.persistence;

import gestorcatalogomusical.model.Band;
import gestorcatalogomusical.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist,Long> {
    List<Playlist> findPlayslistByGenere(String genere);

    List<Playlist> findPlaylistsByNameIgnoreCase(String name);


}
