# Rocket-Elevators-Javascript-Controller

Here is my template for the javascript residential controller. It is done with an oriented object logic, all classes are created with their respective method inside of it.

To summarise, in the MAIN the column, the elevator and the buttons are generated. They are placed at the right position. A button is pressed up or down in a specific floor to call an elevator, the best elevator is chosen and come to your floor. Finally a button is pressed in the elevator to move to the desired floor.

The necessary files to run some tests are also present. With Node JS and NPM installed, first run:

`npm install`

and then, to run the tests:

`npm test`

With a fully completed project, you should get an output like:

![Screenshot from 2021-06-10 16-31-36](https://user-images.githubusercontent.com/28630658/121592985-5edd2600-ca09-11eb-9ff0-38215b74c67c.png)

Use the list down below with a scenario of your choice with copy and paste in the MAIN at the end of the code, under the MAIN comment in residential_controller.js

Only one scenario should be present at a time in your code, Make sure to remove your last scenario before adding a new one!

Once it's done, run the test!

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
