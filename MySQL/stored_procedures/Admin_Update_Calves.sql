CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Calves`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
    	IN videoLink VARCHAR(150),
    	IN exercise_description MEDIUMTEXT,
    	IN exercise_type VARCHAR(45)
    
)
BEGIN
	if ( SELECT EXISTS (SELECT 1 FROM calves WHERE exercise_name = exerciseName AND exerciseID != calves_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
    	ELSE
		
		UPDATE calves
		SET calves.exerciseName = exercise_name, calves.videoLink = videoLink, calves.exerciseDescription = exercise_description, calves.exerciseType = exercise_type
		WHERE calves.calves_id = exerciseID;
        
	END IF;

END
