CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Triceps_Exercises`()
BEGIN

	SELECT triceps.triceps_id, triceps.exerciseName, triceps.videoLink, triceps.exerciseDescription, triceps.exerciseType FROM triceps;

END
