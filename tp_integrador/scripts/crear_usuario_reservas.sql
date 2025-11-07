DROP USER IF EXISTS 'reservas'@'localhost';

CREATE USER 'reservas'@'localhost' IDENTIFIED BY 'reservas.25';

GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON reservas.* TO 'reservas'@'localhost';

FLUSH PRIVILEGES;