CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Chest`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM chest WHERE chest.chest_id = id AND chest.exerciseName = _name AND chest.videoLink = videoLink AND chest.exerciseDescription = description AND chest.exerciseType = exercise_type;

END
