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
grant execute on procedure pCommentApprove to 'moderator';
grant execute on procedure pCommentDel to 'moderator';
grant execute on procedure pCommentGet to 'moderator';



CREATE USER 'web' IDENTIFIED BY 'questweb';

grant execute on procedure pQuestGet1 to 'web';
grant execute on procedure pQuestGetIdBySefName to 'web';
grant execute on procedure pQuestSearch to 'web';
grant execute on procedure pUserCreate to 'web';
grant execute on procedure pUserGet to 'web';
grant execute on procedure pUserSetVerificationToken to 'web';
grant execute on procedure pUserVerify to 'web';
grant execute on procedure pCommentEdit to 'web';
grant execute on procedure pCommentDel to 'web';


insert into tcountry value('Россия');
update tcity set country_id = 1;
-- Выполняем перед fk constraint
update tquest set country_id = 1;
update tquest set city_id = 1;
