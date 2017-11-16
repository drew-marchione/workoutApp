from flask import Flask, render_template, json, request, session, redirect, Response
from flask_cors import CORS, cross_origin
from flask.ext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash
app = Flask(__name__)
cors = CORS(app)

app.secret_key = 'why would I tell you my secret key?'

mysql = MySQL()

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password' # Whatever your SQL password is
app.config['MYSQL_DATABASE_DB'] = 'MuscleGroups'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)

@app.route('/api/userSignUp', methods=['Post'])
def userSignUp():
    try:
        print "Backend: Signing the user up"

        print "UserInfo: ", request.json
        data = request.json
        print data.get('firstname')

        firstname = data.get('firstname')
        lastname = data.get('lastname')
        username = data.get('username')
        password = data.get('password')
        print username

        hashedPassword = generate_password_hash(password)

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Create_User', (firstname, lastname, username, hashedPassword))
        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            print("Successful Sign Up. New User Created. Status Code:", resp)
            con.commit()
            return resp
        else:
            resp = Response(status=400, mimetype='application/json')
            print("Unsuccessful Sign Up. Username Already Exists. Status Code: ", resp)
            return resp

    except Exception as e:
        resp = Response(status=500, mimetype='application/json')
        print("Unsuccessful Sign Up. Failed SQL Connection Or Something Else In Function. Status Code: ", resp)
        return resp

@app.route('/api/userLogin', methods=['POST'])
def validateLogin():
    try:
        print "User Login Route Hit"
        data = request.json
        print data.get('username')
        username = data.get('username')
        password = data.get('password')
        print username
        print data

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Validate_Login', (username,))
        data = cursor.fetchall()

        if len(data) > 0:
            if check_password_hash(str(data[0][1]), password):
                session['user'] = data[0][0]
                data = {
                    'userID' : session['user']
                }
                js = json.dumps(data)
                resp = Response(js, status=200, mimetype='application/json')
                return resp
            else:
                resp = Response(status=400, mimetype='application/json')
                return resp
        else:
            resp = Response(status=400, mimetype='application/json')
            return resp

    except Exception as e:
        status = json.dumps(str(e))
        resp = Response(status, status=401, mimetype='application/json')

        return resp

    finally:

        cursor.close()

        con.close()

@app.route('/api/userLoginInformationReturned', methods=['GET'])
def loginInformationReturned():
    userID = request.args.get('userID')
    print userID
    a = type(userID)
    print a

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Return_User_Info', (userID)) # might need comma at the end

    userCredentials = cursor.fetchall()
    print userCredentials

    for credentials in userCredentials:
        userInfo = {
            'user_id': credentials[0],
            'user_firstname': credentials[1],
            'user_lastname': credentials[2],
            'user_username': credentials[3]
            }

    print "userInfo", userInfo

    return json.dumps(userInfo)

@app.route('/api/userExercisesReturned', methods=['GET'])
def userExercisesReturned():
    try:
        userID = request.args.get('userID')
        print ("Printing exercises of user: ", userID)

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Return_User_Exercises', (userID)) # might need comma at the end

        userExercises = cursor.fetchall()
        print userExercises

        returnedExercises = []

        for exercise in userExercises:
            exerciseInfo = {
                'exerciseType': exercise[0],
                'exerciseName': exercise[1],
                'videoLink': exercise[2],
                'exerciseDescription': exercise[3],
                'exerciseSets': exercise[4],
                'exerciseReps': exercise[5]
            }
            returnedExercises.append(exerciseInfo)

        print("returnedExercises", json.dumps(returnedExercises))

        return json.dumps(returnedExercises)

    except Exception as e:
        status = json.dumps(str(e))
        resp = Response(status, status=401, mimetype='application/json')

        return resp

@app.route('/api/getChest', methods=['GET'])
def getChest():
    print "/getChest route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Chest_Exercises')
    chestExercises = cursor.fetchall()

    all_exercises = []
    for exercise in chestExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedChestWorkout', methods=['POST'])
def userSelectedChestWorkout():
    try:
        print("add user chest exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Chest Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getShoulders', methods=['GET'])
def getShoulders():
    print "/getShoulders route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Shoulders_Exercises')
    shouldersExercises = cursor.fetchall()

    all_exercises = []
    for exercise in shouldersExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedShouldersWorkout', methods=['POST'])
def userSelectedShouldersWorkout():
    try:
        print("add user shoulders exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Shoulders Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getBack', methods=['GET'])
def getBack():
    print "/getBack route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Back_Exercises')
    backExercises = cursor.fetchall()

    all_exercises = []
    for exercise in backExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedBackWorkout', methods=['POST'])
def userSelectedBackWorkout():
    try:
        print("add user back exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Back Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getTriceps', methods=['GET'])
def getTriceps():
    print "/getTriceps route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Triceps_Exercises')
    tricepsExercises = cursor.fetchall()

    all_exercises = []
    for exercise in tricepsExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedTricepsWorkout', methods=['POST'])
def userSelectedTricepsWorkout():
    try:
        print("add user triceps exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Triceps Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getBiceps', methods=['GET'])
def getBiceps():
    print "/getBiceps route hit"
    
    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Bicep_Exercises')
    bicepExercises = cursor.fetchall()

    all_exercises = []
    for exercise in bicepExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedBicepsWorkout', methods=['POST'])
def userSelectedBicepsWorkout():
    try:
        print("add user exercises: ", request.json)
        data = request.json
        print data.get('name')
        
        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Bicep Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getQuads', methods=['GET'])
def getQuads():
    print "/getQuads route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Quads_Exercises')
    quadsExercises = cursor.fetchall()

    all_exercises = []
    for exercise in quadsExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedQuadsWorkout', methods=['POST'])
def userSelectedQuadsWorkout():
    try:
        print("add user Quads exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Quads Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getHamstrings', methods=['GET'])
def getHamstrings():
    print "/getHamstrings route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Hamstrings_Exercises')
    hamstringsExercises = cursor.fetchall()

    all_exercises = []
    for exercise in hamstringsExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedHamstringsWorkout', methods=['POST'])
def userSelectedHamstringsWorkout():
    try:
        print("add user Hamstrings exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Hamstrings Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getGlutes', methods=['GET'])
def getGlutes():
    print "/getGlutes route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Glutes_Exercises')
    glutesExercises = cursor.fetchall()

    all_exercises = []
    for exercise in glutesExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedGlutesWorkout', methods=['POST'])
def userSelectedGlutesWorkout():
    try:
        print("add user glutes exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Glutes Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/getCalves', methods=['GET'])
def getCalves():
    print "/getCalves route hit"

    con = mysql.connect()
    cursor = con.cursor()
    cursor.callproc('Get_Calves_Exercises')
    calvesExercises = cursor.fetchall()

    all_exercises = []
    for exercise in calvesExercises:
        exercise_data = {
            'id': exercise[0],
            'name': exercise[1],
            'videoLink': exercise[2],
            'description': exercise[3],
            'exerciseType': exercise[4]
        }
        all_exercises.append(exercise_data)

    return json.dumps(all_exercises)

@app.route('/api/userSelectedCalvesWorkout', methods=['POST'])
def userSelectedCalvesWorkout():
    try:
        print("add user calves exercises: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        exerciseType = data.get('exerciseType')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        description = data.get('description')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Add_User_Exercise', (userID, exerciseType, exerciseName, videoLink, description, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            resp = Response(status=200, mimetype='application/json')
            con.commit()
            print("Successfully Added Calves Exercise. Status Code:", resp)
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        print("This is a general error. It could be failed connection to database, request.json() error, or most likely null values causing SQL stored procedure to fail.")
        print("Status Code: ", resp)
        return resp

@app.route('/api/deleteExercise', methods=['POST'])
def deleteExercise():
    try:
        print("delete selected exercise: ", request.json)
        data = request.json
        print data.get('name')

        userID = data.get('userID')
        name = data.get('name')
        sets = data.get('sets')
        reps = data.get('reps')

        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('Delete_Exercise', (userID, name, sets, reps))

        data = cursor.fetchall()

        if len(data) is 0:
            print("data is zero got hit")
            con.commit()
            resp = Response(status=200, mimetype='application/json')
            return resp
        else:
            resp = Response(status=400, mimetype='application/json')
            return resp

    except Exception as e:
        resp = Response(status=400, mimetype='application/json')
        return resp
    
    finally:

        cursor.close()
        con.close()

@app.route('/api/createRecord', methods=['POST'])
def createRecord():
    try:
        print("Add New Exercise:", request.json)
        data = request.json
        print("name:", data.get('name'))
        print data.get('name')

        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        exerciseDescription = data.get('description')
        exerciseType = data.get('exerciseType')
        print "Testing Values: "
        print exerciseName
        print exerciseType
        print exerciseDescription
        print videoLink

        con = mysql.connect()
        cursor = con.cursor()

        if exerciseName == "" or exerciseDescription == "" or exerciseType == "" or videoLink == "":
            resp = Response(status=400, mimetype='application/json')
            print("Error. Please Fill In All Fields! ", resp)
            return resp
        else:
            if exerciseType == "Chest":
                print "chest Worked!"
                cursor.callproc('Admin_Create_Chest', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Shoulders":
                print "shoulders Worked!"
                cursor.callproc('Admin_Create_Shoulders', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Back":
                print "back Worked!"
                cursor.callproc('Admin_Create_Back', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Triceps":
                print "triceps Worked!"
                cursor.callproc('Admin_Create_Triceps', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Biceps":
                print "biceps Worked!"
                cursor.callproc('Admin_Create_Biceps', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Quads":
                print "quads Worked!"
                cursor.callproc('Admin_Create_Quads', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Hamstrings":
                print "hamstrings Worked!"
                cursor.callproc('Admin_Create_Hamstrings', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Glutes":
                print "glutes Worked!"
                cursor.callproc('Admin_Create_Glutes', (exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Calves":
                print "calves Worked!"
                cursor.callproc('Admin_Create_Calves', (exerciseName, videoLink, exerciseDescription, exerciseType))

            data = cursor.fetchall()

            if len(data) is 0:
                resp = Response(status=200, mimetype='application/json')
                print("Successfully Added Exercise: ", resp)
                con.commit()
                return resp
            else:
                resp = Response(status=409, mimetype='application/json')
                print("Exercise Name Already Exists!", resp)
                return resp

    except Exception as e:
        resp = Response(status=500, mimetype='application/json')
        print("Unsuccessful. Failed SQL Connection Or Something Else In Function. Status Code: ", resp)
        return resp

@app.route('/api/updateRecord', methods=['POST'])
def updateRecord():
    try:
        print("update selected exercise: ", request.json)
        data = request.json
        print data.get('name')

        exerciseID = data.get('id')
        exerciseName = data.get('name')
        videoLink = data.get('videoLink')
        exerciseDescription = data.get('description')
        exerciseType = data.get('exerciseType')

        con = mysql.connect()
        cursor = con.cursor()

        if exerciseName == "" or exerciseDescription == "" or exerciseType == "" or videoLink == "":
            resp = Response(status=400, mimetype='application/json')
            print("Error. Please Fill In All Fields! ", resp)
            return resp
        else:
            if exerciseType == "Chest":
                print "chest workout updated!"
                cursor.callproc('Admin_Update_Chest', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Shoulders":
                print "shoulders workout updated!"
                cursor.callproc('Admin_Update_Shoulders', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Back":
                print "back workout updated!"
                cursor.callproc('Admin_Update_Back', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Triceps":
                print "triceps workout updated!"
                cursor.callproc('Admin_Update_Triceps', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Biceps":
                print "biceps workout updated!"
                cursor.callproc('Admin_Update_Biceps', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Quads":
                print "quads workout updated!"
                cursor.callproc('Admin_Update_Quads', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Hamstrings":
                print "hamstrings workout updated!"
                cursor.callproc('Admin_Update_Hamstrings', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Glutes":
                print "glutes workout updated!"
                cursor.callproc('Admin_Update_Glutes', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))
            elif exerciseType == "Calves":
                print "calves workout updated!"
                cursor.callproc('Admin_Update_Calves', (exerciseID, exerciseName, videoLink, exerciseDescription, exerciseType))

            data = cursor.fetchall()

            if len(data) is 0:
                print "Successfully Updated Exercise!"
                con.commit()
                resp = Response(status=200, mimetype='application/json')
                return resp
            else:
                print "Update Failed. Exercise Name Exists"
                resp = Response(status=409, mimetype='application/json')
                return resp

    except Exception as e:
        resp = Response(status=500, mimetype='application/json')
        return resp

@app.route('/api/deleteRecord', methods=['POST'])
def deleteRecord():
    try:
        print("delete selected exercise: ", request.json)
        data = request.json
        print data.get('name')

        exercise_id = data.get('id')
        exerciseName = data.get('name')
        exerciseType = data.get('exerciseType')
        videoLink = data.get('videoLink')
        exerciseDescription = data.get('description')

        con = mysql.connect()
        cursor = con.cursor()

        if exerciseType == "Chest":
            print "chest workout updated!"
            cursor.callproc('Admin_Delete_Chest', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Shoulders":
            print "shoulders workout updated!"
            cursor.callproc('Admin_Delete_Shoulders', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Back":
            print "back workout updated!"
            cursor.callproc('Admin_Delete_Back', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Triceps":
            print "triceps workout updated!"
            cursor.callproc('Admin_Delete_Triceps', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Biceps":
            cursor.callproc('Admin_Delete_Biceps', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
            print "biceps workout updated!"
        elif exerciseType == "Quads":
            print "quads workout updated!"
            cursor.callproc('Admin_Delete_Quads', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Hamstrings":
            print "hamstrings workout updated!"
            cursor.callproc('Admin_Delete_Hamstrings', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Glutes":
            print "glutes workout updated!"
            cursor.callproc('Admin_Delete_Glutes', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))
        elif exerciseType == "Calves":
            print "calves workout updated!"
            cursor.callproc('Admin_Delete_Calves', (exercise_id, exerciseName, videoLink, exerciseDescription, exerciseType))


        data = cursor.fetchall()

        if len(data) is 0:
            print("Deleted Successfully")
            con.commit()
            resp = Response(status=200, mimetype='application/json')
            return resp
        else:
            resp = Response(status=400, mimetype='application/json')
            print "Delete Failed"
            return resp

    except Exception as e:
        resp = Response(status=403, mimetype='application/json')
        print "Server/Database Error"
        return resp
    
    finally:

        cursor.close()
        con.close()

if __name__ == "__main__":
    print("main")

    app.run()
