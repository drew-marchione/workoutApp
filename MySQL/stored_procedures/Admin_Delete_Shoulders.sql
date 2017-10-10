CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Shoulders`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM shoulders WHERE shoulders.shoulders_id = id AND shoulders.exerciseName = _name AND shoulders.videoLink = videoLink AND shoulders.exerciseDescription = description AND shoulders.exerciseType = exercise_type;

END
