CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Chest_Exercises`()
BEGIN

	SELECT chest.chest_id, chest.exerciseName, chest.videoLink, chest.exerciseDescription, chest.exerciseType FROM chest;

END
