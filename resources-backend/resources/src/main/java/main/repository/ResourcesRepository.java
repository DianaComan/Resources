package main.repository;

import main.domain.Resources;
import main.domain.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Primary
@Repository
public interface ResourcesRepository extends JpaRepository<Resources, Integer> {

    Optional<Resources> findById(Integer id);

    @Query("select p from Resources p where p.id = :id")
    Optional<Resources> findResourcesById(Integer id);

    @Query("select p from Resources p where p.name = :name")
    Optional<Resources> findResourcesByName(String name);

    @Query("select p from Resources p where p.currentlyReservedBy = :currentlyReservedBy")
    List<Resources> getAllByCurrentlyReservedBy(String currentlyReservedBy);

    public List<Resources> findAll();

    public Resources save(Resources resource);

    public void deleteById(Integer id);

    @Query("select p from Resources p where p.organizationId = :id")
    public List<Resources> findResourcesByOrganizationId(int id);

    @Query("select p from Resources p where p.name = :name")
    Optional <Resources> getResourcesByName(String name);

    @Query("select p from Resources p where p.organizationId = :id and upper(p.status) = 'FREE'")
    List<Resources> findAllFreeResourcesByOrganizationId(int id);


}
