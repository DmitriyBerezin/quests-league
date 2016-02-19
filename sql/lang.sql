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


DELIMITER $$
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
END$$
DELIMITER ;


DELIMITER $$
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
END$$
DELIMITER ;


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
END


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
END


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
END




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
END


DELIMITER $$
USE `quests`$$
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
END$$

DELIMITER ;


USE `quests`;
DROP procedure IF EXISTS `pAdminStationPut`;

DELIMITER $$
USE `quests`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pAdminStationPut`(
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
END$$

DELIMITER ;

CREATE VIEW `vstation` AS
    SELECT 
        `t`.`id` AS `id`,
        `t`.`city_id` AS `city_id`,
        `tr`.`lang` AS `lang`,
        `tr`.`name` AS `name`
    FROM
        (`tstation` `t`
        JOIN `tstation_tr` `tr` ON ((`t`.`id` = `tr`.`station_id`)));


CREATE VIEW `vcity` AS
    SELECT 
        `t`.`id` AS `id`,
        `t`.`country_id` AS `country_id`,
        `tr`.`lang` AS `lang`,
        `tr`.`name` AS `name`
    FROM
        (`tcity` `t`
        JOIN `tcity_tr` `tr` ON ((`t`.`id` = `tr`.`city_id`)));


USE `quests`;
DROP procedure IF EXISTS `pCountryCities`;

DELIMITER $$
USE `quests`$$
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
END$$

DELIMITER ;



USE `quests`;
DROP procedure IF EXISTS `pCityStations`;

DELIMITER $$
USE `quests`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCityStations`(
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
END$$

DELIMITER ;





