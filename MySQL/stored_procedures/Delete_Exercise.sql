CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_Exercise`(
	IN userID INT,
	IN _name VARCHAR(45),
	IN sets INT,
	IN reps INT
)
BEGIN

	DELETE FROM userWorkouts WHERE user_id = userID AND exerciseName = _name AND exerciseSets = sets AND exerciseReps = reps;

END
