DROP TABLE IF EXISTS initiative;
-- Create Initiative Table
CREATE TABLE initiative (
   id serial PRIMARY KEY,
   name VARCHAR(50) UNIQUE NOT NULL,
   category VARCHAR(50) NOT NULL,
   description VARCHAR(255) NOT NULL,
   createdById INT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
   updatedById INT NOT NULL,
   updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Mock Data

INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('ODS','Computer Software: Programming, Data Processing',
                                    'Integer ac leo.',
                                    13,13);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('GSD','Major Banks',
                                    'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                                    15,15);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Kaizen Blitz','Major Pharmaceuticals',
                                    'Integer a nibh.',
                                    18,18);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('RMDS','Apparel',
                                    'Fusce posuere felis sed lacus.',
                                    2,2);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('LyX','Semiconductors',
                                    'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                                    2,2);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('MCAD','Marine Transportation',
                                    'Aenean auctor gravida sem.',
                                    4,4);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('LPR','Specialty Chemicals',
                                    'Praesent id massa id nisl venenatis lacinia.',
                                    7,7);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('DFD','Climate Change',
                                    'Aliquam erat volutpat.',
                                    14,14);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('TBB','Biotechnology: Biological Products (No Diagnostic ',
                                    'Aliquam erat volutpat.',
                                    1,1);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('HP QTP','Computer Software: Programming, Data Processing',
                                    'Sed accumsan felis.',
                                    1,1);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('First Year Experience','Positive Feedback',
                                    'In hac habitasse platea dictumst.',
                                    19,19);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Lawson HRIS','Soft Skills',
                                    'Fusce consequat.',
                                    4,4);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('NRSWA','Professional Services',
                                    'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
                                    17,17);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('HACCP','Good Health',
                                    'Duis aliquam convallis nunc.',
                                    1,1);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('ICT','Semiconductors',
                                    'Quisque porta volutpat erat.',
                                    11,11);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Django','Oil Refining/Marketing',
                                    'Morbi non quam nec dui luctus rutrum.',
                                    13,13);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Teaching','Electronic Components',
                                    'Nulla ac enim.',
                                    2,2);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('ISO 14971','Other Specialty Stores',
                                    'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
                                    14,14);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('BCNE','Nutrition',
                                    'Maecenas ut massa quis augue luctus tincidunt.',
                                    8,8);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('JCreator','Semiconductors',
                                    'In hac habitasse platea dictumst.',
                                    8,8);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Sustainability','History',
                                    'In hac habitasse platea dictumst.',
                                    20,20);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Spring Framework','Finance: Consumer Services',
                                    'Aliquam quis turpis eget elit sodales scelerisque.',
                                    2,2);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('DBC','Oil & Gas Production',
                                    'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
                                    19,19);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('IKEv2','Television Services',
                                    'Aliquam non mauris.',
                                    18,18);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('RTL Coding','Coding and Development',
                                    'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
                                    12,12);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('PTT','Business Services',
                                    'Cras in purus eu magna vulputate luctus.',
                                    2,2);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('Uranium','Medical/Dental Instruments',
                                    'Integer ac neque.',
                                    13,13);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('VSX','Maths',
                                    'Integer ac neque.',
                                    11,11);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('ISO 27001','Maths',
                                    'Nulla ut erat id mauris vulputate elementum.',
                                    14,14);
INSERT INTO initiative (name, category, description, 
                            createdById, updatedById) 
                            VALUES ('NCDA','Real Estate Investment Trusts',
                                    'Nullam sit amet turpis elementum ligula vehicula consequat.',
                                    1,1);
