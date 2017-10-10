CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Hamstrings`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM hamstrings WHERE hamstrings.hamstrings_id = id AND hamstrings.exerciseName = _name AND hamstrings.videoLink = videoLink AND hamstrings.exerciseDescription = description AND hamstrings.exerciseType = exercise_type;

END
