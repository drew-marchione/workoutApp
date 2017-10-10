CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Biceps`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
    IN videoLink VARCHAR(150),
    IN exercise_description MEDIUMTEXT,
    IN exercise_type VARCHAR(45)
    
)
BEGIN
    if ( SELECT EXISTS (SELECT 1 FROM biceps WHERE exercise_name = exerciseName AND exerciseID != biceps_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
    ELSE
		
		UPDATE biceps
		SET biceps.exerciseName = exercise_name, biceps.videoLink = videoLink, biceps.exerciseDescription = exercise_description, biceps.exerciseType = exercise_type
		WHERE biceps.biceps_id = exerciseID;
        
	END IF;

END
