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

1) This is the "Create Record" interface.

<br />

![Screenshot](./images/createRecord.png)

<br />

2) If all fields are not filled in and the submit button is hit, the new exercise will not be created and a red notification banner will appear in the top right hand corner stating "Please Fill In All Fields!"

<br />

![Screenshot](./images/createFailed.png)

<br />

3) Another validation check occurs when the Admin tries to create an exercise twice. There already exists a chest exercise named "Flat Barbell Bench Press" in the database. When the Admin attempts to create the exercise a second time, a red notification banner will appear in the top right hand corner stating "Exercise Name Already Exists!"

<br />

![Screenshot](./images/createFailedName.png)

<br />

4) If all fields are filled in and the exercise name is different from those in the database, then the exercise is created successfully

<br />

![Screenshot](./images/createSuccessful.png)

<br />

5) On the side navbar click "Create Workout" --> "Upper Body" --> "Chest".  Scroll to the bottom and there is the new exercise we just created!

<br />

![Screenshot](./images/createRecordPanel.png)

# Reading a Record

1) This is the "Read Record" interface. Here you may select a muscle group and view the exercises that are associated with it.

<br />

![Screenshot](./images/readRecord.png)

<br />

2) When you have selected the muscle group, click "submit". This will render a list of all the exercise names that belong to the muscle group.

<br />

![Screenshot](./images/readRecordDropdown.png)

<br />

3) To view each exercise's properties, click on the icon to the right.  A modal will pop up displaying the properties. The fields are disabled as this is solely for viewing purposes.

<br />

![Screenshot](./images/readRecordModal.png)

# Updating a Record

1) This is the "Update Record" interface. Here you can modify any existing exercise.

<br />

![Screenshot](./images/updateRecord.png)

<br />

2) When you have selected the muscle group, click "submit". This will render a list of all the exercise names that belong to the muscle group.

<br />

![Screenshot](./images/updateRecordDropdown.png)

<br />

3) To view each exercise's properties, click on the icon to the right. A modal will pop up displaying the properties. Here you can modify the exercise data. We will modify the "Flat Barbell Bench Press" exercise.

<br />

![Screenshot](./images/updateRecordModal.png)

<br />

4) We will test a few validation cases before showing a successful update. The first being a duplicate naming error. In this example we have selected "Flat Barbell Bench Press" which is the first chest workout. Here, we change its name to "Incline Barbell Bench Press" which happens to already exist as our second chest workout. When you hit the update button an error will be thrown as you cannot have two exercises named "Incline Barbell Bench Press".

<br />

![Screenshot](./images/updateRecordNameFail1.png)

<br />

5) As you can see, a red error notification appears in the top right corner. The exercise data is restored back to it's original name of "Flat Barbell Bench Press".

<br />

![Screenshot](./images/updateRecordNameFail2.png)

<br />

6) The next validation case we will test is entering a null value into a field. If we simply hit backspace and empty the value, the update will fail.

<br />

![Screenshot](./images/updateRecordEmptyFail1.png)

<br />

7) We can see the null value cause the fail here.

<br />

![Screenshot](./images/updateRecordEmptyFail2.png)

<br />

8) Now, to see a successful update in action, we will modify the exercise name of "Flat Barbell Bench Press". Notice how I added "(UPDATING TEXT!)" to the end of the exercise name. Click the "update" button.  

<br />

![Screenshot](./images/updateRecordModalText.png)

<br />

9) Upon a successful update a green success notification will appear in the top right corner. You can also see the updated name down below.

<br />

![Screenshot](./images/updateRecordSuccessful.png)

<br />

10) To check our updated exercise click "Create Workout" --> "Upper Body" --> "Chest". This is also what the exercise will now look like to the users who do not have Admin privileges.

<br />

![Screenshot](./images/updateRecordPanel.png)

# Deleting a Record

1) This is the "Delete Record" interface. Here you can delete an exercise from the database.

<br />

![Screenshot](./images/deleteRecord.png)

<br />

2) When you have selected the muscle group, click "submit". This will render a list of all the exercise names that belong to the muscle group.

<br />

![Screenshot](./images/deleteRecordDropdown.png)

<br />

3) To view each exercise's properties, click on the icon to the right. A modal will pop up displaying the properties. Here you can delete an exercise. Notice how we are deleting "Flat Barbell Bench Press(UPDATING TEXT!)" which is the first chest exercise in the list.

<br />

![Screenshot](./images/deleteRecordModal.png)

<br />

4) Click "delete" and watch the exercise disappear! Now our first chest exercise is "Incline Barbell Bench Press"

<br />

![Screenshot](./images/deleteRecordSuccessful.png)

<br />

5) Let's double check what it will look like for our users by clicking "Create Workout" --> "Upper Body" --> "Chest". Just like we thought, our first exercise is "Incline Barbell Bench Press" which means "Flat Barbell Bench Press(UPDATING TEXT!)" was deleted from the database successfully.

<br />

![Screenshot](./images/deleteRecordPanel.png)

# User Sign Up

Ok, so that wraps up the Admin's capabilities. Now let's focus on what the website looks like for an everyday user.

1) This is the sign up interface. If a user has already signed up they can click "Already have an account?" and the panel will flip over to a sign in form. For this tutorial we will assume the user is new to the website.

![Screenshot](./images/signUp.png)

<br />

2) Let's enter some credentials

<br />

![Screenshot](./images/signUpJohnSmith.png)

<br />

3) As long as the username doesn't exist, the user will be signed up successfully.  If the username exists, an error will be thrown and it will look like this:

<br />

![Screenshot](./images/signUpJohnSmithUnsuccessful.png)

<br>

4) Assuming the username jsmith@gmail.com hasn't been used yet, the user is created successfully. The first thing to notice is that the sidebar menu does not have the Admin dropdown tab. Using Aurelia's data-binding, whenever the username is anything other than "Admin", the Admin dropdown tab is hidden.  

<br />

![Screenshot](./images/johnSmithLandingPage.png)

<br />

5) Click on the "UserPage" link at the top of the website. Here is John Smith's own personalized workout page. Right now it is empty, but by clicking on the "Create Workout" tab, John Smith can customize and add exercises to his UserPage.

<br />

![Screenshot](./images/johnSmithWorkoutPage.png)

<br />

6) You can select a muscle group and scroll through the exercises associated with it.

<br />

![Screenshot](./images/chestWorkouts.png)

<br/>

7) Once you find an exercise you want to add to your workout click "customize". A modal will pop up which allows you to enter a custom number of sets and reps for the exercise.

<br />

![Screenshot](./images/chestWorkoutModal.png)

<br />

8) If you try to enter a null value into the fields then the exercise add will be unsuccessful.

<br />

![Screenshot](./images/chestWorkoutModalEmpty.png)

<br />

9) A red error notification will alert you in the top right corner of the screen.

<br />

![Screenshot](./images/chestWorkoutModalUnsuccessful.png)

<br />

10) Assuming the fields are filled in and not null, the exercise will successfully be added to your workout!

<br />

![Screenshot](./images/chestWorkoutModalFilledIn.png)

<br />

11) A green success notification will alert you in the top right corner of the screen.

<br />

![Screenshot](./images/chestWorkoutModalSuccessful.png)

<br />

12) Now, let's click on the "UserPage" tab at the top of the website. We can see John Smith's workout page is populated with the "Flat Barbell Bench Press" exercise with 3 sets and 8 reps. It worked!

<br />

![Screenshot](./images/johnSmithWorkoutPageUpdated.png)

<br />

13) Feel free to use the sidebar to customize other exercises to add to your workout as well!

<br />

![Screenshot](./images/johnSmithWorkoutPageUpdated2.png)

<br />

14) At any point you can quickly delete an exercise from your workout page as well.

<br />

![Screenshot](./images/johnSmithWorkoutPageDelete.png)

<br />

15) Last thing is the logout method. At any time a user wants to logout they must simply press the "Logout" tab at the top of the website. They will be redirected to the sign in page.

<br />

![Screenshot](./images/johnSmithSuccessfulLogout.png)

<br />

16) When Logging back in, each user's credentials are saved, so your "UserPage" will have the exercises you added last time you were logged in.

    That's a Wrap!

<br />
