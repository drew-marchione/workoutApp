# YouFit

<!-- <img src=https://github.com/drew-marchione/workoutApp/blob/master/images/signIn.png width="740" height="480"> -->

Welcome to Youfit! A simple web application that allows users to customize and create their own workouts!

My name is Drew and I built this application to demonstrate my ability to learn new technologies.

The application's tech stack is: HTML/CSS, Bootstrap, Ecmascript6, Aurelia, Python, Python Flask, SQL

A quick walkthrough of how the website flows is below with a more in-depth technical explanation coming soon.

## Signing Up as Admin

To sign up as Admin make sure the username = Admin. Of course for more security you can change the conditional in the code 



![Screenshot](./images/signUp.png)

![Screenshot](./images/signIn.png)

![Screenshot](./images/adminLandingPage.png)

# Creating a Record

As Admin, you are given access to the basic CRUD operations

This is the "Create Record" interface.

<br />

![Screenshot](./images/createRecord.png)

<br />

If all fields are not filled in and the submit button is hit, the new exercise will not be created and a red notification banner will appear in the top right hand corner stating "Please Fill In All Fields!"

<br />

![Screenshot](./images/createFailed.png)

<br />

Another validation check occurs when the Admin tries to create an exercise twice. There already exists a chest exercise named "Flat Barbell Bench Press" in the database. When the Admin attempts to create the exercise a second time, a red notification banner will appear in the top right hand corner stating "Exercise Name Already Exists!"

<br />

![Screenshot](./images/createFailedName.png)

<br />

 If all fields are filled in and the exercise name is different from those in the database, then the exercise is created successfully

<br />

![Screenshot](./images/createSuccessful.png)

<br />

On the side navbar click "Create Workout" --> "Upper Body" --> "Chest".  Scroll to the bottom and there is the new exercise we just created!

<br />

![Screenshot](./images/createRecordPanel.png)

# Reading a Record

This is the "Read Record" interface. Here you may select a muscle group and view the exercises that are associated with it.

<br />

![Screenshot](./images/readRecord.png)

<br />

When you have selected the muscle group, click "submit". This will render a list of all the exercise names that belong to the muscle group.

<br />

![Screenshot](./images/readRecordDropdown.png)

<br />

To view each exercise's properties, click on the icon to the right.  A modal will pop up displaying the properties. The fields are disabled as this is solely for viewing purposes.

<br />

![Screenshot](./images/readRecordModal.png)

# Updating a Record

This is the "Update Record" interface. Here you can modify any existing exercise.

<br />

![Screenshot](./images/updateRecord.png)

<br />

When you have selected the muscle group, click "submit". This will render a list of all the exercise names that belong to the muscle group.

<br />

![Screenshot](./images/updateRecordDropdown.png)

<br />

To view each exercise's properties, click on the icon to the right. A modal will pop up displaying the properties. Here you can modify the exercise data.

<br />

![Screenshot](./images/updateRecordModal.png)

<br />

To see an update in action, we will modify the exercise name of "Flat Barbell Bench Press". Notice how I added "(UPDATING TEXT!)" to the end of the exercise name. Click the "update" button.  

<br />

![Screenshot](./images/updateRecordModalText.png)

<br />

Upon a successful update a green success notification will appear in the top right corner. You can also see the updated name down below.

<br />

![Screenshot](./images/updateRecordSuccessful.png)

<br />

To check our updated exercise click "Create Workout" --> "Upper Body" --> "Chest". This is also what the exercise will now look like to the users who do not have Admin privileges.

<br />

![Screenshot](./images/updateRecordPanel.png)

<br />

Going back to the update modal we can test a few validation cases. The first being 

<br />

![Screenshot](./images/updateRecordNameFail1.png)

<br />



<br />

![Screenshot](./images/updateRecordNameFail2.png)

<br />



<br />

![Screenshot](./images/updateRecordEmptyFail1.png)

<br />



<br />

![Screenshot](./images/updateRecordEmptyFail2.png)

<br />



<br />

# Deleting a Record

This is the "Delete Record" interface. Here you can delete an exercise from the database.

<br />

![Screenshot](./images/deleteRecord.png)

<br />

When you have selected the muscle group, click "submit". This will render a list of all the exercise names that belong to the muscle group.

<br />

![Screenshot](./images/deleteRecordDropdown.png)

<br />

To view each exercise's properties, click on the icon to the right. A modal will pop up displaying the properties. Here you can delete an exercise. Notice how we are deleting "Flat Barbell Bench Press(UPDATING TEXT!)" which is the first chest exercise in the list.

<br />

![Screenshot](./images/deleteRecordModal.png)

<br />

Click "delete" and watch the exercise disappear! Now our first chest exercise is "Incline Barbell Bench Press"

<br />

![Screenshot](./images/deleteRecordSuccessful.png)

<br />

Let's double check what it will look like for our users by clicking "Create Workout" --> "Upper Body" --> "Chest". Just like we thought, our first exercise is "Incline Barbell Bench Press" which means "Flat Barbell Bench Press(UPDATING TEXT!)" was deleted from the database successfully.

<br />

![Screenshot](./images/deleteRecordPanel.png)

# User Sign In

Ok, so that wraps up the Admin's capabilities. Now let's focus on what the website looks like for an everyday user.

This is the sign up interface. If a user has already signed up they can click "Already have an account?" and the panel will flip over to a sign in form. For this tutorial we will assume the user is new to the website.

![Screenshot](./images/signUp.png)

<br />

Let's enter some credentials

<br />

![Screenshot](./images/signUpJohnSmith.png)

<br />

As long as the username doesn't exist, the user will be signed up successfully.  If the username exists, an error will be thrown and it will look like this:

<br />

![Screenshot](./images/signUpUnsuccessful.png)

<br>

Assuming the username jsmith@gmail.com hasn't been used yet, the user is created successfully.

<br />

![Screenshot](./images/johnSmithLandingPage.png)

<br />



<br />

![Screenshot](./images/johnSmithWorkoutPage.png)

<br />



<br />

![Screenshot](./images/chestWorkouts.png)

<br/>



<br />

![Screenshot](./images/chestWorkoutModal.png)

<br />



<br />

![Screenshot](./images/chestWorkoutModalFilledIn.png)

<br />



<br />

![Screenshot](./images/chestWorkoutModalSuccessful.png)

<br />



<br />

![Screenshot](./images/chestWorkoutModalEmpty.png)

<br />



<br />

![Screenshot](./images/chestWorkoutModalUnsuccessful.png)

<br />



<br />

![Screenshot](./images/johnSmithWorkoutPageUpdated.png)

<br />



<br />

![Screenshot](./images/johnSmithWorkoutPageUpdated2.png)

<br />



<br />

![Screenshot](./images/johnSmithSuccessfulLogout.png)

<br />



<br />
