CREATE DATABASE  IF NOT EXISTS `quests` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `quests`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: quests
-- ------------------------------------------------------
-- Server version 5.6.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tachievement`
--

DROP TABLE IF EXISTS `tachievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tachievement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tcity`
--

DROP TABLE IF EXISTS `tcity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tcity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_zone` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица городов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tcity_tr`
--

DROP TABLE IF EXISTS `tcity_tr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tcity_tr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `culture` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tcity_tr_city_id_idx` (`city_id`),
  CONSTRAINT `fk_tcity_tr_city_id` FOREIGN KEY (`city_id`) REFERENCES `tcity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tCity';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tcompany`
--

DROP TABLE IF EXISTS `tcompany`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tcompany` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `site` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `ft_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица компании-оператора квестов (описательная часть)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tcompanyprofile`
--

DROP TABLE IF EXISTS `tcompanyprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tcompanyprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tcompanyprofile_company_id_idx` (`company_id`),
  CONSTRAINT `fk_tcompanyprofile_company_id` FOREIGN KEY (`company_id`) REFERENCES `tcompany` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица профиля компании-оператора (тарифный план, управление услугами)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tleague`
--

DROP TABLE IF EXISTS `tleague`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tleague` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица лиг квестов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tleague_tr`
--

DROP TABLE IF EXISTS `tleague_tr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tleague_tr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `league_id` int(11) NOT NULL,
  `culture` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tleague_tr_leqgue_id_idx` (`league_id`),
  CONSTRAINT `fk_tleague_tr_leqgue_id` FOREIGN KEY (`league_id`) REFERENCES `tleague` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tLeague';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tquest`
--

DROP TABLE IF EXISTS `tquest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tquest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `players_from` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `ratio` decimal(7,4) DEFAULT NULL,
  `city_id` int(11) NOT NULL,
  `league_id` int(11) DEFAULT NULL,
  `players_to` int(11) DEFAULT NULL,
  `lat` decimal(10,8) DEFAULT NULL,
  `lng` decimal(10,8) DEFAULT NULL,
  `address` varchar(1000) NOT NULL,
  `name` varchar(45) NOT NULL,
  `descr` varchar(5000) NOT NULL,
  `url` varchar(45) DEFAULT NULL,
  `price_from` int(11) DEFAULT NULL,
  `price_to` int(11) DEFAULT NULL,
  `video_url` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_id_idx` (`company_id`),
  KEY `fk_city_id_idx` (`city_id`),
  KEY `fk_tquest_league_id_idx` (`league_id`),
  FULLTEXT KEY `ft_name_descr` (`name`,`descr`,`address`),
  CONSTRAINT `fk_tquest_city_id` FOREIGN KEY (`city_id`) REFERENCES `tcity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tquest_company_id` FOREIGN KEY (`company_id`) REFERENCES `tcompany` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tquest_league_id` FOREIGN KEY (`league_id`) REFERENCES `tleague` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица квестов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tquest_tr`
--

DROP TABLE IF EXISTS `tquest_tr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tquest_tr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest_id` int(11) NOT NULL,
  `culture` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `descr` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tquest_tr_quest_id_idx` (`quest_id`),
  CONSTRAINT `fk_tquest_tr_quest_id` FOREIGN KEY (`quest_id`) REFERENCES `tquest` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tQuest';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tschedule`
--

DROP TABLE IF EXISTS `tschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tschedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest_id` int(11) NOT NULL,
  `start_at` datetime NOT NULL,
  `status_flag` bit(1) NOT NULL COMMENT '0-Свободен, 1-Занят, 2-Горячее предложение',
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tschedule_quest_id_idx` (`quest_id`),
  CONSTRAINT `fk_tschedule_quest_id` FOREIGN KEY (`quest_id`) REFERENCES `tquest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица расписаний квестов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tstation`
--

DROP TABLE IF EXISTS `tstation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tstation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `city_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_id_idx` (`city_id`),
  CONSTRAINT `fk_city_id` FOREIGN KEY (`city_id`) REFERENCES `tcity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица станций метро';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tstory`
--

DROP TABLE IF EXISTS `tstory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tstory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Справочник жанров квестов';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tstory_tr`
--

DROP TABLE IF EXISTS `tstory_tr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tstory_tr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `story_id` int(11) NOT NULL,
  `culture` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tstory_tr_story_id_idx` (`story_id`),
  CONSTRAINT `fk_tstory_tr_story_id` FOREIGN KEY (`story_id`) REFERENCES `tstory` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tStory';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ttag`
--

DROP TABLE IF EXISTS `ttag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ttag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tuser`
--

DROP TABLE IF EXISTS `tuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL COMMENT 'Путь к фотонрафии или аватарке пользователя',
  `name` varchar(45) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `ratio` int(11) DEFAULT NULL,
  `auth_type` varchar(5) NOT NULL COMMENT 'local,\nfb - facebook,\ntw - twitter,\nvk - vkontakte,\nmail - mail.ru,\ngoogl - google,\ninst - instagram',
  `password` varchar(250) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  `last_visit` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `verified_flag` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  UNIQUE KEY `auth_type_UNIQUE` (`auth_type`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица зарегистрированных пользователей портала (игроки, компании-операторы)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `txqueststation`
--

DROP TABLE IF EXISTS `txqueststation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `txqueststation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest_id` int(11) NOT NULL,
  `station_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_txqueststation_quest_id_idx` (`quest_id`),
  KEY `fk_txqueststation_station_id_idx` (`station_id`),
  CONSTRAINT `fk_txqueststation_quest_id` FOREIGN KEY (`quest_id`) REFERENCES `tquest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_txqueststation_station_id` FOREIGN KEY (`station_id`) REFERENCES `tstation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-развязка квесты-станции метро';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `txquesttag`
--

DROP TABLE IF EXISTS `txquesttag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `txquesttag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_txquesttag_quest_id_idx` (`quest_id`),
  KEY `fk_txquesttag_tag_id_idx` (`tag_id`),
  CONSTRAINT `fk_txquesttag_quest_id` FOREIGN KEY (`quest_id`) REFERENCES `tquest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_txquesttag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `ttag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `txquestuser`
--

DROP TABLE IF EXISTS `txquestuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `txquestuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quest_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `success_flag` bit(1) NOT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `ratio` int(11) DEFAULT NULL,
  `images` varchar(500) DEFAULT NULL COMMENT 'Пути к картинкам, разделенные ;',
  PRIMARY KEY (`id`),
  KEY `fk_txquestuser_quest_id_idx` (`quest_id`),
  KEY `fk_txquestuser_user_id_idx` (`user_id`),
  CONSTRAINT `fk_txquestuser_quest_id` FOREIGN KEY (`quest_id`) REFERENCES `tquest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_txquestuser_user_id` FOREIGN KEY (`user_id`) REFERENCES `tuser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица развязка квесты-пользователи, посетившие их';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `txuserachievement`
--

DROP TABLE IF EXISTS `txuserachievement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `txuserachievement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `achievement_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_txuserachievement_user_id_idx` (`user_id`),
  KEY `fk_txuserachievement_achievement_id_idx` (`achievement_id`),
  CONSTRAINT `fk_txuserachievement_achievement_id` FOREIGN KEY (`achievement_id`) REFERENCES `tachievement` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_txuserachievement_user_id` FOREIGN KEY (`user_id`) REFERENCES `tuser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'quests'
--

--
-- Dumping routines for database 'quests'
--
/*!50003 DROP PROCEDURE IF EXISTS `pCompanyCreate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pCompanyCreate`(`name` varchar(100), url varchar(45))
BEGIN
  insert into tcompany(`name`, site) values(`name`, url);
  select LAST_INSERT_ID() as id, `name` as `name`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestDuctionaries` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pQuestDuctionaries`()
BEGIN
  select id, name from tcompany;
    select id, name from ttag;
    select id, name from tleague;
    select id, name from tcity;
    select id, name from tstation;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pQuestEdit`(
  id int,
    name varchar(45),
    descr varchar(5000),
    url varchar(45),
    company_id int,
    players_from int,
    players_to int,
    tags_list varchar(1000),
    league_id int,
    city_id int,
    stations_list varchar(1000),
    address varchar(1000),
    lat decimal(10, 8),
    lng decimal(10, 8),
    price_from int,
    price_to int,
    video_url varchar(45)
)
BEGIN
  declare q_id int;
    declare q varchar(1000);
    
    if EXISTS(SELECT * FROM tquest q where q.id = id) then
    begin
      update tquest tq set 
        tq.`name` = name,
        tq.descr = descr,
        tq.url = url,
        tq.company_id = company_id,
        tq.players_from = players_from,
        tq.players_to = players_to,
        tq.league_id = league_id,
        tq.city_id = city_id,
        tq.address = address,
        tq.lat = lat,
        tq.lng = lng,
        tq.price_from = price_from,
        tq.price_to = price_to,
        tq.video_url = video_url
    where tq.id = id;
      set q_id = id;
    end;
  else
    begin
      insert into tquest(`name`, descr, url, company_id, players_from, players_to, league_id, city_id, address, lat, lng, price_from, price_to, video_url) 
        values(name, descr, url, company_id, players_from, players_to, league_id, city_id, address, lat, lng, price_from, price_to, video_url);
      set q_id = LAST_INSERT_ID();
    end;
  end if;
    
    -- Delete and Insert quest tags
  delete from txquesttag where quest_id = q_id;
    if char_length(tags_list) > 0 then
    begin
            set @q = concat('insert into txquesttag(quest_id, tag_id) values', replace(tags_list, 'e_id', q_id));
      prepare stm from @q;
      execute stm;
    end;
    end if;
    
    -- Delete and Insert quest stations
    delete from txqueststation where quest_id = q_id;
    if char_length(stations_list) > 0 then
    begin
      set @q = concat('insert into txqueststation(quest_id, station_id) values', replace(stations_list, 'e_id', q_id));
      prepare stm from @q;
      execute stm;
    end;
  end if;
    
    select q_id as quest_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestGet` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pQuestGet`(
  quest_id int
)
BEGIN
  select * from tquest where id = quest_id;
    
    select id, name from tcompany;
    
    select t.*, case when tx.quest_id is null then 0 else 1 end as selected  
    from ttag t 
    left join txquesttag tx on t.id = tx.tag_id
        and tx.quest_id = quest_id;
    
    select id, name from tleague;
    
    select id, name from tcity;
    
    select t.*, case when tx.quest_id is null then 0 else 1 end as selected  
    from tstation t 
    left join txqueststation tx on t.id = tx.station_id
        and tx.quest_id = quest_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestGet1` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pQuestGet1`(quest_id int)
BEGIN
    declare company_id int;

  select q.id, q.name, c.name as company_name, q.url, q.descr, q.address, 
    q.players_from, q.players_to, q.price_from, q.price_to, q.lat, q.lng
    from tquest q inner join tcompany c on q.company_id = c.id 
    where q.id = quest_id;
        
  -- Select tags
    select t.id, t.name from ttag t inner join txquesttag tx on t.id = tx.tag_id
    where tx.quest_id = quest_id;
    
    -- Select other quest's company quests
    select q.company_id into company_id from tquest q where q.id = quest_id;
    select * from tquest q
    where q.company_id = company_id and q.id != quest_id;
        
    -- Select stations
    select s.id, s.name from tstation s inner join txqueststation tx on s.id = tx.station_id
    where tx.quest_id = quest_id;
    
    /*select t.*, case when tx.quest_id is null then 0 else 1 end as selected  
    from ttag t 
    left join txquesttag tx on t.id = tx.tag_id
        and tx.quest_id = quest_id;
    
    select t.*, case when tx.quest_id is null then 0 else 1 end as selected  
    from tstation t 
    left join txqueststation tx on t.id = tx.station_id
        and tx.quest_id = quest_id;*/
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pQuestList`()
BEGIN
  select id, `name` from tCompany;
    
    select id, `name`, company_id from tQuest;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestSearch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pQuestSearch`(q varchar(100))
BEGIN
  select q.id, q.name, c.name as company_name, q.url, q.descr, q.address, 
    q.players_from, q.players_to, q.price_from, q.price_to, q.lat, q.lng 
  from tquest q
  inner join tcompany c on q.company_id = c.id
    inner join (
    select qt.quest_id, group_concat(qt.tag_name separator ' ') tags_name
    from (select tx.quest_id as quest_id, t.id as tag_id, t.name as tag_name from txquesttag tx inner join ttag t on tx.tag_id = t.id) qt
    group by qt.quest_id
  ) tags on q.id = tags.quest_id
    inner join (
    select qs.quest_id, group_concat(qs.station_name separator ' ') stations_name
    from (select tx.quest_id as quest_id, s.id as station_id, s.name as station_name from txqueststation tx inner join tstation s on tx.station_id = s.id) qs
    group by qs.quest_id
  ) stations on q.id = stations.quest_id
  WHERE MATCH (q.name, q.descr, q.address) AGAINST (q IN BOOLEAN MODE)
     or MATCH (c.name) AGAINST (q IN BOOLEAN MODE)
       or MATCH (tags.tags_name) AGAINST (q IN BOOLEAN MODE)
       or MATCH (stations.stations_name) AGAINST (q IN BOOLEAN MODE);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pStationCreate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pStationCreate`(`name` varchar(45))
BEGIN
  insert into tstation(`name`) values(`name`);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pTagCreate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pTagCreate`(`name` varchar(45))
BEGIN
  insert into ttag(`name`) values(`name`);
    select LAST_INSERT_ID() as id, `name` as `name`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserCreate` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pUserCreate`(`name` varchar(45), email varchar(45), psw varchar(250))
BEGIN
  insert into tuser (auth_type, `name`, email, password) values('local', `name`, email, psw);
    
    select * from tuser u where u.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserGet` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pUserGet`(email varchar(45))
BEGIN
  select * from tuser t where t.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserOAuth` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pUserOAuth`(
  auth_type varchar(5),
  token varchar(250), 
    email varchar(45),
    `name` varchar(45)
)
BEGIN
  declare new_flag bit(1);
    
    if EXISTS(SELECT * FROM tuser u  where u.auth_type = auth_type and u.token = token) then
    begin
    update tuser set last_visit = CURRENT_TIMESTAMP;
        set new_flag = 0;
  end;
  else
  begin
        insert into tuser(token, auth_type, email, `name`, verified_flag) 
        values(token, auth_type, email, `name`, 1);
        set new_flag = 1;
  end;
  end if;
    
    select *, new_flag as `new_flag` from tuser u where u.auth_type = auth_type and u.token = token;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserSetVerificationToken` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pUserSetVerificationToken`(id int, token varchar(250))
BEGIN
  update tuser u set u.token = token where u.id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserVerify` */;
ALTER DATABASE `quests` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE PROCEDURE `pUserVerify`(id int, token varchar(250))
BEGIN
  update tuser u set u.verified_flag = 1 where u.id = id and u.token = token;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `quests` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-17 15:58:29
