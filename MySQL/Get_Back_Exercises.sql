CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Back_Exercises`()
BEGIN

	SELECT back.back_id, back.exerciseName, back.videoLink, back.exerciseDescription, back.exerciseType FROM back;

END
