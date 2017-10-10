CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Quads_Exercises`()
BEGIN

	SELECT quads.quads_id, quads.exerciseName, quads.videoLink, quads.exerciseDescription, quads.exerciseType FROM quads;

END
