CREATE DEFINER=`root`@`localhost` PROCEDURE `Create_User`(
    IN firstname VARCHAR(20),
    IN lastname VARCHAR(20),
    IN username VARCHAR(20),
    IN _password VARCHAR(300)
)
BEGIN
    IF ( SELECT EXISTS (SELECT 1 FROM userInformation WHERE user_username = username) ) THEN
     
        SELECT 'The username you selected exists. Please choose another.';
     
    ELSE
     
        INSERT INTO userInformation
        (
            user_firstname,
            user_lastname,
            user_username,
            user_password
        )
        VALUES
        (
            firstname,
            lastname,
            username,
            _password
        );
     
    END IF;
END
