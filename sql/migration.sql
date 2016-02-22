
-- create translate tables and fill them
drop table tcity_tr;
CREATE TABLE `tcity_tr` (
  `city_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`city_id`,`lang`),
  KEY `fk_tcity_tr_city_id_idx` (`city_id`),
  CONSTRAINT `fk_tcity_tr_city_id` FOREIGN KEY (`city_id`) REFERENCES `tcity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tCity';

insert into tcity_tr(city_id, lang, name)
select t.id, 'ru' as lang, t.name
from tcity t;

ALTER TABLE `quests`.`tcity` 
DROP COLUMN `name`;



CREATE TABLE `tcompany_tr` (
  `company_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`company_id`,`lang`),
  KEY `fk_tcompany_tr_company_id_idx` (`company_id`),
  FULLTEXT KEY `ft_tcompany_tr_name` (`name`),
  CONSTRAINT `fk_tcompany_tr_company_id` FOREIGN KEY (`company_id`) REFERENCES `tcompany` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into tcompany_tr(company_id, lang, name)
select t.id, 'ru' as lang, t.name
from tcompany t;

ALTER TABLE `quests`.`tcompany` 
DROP COLUMN `name`;



CREATE TABLE `tcomplexity_tr` (
  `complexity_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`complexity_id`,`lang`),
  KEY `fk_tcomplexity_tr_complexity_id_idx` (`complexity_id`),
  CONSTRAINT `fk_tcomplexity_tr_complexity_id` FOREIGN KEY (`complexity_id`) REFERENCES `tcomplexity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into tcomplexity_tr(complexity_id, lang, name)
select t.id, 'ru' as lang, t.name
from tcomplexity t;

ALTER TABLE `quests`.`tcomplexity` 
DROP COLUMN `name`;


CREATE TABLE `tcountry_tr` (
  `country_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`country_id`,`lang`),
  KEY `fk_tcountry_tr_country_id_idx` (`country_id`),
  CONSTRAINT `fk_tcountry_tr_country_id` FOREIGN KEY (`country_id`) REFERENCES `tcountry` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into tcountry_tr(country_id, lang, name)
select t.id, 'ru' as lang, t.name
from tcountry t;

ALTER TABLE `quests`.`tcountry` 
DROP COLUMN `name`;


drop table tleague_tr;
CREATE TABLE `tleague_tr` (
  `league_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`league_id`,`lang`),
  KEY `fk_tleague_tr_leqgue_id_idx` (`league_id`),
  CONSTRAINT `fk_tleague_tr_leqgue_id` FOREIGN KEY (`league_id`) REFERENCES `tleague` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tLeague';

insert into tleague_tr(league_id, lang, name)
select t.id, 'ru' as lang, t.name
from tleague t;

ALTER TABLE `quests`.`tleague` 
DROP COLUMN `name`;


drop table tquest_tr;
CREATE TABLE `tquest_tr` (
  `quest_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `descr` varchar(5000) DEFAULT NULL,
  `address` varchar(1000) NOT NULL,
  PRIMARY KEY (`quest_id`,`lang`),
  KEY `fk_tquest_tr_quest_id_idx` (`quest_id`),
  FULLTEXT KEY `ft_name_descr_address` (`name`,`descr`,`address`),
  CONSTRAINT `fk_tquest_tr_quest_id` FOREIGN KEY (`quest_id`) REFERENCES `tquest` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Таблица-переводчик для tQuest';

insert into tquest_tr(quest_id, lang, name, descr, address)
select t.id, 'ru' as lang, t.name, t.descr, t.address
from tquest t;

ALTER TABLE `quests`.`tquest` 
DROP COLUMN `name`;
ALTER TABLE `quests`.`tquest` 
DROP COLUMN `descr`;
ALTER TABLE `quests`.`tquest` 
DROP COLUMN `address`;


CREATE TABLE `tstation_tr` (
  `station_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`station_id`,`lang`),
  KEY `tstation_tr_station_id_idx` (`station_id`),
  FULLTEXT KEY `ft_name` (`name`),
  CONSTRAINT `tstation_tr_station_id` FOREIGN KEY (`station_id`) REFERENCES `tstation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into tstation_tr(station_id, lang, name)
select t.id, 'ru' as lang, t.name
from tstation t;

ALTER TABLE `quests`.`tstation` 
DROP INDEX `UNIQUE_name_city_id`;
ALTER TABLE `quests`.`tstation` 
DROP COLUMN `name`;



CREATE TABLE `ttag_tr` (
  `tag_id` int(11) NOT NULL,
  `lang` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`tag_id`,`lang`),
  KEY `ttag_tr_tag_id_idx` (`tag_id`),
  FULLTEXT KEY `ft_name` (`name`),
  CONSTRAINT `ttag_tr_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `ttag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into ttag_tr(tag_id, lang, name)
select t.id, 'ru' as lang, t.name
from ttag t;

ALTER TABLE `quests`.`ttag` 
DROP COLUMN `name`;




-- create views
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vcity` AS select `t`.`id` AS `id`,`t`.`country_id` AS `country_id`,`tr`.`lang` AS `lang`,`tr`.`name` AS `name` from (`tcity` `t` join `tcity_tr` `tr` on((`t`.`id` = `tr`.`city_id`)));

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vcompany` AS select `t`.`id` AS `id`,`tr`.`name` AS `name`,`t`.`site` AS `site` from (`tcompany` `t` join `tcompany_tr` `tr` on((`t`.`id` = `tr`.`company_id`)));

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vcomplexity` AS select `t`.`id` AS `id`,`tr`.`name` AS `name` from (`tcomplexity` `t` join `tcomplexity_tr` `tr` on((`t`.`id` = `tr`.`complexity_id`)));

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vcountry` AS select `t`.`id` AS `id`,`tr`.`name` AS `name`,`tr`.`lang` AS `lang` from (`tcountry` `t` join `tcountry_tr` `tr` on((`t`.`id` = `tr`.`country_id`)));

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vleague` AS select `t`.`id` AS `id`,`tr`.`name` AS `name` from (`tleague` `t` join `tleague_tr` `tr` on((`t`.`id` = `tr`.`league_id`)));

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vstation` AS select `t`.`id` AS `id`,`t`.`city_id` AS `city_id`,`tr`.`lang` AS `lang`,`tr`.`name` AS `name` from (`tstation` `t` join `tstation_tr` `tr` on((`t`.`id` = `tr`.`station_id`)));

CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `vtag` AS select `t`.`id` AS `id`,`tr`.`name` AS `name` from (`ttag` `t` join `ttag_tr` `tr` on((`t`.`id` = `tr`.`tag_id`)));




-- translate static dictionaries
insert INTO tleague_tr(league_id, lang, name)
values
    (1, 'en', 'Platinum'), 
    (2, 'en', 'Gold'),
    (3, 'en', 'Silver'),
    (4, 'en', 'Bronze');
    
insert INTO tcomplexity_tr(complexity_id, lang, name)
values
    (1, 'en', 'Easy'), 
    (2, 'en', 'Normal'),
    (3, 'en', 'Difficult'),
    (4, 'en', 'Master');





-- rewrite procedures
DELIMITER ;;
CREATE PROCEDURE `pAdminCityGet`(
    lang varchar(10),
    city_id int
)
BEGIN
    select * 
    from tcity c
    where c.id = city_id;
    
    select tr.lang, tr.name 
    from tcity_tr tr
    where tr.city_id = city_id;
    
    -- countries dictionary
    select v.id, v.name
    from vcountry v
    where v.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminCityGet to 'moderator';

DELIMITER ;;
CREATE PROCEDURE `pAdminCityPut`(
    lang varchar(10),
    city_id int,
    country_id int,
    time_zone int,
    lat decimal(10, 8),
    lng decimal(10, 8),
    name_lang_list varchar(1000)
)
BEGIN
    declare id int;
    
    if city_id is null then
        begin
            insert into tcity(country_id, time_zone, lat, lng)
                value(country_id, time_zone, lat, lng);
            
            set id = LAST_INSERT_ID();
        end;
    else
        begin
            update tcity t
                set t.country_id = country_id,
                    t.time_zone = time_zone,
                    t.lat = lat,
                    t.lng = lng
            where t.id = city_id;
            
            set id = city_id;
        end;
    end if;
    
    -- clear all entity rows from traslate table
    delete tr
    from tcity_tr tr
    where tr.city_id = id;
    
    if char_length(name_lang_list) > 0 then
        begin
            set @q = concat('insert into tcity_tr(city_id, lang, name) values', replace(name_lang_list, 'e_id', id));
            prepare stm from @q;
            execute stm;
        end;
    end if;
    
    select t.id, tr.name
    from tcity t inner join tcity_tr tr on t.id = tr.city_id
    where t.id = id and tr.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminCityPut to 'moderator';


DELIMITER ;;
CREATE PROCEDURE `pAdminCompanyGet`(
    company_id int
)
BEGIN
    select * 
    from tcompany c
    where c.id = company_id;
    
    select tr.lang, tr.name 
    from tcompany_tr tr
    where tr.company_id = company_id;
END ;;
DELIMITER ;
grant execute on procedure pAdminCompanyGet to 'moderator';

DELIMITER ;;
CREATE PROCEDURE `pAdminCompanyPut`(
	lang varchar(10),
    company_id int,
    site varchar(250),
    name_lang_list varchar(1000)
)
BEGIN
	declare id int;
    
    if company_id is null then
		begin
			insert into tcompany(site) values(site);
			
            set id = LAST_INSERT_ID();
        end;
	else
		begin
			update tcompany c
			set c.site = site 
            where c.id = company_id;
            
            set id = company_id;
        end;
	end if;
    
    -- clear all entity rows from traslate table
    delete tr
    from tcompany_tr tr
    where tr.company_id = id;
    
    if char_length(name_lang_list) > 0 then
        begin
            set @q = concat('insert into tcompany_tr(company_id, lang, name) values', replace(name_lang_list, 'e_id', id));
            prepare stm from @q;
			execute stm;
        end;
    end if;
    
    select t.id, tr.name
    from tcompany t inner join tcompany_tr tr on t.id = tr.company_id
    where t.id = id and tr.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminCompanyPut to 'moderator';

DELIMITER ;;
CREATE PROCEDURE `pAdminCountryGet`(
    country_id int
)
BEGIN
    select * 
    from tcountry t
    where t.id = country_id;
    
    select tr.lang, tr.name 
    from tcountry_tr tr
    where tr.country_id = country_id;
END ;;
DELIMITER ;
grant execute on procedure pAdminCountryGet to 'moderator';


DELIMITER ;;
CREATE PROCEDURE `pAdminCountryPut`(
    lang varchar(10),
    country_id int,
    name_lang_list varchar(1000)
)
BEGIN
    declare id int;
    
    if country_id is null then
        begin
            insert into tcountry() value();
            
            set id = LAST_INSERT_ID();
        end;
    else
        begin
            set id = country_id;
        end;
    end if;
    
    -- clear all entity rows from traslate table
    delete tr
    from tcountry_tr tr
    where tr.country_id = id;
    
    if char_length(name_lang_list) > 0 then
        begin
            set @q = concat('insert into tcountry_tr(country_id, lang, name) values', replace(name_lang_list, 'e_id', id));
            prepare stm from @q;
            execute stm;
        end;
    end if;
    
    select t.id, tr.name
    from tcountry t inner join tcountry_tr tr on t.id = tr.country_id
    where t.id = id and tr.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminCountryPut to 'moderator';


DELIMITER ;;
CREATE PROCEDURE `pAdminStationGet`(
    lang varchar(10),
    station_id int
)
BEGIN
    select * 
    from tstation s
    where s.id = station_id;
    
    select tr.lang, tr.name 
    from tstation_tr tr
    where tr.station_id = station_id;
    
    -- cities dictionary
    select v.id, v.name
    from vcity v
    where v.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminStationGet to 'moderator';


DELIMITER ;;
CREATE PROCEDURE `pAdminStationPut`(
    lang varchar(10),
    station_id int,
    city_id int,
    name_lang_list varchar(1000)
)
BEGIN
    declare id int;
    
    if station_id is null then
        begin
            insert into tstation(city_id)
                value(city_id);
            
            set id = LAST_INSERT_ID();
        end;
    else
        begin
            update tstation t
                set t.city_id = city_id
            where t.id = station_id;
            
            set id = station_id;
        end;
    end if;
    
    -- clear all entity rows from traslate table
    delete tr
    from tstation_tr tr
    where tr.station_id = id;
    
    if char_length(name_lang_list) > 0 then
        begin
            set @q = concat('insert into tstation_tr(station_id, lang, name) values', replace(name_lang_list, 'e_id', id));
            prepare stm from @q;
            execute stm;
        end;
    end if;
    
    select t.id, tr.name
    from tstation t inner join tstation_tr tr on t.id = tr.station_id
    where t.id = id and tr.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminStationPut to 'moderator';


DELIMITER ;;
CREATE PROCEDURE `pAdminTagGet`(
    tag_id int
)
BEGIN
    select * 
    from ttag t
    where t.id = tag_id;
    
    select tr.lang, tr.name 
    from ttag_tr tr
    where tr.tag_id = tag_id;
END ;;
DELIMITER ;
grant execute on procedure pAdminTagGet to 'moderator';


DELIMITER ;;
CREATE PROCEDURE `pAdminTagPut`(
    lang varchar(10),
    tag_id int,
    name_lang_list varchar(1000)
)
BEGIN
    declare id int;
    
    if tag_id is null then
        begin
            insert into ttag() values();
            
            set id = LAST_INSERT_ID();
        end;
    else
        begin
            set id = tag_id;
        end;
    end if;
    
    -- clear all entity rows from traslate table
    delete tr
    from ttag_tr tr
    where tr.tag_id = id;
    
    if char_length(name_lang_list) > 0 then
        begin
            set @q = concat('insert into ttag_tr(tag_id, lang, name) values', replace(name_lang_list, 'e_id', id));
            prepare stm from @q;
            execute stm;
        end;
    end if;
    
    select t.id, tr.name
    from ttag t inner join ttag_tr tr on t.id = tr.tag_id
    where t.id = id and tr.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pAdminTagPut to 'moderator';


drop procedure pCityList;
DELIMITER ;;
CREATE PROCEDURE `pCityList`(
	lang varchar(10)
)
BEGIN
	select c.id, tr.name from tcountry c inner join tcountry_tr tr on c.id = tr.country_id;
    
    select co.id as country_id, co_tr.name as country_name,
		ci.id as city_id, ci_tr.name as city_name, ci.lat, ci.lng
    from tcountry co inner join 
		tcountry_tr co_tr on co.id = co_tr.country_id inner join
		tcity ci on co.id = ci.country_id inner join
        tcity_tr ci_tr on ci.id = ci_tr.city_id
	where co_tr.lang = lang and ci_tr.lang = lang
    order by co.id;
END ;;
DELIMITER ;
grant execute on procedure pCityList to 'web';


drop procedure pCityStations;
DELIMITER ;;
CREATE PROCEDURE `pCityStations`(
	lang varchar(10),
    city_id int
)
BEGIN
	select tc.id, max(tc.name) as name
    from
    (
        select v.id, null as name
		from vstation v
		where v.city_id = city_id and v.lang != lang
		union
		select v.id, v.name
		from vstation v
		where v.city_id = city_id and v.lang = lang
		order by id
    ) tc
    group by tc.id;
END ;;
DELIMITER ;
grant execute on procedure pCityStations to 'moderator';


drop procedure pCommentApprove;
DELIMITER ;;
CREATE PROCEDURE `pCommentApprove`(
  id int,
    comment varchar(1000)
)
BEGIN
  update txquestuser tx set tx.comment = comment, tx.approved_flag = 1 where tx.id = id;
END ;;
DELIMITER ;
grant execute on procedure pCommentApprove to 'moderator';


drop procedure pCommentDel;
DELIMITER ;;
CREATE PROCEDURE `pCommentDel`(
  _id int,
    _user_id int
)
BEGIN
    update txquestuser tx set tx.deleted_flag = 1
    where id = _id and (user_id = _user_id or user_id in 
    (
    select id from tuser where role = 'adm'
    ));
END ;;
DELIMITER ;
grant execute on procedure pCommentApprove to 'moderator';
grant execute on procedure pCommentApprove to 'web';


drop procedure pCommentEdit;
DELIMITER ;;
CREATE PROCEDURE `pCommentEdit`(
  id int,
    quest_id int,
    user_id int,
    comment varchar(1000)
)
BEGIN
  if id is not null then
    begin 
      update txquestuser tx set tx.comment = comment, tx.approved_flag = null
            where tx.id = id and tx.user_id = user_id;
            
            select tx.id, tx.user_id, tx.comment, DATE_FORMAT(tx.date, '%d.%m.%x') as date, u.name as user_name 
      from txquestuser tx inner join tuser u on tx.user_id = u.id
      where tx.id = id and tx.user_id = user_id;
    end;
    else
    begin
      insert into txquestuser(quest_id, user_id, comment) values(quest_id, user_id, comment);
            
            select tx.id, tx.user_id, tx.comment, DATE_FORMAT(tx.date, '%d.%m.%x') as date, u.name as user_name 
      from txquestuser tx inner join tuser u on tx.user_id = u.id
      where tx.quest_id = quest_id and user_id = user_id;
    end;
  end if;
END ;;
DELIMITER ;
grant execute on procedure pCommentEdit to 'web';


drop procedure pCommentGet;
DELIMITER ;;
CREATE PROCEDURE `pCommentGet`(
  id int
)
BEGIN
  select tx.id, tx.quest_id, tx.user_id, tx.comment, tx.approved_flag, DATE_FORMAT(tx.date, '%d.%m.%x') as date from txquestuser tx
    where tx.id = id;
END ;;
DELIMITER ;
grant execute on procedure pCommentGet to 'moderator';


drop procedure pCommentList;
DELIMITER ;;
CREATE PROCEDURE `pCommentList`()
BEGIN
  select q.id as quest_id, q.name as quest_name, c.id as comment_id, c.comment, DATE_FORMAT(c.date, '%d.%m.%x') as date 
    from tquest q inner join txquestuser c on q.id = c.quest_id
  where (c.approved_flag is null or c.approved_flag != 1)
    and (c.deleted_flag is null or c.deleted_flag != 1)
  order by quest_id, c.date;
END ;;
DELIMITER ;
grant execute on procedure pCommentList to 'moderator';


drop procedure pCompanyDel;
DELIMITER ;;
CREATE PROCEDURE `pCompanyDel`(
	company_id int
)
BEGIN
	update tcompany c set c.deleted_flag = 1 where c.id = company_id;
END ;;
DELIMITER ;
grant execute on procedure pCompanyDel to 'moderator';


drop procedure pCountryCities;
DELIMITER ;;
CREATE PROCEDURE `pCountryCities`(
	lang varchar(10),
    country_id int
)
BEGIN
	select tc.id, max(tc.name) as name
    from
    (
        select v.id, null as name
		from vcity v
		where v.country_id = country_id and v.lang != lang
		union
		select v.id, v.name
		from vcity v
		where v.country_id = country_id and v.lang = lang
		order by id
    ) tc
    group by tc.id;
END ;;
DELIMITER ;
grant execute on procedure pCountryCities to 'moderator';


drop procedure pOrderConfirm;
DELIMITER ;;
CREATE PROCEDURE `pOrderConfirm`(
	order_id int,
    confirm_code varchar(4)
)
BEGIN
	if exists(select * from torder t where t.id = order_id and t.confirm_code = confirm_code) then
		begin
			insert into torderprogress(order_id, state) value(order_id, 'cnf');
            
            select q.id as quest_id, o.* from torder o inner join tschedule s on o.session_id = s.id
				inner join tquest q on s.quest_id = q.id; 
		end;
	end if;
END ;;
DELIMITER ;


drop procedure pOrderCreate;
DELIMITER ;;
CREATE PROCEDURE `pOrderCreate`(
	user_id int,
    session_id int,
    players_cnt int,
    confirm_code varchar(4),
    comment varchar(1000)
)
BEGIN
	if exists (select * from torder o inner join torderprogress op on o.id = op.order_id where o.session_id = session_id) then
	begin
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The selected session has been already booked';
	end;
    end if;
    
    
    insert into torder(user_id, session_id,players_cnt, `comment`, confirm_code) 
		value(user_id, session_id, players_cnt, `comment`, confirm_code);
    
    select LAST_INSERT_ID() as order_id;
END ;;
DELIMITER ;


drop procedure pOrderSetStatus;
DELIMITER ;;
CREATE PROCEDURE `pOrderSetStatus`(
	order_id int,
    `status` varchar(3)
)
BEGIN
	update torderprogress op set op.state = `status` where op.order_id = order_id;
END ;;
DELIMITER ;


drop procedure pQuestDel;
DELIMITER ;;
CREATE PROCEDURE `pQuestDel`(
  quest_id int
)
BEGIN
  update tquest t set deleted_flag = 1 where t.id = quest_id;
END ;;
DELIMITER ;
grant execute on procedure pQuestDel to 'moderator';


drop procedure pQuestEdit;
DELIMITER ;;
CREATE PROCEDURE `pQuestEdit`(
    lang varchar(10),
    id int,
    name varchar(100),
    descr varchar(5000),
    url varchar(250),
    company_id int,
    players_from int,
    players_to int,
    tags_list varchar(1000),
    league_id int,
    country_id int,
    city_id int,
    stations_list varchar(1000),
    address varchar(1000),
    lat decimal(10, 8),
    lng decimal(10, 8),
    price_from int,
    price_to int,
    video_url varchar(45),
    ceo_title varchar(1000),
    ceo_description varchar(1000),
    ceo_keywords varchar(1000),
    sef_name varchar(100),
    complexity_id int
)
BEGIN
    declare q_id int;
    declare q varchar(1000);
    
    if EXISTS(SELECT * FROM tquest q where q.id = id) then
        begin
            update tquest tq set 
                tq.url = url,
                tq.company_id = company_id,
                tq.players_from = players_from,
                tq.players_to = players_to,
                tq.league_id = league_id,
                tq.country_id = country_id,
                tq.city_id = city_id,
                tq.lat = lat,
                tq.lng = lng,
                tq.price_from = price_from,
                tq.price_to = price_to,
                tq.video_url = video_url,
                tq.ceo_title = ceo_title,
                tq.ceo_description = ceo_description,
                tq.ceo_keywords = ceo_keywords,
                tq.sef_name = sef_name,
                tq.complexity_id = complexity_id
            where tq.id = id;
            
            if EXISTS(SELECT * FROM tquest_tr q_tr where q_tr.quest_id = id and q_tr.lang = lang) then
                begin
                    update tquest_tr q_tr set
                        q_tr.name = name,
                        q_tr.descr = descr,
                        q_tr.address = address
                    where q_tr.quest_id = id and q_tr.lang = lang;
                end;
            else
                begin
                    insert into tquest_tr(quest_id, lang, name, descr, address) values(id, lang, name, descr, address);
                end;
            end if;    
            
            set q_id = id;
        end;
    else
        begin
            insert into tquest(url, company_id, players_from, players_to, league_id, country_id, city_id, address, lat, lng, price_from, price_to, video_url, ceo_title, ceo_description, ceo_keywords, sef_name, complexity_id) 
                values(url, company_id, players_from, players_to, league_id, country_id, city_id, address, lat, lng, price_from, price_to, video_url, ceo_title, ceo_description, ceo_keywords, sef_name, complexity_id);
            
            set q_id = LAST_INSERT_ID();
            
            insert into tquest_tr(quest_id, lang, name, descr, address) values(q_id, lang, name, descr, address);
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
grant execute on procedure pQuestEdit to 'moderator';


drop procedure pQuestGet;
DELIMITER ;;
CREATE PROCEDURE `pQuestGet`(
	lang varchar(10),
    quest_id int
)
BEGIN
    declare company_id int;
	declare country_id int;
	declare city_id int;
   
	select q.company_id, q.country_id, q.city_id
    into company_id, country_id, city_id
    from tquest q 
    where id = quest_id;
    
	-- language independed fields
    select q.*
    from tquest q
    where q.id = quest_id;
    
    -- language depended fields
    select tr.name, tr.descr, tr.address 
    from tquest_tr tr
    where  tr.quest_id = quest_id and tr.lang = lang;
    
	-- all companies list
    select tc.id, tc.site, max(tc.name) as name, tc.selected
    from
    (
        select t.*, null as name, case when t.id = company_id then 1 else 0 end as selected
		from tcompany t inner join tcompany_tr tr on t.id = tr.company_id
		where (t.deleted_flag is null or t.deleted_flag != 1) and tr.lang != lang
		union
		select t.*, tr.name, case when t.id = company_id then 1 else 0 end as selected
		from tcompany t inner join tcompany_tr tr on t.id = tr.company_id
		where (t.deleted_flag is null or t.deleted_flag != 1) and tr.lang = lang
		order by id
    ) tc
    group by tc.id;
    
    -- tags
    select tc.id, max(tc.name) as name, tc.selected
    from
    (
        select t.*, null as name, case when tx.quest_id is null then 0 else 1 end as selected  
    from ttag t inner join ttag_tr tr on t.id = tr.tag_id
    left join txquesttag tx on t.id = tx.tag_id
      and tx.quest_id = quest_id
    where tr.lang != lang
        union
        select t.*, tr.name, case when tx.quest_id is null then 0 else 1 end as selected  
    from ttag t inner join ttag_tr tr on t.id = tr.tag_id
    left join txquesttag tx on t.id = tx.tag_id
      and tx.quest_id = quest_id
    where tr.lang = lang
    ) tc
    group by tc.id;
    
    select t.id, tr.name 
    from tleague t inner join tleague_tr tr on t.id = tr.league_id
    where tr.lang = lang;
    
    -- countries
    select tc.id, max(tc.name) as name, tc.selected
    from
    (
    select t.id, null as name, case when t.id = country_id then 1 else 0 end as selected
    from tcountry t inner join tcountry_tr tr on t.id = tr.country_id
    where tr.lang != lang
    union
    select t.id, tr.name, case when t.id = country_id then 1 else 0 end as selected
    from tcountry t inner join tcountry_tr tr on t.id = tr.country_id
    where tr.lang = lang
    ) tc
    group by tc.id;
    
    -- cities
    select tc.id, max(tc.name) as name, tc.selected
    from
    (
    select t.id, null as name, case when t.id = city_id then 1 else 0 end as selected
    from tcity t inner join tcity_tr tr on t.id = tr.city_id
    where tr.lang != lang and t.country_id = country_id
    union
    select t.id, tr.name, case when t.id = city_id then 1 else 0 end as selected
    from tcity t inner join tcity_tr tr on t.id = tr.city_id
    where tr.lang = lang and t.country_id = country_id
    ) tc
    group by tc.id;
    
    -- stations
    select tc.id, max(tc.name) as name, tc.selected
    from
    (
        select t.*, null as name, case when tx.quest_id is null then 0 else 1 end as selected  
    from tstation t inner join tstation_tr tr on t.id = tr.station_id
    left join txqueststation tx on t.id = tx.station_id
      and tx.quest_id = quest_id
    where tr.lang != lang and t.city_id = city_id
        union
        select t.*, tr.name as name, case when tx.quest_id is null then 0 else 1 end as selected  
    from tstation t inner join tstation_tr tr on t.id = tr.station_id
    left join txqueststation tx on t.id = tx.station_id
      and tx.quest_id = quest_id
    where tr.lang = lang and t.city_id = city_id
    ) tc
    group by tc.id;

    -- complexity    
    select t.id, tr.name 
    from tcomplexity t inner join tcomplexity_tr tr on t.id = tr.complexity_id
    where tr.lang = lang;
END ;;
DELIMITER ;
grant execute on procedure pQuestGet to 'moderator';



drop procedure pQuestGet1;
DELIMITER ;;
CREATE PROCEDURE `pQuestGet1`(
	lang varchar(10),
    quest_id int,
    user_id int
)
BEGIN
    declare company_id int;

	select q.id, tr.name, c_tr.name as company_name, q.url, tr.descr, tr.address, 
    q.players_from, q.players_to, q.price_from, q.price_to, q.lat, q.lng,
    q.ceo_title, q.ceo_description, q.ceo_keywords
    from tquest q 
		inner join tcompany c on q.company_id = c.id
        inner join tcompany_tr c_tr on c.id = c_tr.company_id
		inner join tquest_tr tr on q.id = tr.quest_id
    where q.id = quest_id and tr.lang = lang and c_tr.lang = lang;
        
	-- Select tags
    select t.id, tr.name 
    from ttag t inner join txquesttag tx on t.id = tx.tag_id
		inner join ttag_tr tr on t.id = tr.tag_id
    where tx.quest_id = quest_id and tr.lang = lang;
    
    -- Select other quest's company quests
    select q.company_id into company_id from tquest q where q.id = quest_id;
    select q.*, tr.name, tr.descr 
    from tquest q inner join tquest_tr tr on q.id = tr.quest_id
    where q.company_id = company_id and q.id != quest_id and tr.lang = lang;
        
    -- Select stations
    select s.id, tr.name 
    from tstation s 
		inner join tstation_tr tr on s.id = tr.station_id
        inner join txqueststation tx on s.id = tx.station_id
    where tx.quest_id = quest_id and tr.lang = lang;
    
    -- Select user comment
    select tx.id, tx.user_id, tx.comment, DATE_FORMAT(tx.date, '%d.%m.%x') as date, u.name as user_name 
    from txquestuser tx inner join tuser u on tx.user_id = u.id
    where tx.quest_id = quest_id and (deleted_flag is null or deleted_flag != 1) and tx.user_id = user_id;
    
    -- Select other comments
    select tx.id, tx.user_id, tx.comment, DATE_FORMAT(tx.date, '%d.%m.%x') as date, u.name as user_name 
    from txquestuser tx inner join tuser u on tx.user_id = u.id
    where tx.quest_id = quest_id and (deleted_flag is null or deleted_flag != 1) and tx.user_id != user_id and tx.approved_flag = 1;
    
    select s.* from tschedule s where s.quest_id = quest_id;
    
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
grant execute on procedure pQuestGet1 to 'web';


drop procedure pQuestGetIdBySefName;
DELIMITER ;;
CREATE PROCEDURE `pQuestGetIdBySefName`(
	sef_name varchar(150)
)
BEGIN
	select q.id from tquest q where q.sef_name = sef_name;
END ;;
DELIMITER ;
grant execute on procedure pQuestGetIdBySefName to 'web';


drop procedure pQuestList;
DELIMITER ;;
CREATE PROCEDURE `pQuestList`(
	lang varchar(10)
)
BEGIN
    select t.id, t.site, max(t.name) as name
    from
    (
		select t.*, null as name
		from tcompany t inner join tcompany_tr tr on t.id = tr.company_id
		where (t.deleted_flag is null or t.deleted_flag != 1) and tr.lang != lang
		union
		select t.*, tr.name 
		from tcompany t inner join tcompany_tr tr on t.id = tr.company_id
		where (t.deleted_flag is null or t.deleted_flag != 1) and tr.lang = lang
        order by id
	) t
    group by id;
    
    select t.id, max(t.name) as name, t.company_id
    from
    (
		select q.id, null as name, q.company_id 
		from tquest q inner join tquest_tr tr on q.id = tr.quest_id
		where (q.deleted_flag is null or q.deleted_flag != 1) and tr.lang != lang
		union
		select q.id, tr.`name`, q.company_id 
		from tquest q inner join tquest_tr tr on q.id = tr.quest_id
		where (q.deleted_flag is null or q.deleted_flag != 1) and tr.lang = lang
        order by id
	) t
    group by id;
END ;;
DELIMITER ;
grant execute on procedure pQuestList to 'moderator';


drop procedure pQuestSearch;
DELIMITER ;;
CREATE PROCEDURE `pQuestSearch`(
	lang varchar(10),
    q varchar(100),
	`page` int,
	city_id int
)
BEGIN
	declare start_index int;
	set start_index = `page` * 10;
  
	if q <> '' and q is not null then
		begin
			select q.id, tr.name, c_tr.name as company_name, q.url, tr.descr, tr.address, 
				q.players_from, q.players_to, q.price_from, q.price_to, q.lat, q.lng,
				stations.stations_name as stations
			from tquest q
            inner join tquest_tr tr on q.id = tr.quest_id
			inner join tcompany c on q.company_id = c.id
            inner join tcompany_tr c_tr on c.id = c_tr.company_id
			left join (
				select qt.quest_id, group_concat(qt.tag_name separator ' ') tags_name
				from (
					select tx.quest_id as quest_id, t.id as tag_id, tr.name as tag_name 
                    from txquesttag tx inner join
						ttag t on tx.tag_id = t.id inner join
						ttag_tr tr on t.id = tr.tag_id
                    where tr.lang = lang) qt
				group by qt.quest_id
			) tags on q.id = tags.quest_id
			left join (
				select qs.quest_id, group_concat(qs.station_name separator ' ') stations_name
				from (
					select tx.quest_id as quest_id, s.id as station_id, tr.name as station_name 
                    from txqueststation tx inner join 
						tstation s on tx.station_id = s.id inner join
                        tstation_tr tr on s.id = tr.station_id
					where tr.lang = lang) qs
				group by qs.quest_id
			) stations on q.id = stations.quest_id
			WHERE (q.deleted_flag  is null or q.deleted_flag != 1)
				and (c.deleted_flag  is null or c.deleted_flag != 1) 
				and (city_id is null or q.city_id = city_id) 
				and (tr.lang = lang)
                and (c_tr.lang = lang)
                and (
                    MATCH (tr.name, tr.descr, tr.address) AGAINST (q IN BOOLEAN MODE)
					or MATCH (c_tr.name) AGAINST (q IN BOOLEAN MODE)
					or MATCH (tags.tags_name) AGAINST (q IN BOOLEAN MODE)
					or MATCH (stations.stations_name) AGAINST (q IN BOOLEAN MODE)
				)
			LIMIT start_index, 10;
		end;
	else
		begin
			select q.id, tr.name, c_tr.name as company_name, q.url, tr.descr, tr.address, 
				q.players_from, q.players_to, q.price_from, q.price_to, q.lat, q.lng,
				stations.stations_name as stations
			from tquest q
			inner join tquest_tr tr on q.id = tr.quest_id
            inner join tcompany c on q.company_id = c.id
            inner join tcompany_tr c_tr on c.id = c_tr.company_id
			left join (
				select qt.quest_id, group_concat(qt.tag_name separator ' ') tags_name
				from (
					select tx.quest_id as quest_id, t.id as tag_id, tr.name as tag_name 
					from txquesttag tx inner join 
						ttag t on tx.tag_id = t.id inner join
                        ttag_tr tr on t.id = tr.tag_id
					where tr.lang = lang) qt
				group by qt.quest_id
			) tags on q.id = tags.quest_id
			left join (
				select qs.quest_id, group_concat(qs.station_name separator ' ') stations_name
				from (
					select tx.quest_id as quest_id, s.id as station_id, tr.name as station_name 
                    from txqueststation tx inner join 
						tstation s on tx.station_id = s.id inner join
                        tstation_tr tr on s.id = tr.station_id
					where tr.lang = lang) qs
				group by qs.quest_id
			) stations on q.id = stations.quest_id
			where (q.deleted_flag  is null or q.deleted_flag != 1) and 
				(c.deleted_flag  is null or c.deleted_flag != 1) and
				(city_id is null or q.city_id = city_id) and
                tr.lang = lang and c_tr.lang = lang
			order by -top desc
			LIMIT start_index, 10;
		end;
	end if;
END ;;
DELIMITER ;
grant execute on procedure pQuestSearch to 'web';


drop procedure pUserChangePassword;
DELIMITER ;;
CREATE PROCEDURE `pUserChangePassword`(
  user_id int,
    new_password varchar(250)
)
BEGIN
	update tuser t set t.password = new_password where id = user_id and t.oauth_provider = 'local';
END ;;
DELIMITER ;
grant execute on procedure pUserChangePassword to 'web';


drop procedure pUserCreate;
DELIMITER ;;
CREATE PROCEDURE `pUserCreate`(
	`name` varchar(45),
    email varchar(45),
    psw varchar(250),
    phone varchar(25)
)
BEGIN
	insert into tuser (oauth_provider, `name`, email, password, phone) 
		value('local', `name`, email, psw, phone);
    
    select * from tuser u where u.email = email and u.oauth_provider = 'local';
END ;;
DELIMITER ;
grant execute on procedure pUserCreate to 'web';


DELIMITER ;;
CREATE PROCEDURE `pUserDelete`(
	user_id int
)
BEGIN
	delete from tuser where id = user_id;
END ;;
DELIMITER ;


drop procedure pUserEmailCheck;
DELIMITER ;;
CREATE PROCEDURE `pUserEmailCheck`(
  email varchar(45)
)
BEGIN
  select count(*) as isValid from tuser u where u.oauth_provider = 'local' and u.email = email;
END ;;
DELIMITER ;
grant execute on procedure pUserEmailCheck to 'web';


drop procedure pUserGet;
DELIMITER ;;
CREATE PROCEDURE `pUserGet`(email varchar(45))
BEGIN
	update tuser t set last_visit = default where t.email = email and t.oauth_provider = 'local';
    
	select * from tuser t where t.email = email and t.oauth_provider = 'local';
END ;;
DELIMITER ;
grant execute on procedure pUserGet to 'web';


drop procedure pUserOAuth;
DELIMITER ;;
CREATE PROCEDURE `pUserOAuth`(
  provider varchar(45),
  oauth_id varchar(45), 
  email varchar(45),
    `name` varchar(45),
    `profile` varchar(20000)
)
BEGIN
  declare new_flag bit(1);
    
  if EXISTS(SELECT * FROM tuser u where u.oauth_provider = provider and u.oauth_id = oauth_id) then
    begin
      update tuser u set u.last_visit = CURRENT_TIMESTAMP, u.profile = profile
	  where u.oauth_provider = provider and u.oauth_id = oauth_id;
      
      set new_flag = 0;
    end;
  else
    begin
      insert into tuser(oauth_id, oauth_provider, email, `name`, verified_flag, `profile`) 
        values(oauth_id, provider, email, `name`, 1, `profile`);
      set new_flag = 1;
    end;
  end if;
    
    select *, new_flag as `new_flag` from tuser u where u.oauth_provider = provider and u.oauth_id = oauth_id;
END ;;
DELIMITER ;
grant execute on procedure pUserOAuth to 'web';


drop procedure pUserResetPassword;
DELIMITER ;;
CREATE PROCEDURE `pUserResetPassword`(
  token varchar(250),
    password varchar(250)
)
BEGIN
  update tuser t set t.password = password, t.password_token = null 
    where t.password_token = token and t.oauth_provider = 'local';
    
    SELECT ROW_COUNT() as success;
END ;;
DELIMITER ;
grant execute on procedure pUserResetPassword to 'web';


drop procedure pUserSetForgotPasswordToken;
DELIMITER ;;
CREATE PROCEDURE `pUserSetForgotPasswordToken`(
  email varchar(45),
    token varchar(250)
)
BEGIN
  update tuser t set t.password_token = token where t.email = email and t.oauth_provider = 'local';
    
    SELECT ROW_COUNT() as success;
END ;;
DELIMITER ;
grant execute on procedure pUserSetForgotPasswordToken to 'web';


drop procedure pUserSetVerificationToken;
DELIMITER ;;
CREATE PROCEDURE `pUserSetVerificationToken`(id int, token varchar(250))
BEGIN
  update tuser u set u.verify_token = token where u.id = id and u.oauth_provider = 'local';
END ;;
DELIMITER ;
grant execute on procedure pUserSetVerificationToken to 'web';


drop procedure pUserUpdate;
DELIMITER ;;
CREATE PROCEDURE `pUserUpdate`(
  user_id int,
    phone varchar(25)
)
BEGIN
  update tuser u set u.phone = phone where u.id = user_id;
END ;;
DELIMITER ;
grant execute on procedure pUserUpdate to 'web';


drop procedure pUserVerify;
DELIMITER ;;
CREATE PROCEDURE `pUserVerify`(id int, token varchar(250))
BEGIN
  update tuser u set u.verified_flag = 1 where u.id = id and u.verify_token = token;
  
  select * from tuser u where u.id = id and u.verified_flag = 1;
END ;;
DELIMITER ;
grant execute on procedure pUserVerify to 'web';





-- Drop unused procedures
DROP PROCEDURE `quests`.`pCityCreate`;
DROP PROCEDURE `quests`.`pCompanyCreate`;
DROP PROCEDURE `quests`.`pCompanyEdit`;
DROP PROCEDURE `quests`.`pCountryCreate`;
DROP PROCEDURE `quests`.`pStationCreate`;
DROP PROCEDURE `quests`.`pTagCreate`;
DROP PROCEDURE `quests`.`pQuestDuctionaries`;

