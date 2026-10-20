package gestorcatalogomusical.controlador;

import gestorcatalogomusical.service.StructService;
import org.springframework.web.bind.annotation.*;
import gestorcatalogomusical.model.*;

@RestController
@RequestMapping("/playlist")
public class PlaylistController extends BaseController<Playlist,Long>{


    protected PlaylistController(StructService<Playlist, Long> service) {
        super(service);
    }

    @PostMapping("/")
    public Playlist create(@RequestBody Playlist p) { return service.add(p);}

    @PutMapping("/{id}")
    public Playlist update(@PathVariable Long id, @RequestBody Playlist p) {
        p.setId(id);
        return service.update(p);
    }
}
