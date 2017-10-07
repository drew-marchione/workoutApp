CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Create_Biceps`(
  IN exercise_name VARCHAR(45),
  IN exercise_video VARCHAR(150),
  IN exercise_description MEDIUMTEXT,
  IN exercise_type VARCHAR(45)
)
BEGIN
	  if ( SELECT EXISTS (SELECT 1 FROM biceps WHERE exercise_name = exerciseName) ) THEN
    
		  SELECT 'Workout Exists !!';
	
    ELSE
    
      INSERT INTO biceps
      (
        exerciseName,
        videoLink,
        exerciseDescription,
        exerciseType
      )
      values
      (
        exercise_name,
        exercise_video,
        exercise_description,
        exercise_type
      );
        
        END IF;
END
