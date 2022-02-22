var callButtonID = 1



class Column {
    constructor(id, amountOfFloors, amountOfElevators) {
        this.ID = id;
        this.status = "offline"
        this.elevatorList = [];
        this.callButtonList = [];
        this.generateElevator(amountOfFloors, amountOfElevators);
        this.generateCallButton(amountOfFloors)
    };


    generateElevator(amountOfFloors, amountOfElevators) {
        for (let i = 0; i < amountOfElevators; i++) {
          var newElevator = new Elevator(i + 1, "idle",  amountOfFloors, 1);
          this.elevatorList.push(newElevator);
        }
      }


      generateCallButton(amountOfFloors) {
          
        for (let buttonFloor = 1; buttonFloor < amountOfFloors + 1; buttonFloor++) {
            
            if (buttonFloor < amountOfFloors) {
                var newCallButton = new CallButton(callButtonID, buttonFloor, "up");
                this.callButtonList.push(newCallButton);
                callButtonID++
            } 
            if (buttonFloor > 1) {
                var newCallButton = new CallButton(callButtonID, buttonFloor, "down");
                this.callButtonList.push(newCallButton);
                callButtonID++
            }
        
        }
      }





    requestElevator (floor, direction) {
        let elevator = this.findElevator(floor, direction)
        // this.floorRequestList .push(floor);
        // this.move()
        // this.operateDoors()
        // return elevator
        

    }


    findElevator(floor, direction) {
        console.log("parameter value",floor, direction)
        let bestElevator 
        let bestScore = 5
        let referenceGap = 10000000
        let bestElevatorInformations
        this.elevatorList.forEach((elevator) => {
            console.log(6)
           
        });

    }





   










}

class Elevator {
    constructor(id, amountOfFloors) {
        this.ID = id
        this.status = "idle"
        this.direction = null
        this.currentFloor = 2
        this.door = new Door(id)
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.generateFloorRequestButton(amountOfFloors)
    }


    generateFloorRequestButton(amountOfFloors) {
        for (let i = 0; i < amountOfFloors; i++) {
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
                destination = this.floorRequestList[0]
                while(this.currentFloor < destination) {
                    this.currentFloor ++
                    console.log(this.currentFloor)
                }} else if (this.currentFloor > destination) {
                    this.direction = "down"
                    this.sortFloorList()
                    destination = this.floorRequestList[0]
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
        if (this.direction == "up") {
        this.floorRequestList.sort()
        console.log("sortFloorList", this.floorRequestList)
        } else if (this.direction == "down"){
            this.floorRequestList.reverse()
        }


    }



    operateDoors() {

    }

}

class CallButton {
    constructor(id, floor, direction) {
        this.ID = id
        this.status = "OFF"
        this.floor = floor
        this.direction = direction

    }
}

class FloorRequestButton {
    constructor(id, floor) {
        this.ID = id
        this.status = "OFF"
        this.floor = floor
    }
}

class Door {
    constructor(id) {
        this.ID = id
        this.status = "closed"
    }
}


let myColumn = new Column(1, 10, 2)
// console.log(myColumn)

// myColumn.elevatorList[0].floorRequestList = [5,4]
// myColumn.elevatorList[0].requestFloor(7)


myColumn.requestElevator (5, "up")


module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }