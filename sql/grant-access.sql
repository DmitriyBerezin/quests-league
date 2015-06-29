CREATE USER 'moderator' IDENTIFIED BY 'questmod';

grant execute on procedure pCompanyCreate to 'moderator';
grant execute on procedure pTagCreate to 'moderator';
grant execute on procedure pQuestGet to 'moderator';
grant execute on procedure pQuestList to 'moderator';
grant execute on procedure pStationCreate to 'moderator';