var callButtonID = 1;

class Column {
  constructor(id, amountOfFloors, amountOfElevators) {
    this.ID = id;
    this.status = "online";
    this.elevatorList = [];
    this.callButtonList = [];
    this.generateElevator(amountOfFloors, amountOfElevators);
    this.generateCallButton(amountOfFloors);
  }

  generateElevator(amountOfFloors, amountOfElevators) {
    for (let i = 0; i < amountOfElevators; i++) {
      var newElevator = new Elevator(i + 1, amountOfFloors);
      this.elevatorList.push(newElevator);
    }
  }

  generateCallButton(amountOfFloors) {
    for (let buttonFloor = 1; buttonFloor < amountOfFloors + 1; buttonFloor++) {
      if (buttonFloor < amountOfFloors) {
        var newCallButton = new CallButton(callButtonID, buttonFloor, "up");
        this.callButtonList.push(newCallButton);
        callButtonID++;
      }
      if (buttonFloor > 1) {
        var newCallButton = new CallButton(callButtonID, buttonFloor, "down");
        this.callButtonList.push(newCallButton);
        callButtonID++;
      }
    }
  }

  // Simulate when a user press a button outside the elevator

  requestElevator(floor, direction) {
    let elevator = this.findElevator(floor, direction);
    elevator.floorRequestList.push(floor);
    elevator.move();
    elevator.operateDoors();

    return elevator;
  }

  // We use a score system depending on the current elevators state. Since the bestScore and the referenceGap are
  // higher values than what could be possibly calculated, the first elevator will always become the default bestElevator,
  // before being compared with to other elevators. If two elevators get the same score, the nearest one is prioritized.

  findElevator(floor, direction) {
    let bestElevator;
    var bestScore = 5;
    var referenceGap = 10000000;
    var bestElevatorInformations;
    this.elevatorList.forEach((elevator) => {
      if (
        floor == elevator.currentFloor &&
        elevator.status == "stopped" &&
        direction == elevator.direction
      ) {
        bestElevatorInformations = this.checkIfElevatorIsBetter(
          1,
          elevator,
          bestScore,
          referenceGap,
          bestElevator,
          floor
        );
      } else if (
        floor > elevator.currentFloor &&
        floor < elevator.floorRequestList[0] &&
        elevator.direction == "up" &&
        direction == elevator.direction
      ) {
        bestElevatorInformations = this.checkIfElevatorIsBetter(
          2,
          elevator,
          bestScore,
          referenceGap,
          bestElevator,
          floor
        );
      } else if (
        floor < elevator.currentFloor &&  
        floor > elevator.floorRequestList[0] &&
        elevator.direction == "down" &&
        direction == elevator.direction
      ) {
        bestElevatorInformations = this.checkIfElevatorIsBetter(
          2,
          elevator,
          bestScore,
          referenceGap,
          bestElevator,
          floor
        );
      } else if (elevator.status == "idle") {
        bestElevatorInformations = this.checkIfElevatorIsBetter(
          3,
          elevator,
          bestScore,
          referenceGap,
          bestElevator,
          floor
        );
      } else {
        bestElevatorInformations = this.checkIfElevatorIsBetter(
          4,
          elevator,
          bestScore,
          referenceGap,
          bestElevator,
          floor
        );
      }

      bestElevator = bestElevatorInformations.bestElevator;
      bestScore = bestElevatorInformations.bestScore;
      referenceGap = bestElevatorInformations.referenceGap;
    });
    return bestElevator;
  }

  checkIfElevatorIsBetter(
    scoreToCheck,
    newElevator,
    bestScore,
    referenceGap,
    bestElevator,
    floor
  ) {
    if (scoreToCheck < bestScore && scoreToCheck < 4) {
      bestScore = scoreToCheck;
      bestElevator = newElevator;
      referenceGap = Math.abs(newElevator.currentFloor - floor);
    } else if (scoreToCheck == bestScore && scoreToCheck < 4) {
      var gap = Math.abs(newElevator.currentFloor - floor); 
    }

    if (scoreToCheck < bestScore && scoreToCheck == 4) {
      bestScore = scoreToCheck;
      bestElevator = newElevator;
      referenceGap = Math.abs(newElevator.floorRequestList[0] - floor);
    } else if (scoreToCheck == bestScore && scoreToCheck == 4) {
      var gap = Math.abs(newElevator.floorRequestList[0] - floor);      
    }
    
    if (referenceGap > gap) {
      bestElevator = newElevator;
      referenceGap = gap;
    }

    return {
      bestElevator,
      bestScore,
      referenceGap,
    };
  }
}

class Elevator {
  constructor(id, amountOfFloors) {
    this.ID = id;
    this.status = "idle";
    this.direction;
    this.currentFloor;
    this.door = new Door(id);
    this.floorRequestButtonList = [];
    this.floorRequestList = [];
    this.generateFloorRequestButton(amountOfFloors);
  }

  generateFloorRequestButton(amountOfFloors) {
    for (let i = 0; i < amountOfFloors; i++) {
      var newFloorRequestButton = new FloorRequestButton(i + 1, i + 1);
      this.floorRequestButtonList.push(newFloorRequestButton);
    }
  }

  // Simulate when a user press a button inside the elevator

  requestFloor(requestedFloor) {
    this.floorRequestList.push(requestedFloor);
    this.move();
    this.operateDoors();
  }

  move() {
    while (this.floorRequestList.length != 0) {
      let destination = this.floorRequestList[0];
      this.status = "moving";

      if (this.currentFloor < destination) {
        this.direction = "up";

        this.sortFloorList();
        destination = this.floorRequestList[0];
        while (this.currentFloor < destination) {
          this.currentFloor++;
        }
      } else if (this.currentFloor > destination) {
        this.direction = "down";
        this.sortFloorList();
        destination = this.floorRequestList[0];
        while (this.currentFloor > destination) {
          this.currentFloor--;
        }
      }
      this.status = "stopped";
      this.floorRequestList.shift();
    }
    this.status = "idle";
  }

  sortFloorList() {
    if (this.direction == "up") {
      this.floorRequestList.sort();
    } else if (this.direction == "down") {
      this.floorRequestList.reverse();
    }
  }

  operateDoors() {
    this.door.status = "opened";
    this.door.status = "closed";
  }
}

class CallButton {
  constructor(id, floor, direction) {
    this.ID = id;
    this.status = "OFF";
    this.floor = floor;
    this.direction = direction;
  }
}

class FloorRequestButton {
  constructor(id, floor) {
    this.ID = id;
    this.status = "OFF";
    this.floor = floor;
  }
}

class Door {
  constructor(id) {
    this.ID = id;
    this.status = "closed";
  }
}

// MAIN ---- paste chosen scenario from the readme file down below

// scenario 3 ---------

let myColumn = new Column(1, 10, 2);

function setupGame() {

    myColumn.elevatorList[0].currentFloor = 10;

    myColumn.elevatorList[1].currentFloor = 3;

    myColumn.elevatorList[1].direction = "up";

    myColumn.elevatorList[1].status = "moving";

    myColumn.elevatorList[1].floorRequestList.push(6);

}

// part 1

// setupGame()

// let elevator = myColumn.requestElevator(4, "down");

// elevator.requestFloor(2);

// part 2

setupGame()

elevator = myColumn.requestElevator(4, "up");

elevator.requestFloor(5);


// END MAIN

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door };
