CREATE DEFINER=`root`@`localhost` PROCEDURE `Return_User_Info`(
	IN userID BIGINT(20)
)
BEGIN

	SELECT userInformation.user_id, userInformation.user_firstname, userInformation.user_lastname, userInformation.user_username from userInformation WHERE user_id = userID;

END
