use DB_TEST;
create table class_chats (
  id integer(5) primary key,
  username varchar(30),
  text  varchar(255),
  room varchar(20));
