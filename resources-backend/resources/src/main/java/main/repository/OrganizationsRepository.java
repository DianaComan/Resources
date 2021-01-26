package main.repository;

import main.domain.Organizations;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Primary
@Repository
public interface OrganizationsRepository extends JpaRepository<Organizations, Integer> {
    Optional<Organizations> findById(Integer id);

    public List<Organizations> findAll();

    public Organizations save(Organizations organizations);

    public void deleteById(Integer id);

    @Query("select p from Organizations p where p.name = :name")
    Optional<Organizations> findOrganizationByName(String name);

    @Query("select p from Organizations p where p.id = :id")
    Optional<Organizations> findOrganizationById(Integer id);
}
