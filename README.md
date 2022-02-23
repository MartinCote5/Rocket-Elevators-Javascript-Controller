# Rocket-Elevators-Javascript-Controller

This is the template to use for the javascript residential controller. You will find the classes that should be used along with some methods described in the requirements.
The necessary files to run some tests are also present. With Node JS and NPM installed, first run:

`npm install`

and then, to run the tests:

`npm test`

With a fully completed project, you should get an output like:

![Screenshot from 2021-06-10 16-31-36](https://user-images.githubusercontent.com/28630658/121592985-5edd2600-ca09-11eb-9ff0-38215b74c67c.png)

All of these files can be left in your final project but no scenarios should be present in your code. The grader will run tests similar to the ones provided.

Of course, make sure to edit this Readme file to describe your own project!

Here is the list of the scenario, copy and paste the desired scenario in the main at the end of the residential_controller.js and then run your test!

only one scenario should be present at a time in your code!

// scenario 1 ---------

let myColumn = new Column(1, 10, 2);
myColumn.elevatorList[0].currentFloor = 2;
myColumn.elevatorList[1].currentFloor = 6;
let elevator = myColumn.requestElevator(3, "up");
elevator.requestFloor(7);

// scenario 2 ---------

let myColumn = new Column(1, 10, 2);
myColumn.elevatorList[0].currentFloor = 10;
myColumn.elevatorList[1].currentFloor = 3;
// part 1
let elevator = myColumn.requestElevator(1, "up");
elevator.requestFloor(6);
// part 2
elevator = myColumn.requestElevator(3, "up");
elevator.requestFloor(5);
// part 3
elevator = myColumn.requestElevator(9, "down");
elevator.requestFloor(2);

// scenario 3 ---------

let myColumn = new Column(1, 10, 2);
myColumn.elevatorList[0].currentFloor = 10;
myColumn.elevatorList[1].currentFloor = 3;
myColumn.elevatorList[1].direction = "up";
myColumn.elevatorList[1].status = "moving";
myColumn.elevatorList[1].floorRequestList.push(6);

// part 1
let elevator = myColumn.requestElevator(3, "down");
elevator.requestFloor(2);
// part 2
elevator = myColumn.requestElevator(10, "down");
elevator.requestFloor(3);
