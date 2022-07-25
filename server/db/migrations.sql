

CREATE TABLE IF NOT EXISTS person (
   id serial PRIMARY KEY,
   full_name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(), 
   auth0_id VARCHAR(255) UNIQUE NOT NULL,
);

CREATE TABLE IF NOT EXISTS initiative (
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(32000),
   category VARCHAR(255) NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedule (0
   id serial PRIMARY KEY,
   schoolId INT NOT NULL,
   initiativeId INT NOT NULL, 
   noOfNewStudents INT NOT NULL,
   noOfExistingStudents INT NOT NULL,
   noOfNewTeachers INT NOT NULL,
   noOfExistingTeachers INT NOT NULL,
   noOfTablets INT NOT NULL,
   grades VARCHAR(255) NOT NULL,
   languagesTaught VARCHAR(255) NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
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

