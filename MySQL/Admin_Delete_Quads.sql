CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Quads`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM quads WHERE quads.quads_id = id AND quads.exerciseName = _name AND quads.videoLink = videoLink AND quads.exerciseDescription = description AND quads.exerciseType = exercise_type;

END
