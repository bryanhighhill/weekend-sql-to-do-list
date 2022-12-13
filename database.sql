-- my create table SQL queries
CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(100) not null,
	"complete" varchar(10) not null
);