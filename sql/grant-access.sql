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

insert into tcountry value('Россия');
update tcity set country_id = 1;
-- Выполняем перед fk constraint
update tquest set country_id = 1;
update tquest set city_id = 1;
