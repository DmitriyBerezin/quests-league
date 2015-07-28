CREATE USER 'moderator' IDENTIFIED BY 'questmod';

grant execute on procedure pCompanyCreate to 'moderator';
grant execute on procedure pTagCreate to 'moderator';
grant execute on procedure pQuestGet to 'moderator';
grant execute on procedure pQuestEdit to 'moderator';
grant execute on procedure pQuestList to 'moderator';
grant execute on procedure pStationCreate to 'moderator';
grant execute on procedure pCountryCreate to 'moderator';
grant execute on procedure pCityCreate to 'moderator';
grant execute on procedure pCountryCities to 'moderator';


grant execute on procedure pQuestGet1 to 'moderator';
grant execute on procedure pQuestGetIdBySefName to 'moderator';

update tquest q set q.top = 1 where id = 8;


insert into tcountry(name) value('Россия');
insert into tcity(name, coutry_id) value('Москва', 1);
update tcity set country_id = 1;
-- Выполняем перед fk constraint
update tquest set country_id = 1;
update tquest set city_id = 1;
