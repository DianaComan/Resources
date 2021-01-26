package main.domain;

import javax.persistence.*;

@Entity
@Table(schema = "resources", name = "resources")
public class Resources  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private int id;

    private String status;
    private String name;
    private int organizationId;

    private String currentlyReservationTime;
    private String estimatedTime;

    public String getCurrentlyReservationTime() {
        return currentlyReservationTime;
    }

    public void setCurrentlyReservationTime(String currentlyReservationTime) {
        this.currentlyReservationTime = currentlyReservationTime;
    }

    public String getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(String estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    private String lastReservedBy;
    private String currentlyReservedBy;

    public String getCurrentlyReservedBy() {
        return currentlyReservedBy;
    }

    public void setCurrentlyReservedBy(String currentlyReservedBy) {
        this.currentlyReservedBy = currentlyReservedBy;
    }

    public String getLastReservedBy() {
        return lastReservedBy;
    }

    public void setLastReservedBy(String lastReservedBy) {
        this.lastReservedBy = lastReservedBy;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(int organizationId) {
        this.organizationId = organizationId;
    }
}