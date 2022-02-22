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
        console.log("this is my array for my requested floor" ,this.floorRequestList)
        this.move()
        
        
        

    }
    
    
    move() {
        
        // while (this.floorRequestList = []) {
            console.log("requeslist", this.floorRequestList)
            let destination = this.floorRequestList[0]
            this.status = "moving"
            console.log("current", this.currentFloor)
            console.log("desti", destination)
            if (this.currentFloor < destination) {
                
                this.direction = "up"
                console.log(this.direction)
                // this.sortFloorList(this.floorRequestList)
                while(this.currentFloor < destination) {
                    this.currentFloor ++
                    console.log(this.currentFloor)
                }} else if (this.currentFloor > destination) {
                    this.direction = "down"
                    this.sortFloorList(this.floorRequestList)
                    while(this.currentFloor > destination) {
                        this.currentFloor --
                    }
                   
                }
                // let this.status = "stopped"
                // this.floorRequestListar.shift()
                // console.log(this.floorRequestListar)

            }
            
        // }
          

   

    sortFloorList(floorRequestList){
        if (this.direction = "up") {
        this.floorRequestList.sort()
        console.log("sortFloorList", floorRequestList)
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
// console.log(myColumn.elevatorList[0])


myColumn.elevatorList[0].requestFloor(7)


module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }