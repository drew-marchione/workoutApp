CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Calves`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM calves WHERE calves.calves_id = id AND calves.exerciseName = _name AND calves.videoLink = videoLink AND calves.exerciseDescription = description AND calves.exerciseType = exercise_type;

END
