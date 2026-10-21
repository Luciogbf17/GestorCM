package gestorcatalogomusical.persistence;

import gestorcatalogomusical.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    // Búsqueda por nombre (la usa /playlist/search?name=)
    List<Playlist> findByTitleContainingIgnoreCase(String title);

    // Un género (contiene el texto, sin importar mayúsculas)
    List<Playlist> findByGenresContainingIgnoreCase(String genre);

    // Un género con paginación
    Page<Playlist> findByGenresContainingIgnoreCase(String genre, Pageable pageable);

    // Género + solo playlists con mail
    @Query("""
           SELECT p FROM Playlist p
           WHERE LOWER(p.genres) LIKE LOWER(CONCAT('%', :genre, '%'))
             AND p.emailAddress IS NOT NULL
             AND p.emailAddress <> ''
           """)
    List<Playlist> findByGenreWithEmail(@Param("genre") String genre);

    // Solo playlists con mail
    @Query("SELECT p FROM Playlist p WHERE p.emailAddress IS NOT NULL AND p.emailAddress <> ''")
    List<Playlist> findAllWithEmail();
}
