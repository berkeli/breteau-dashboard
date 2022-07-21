CREATE TABLE IF NOT EXISTS person (
   id serial PRIMARY KEY,
   full_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS initiative (
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(32000),
   category VARCHAR(255) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedule (
   id serial PRIMARY KEY,
   school_id INT NOT NULL,
   initiative_id INT NOT NULL, 
   no_of_new_students INT NOT NULL,
   no_of_existing_students INT NOT NULL,
   no_of_new_teachers INT NOT NULL,
   no_of_existing_teachers INT NOT NULL,
   no_of_tablets INT NOT NULL,
   grades VARCHAR(255) NOT NULL,
   languages_taught VARCHAR(255) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
     FOREIGN KEY (school_id)
      REFERENCES school (id),
   FOREIGN KEY (initiative_id)
      REFERENCES initiative (id)
   
);

CREATE TABLE IF NOT EXISTS school (
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(32000),
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

