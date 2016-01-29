CREATE PROCEDURE `pQuestList`(
    lang varchar(10)
)
BEGIN
    select *
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
    
    select *
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
END


CREATE DEFINER=`root`@`localhost` PROCEDURE `pQuestGet`(
    lang varchar(10),
    quest_id int
)
BEGIN
    declare country_id int;
    declare city_id int;
   
    select q.country_id into country_id from tquest q where id = quest_id;
    select q.city_id into city_id from tquest q where id = quest_id;
   
    -- language independed fields
    select q.*
    from tquest q
    where q.id = quest_id;
    
    -- language depended fields
    select tr.name, tr.descr, tr.address 
    from tquest_tr tr
    where  tr.quest_id = quest_id and tr.lang = lang;
    
    select c.id, tr.name 
    from tcompany c inner join tcompany_tr tr on c.id = tr.company_id
    where deleted_flag is null or deleted_flag != 1 and tr.lang = lang;
    
    select t.*, tr.name, case when tx.quest_id is null then 0 else 1 end as selected  
    from ttag t inner join ttag_tr tr on t.id = tr.tag_id
    left join txquesttag tx on t.id = tx.tag_id
        and tx.quest_id = quest_id
    where tr.lang = lang;
    
    select t.id, tr.name 
    from tleague t inner join tleague_tr tr on t.id = tr.league_id
    where tr.lang = lang;
    
    select t.id, tr.name 
    from tcountry t inner join tcountry_tr tr on t.id = tr.country_id
    where tr.lang = lang;
    
    select t.id, tr.name 
    from tcity t inner join tcity_tr tr on t.id = tr.city_id
    where t.country_id = country_id and tr.lang = lang;
    
    select t.*, tr.name, case when tx.quest_id is null then 0 else 1 end as selected  
    from tstation t inner join tstation_tr tr on t.id = tr.station_id
    left join txqueststation tx on t.id = tx.station_id
        and tx.quest_id = quest_id
    where t.city_id = city_id and tr.lang = lang;
        
    select t.id, tr.name 
    from tcomplexity t inner join tcomplexity_tr tr on t.id = tr.complexity_id
    where tr.lang = lang;
END