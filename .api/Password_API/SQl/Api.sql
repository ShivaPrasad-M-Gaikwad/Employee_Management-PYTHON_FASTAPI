create database College_api

use College_api

drop table employee_details

create table employee_details(id int identity(1,1) primary key, Names Varchar(50),job varchar(50), salary money);

insert into employee_details values ('Shivaprasad','Full stack WEB DEVELOPMENT',120000);

update employee_details set salary=120000 where id = 2

delete from employee_details where id = 2

select * from employee_details

