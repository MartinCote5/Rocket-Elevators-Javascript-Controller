var callButtonID = 1



class Column {
    constructor(id, amountOfFloors, amountOfElevators) {
        this.ID = id;
        this.status = "online"
        this.elevatorList = [];
        this.callButtonList = [];
        this.generateElevator(amountOfFloors, amountOfElevators);
        this.generateCallButton(amountOfFloors)
    };


    generateElevator(amountOfFloors, amountOfElevators) {
        for (let i = 0; i < amountOfElevators; i++) {
          var newElevator = new Elevator(i + 1,  amountOfFloors);
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
        // console.log('elevvv2', elevator)


        elevator.floorRequestList.push(floor);
        
        // console.log(floor, "floor")
        // console.log(x, "x")
       
        elevator.move()
        elevator.operateDoors()
        // console.log(elevator)
        return elevator

        

    }





    findElevator(floor, direction) {
        // console.log("parameter value",floor, direction)
        let bestElevator 
        var bestScore = 5
        var referenceGap = 10000000
        var bestElevatorInformations
        this.elevatorList.forEach((elevator) => {
            // console.log(referenceGap,'GAPP')
            if (floor == elevator.currentFloor && elevator.status == "idle" && direction == elevator.direction) {
                // console.log(referenceGap,'firstIfGap')
                
                bestElevatorInformations = this.checkIfElevatorIsBetter(1, elevator, bestScore, referenceGap, bestElevator, floor)
            } else if (floor > elevator.currentFloor && elevator.direction == "up" && direction == elevator.direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, floor)  
            } else if (floor < elevator.currentFloor && elevator.direction == "down" && direction == elevator.direction) {
                bestElevatorInformations = this.checkIfElevatorIsBetter(2, elevator, bestScore, referenceGap, bestElevator, floor)
            } else if (elevator.status == "idle") {
                bestElevatorInformations = this.checkIfElevatorIsBetter(3, elevator, bestScore, referenceGap, bestElevator, floor)
            } else {
                bestElevatorInformations = this.checkIfElevatorIsBetter(4, elevator, bestScore, referenceGap, bestElevator, floor)
            }
        
        
        

        // console.log(bestElevatorInformations.referenceGap,'scoreretured')
                
            bestElevator = bestElevatorInformations.bestElevator
            bestScore = bestElevatorInformations.bestScore
            referenceGap = bestElevatorInformations.referenceGap
            // console.log(bestElevator,'bestel')   

        
    })
    return bestElevator
}
        
   



    checkIfElevatorIsBetter(scoreToCheck, newElevator, bestScore, referenceGap, bestElevator, floor) {
        // console.log("checl",referenceGap)
        if (scoreToCheck < bestScore) {
            bestScore = scoreToCheck
            bestElevator = newElevator 
            referenceGap = Math.abs(newElevator.currentFloor - floor)
        } else if (scoreToCheck == bestScore) {
            var gap = Math.abs(newElevator.currentFloor - floor) 
        }       if (referenceGap > gap) {
            bestElevator = newElevator
            referenceGap = gap
        }
        // console.log("allo")
        // console.log(bestElevator)
        // console.log(bestElevator,"bestelevator")
        // bestElevatorInformations = [bestElevator, bestScore, referenceGap]
        // console.log(referenceGap,'GAPP')
        return {
            bestElevator,
            bestScore, 
            referenceGap
        }
        
        

        
    }






   










}

class Elevator {
    constructor(id, amountOfFloors) {
        this.ID = id
        this.status = "idle"
        this.direction 
        this.currentFloor 
        this.door = new Door(id)
        this.floorRequestButtonList = []
        this.floorRequestList = []
        this.generateFloorRequestButton(amountOfFloors)
    }


    generateFloorRequestButton(amountOfFloors) {
        for (let i = 0; i < amountOfFloors; i++) {
          var newFloorRequestButton = new FloorRequestButton(i + 1, i + 1);
          this.floorRequestButtonList.push(newFloorRequestButton);
        }
      }


    requestFloor(requestedFloor) {
        this.floorRequestList.push(requestedFloor);
        this.move()
        
        
        

    }
    
    
    move() {
        
        while (this.floorRequestList.length != 0 ) {
            // console.log("requeslist", this.floorRequestList)
            let destination = this.floorRequestList[0]
            this.status = "moving"
            // console.log("current", this.currentFloor)
            // console.log("desti", destination)
            if (this.currentFloor < destination) {
                
                this.direction == "up"
                // console.log(this.direction)
                this.sortFloorList()
                destination = this.floorRequestList[0]
                while(this.currentFloor < destination) {
                    this.currentFloor ++
                    // console.log(this.currentFloor)
                }} else if (this.currentFloor > destination) {
                    this.direction == "down"
                    this.sortFloorList()
                    destination = this.floorRequestList[0]
                    while(this.currentFloor > destination) {
                        this.currentFloor --
                    }
                   
                }
                this.status = "idle"
                this.floorRequestList.shift()
                // console.log(this.floorRequestList)

            }
            
        }
          

   

    sortFloorList(){
        if (this.direction == "up") {
        this.floorRequestList.sort()
        // console.log("sortFloorList", this.floorRequestList)
        } else if (this.direction == "down"){
            this.floorRequestList.reverse()
        }


    }



    operateDoors() {
        this.door.status = "opened"
        // console.log(this.door)
        this.door.status = "closed"

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



// console.log(myColumn)
// console.log(myColumn.elevatorList)
// myColumn.elevatorList[0].floorRequestList = [5,4]
// myColumn.elevatorList[0].requestFloor(7)


// console.log(myColumn.elevatorList)

// console.log(myColumn.elevatorList[1])



// console.log(elevator, "my winner")







let myColumn = new Column(1, 10, 2)
myColumn.elevatorList[0].currentFloor = 2
myColumn.elevatorList[1].currentFloor = 6
let elevator = myColumn.requestElevator (3, "up")
elevator.requestFloor(7)






/*
==================================Scenario 1=================================================
SET column TO NEW Column WITH 1 AND online AND 10 AND 2 '//id, status, amountOfFloors, amountOfElevators
SET first elevator floor OF column elevatorsList TO 2
SET second elevator floor OF column elevatorsList TO 6

SET elevator TO CALL column requestElevator WITH 3 AND Up RETURNING elevator
CALL elevator requestFloor WITH 7
'==================================End Scenario 1=============================================


'==================================Scenario 2=================================================
SET column TO NEW Column WITH 1 AND online AND 10 AND 2 '//id, status, amountOfFloors, amountOfElevators
SET first elevator floor OF column elevatorsList TO 10
SET second elevator floor OF column elevatorsList TO 3

'//Part 1
SET elevator TO CALL column requestElevator WITH 1 AND Up RETURNING elevator
CALL elevator requestFloor WITH 6

'//Part 2
SET elevator TO CALL column requestElevator WITH 3 AND Up RETURNING elevator
CALL elevator requestFloor WITH 5

'//Part 3
SET elevator TO CALL column requestElevator WITH 9 AND Down RETURNING elevator
CALL elevator requestFloor WITH 2
'==================================End Scenario 2=============================================

'==================================Scenario 3=================================================
SET column TO NEW Column WITH 1 AND online AND 10 AND 2 '//id, status, amountOfFloors, amountOfElevators
SET first elevator floor OF column elevatorsList TO 10
SET second elevator floor OF column elevatorsList TO 3
SET second elevator status OF column elevatorsList TO moving
ADD 6 TO second elevator floorRequestList OF column elevatorsList

'//Part 1
SET elevator TO CALL column requestElevator WITH 3 AND Down RETURNING elevator
CALL elevator requestFloor WITH 2

'//Part 2
SET elevator TO CALL column requestElevator WITH 10 AND Down RETURNING elevator
CALL elevator requestFloor WITH 3
'==================================End Scenario 3=============================================


*/
















module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }


