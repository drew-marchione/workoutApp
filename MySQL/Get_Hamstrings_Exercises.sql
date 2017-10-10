CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Hamstrings_Exercises`()
BEGIN

	SELECT hamstrings.hamstrings_id, hamstrings.exerciseName, hamstrings.videoLink, hamstrings.exerciseDescription, hamstrings.exerciseType FROM hamstrings;

END
