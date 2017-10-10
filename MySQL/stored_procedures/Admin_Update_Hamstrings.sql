CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Hamstrings`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN exercise_description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
)
BEGIN
	if ( SELECT EXISTS (SELECT 1 FROM hamstrings WHERE exercise_name = exerciseName AND exerciseID != hamstrings_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
    	ELSE
		
		UPDATE hamstrings
		SET hamstrings.exerciseName = exercise_name, hamstrings.videoLink = videoLink, hamstrings.exerciseDescription = exercise_description, hamstrings.exerciseType = exercise_type
		WHERE hamstrings.hamstrings_id = exerciseID;
        
	END IF;

END
