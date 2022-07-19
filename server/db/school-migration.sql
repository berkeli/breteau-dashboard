DROP TABLE IF EXISTS school;
-- Create School Table
-- Assume Person '1' did all the entries
CREATE TABLE school (
   id serial PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description VARCHAR(32000) NOT NULL,
   created_ById INT NOT NULL,
   created_At TIMESTAMP NOT NULL DEFAULT NOW(),
   FOREIGN KEY (created_ById)
                             REFERENCES person (id));

-- Mock Data - ensure 'person' database exist

INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kertzmann and Sons', 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Aufderhar LLC', 'Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Gulgowski, Morissette and Pagac', 'In quis justo.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kuhn, Rempel and Kihn', 'Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Romaguera, Bogisich and Walsh', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Russel-Ernser', 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Abbott and Sons', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('McGlynn, Davis and Stokes', 'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Leffler Inc', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Koelpin, Wintheiser and Kerluke', 'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Schowalter, Towne and Wiza', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Feeney, Schneider and Braun', 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kunde-Hamill', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Larson, Romaguera and Hauck', 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kunze, Auer and Toy', 'Vivamus vestibulum sagittis sapien.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Pouros, Collier and Medhurst', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kulas-Haag', 'Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kunze-Bruen', 'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Breitenberg Group', 'Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Heidenreich-Orn', 'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Ruecker, OConner and Ernser', 'Aliquam quis turpis eget elit sodales scelerisque.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Gerhold, Will and Stoltenberg', 'Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Blick Inc', 'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Baumbach Inc', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Hagenes Inc', 'Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Corkery-Dickinson', 'Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Kautzer-MacGyver', 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Harber, Stokes and Harber', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Stark-Bergnaum', 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Block, Buckridge and Kling', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Collins, Legros and Kub', 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Mayer, Crist and Schneider', 'Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Ratke-Gibson', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Weimann, Fay and DAmore', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Cruickshank-Goyette', 'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Champlin-DAmore', 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Gerhold, Reilly and Considine', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Goldner LLC', 'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('McDermott and Sons', 'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Batz Inc', 'In hac habitasse platea dictumst.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Heathcote-Leffler', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Hoeger, Schiller and Sipes', 'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Hane-Zulauf', 'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Parisian, Terry and Buckridge', 'Morbi non quam nec dui luctus rutrum. Nulla tellus.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Breitenberg-Hansen', 'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Medhurst Inc', 'Suspendisse accumsan tortor quis turpis.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Padberg-Kunze', 'Aliquam erat volutpat. In congue.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('OHara-Sporer', 'Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Swift-Bartell', 'Proin interdum mauris non ligula pellentesque ultrices.', 
                                  1);
INSERT INTO school (name, description,
                                  created_ById)
        VALUES ('Roberts and Sons', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 
                                  1);
