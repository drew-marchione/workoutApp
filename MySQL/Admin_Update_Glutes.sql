CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Glutes`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN exercise_description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
    
)
BEGIN
	if ( SELECT EXISTS (SELECT 1 FROM glutes WHERE exercise_name = exerciseName AND exerciseID != glutes_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
	ELSE
		
		UPDATE glutes
		SET glutes.exerciseName = exercise_name, glutes.videoLink = videoLink, glutes.exerciseDescription = exercise_description, glutes.exerciseType = exercise_type
		WHERE glutes.glutes_id = exerciseID;
        
	END IF;
END
