package gestorcatalogomusical.controlador;

import gestorcatalogomusical.model.Playlist;
import gestorcatalogomusical.service.PlaylistService;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/playlist")
public class PlaylistController extends BaseController<Playlist, Long> {

    private final PlaylistService playlistService;

    public PlaylistController(PlaylistService service) {
        super(service);
        this.playlistService = service;
    }

    // POST /playlist
    @PostMapping
    public Playlist create(@RequestBody Playlist playlist) {
        return service.add(playlist);
    }

    // PUT /playlist/{id}
    @PutMapping("/{id}")
    public Playlist update(@PathVariable Long id, @RequestBody Playlist playlist) {
        playlist.setId(id);
        return service.update(playlist);
    }

    // GET /playlist/genre?genres=rock,reggaeton&withEmail=true
    @GetMapping("/genre")
    public List<Playlist> byGenre(@RequestParam String genres,
                                  @RequestParam(defaultValue = "false") boolean withEmail) {
        return playlistService.searchByGenres(Arrays.asList(genres.split(",")), withEmail);
    }

    // GET /playlist/with-email
    @GetMapping("/with-email")
    public List<Playlist> withEmail() {
        return playlistService.findAllWithEmail();
    }
}
