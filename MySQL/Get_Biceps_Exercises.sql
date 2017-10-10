CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Bicep_Exercises`()
BEGIN

	SELECT biceps.biceps_id, biceps.exerciseName, biceps.videoLink, biceps.exerciseDescription, biceps.exerciseType FROM biceps;

END
