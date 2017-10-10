CREATE DEFINER=`root`@`localhost` PROCEDURE `Return_User_Exercises`(
	IN userID INT(11)
)
BEGIN
	SELECT userWorkouts.exerciseType, userWorkouts.exerciseName, userWorkouts.videoLink, userWorkouts.exerciseDescription, userWorkouts.exerciseSets, userWorkouts.exerciseReps
	FROM userWorkouts
	WHERE user_id = userID;
END
