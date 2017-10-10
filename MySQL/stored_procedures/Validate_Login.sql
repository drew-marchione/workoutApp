CREATE DEFINER=`root`@`localhost` PROCEDURE `Validate_Login`(
	IN username VARCHAR(45)
)
BEGIN

	SELECT userInformation.user_id, userInformation.user_password
	FROM userInformation
	WHERE user_username = username;

END
