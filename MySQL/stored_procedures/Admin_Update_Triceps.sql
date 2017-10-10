CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Triceps`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN exercise_description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
    
)
BEGIN
	if ( SELECT EXISTS (SELECT 1 FROM triceps WHERE exercise_name = exerciseName AND exerciseID != triceps_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
	ELSE
		
		UPDATE triceps
		SET triceps.exerciseName = exercise_name, triceps.videoLink = videoLink, triceps.exerciseDescription = exercise_description, triceps.exerciseType = exercise_type
		WHERE triceps.triceps_id = exerciseID;
        
	END IF;

END
