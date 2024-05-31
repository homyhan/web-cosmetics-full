package web.webbanhang.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import web.webbanhang.stateOrder.StateOrder;

import java.util.Optional;

public interface StateOrderJpa extends JpaRepository<StateOrder, Integer> {

    StateOrder findByState(int i);
}
