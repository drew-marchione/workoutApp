CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Update_Back`(
	IN exerciseID INT,
	IN exercise_name VARCHAR(45),
    IN videoLink VARCHAR(150),
    IN exercise_description MEDIUMTEXT,
    IN exercise_type VARCHAR(45)
)
BEGIN
    if ( SELECT EXISTS (SELECT 1 FROM back WHERE exercise_name = exerciseName AND exerciseID != back_id) ) THEN
    
		SELECT 'Workout Exists !!';
	
    ELSE
		
		UPDATE back
		SET back.exerciseName = exercise_name, back.videoLink = videoLink, back.exerciseDescription = exercise_description, back.exerciseType = exercise_type
		WHERE back.back_id = exerciseID;
        
	END IF;

END
