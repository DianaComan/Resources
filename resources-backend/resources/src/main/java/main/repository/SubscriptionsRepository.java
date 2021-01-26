package main.repository;

import main.domain.Subscriptions;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Primary
@Repository
public interface SubscriptionsRepository  extends JpaRepository<Subscriptions, Integer> {
    Optional<Subscriptions> findById(Integer id);

    public List<Subscriptions> findAll();

    public Subscriptions save(Subscriptions subscriptions);

    public void deleteByResourceId(Integer id);

    public void deleteAllByResourceId(Integer resourceId);

    List<Subscriptions> findAllByResourceId(int id);
}
