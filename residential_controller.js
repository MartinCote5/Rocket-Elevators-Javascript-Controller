class Column {
    constructor(_id, _amountOfFloors, _amountOfElevators) {
        this.ID = _id;
        this.status = "online"
        this.elevatorList = [];
        this.callButtonList = [];
    };

    requestElevator (requestedFloor, direction) {
        
    }

}

class Elevator {
    constructor(_id, _amountOfFloors) {
        this.ID = _id
        this.status = "idle"
        this.direction
        this.currentFloor
        this.door = new Door
        this.floorRequestButtonList = []
        this.floorRequestList = []
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

module.exports = { Column, Elevator, CallButton, FloorRequestButton, Door }