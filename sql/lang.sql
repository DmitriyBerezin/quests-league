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