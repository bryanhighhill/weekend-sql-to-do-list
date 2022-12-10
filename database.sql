-- my create table SQL queries
CREATE TABLE "tasks" (
	"id" serial primary key, --varchar = max number of characters // not null = can't be blank
	"task" varchar(100) not null,
	"complete" varchar(10) not null
);