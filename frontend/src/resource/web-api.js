let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let myExercises = [
];


let bicepExercises = [
  {
    id:getId(),
    exerciseName:'Barbell Curl',
    description:'A curl with a bar',
    image:'barbellCurl.jpg'
  },
  {
    id:getId(),
    exerciseName:'Dumbbell Curl',
    description:'Pick up two dumbbells and curl them',
    image:'barbellCurl.jpg'
  },
  {
    id:getId(),
    exerciseName:'Preacher Curl',
    description:'Seated on a preacher bench, curl the bar with elbows resting on the pad',
    image:'barbellCurl.jpg'
}
];

// Why don't I include two variables sets and reps and make them empty?

let tricepExercises = [
  {
    id:getId(),
    exerciseName:'Skull Crushers',
    description:'Lie on bench with narrow overhand grip on barbell. Position barbell over shoulders with arms extended. Execution. Lower bar to forehead by bending elbows. Extend arms and repeat.',
    image:'barbellCurl.jpg',
    video:'https://www.youtube.com/embed/d_KZxkY_0cM'
  },
  {
    id:getId(),
    exerciseName:'Tricep Pushdowns',
    description:'Grab both ends of the rope attached to the cable and push down. Keep elbows in and steady',
    image:'barbellCurl.jpg',
    video:'https://www.youtube.com/embed/P6sN5XW-QuU'
  },
  {
    id:getId(),
    exerciseName:'Close Grip Bench Press',
    description:'Grip the bar closely with both hands and press upwards ',
    image:'barbellCurl.jpg',
    video:'https://www.youtube.com/embed/d_KZxkY_0cM'
},
{
    id:getId(),
    exerciseName:'behind the head presses',
    description:'press',
    image:'barbel.jpg',
    video:'https://www.youtube.com/embed/d_KZxkY_0cM'
  }
];

   
export class WebAPI {
  isRequesting = false;

  getExerciseList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = bicepExercises.map(x =>  { return {
          id:x.id,
          exerciseName:x.exerciseName,
          description:x.description,
          image:x.image
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getTricepExerciseList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = tricepExercises.map(x =>  { return {
          id:x.id,
          exerciseName:x.exerciseName,
          description:x.description,
          image:x.image
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getContactDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveExercise(exercise) {
    console.log("saveExercise", exercise.exerciseName, exercise.description);

    myExercises.push(exercise);
    console.log("myExercise", myExercises);
  }

  saveContact(contact){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(contact));
        let found = contacts.filter(x => x.id == contact.id)[0];

        if(found){
          let index = contacts.indexOf(found);
          contacts[index] = instance;
        }else{
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
