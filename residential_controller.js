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
    constructor(_id, _status, _amountOfFloors, _currentFloor) {
        this.ID = _id
        this.status = _status
        this.direction = "up"
        this.currentFloor = 2
        this.door = new Door(_id, "closed")
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.generateFloorRequestButton(_amountOfFloors)
        this.requestFloor(3)
        
        
    }


    generateFloorRequestButton(_amountOfFloors) {
        for (let i = 0; i < _amountOfFloors; i++) {
          var newFloorRequestButton = new FloorRequestButton(i + 1, "OFF", i + 1);
          this.floorRequestButtonList.push(newFloorRequestButton);
        }
      }


    requestFloor(requestedFloor) {
        this.floorRequestList.push(requestedFloor);
        this.move(this.floorRequestList)
        console.log("this is my array for my requested floor" ,this.floorRequestList)
        
        

    }
    
    
    move(floorRequestList) {
        
        // while (floorRequestList = !(null)) {
            let destination = floorRequestList
            this.status = "moving"
            console.log("current", this.currentFloor)
            console.log("current", destination)
            if (this.currentFloor < this.destination) {
                
                this.direction = "up"
                this.sortFloorList(floorRequestList)
                // while(this.currentFloor < this.destination) {
                //     this.currentFloor ++
                // }

            // }
            
            // text += "The number is " + i;
            // i++;
          } 

    }

    // sortFloorList(floorRequestList, direction){
    //     if (direction = "up") {
    //     floorRequestList.sort()
    //     console.log(floorRequestList)
    //     }


    // }

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
    constructor(_id, _status, _floor) {
        this.ID = _id
        this.status = _status
        this.floor = _floor
    }
}

class Door {
    constructor(_id) {
        this.ID = _id
        this.status = null
    }
}


let myColumn = new Column(1, 10, 1)
// console.log(myColumn.elevatorList[0])





module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }