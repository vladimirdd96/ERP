BEGIN TRANSACTION;

CREATE TABLE profile
(
    id serial NOT NULL,
    firstname VARCHAR(255),
    profileid numeric,
    lastname VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    bornon Date,
    
    PRIMARY KEY (id)
);

COMMIT;