CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Delete_Biceps`(
  IN id INT,
  IN _name VARCHAR(45),
  IN videoLink VARCHAR(150),
  IN description MEDIUMTEXT,
  IN exercise_type VARCHAR(45)
)
BEGIN

	DELETE FROM biceps WHERE biceps.biceps_id = id AND biceps.exerciseName = _name AND biceps.videoLink = videoLink AND biceps.exerciseDescription = description AND biceps.exerciseType = exercise_type;

END
