package gestorcatalogomusical.model;// Ajusta a tu paquete

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "playlists")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Playlist {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "title", length = 255)
    private String title;


    @Column(name = "apple_music", length = 255)
    private String appleMusic;


    @Column(name = "contact", nullable = false, length = 150)
    private String contact;


    @Column(name = "deezer", length = 255)
    private String deezer;


    @Column(name = "description", length = 1000) // O puedes usar: columnDefinition = "TEXT"
    private String description;


    @Column(name = "email_address", length = 150)
    private String emailAddress;


    @Column(name = "facebook", length = 255)
    private String facebook;


    @Column(name = "followers", nullable = false)
    private Integer followers;


    @Column(name = "genres", nullable = false, length = 255)
    private String genres;


    @Column(name = "instagram", length = 255)
    private String instagram;


    @Column(name = "linkedin", length = 255)
    private String linkedIn;


    @Column(name = "location", length = 100)
    private String location;


    @Column(name = "playlist_url", length = 255)
    private String playlistUrl;


    @Column(name = "playlists_count", nullable = false)
    private Integer playlists;


    @Column(name = "property")
    private String property;


    @Column(name = "soundcloud", length = 255)
    private String soundCloud;


    @Column(name = "submission_page", length = 255)
    private String submissionPage;


    @Column(name = "twitter", length = 100)
    private String twitter;


    @Column(name = "website", length = 255)
    private String website;


    @Column(name = "youtube", length = 255)
    private String youtube;
}