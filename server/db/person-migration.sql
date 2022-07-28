DROP TABLE IF EXISTS person;
-- Create Person Table
CREATE TABLE person (
   id serial PRIMARY KEY,
   email VARCHAR(50) UNIQUE NOT NULL,
   role VARCHAR(50) NOT NULL,
   country VARCHAR(50) NOT NULL,
   createdById INT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Mock Data - assume ID 1 created all

INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('lbebb0@stanford.edu', 'Brazil',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('bishak1@yellowpages.com', 'Uganda',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('kscamwell2@yale.edu', 'Russia',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('sjakeman3@youtube.com', 'Palestinian Territory',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('cwinfindale4@si.edu', 'Indonesia',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('rhargreaves5@jimdo.com', 'Aruba',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('cberrigan6@prlog.org', 'China',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('mferenc7@miitbeian.gov.cn', 'Kazakhstan',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('ballum8@mozilla.com', 'Indonesia',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('gfleay9@salon.com', 'Ukraine',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('hjindraka@wordpress.com', 'Comoros',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('omussardb@uiuc.edu', 'Cyprus',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('eblazekc@de.vu', 'China',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('mpiccardd@networksolutions.com', 'Belarus',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('cmartye@nytimes.com', 'Iran',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('kmaultf@nytimes.com', 'France',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('cbeamentg@posterous.com', 'Macedonia',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('rstonardh@blogger.com', 'China',
                                    'Country Manager',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('cstabbinsi@sfgate.com', 'Latvia',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('mashfoldj@latimes.com', 'Philippines',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('hofairyk@tuttocitta.it', 'China',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('ecranl@moonfruit.com', 'France',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('cramplingm@nsw.gov.au', 'Peru',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('ubodhamn@booking.com', 'Brazil',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('smcowiso@nasa.gov', 'France',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('gsergeantp@telegraph.co.uk', 'Albania',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('gdeiq@latimes.com', 'Netherlands',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('twankar@qq.com', 'Sudan',
                                    'Super Admin',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('awardhaughs@domainmarket.com', 'Tanzania',
                                    'General User',1);
INSERT INTO person (email, role, country,
                                  createdById) 
                           VALUES ('kbaldassit@hatena.ne.jp', 'Bulgaria',
                                    'General User',1);