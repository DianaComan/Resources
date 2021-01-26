drop table resources.organizations;
drop table resources.users;
drop table resources.resources;
drop table resources.subscriptions;

--CREATE TABLE resources.organizations(ID INT,NAME VARCHAR(100), PRIMARY KEY (ID));
CREATE TABLE resources.users(ID INT NOT NULL AUTO_INCREMENT,USERNAME VARCHAR(100),PASSWORD VARCHAR(100),ROLE VARCHAR(100),FIRSTNAME VARCHAR(100),LASTNAME VARCHAR(100),EMAIL VARCHAR(100),ORGANIZATION_ID INT, ORGANIZATION_NAME VARCHAR(100), PRIMARY KEY (ID),UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
CREATE TABLE resources.resources(ID INT NOT NULL AUTO_INCREMENT,NAME VARCHAR(100),STATUS VARCHAR(100),ORGANIZATION_ID INT, LAST_RESERVED_BY VARCHAR(100), CURRENTLY_RESERVED_BY VARCHAR(100), ESTIMATED_TIME VARCHAR(100), CURRENTLY_RESERVATION_TIME VARCHAR(100), PRIMARY KEY (ID),UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
CREATE TABLE resources.subscriptions(ID INT NOT NULL AUTO_INCREMENT,USER_ID INT,RESOURCE_ID INT, PRIMARY KEY (ID),UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
--ALTER TABLE resources.users MODIFY COLUMN ID INT auto_increment;
--ALTER TABLE resources.subscriptions MODIFY COLUMN ID INT auto_increment;
--ALTER TABLE resources.users MODIFY COLUMN ID INT auto_increment;
--ALTER TABLE resources.organizations MODIFY COLUMN ID INT auto_increment;
CREATE TABLE `resources`.`organizations` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(45) NOT NULL,PRIMARY KEY (`id`),UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


insert into resources.organizations(NAME) values ('PolitehnicaBucuresti');
insert into resources.organizations(NAME) values ('SpitalFloreasca');
insert into resources.organizations(NAME) values ('SpitalUniversitar');
insert into resources.organizations(NAME) values ('BirouLotru');
insert into resources.organizations(NAME) values ('Tratoria Greceasca');pu

insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_EC101', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME,CURRENTLY_RESERVATION_TIME) values ('Sala_PR001', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_PR002', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_PR706', 'FREE', 1, 'none','none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_EC102', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_EC105', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_EC004', 'FREE', 1, 'none', 'none', 'none', 'none');


insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Masa01', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME,CURRENTLY_RESERVATION_TIME) values ('Masa02', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Masa03', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Masa04', 'FREE', 1, 'none','none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Masa05', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Masa06', 'FREE', 1, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Masa07', 'FREE', 1, 'none', 'none', 'none', 'none');

insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_operatii1', 'FREE', 2, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_operatii2', 'FREE', 2, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_operatii3', 'FREE', 2, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_operatii4', 'FREE', 2, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_operatii5', 'FREE', 2, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_conferinte1', 'FREE', 2, 'none', 'none', 'none', 'none');
insert into resources.resources(NAME, STATUS, ORGANIZATION_ID, LAST_RESERVED_BY, CURRENTLY_RESERVED_BY, ESTIMATED_TIME, CURRENTLY_RESERVATION_TIME) values ('Sala_conferinte2', 'FREE', 2, 'none', 'none', 'none', 'none');

insert into resources.users(USERNAME, PASSWORD, ROLE, FIRSTNAME, LASTNAME, EMAIL, ORGANIZATION_ID) values ('diana01', '123456', 'admin', 'Diana', 'Coman', 'dianna.c97@gmail.com', 1)
insert into resources.users(USERNAME, PASSWORD, ROLE, FIRSTNAME, LASTNAME, EMAIL, ORGANIZATION_ID) values ('ana', '123', 'admin', 'Ana', 'Maria', 'ana@gmail.com', 1)

