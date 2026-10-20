package gestorcatalogomusical.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter

public class Band {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "band", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("band")
    private List<Album> albums;

    private String name;
    private String ubication;
    private String genere;

}
