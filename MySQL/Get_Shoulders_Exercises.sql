CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Shoulders_Exercises`()
BEGIN

	SELECT shoulders.shoulders_id, shoulders.exerciseName, shoulders.videoLink, shoulders.exerciseDescription, shoulders.exerciseType FROM shoulders;

END
