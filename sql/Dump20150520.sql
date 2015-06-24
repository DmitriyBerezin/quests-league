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
-- Dumping data for table `tachievement`
--

LOCK TABLES `tachievement` WRITE;
/*!40000 ALTER TABLE `tachievement` DISABLE KEYS */;
/*!40000 ALTER TABLE `tachievement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tcity`
--

LOCK TABLES `tcity` WRITE;
/*!40000 ALTER TABLE `tcity` DISABLE KEYS */;
INSERT INTO `tcity` VALUES (1,NULL,'Москва'),(2,NULL,'Москва'),(3,NULL,'Москва');
/*!40000 ALTER TABLE `tcity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tcity_tr`
--

LOCK TABLES `tcity_tr` WRITE;
/*!40000 ALTER TABLE `tcity_tr` DISABLE KEYS */;
/*!40000 ALTER TABLE `tcity_tr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tcompany`
--

LOCK TABLES `tcompany` WRITE;
/*!40000 ALTER TABLE `tcompany` DISABLE KEYS */;
INSERT INTO `tcompany` VALUES (8,'test','test'),(9,'333','444');
/*!40000 ALTER TABLE `tcompany` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tcompanyprofile`
--

LOCK TABLES `tcompanyprofile` WRITE;
/*!40000 ALTER TABLE `tcompanyprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `tcompanyprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tleague`
--

LOCK TABLES `tleague` WRITE;
/*!40000 ALTER TABLE `tleague` DISABLE KEYS */;
/*!40000 ALTER TABLE `tleague` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tleague_tr`
--

LOCK TABLES `tleague_tr` WRITE;
/*!40000 ALTER TABLE `tleague_tr` DISABLE KEYS */;
/*!40000 ALTER TABLE `tleague_tr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tquest`
--

LOCK TABLES `tquest` WRITE;
/*!40000 ALTER TABLE `tquest` DISABLE KEYS */;
/*!40000 ALTER TABLE `tquest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tquest_tr`
--

LOCK TABLES `tquest_tr` WRITE;
/*!40000 ALTER TABLE `tquest_tr` DISABLE KEYS */;
/*!40000 ALTER TABLE `tquest_tr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tschedule`
--

LOCK TABLES `tschedule` WRITE;
/*!40000 ALTER TABLE `tschedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `tschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tstation`
--

LOCK TABLES `tstation` WRITE;
/*!40000 ALTER TABLE `tstation` DISABLE KEYS */;
INSERT INTO `tstation` VALUES (1,'Отрадное',NULL);
/*!40000 ALTER TABLE `tstation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tstory`
--

LOCK TABLES `tstory` WRITE;
/*!40000 ALTER TABLE `tstory` DISABLE KEYS */;
/*!40000 ALTER TABLE `tstory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tstory_tr`
--

LOCK TABLES `tstory_tr` WRITE;
/*!40000 ALTER TABLE `tstory_tr` DISABLE KEYS */;
/*!40000 ALTER TABLE `tstory_tr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `ttag`
--

LOCK TABLES `ttag` WRITE;
/*!40000 ALTER TABLE `ttag` DISABLE KEYS */;
INSERT INTO `ttag` VALUES (9,''),(5,'111'),(10,'123'),(8,'rrr'),(3,'Tag1'),(6,'tag2'),(7,'tag3'),(1,'undefined');
/*!40000 ALTER TABLE `ttag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tuser`
--

LOCK TABLES `tuser` WRITE;
/*!40000 ALTER TABLE `tuser` DISABLE KEYS */;
INSERT INTO `tuser` VALUES (21,'1',NULL,NULL,'1',NULL,NULL,'local','$2a$10$piuECRB4jgURO.whbtFnc.0hp9Q1lWRwum00GtsUUrNCganV26DfW','6f539bd0b5d146cc687b20c67b9a2792ff4e84c41aad077ebc5168c1d4e3757f235a18d51b9c89c1d7ba7dea5f563295','2015-05-21 13:05:22',NULL);
/*!40000 ALTER TABLE `tuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `txqueststation`
--

LOCK TABLES `txqueststation` WRITE;
/*!40000 ALTER TABLE `txqueststation` DISABLE KEYS */;
/*!40000 ALTER TABLE `txqueststation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `txquesttag`
--

LOCK TABLES `txquesttag` WRITE;
/*!40000 ALTER TABLE `txquesttag` DISABLE KEYS */;
/*!40000 ALTER TABLE `txquesttag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `txquestuser`
--

LOCK TABLES `txquestuser` WRITE;
/*!40000 ALTER TABLE `txquestuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `txquestuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `txuserachievement`
--

LOCK TABLES `txuserachievement` WRITE;
/*!40000 ALTER TABLE `txuserachievement` DISABLE KEYS */;
/*!40000 ALTER TABLE `txuserachievement` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCompanyCreate`(name varchar(100), url varchar(45))
BEGIN
  insert into tcompany(`name`, site) values(name, url);
    select LAST_INSERT_ID() as id, `name` as name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pQuestDuctionaries` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pQuestDuctionaries`()
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
/*!50003 DROP PROCEDURE IF EXISTS `pQuestEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pQuestEdit`(
  id int,
    name varchar(45),
    descr varchar(5000),
    company_id int,
    players_from int,
    players_to int,
    
    league_id int,
    city_id int,
    
    addreess varchar(1000),
    lat decimal(10, 8),
    lng decimal(10, 8)
)
BEGIN
  if EXISTS(SELECT * FROM tquest q where q.id = id) then
    begin
    update tquest set 
      q.`name` = name,
            q.descr = descr,
            q.company_id = company_id,
            q.players_from = players_from,
            q.players_to = players_to,
            q.league_id = league_id,
            q.city_id = city_id,
            q.addreess = addreess,
            q.lat = lat,
            q.`long` = lng;
  end;
  else
  begin
        insert into tquest(`name`, descr, company_id, players_from, players_to, league_id, city_id, addreess, lat, `long`) 
        values(name, descr, company_id, players_from, players_to, league_id, city_id, addreess, lat, lng);
  end;
  end if;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pTagCreate`(name varchar(45))
BEGIN
  insert into ttag(`name`) values(name);
    select LAST_INSERT_ID() as id, `name` as name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserCreate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUserCreate`(`name` varchar(45), email varchar(45), psw varchar(250))
BEGIN
  insert into tuser (auth_type, `name`, email, password) values('local', `name`, email, psw);
    
    select * from tuser u where u.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserGet` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUserGet`(email varchar(45))
BEGIN
  select * from tuser t where t.email = email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserOAuth` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUserOAuth`(
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
/*!50003 DROP PROCEDURE IF EXISTS `pUserSetVerificationToken` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUserSetVerificationToken`(id int, token varchar(250))
BEGIN
  update tuser u set u.token = token where u.id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `pUserVerify` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `pUserVerify`(id int, token varchar(250))
BEGIN
  update tuser u set u.verified_flag = 1 where u.id = id and u.token = token;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-24 18:59:19
