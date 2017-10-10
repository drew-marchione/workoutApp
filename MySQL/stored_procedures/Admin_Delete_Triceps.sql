CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Triceps`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM triceps WHERE triceps.triceps_id = id AND triceps.exerciseName = _name AND triceps.videoLink = videoLink AND triceps.exerciseDescription = description AND triceps.exerciseType = exercise_type;

END
