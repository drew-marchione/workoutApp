CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Chest`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
    IN videoLink VARCHAR(150),
    IN exercise_description MEDIUMTEXT,
    IN exercise_type VARCHAR(45)
    
)
BEGIN
    if ( SELECT EXISTS (SELECT 1 FROM chest WHERE exercise_name = exerciseName AND exerciseID != chest_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
    ELSE
		
		UPDATE chest
		SET chest.exerciseName = exercise_name, chest.videoLink = videoLink, chest.exerciseDescription = exercise_description, chest.exerciseType = exercise_type
		WHERE chest.chest_id = exerciseID;
        
	END IF;

END
