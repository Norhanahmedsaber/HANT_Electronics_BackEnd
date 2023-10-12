 1-CREATE TABLE roles (roleid serial PRIMARY KEY , rolename VARCHAR );

 2-CREATE TABLE users (userid serial PRIMARY KEY , roleid INT, email VARCHAR(255),
   username VARCHAR , password VARCHAR , FOREIGN KEY(roleid) REFERENCES roles (roleid));

 3-CREATE TABLE categories ( ID SERIAL PRIMARY KEY , name VARCHAR(30));

 4-CREATE TABLE stores(id serial primary key,name varchar(255),
   website VARCHAR(255),location varchar(255),img_url varchar(255));

 5-CREATE TABLE phones(id serial primary key ,number varchar(255),
   store_id int NULL references stores(id),
   delivery_id INT NULL REFERENCES delivery(id),
   staff_id int NULL REFERENCES staff(id));

 6-CREATE TABLE components (id SERIAL PRIMARY KEY, name VARCHAR(50),
   description VARCHAR(255), datasheet_url VARCHAR(255),
   image_url VARCHAR(255), catId int REFERENCES categories(id));

 7-CREATE TABLE lists (id SERIAL PRIMARY KEY, name VARCHAR(50),
   note VARCHAR(255), circuit VARCHAR(1));

 8-CREATE TABLE users_lists (id SERIAL PRIMARY KEY, fav VARCHAR(1) default 'N',
   name VARCHAR(50), note VARCHAR(255),
   user_id INT REFERENCES users(userid),
   list_id INT NULL REFERENCES lists(id));

 9-CREATE TABLE items (id SERIAL PRIMARY KEY, quantity INT,
   name VARCHAR(255),user_list_id INT REFERENCES users_lists(id),
   component_id INT REFERENCES components(id));

10-CREATE TABLE delivery (id SERIAL PRIMARY KEY, name VARCHAR(255),
   age INT, salary INT,status CHAR(1), store_id INT REFERENCES stores(id));


11-CREATE TABLE staff (id SERIAL PRIMARY KEY, name VARCHAR(255), 
   age INT, salary INT, store_id INT REFERENCES stores(id));



