CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Back`(
	IN id INT,
	IN _name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM back WHERE back.back_id = id AND back.exerciseName = _name AND back.videoLink = videoLink AND back.exerciseDescription = description AND back.exerciseType = exercise_type;

END
