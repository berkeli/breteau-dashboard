DROP TABLE IF EXISTS Programme;
-- Create Programme Table
CREATE TABLE programme (
   id serial PRIMARY KEY,
   name VARCHAR(50) UNIQUE NOT NULL,
   schoolSurveyId INT NOT NULL,
   createdById INT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
   updatedById INT NOT NULL,
   updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
   FOREIGN KEY (schoolSurveyId)
                             REFERENCES schoolsurveys (id));

-- Mock Data - ensure 'schoolsurveys' database exist

INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('JBoss Seam',
                                     6, 15, 15);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('UCaaS',
                                     8, 14, 14);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Ion Channels',
                                     3, 10, 10);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Vocal',
                                     11, 16, 16);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Process Efficiency',
                                     5, 6, 6);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('TSM Administration',
                                     15, 4, 4);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Kindergarten',
                                     15, 12, 12);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Jigsaw',
                                     16, 5, 5);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('LSI',
                                     6, 16, 16);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('MRSA',
                                     11, 10, 10);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Thin Films',
                                     18, 5, 5);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Regulatory Affairs',
                                     7, 20, 20);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Nitrous Oxide',
                                     19, 11, 11);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('IASO',
                                     12, 18, 18);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Turkish',
                                     10, 12, 12);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Music Publishing',
                                     9, 18, 18);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Agile &amp; Waterfall Methodologies',
                                     8, 13, 13);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('RPD',
                                     5, 2, 2);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Finance',
                                     11, 2, 2);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('MP3',
                                     11, 9, 9);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Play Therapy',
                                     15, 1, 1);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Tunneling',
                                     13, 5, 5);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('MPE',
                                     7, 15, 15);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Move Up Buyers',
                                     15, 12, 12);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('GT-Power',
                                     12, 6, 6);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Verilog',
                                     18, 6, 6);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Upholstery',
                                     14, 17, 17);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('PMA',
                                     15, 19, 19);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('Online Advertising',
                                     14, 16, 16);
INSERT INTO programme (name, schoolSurveyId, 
                                      createdById, updatedById) 
                            VALUES ('GNU',
                                     14, 2, 2);
