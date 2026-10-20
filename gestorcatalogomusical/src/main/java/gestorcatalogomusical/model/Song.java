package gestorcatalogomusical.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String isrc;
    private String name;


    @ManyToOne
    @JoinColumn(name = "band_id")
    @JsonIgnoreProperties("albums")
    private Band band;

    private LocalDate release;

    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;

    private String genere;
    private String spotifyurl;
    private String youtubeurl;
    private String appleurl;


}
