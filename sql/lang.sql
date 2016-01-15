DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCityList`(
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
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCountryCities`(
	lang varchar(10),
    country_id int
)
BEGIN
	select c.*, c_tr.name
	from tcity c inner join tcity_tr c_tr on c.id = c_tr.city_id
	where c.country_id = country_id and c_tr.lang = lang;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pCountryCreate`(
	lang varchar(10),
    `name` varchar(45)
)
BEGIN
	declare id int;
    
    insert into tcountry(`name`) values(`name`);
    
    set id = LAST_INSERT_ID();
    insert into tcountry_tr(city_id, lang, name) values(id, lang, name);
    
    select id as id, `name` as `name`;
END$$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pQuestDuctionaries`(
	lang varchar(45)
)
BEGIN
	select id, name from tcompany;
    
    select t.id, tr.name 
    from ttag t inner join ttag_tr tr on t.id = tr.tag_id
    where tr.lang = lang;
    
    select t.id, tr.name 
    from tleague t inner join tleague_tr tr on t.id = tr.league_id
    where tr.lang = lang;
    
    select t.id, tr.name 
    from tcity t inner join tcity_tr tr on t.id = tr.city_id
    where tr.lang = lang;
    
    select id, name from tstation;
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `pQuestEdit`(
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
                tq.address = address,
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
                        q_tr.descr = descr
                    where q_tr.quest_id = id and q_tr.lang = lang;
                end;
            else
                begin
                    insert into tquest_tr(quest_id, lang, name, descr) values(id, lang, name, descr);
                end;
            end if;    
            
            set q_id = id;
        end;
    else
        begin
            insert into tquest(url, company_id, players_from, players_to, league_id, country_id, city_id, address, lat, lng, price_from, price_to, video_url, ceo_title, ceo_description, ceo_keywords, sef_name, complexity_id) 
                values(url, company_id, players_from, players_to, league_id, country_id, city_id, address, lat, lng, price_from, price_to, video_url, ceo_title, ceo_description, ceo_keywords, sef_name, complexity_id);
            
            set q_id = LAST_INSERT_ID();
            
            insert into tquest_tr(quest_id, lang, name, descr) values(q_id, lang, name, descr);
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
END$$
DELIMITER ;

