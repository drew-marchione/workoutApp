CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_User_Exercise`(
	IN userID INT,
	IN exercise_type VARCHAR(45),
	IN exercise_name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN exercise_description MEDIUMTEXT,
	IN exercise_sets INT,
	IN exercise_reps INT

)
BEGIN
    
	INSERT INTO userWorkouts
	(
		user_id,
		exerciseType,
		exerciseName,
		videoLink,
		exerciseDescription,
		exerciseSets,
		exerciseReps
	)
	values
	(
		userID,
		exercise_type,
		exercise_name,
		videoLink,
		exercise_description,
		exercise_sets,
		exercise_reps
	);
        
END
