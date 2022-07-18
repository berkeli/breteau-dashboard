DROP TABLE IF EXISTS users;
-- Create Users Table
CREATE TABLE users (
   id serial PRIMARY KEY,
   userName VARCHAR(50) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
   role VARCHAR(50) NOT NULL,
   createdById INT NOT NULL,
   createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
   updatedById INT NOT NULL,
   updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Mock Data - assume ID 1 created all

INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Sherilyn','slembcke0@mail.ru',
                                    'General User',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Griz','gmcinerney1@apache.org',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Allina','abarbary2@wunderground.com',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Rhonda','rdegiorgis3@delicious.com',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Biron','bwhytock4@uiuc.edu',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Hercule','hquigg5@vimeo.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Siouxie','sfanti6@360.cn',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Tessy','tmarriot7@noaa.gov',
                                    'General User',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Laura','lkeyes8@twitpic.com',
                                    'General User',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Adel','alintott9@imdb.com',
                                    'General User',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Bernadette','bpetticrowa@umich.edu',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Wat','wpilcherb@redcross.org',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Lambert','lmoloneyc@blogger.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Willetta','wrotteryd@ycombinator.com',
                                    'General User',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Free','fgrindrode@amazon.co.jp',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Farris','fyerrellf@t.co',
                                    'General User',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Melba','mhallardg@harvard.edu',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Zach','zmanonh@bigcartel.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Brandea','bdavydenkoi@naver.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Beckie','bviviansj@squidoo.com',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Thacher','tisleyk@nytimes.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Huntington','hhunstonel@live.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Conant','csleefordm@phoca.cz',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Gonzalo','gvinen@woothemes.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Angelita','asimmgeno@gnu.org',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Artie','ajacquemotp@senate.gov',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Candy','cwankaq@macromedia.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Kinsley','kbourgourdr@google.de',
                                    'Country Manager',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Merralee','mbutts@youku.com',
                                    'Super Admin',1,1);
INSERT INTO users (userName, email, role,
                                  createdById, updatedById) 
                           VALUES ('Janeczka','jbrookhouset@miibeian.gov.cn',
                                    'Super Admin',1,1);
