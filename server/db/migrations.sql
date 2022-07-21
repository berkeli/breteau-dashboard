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
 
DROP TABLE IF EXISTS school;
-- Create School Table
-- Ensure 'person' database exist
CREATE TABLE school (
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(32000) NOT NULL,
   created_ById INT NOT NULL,
   created_At TIMESTAMP NOT NULL DEFAULT NOW(),
   FOREIGN KEY (created_ById)
                             REFERENCES person (id));

DROP TABLE IF EXISTS scheduletracker;
-- Create Schedule Tracker Table
-- Ensure 'person, schoolstat, initiative' databases exist
CREATE TABLE scheduletracker (
   id serial PRIMARY KEY,
   schoolId INT NOT NULL,
   duration INT NOT NULL,
   briefSummary VARCHAR(50) NOT NULL,
   numOfNewTeachers INT NOT NULL,
   numOfNewStudents INT NOT NULL,
   numOfExistingTeachers INT NOT NULL,
   numOfExistingStudents INT NOT NULL,
   totalNumTablets INT NOT NULL,
   supportCategory VARCHAR(50) NOT NULL,
   supportType VARCHAR(50) NOT NULL,
   programmeInitiativeId INT NOT NULL,
   grades VARCHAR(255) NOT NULL,
   languagesTaught VARCHAR(255) NOT NULL,
   created_ById INT NOT NULL,
   created_At TIMESTAMP NOT NULL DEFAULT NOW(),
   FOREIGN KEY (created_ById)
                             REFERENCES person (id),
   FOREIGN KEY (schoolId)
                             REFERENCES schoolstat (id),
   FOREIGN KEY (programmeInitiativeId)
                             REFERENCES initiative (id));

DROP TABLE IF EXISTS schoolstat CASCADE;
-- Create School Stat Table
-- Ensure 'person' database exist
CREATE TABLE schoolstat (
   id serial PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   location VARCHAR(50) NOT NULL,
   country VARCHAR(50) NOT NULL,
   responsibleId INT NOT NULL,
   status VARCHAR(50) NOT NULL,
   deploymentDate DATE NOT NULL,
   tabletType VARCHAR(50),
   numDoodleStudents INT,
   internetDetails VARCHAR(50),
   totalSchools INT,
   created_ById INT NOT NULL,
   created_At TIMESTAMP NOT NULL DEFAULT NOW(),
   FOREIGN KEY (created_ById)
                             REFERENCES person (id));

