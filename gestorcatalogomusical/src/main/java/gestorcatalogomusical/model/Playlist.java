package gestorcatalogomusical.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "spotify_playlist")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "apple_music", columnDefinition = "TEXT")
    private String appleMusic;

    @Column(name = "contact", columnDefinition = "TEXT")
    private String contact;

    @Column(name = "deezer", columnDefinition = "TEXT")
    private String deezer;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "email_address", length = 255)
    private String emailAddress;

    @Column(name = "facebook", columnDefinition = "TEXT")
    private String facebook;

    @Column(name = "followers")
    private Integer followers;

    @Column(name = "genres", columnDefinition = "TEXT")
    private String genres;

    @Column(name = "instagram", columnDefinition = "TEXT")
    private String instagram;

    @Column(name = "linkedin", columnDefinition = "TEXT")
    private String linkedIn;

    @Column(name = "location", length = 255)
    private String location;

    @Column(name = "playlist_url", columnDefinition = "TEXT")
    private String playlistUrl;

    @Column(name = "playlists_count")
    private Integer playlistsCount;

    @Column(name = "property", columnDefinition = "TEXT")
    private String property;

    @Column(name = "soundcloud", columnDefinition = "TEXT")
    private String soundCloud;

    @Column(name = "submission_page", columnDefinition = "TEXT")
    private String submissionPage;

    @Column(name = "twitter", columnDefinition = "TEXT")
    private String twitter;

    @Column(name = "website", columnDefinition = "TEXT")
    private String website;

    @Column(name = "youtube", columnDefinition = "TEXT")
    private String youtube;
}
