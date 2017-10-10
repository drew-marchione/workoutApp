CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Shoulders`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN exercise_description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
    
)
BEGIN
	if ( SELECT EXISTS (SELECT 1 FROM shoulders WHERE exercise_name = exerciseName AND exerciseID != shoulders_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
	ELSE
		
		UPDATE shoulders
		SET shoulders.exerciseName = exercise_name, shoulders.videoLink = videoLink, shoulders.exerciseDescription = exercise_description, shoulders.exerciseType = exercise_type
		WHERE shoulders.shoulders_id = exerciseID;
        
	END IF;

END
