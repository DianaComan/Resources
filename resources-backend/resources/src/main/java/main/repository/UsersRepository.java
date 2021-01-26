package main.repository;

import main.domain.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Primary
@Repository
public interface UsersRepository extends JpaRepository<User, Integer> {
    @Query("select p from User p where p.id = :id")
    Optional<User> findUserById(Integer id);

    public List<User> findAll();

    public User save(User user);

    public void deleteById(Integer id);

    @Query("select p from User p where p.organizationId = :id")
    public List<User> findUsersByOrganizationId(int id);

    @Query("select p from User p where p.username = :username")
    Optional <User> getUsersByUsername(String username);

    User findUserByUsername(String username);



}
