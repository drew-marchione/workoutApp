CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Glutes_Exercises`()
BEGIN

	SELECT glutes.glutes_id, glutes.exerciseName, glutes.videoLink, glutes.exerciseDescription, glutes.exerciseType FROM glutes;

END
