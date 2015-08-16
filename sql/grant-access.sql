CREATE USER 'moderator' IDENTIFIED BY 'questmod';

grant execute on procedure pCompanyCreate to 'moderator';
grant execute on procedure pTagCreate to 'moderator';
grant execute on procedure pQuestGet to 'moderator';
grant execute on procedure pQuestEdit to 'moderator';
grant execute on procedure pQuestList to 'moderator';
grant execute on procedure pQuestDel to 'moderator';
grant execute on procedure pStationCreate to 'moderator';
grant execute on procedure pCountryCreate to 'moderator';
grant execute on procedure pCityCreate to 'moderator';
grant execute on procedure pCountryCities to 'moderator';
grant execute on procedure pCityStations to 'moderator';
grant execute on procedure pCommentApprove to 'moderator';
grant execute on procedure pCommentDel to 'moderator';
grant execute on procedure pCommentGet to 'moderator';
grant execute on procedure pCommentList to 'moderator';



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
grant execute on procedure pUserChangePassword to 'web';
grant execute on procedure pUserResetPassword to 'web';
grant execute on procedure pUserSetForgotPasswordToken to 'web';



update tquest q set q.top = 1 where id = 8;


insert into tcountry(name) value('Россия');
insert into tcity(name, coutry_id) value('Москва', 1);
update tcity set country_id = 1;
-- Выполняем перед fk constraint
update tquest set country_id = 1;
update tquest set city_id = 1;


update tquest q set q.top = 1 where id = 1;
update tquest q set q.top = 2 where id = 2;
update tquest q set q.top = 3 where id = 3;

update tquest q set q.top = 4 where id = 16;
update tquest q set q.top = 5 where id = 20;
update tquest q set q.top = 6 where id = 27;
update tquest q set q.top = 7 where id = 33;
update tquest q set q.top = 8 where id = 39;
update tquest q set q.top = 9 where id = 43;
update tquest q set q.top = 10 where id = 55;
update tquest q set q.top = 11 where id = 62;
update tquest q set q.top = 12 where id = 74;
update tquest q set q.top = 13 where id = 80;
update tquest q set q.top = 14 where id = 93;
update tquest q set q.top = 15 where id = 99;
update tquest q set q.top = 16 where id = 108;
update tquest q set q.top = 17 where id = 126;
update tquest q set q.top = 18 where id = 138;


insert into tcomplexity(name) values('Простой');
insert into tcomplexity(name) values('Средний');
insert into tcomplexity(name) values('Сложный');
insert into tcomplexity(name) values('Непроходимый');
