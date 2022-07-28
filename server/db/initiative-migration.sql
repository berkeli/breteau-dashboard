DROP TABLE IF EXISTS initiative;
-- Create Initiative Table
CREATE TABLE initiative (
   id serial PRIMARY KEY,
   name VARCHAR(50) UNIQUE NOT NULL,
   category VARCHAR(50) NOT NULL,
   description VARCHAR(255) NOT NULL,
   createdById INT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Mock Data

INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('ODS','Computer Software: Programming, Data Processing',
                                    'Integer ac leo.',
                                    19);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('GSD','Major Banks',
                                    'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                                    4);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Kaizen Blitz','Major Pharmaceuticals',
                                    'Integer a nibh.',
                                    9);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('RMDS','Apparel',
                                    'Fusce posuere felis sed lacus.',
                                    7);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('LyX','Semiconductors',
                                    'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
                                    6);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('MCAD','Marine Transportation',
                                    'Aenean auctor gravida sem.',
                                    9);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('LPR','Specialty Chemicals',
                                    'Praesent id massa id nisl venenatis lacinia.',
                                    12);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('DFD','Climate Change',
                                    'Aliquam erat volutpat.',
                                    17);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('TBB','Biotechnology: Biological Products (No Diagnostic ',
                                    'Aliquam erat volutpat.',
                                    16);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('HP QTP','Computer Software: Programming, Data Processing',
                                    'Sed accumsan felis.',
                                    15);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('First Year Experience','Positive Feedback',
                                    'In hac habitasse platea dictumst.',
                                    20);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Lawson HRIS','Soft Skills',
                                    'Fusce consequat.',
                                    2);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('NRSWA','Professional Services',
                                    'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
                                    11);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('HACCP','Good Health',
                                    'Duis aliquam convallis nunc.',
                                    12);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('ICT','Semiconductors',
                                    'Quisque porta volutpat erat.',
                                    17);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Django','Oil Refining/Marketing',
                                    'Morbi non quam nec dui luctus rutrum.',
                                    19);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Teaching','Electronic Components',
                                    'Nulla ac enim.',
                                    6);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('ISO 14971','Other Specialty Stores',
                                    'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
                                    10);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('BCNE','Nutrition',
                                    'Maecenas ut massa quis augue luctus tincidunt.',
                                    17);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('JCreator','Semiconductors',
                                    'In hac habitasse platea dictumst.',
                                    19);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Sustainability','History',
                                    'In hac habitasse platea dictumst.',
                                    20);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Spring Framework','Finance: Consumer Services',
                                    'Aliquam quis turpis eget elit sodales scelerisque.',
                                    20);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('DBC','Oil & Gas Production',
                                    'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
                                    9);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('IKEv2','Television Services',
                                    'Aliquam non mauris.',
                                    15);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('RTL Coding','Coding and Development',
                                    'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
                                    9);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('PTT','Business Services',
                                    'Cras in purus eu magna vulputate luctus.',
                                    19);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('Uranium','Medical/Dental Instruments',
                                    'Integer ac neque.',
                                    12);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('VSX','Maths',
                                    'Integer ac neque.',
                                    3);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('ISO 27001','Maths',
                                    'Nulla ut erat id mauris vulputate elementum.',
                                    8);
INSERT INTO initiative (name, category, description, 
                            createdById) 
                            VALUES ('NCDA','Real Estate Investment Trusts',
                                    'Nullam sit amet turpis elementum ligula vehicula consequat.',
                                    1);