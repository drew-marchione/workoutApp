CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Quads`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
	IN videoLink VARCHAR(150),
	IN exercise_description MEDIUMTEXT,
	IN exercise_type VARCHAR(45)
    
)
BEGIN
	if ( SELECT EXISTS (SELECT 1 FROM quads WHERE exercise_name = exerciseName AND exerciseID != quads_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
	ELSE
		
		UPDATE quads
		SET quads.exerciseName = exercise_name, quads.videoLink = videoLink, quads.exerciseDescription = exercise_description, quads.exerciseType = exercise_type
		WHERE quads.quads_id = exerciseID;
        
	END IF;

END
