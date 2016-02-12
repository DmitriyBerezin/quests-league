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
END


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