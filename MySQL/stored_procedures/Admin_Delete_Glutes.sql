CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Glutes`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM glutes WHERE glutes.glutes_id = id AND glutes.exerciseName = _name AND glutes.videoLink = videoLink AND glutes.exerciseDescription = description AND glutes.exerciseType = exercise_type;

END
