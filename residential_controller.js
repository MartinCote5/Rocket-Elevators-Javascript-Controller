class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = _id;
        this.status = "online"
        this.elevatorList = [];
        this.callButtonList = [];
        this.generateElevator(_amountOfFloors, _amountOfElevators);
        this.generateCallButton(_amountOfFloors)
    };


    generateElevator(_amountOfFloors, _amountOfElevators) {
        for (let i = 0; i < _amountOfElevators; i++) {
          var newElevator = new Elevator(i + 1, _amountOfFloors);
          this.elevatorList.push(newElevator);
        }
      }


      generateCallButton(_amountOfFloors) {
        for (let i = 0; i < _amountOfFloors; i++) {
          var newCallButton = new CallButton(i + 1);
          this.callButtonList.push(newCallButton);
        }
      }





    requestElevator (requestedFloor, direction) {
        
    }

}

class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id
        this.status = "idle"
        this.direction
        this.currentFloor
        this.door = new Door(1)
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.generateFloorRequestButton(_amountOfFloors)
    }


    generateFloorRequestButton(_amountOfFloors) {
        for (let i = 0; i < _amountOfFloors; i++) {
          var newFloorRequestButton = new FloorRequestButton(i + 1);
          this.floorRequestButtonList.push(newFloorRequestButton);
        }
      }


    requestFloor(requestedFloor) {

    }
    
    
    move() {

    }

}

class CallButton {
    constructor(_id, _floor, _direction) {
        this.ID = _id
        this.status = null
        this.floor = _floor
        this.direction = _direction

    }
}

class FloorRequestButton {
    constructor(_id, _floor) {
        this.ID = _id
        this.status = null
        this.floor = _floor
    }
}

class Door {
    constructor(_id) {
        this.ID = _id
        this.status = null
    }
}


let myColumn = new Column(1, 10, 2)
console.log(myColumn.elevatorList[0])





module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }