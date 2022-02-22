var callButtonID = 1



class Column {
    constructor(_id, _status, _amountOfFloors, _amountOfElevators) {
        this.ID = _id;
        this.status = _status
        this.elevatorList = [];
        this.callButtonList = [];
        this.generateElevator(_amountOfFloors, _amountOfElevators);
        this.generateCallButton(_amountOfFloors)
    };


    generateElevator(_amountOfFloors, _amountOfElevators) {
        for (let i = 0; i < _amountOfElevators; i++) {
          var newElevator = new Elevator(i + 1, "idle",  _amountOfFloors, 1);
          this.elevatorList.push(newElevator);
        }
      }


      generateCallButton(_amountOfFloors) {
          
        for (let buttonFloor = 1; buttonFloor < _amountOfFloors + 1; buttonFloor++) {
            
            if (buttonFloor < _amountOfFloors) {
                var newCallButton = new CallButton(callButtonID, "OFF", buttonFloor, "up");
                this.callButtonList.push(newCallButton);
                callButtonID++
            } 
            if (buttonFloor > 1) {
                var newCallButton = new CallButton(callButtonID, "OFF", buttonFloor, "down");
                this.callButtonList.push(newCallButton);
                callButtonID++
            }
        
        }
      }





    requestElevator (requestedFloor, direction) {
        
    }

}

class Elevator {
    constructor(_id, _status, _amountOfFloors, _currentFloor) {
        this.ID = _id
        this.status = _status
        this.direction = null
        this.currentFloor = 2
        this.door = new Door(_id, "closed")
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.generateFloorRequestButton(_amountOfFloors)
    }


    generateFloorRequestButton(_amountOfFloors) {
        for (let i = 0; i < _amountOfFloors; i++) {
          var newFloorRequestButton = new FloorRequestButton(i + 1, "OFF", i + 1);
          this.floorRequestButtonList.push(newFloorRequestButton);
        }
      }


    requestFloor(requestedFloor) {
        this.floorRequestList.push(requestedFloor);
        this.move()
        
        
        

    }
    
    
    move() {
        
        while (this.floorRequestList.length != 0 ) {
            console.log("requeslist", this.floorRequestList)
            let destination = this.floorRequestList[0]
            this.status = "moving"
            console.log("current", this.currentFloor)
            console.log("desti", destination)
            if (this.currentFloor < destination) {
                
                this.direction = "up"
                console.log(this.direction)
                this.sortFloorList()
                while(this.currentFloor < destination) {
                    this.currentFloor ++
                    console.log(this.currentFloor)
                }} else if (this.currentFloor > destination) {
                    this.direction = "down"
                    this.sortFloorList()
                    while(this.currentFloor > destination) {
                        this.currentFloor --
                    }
                   
                }
                this.status = "stopped"
                this.floorRequestList.shift()
                console.log(this.floorRequestList)

            }
            
        }
          

   

    sortFloorList(){
        if (this.direction = "up") {
        this.floorRequestList.sort()
        console.log("sortFloorList", this.floorRequestList)
        } else {
            this.floorRequestList.reverse()
        }


    }

}

class CallButton {
    constructor(_id, _status, _floor, _direction) {
        this.ID = _id
        this.status = _status
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
    constructor(_id, _status) {
        this.ID = _id
        this.status = _status
    }
}


let myColumn = new Column(1,"offline", 10, 1)
console.log(myColumn)

// myColumn.elevatorList[0].floorRequestList = [9,4]
// myColumn.elevatorList[0].requestFloor(7)



module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }