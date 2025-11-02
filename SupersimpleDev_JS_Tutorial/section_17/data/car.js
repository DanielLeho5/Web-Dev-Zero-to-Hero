class Car {
    brand;
    model;
    speed;
    isTrunkOpen;

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.isTrunkOpen = false;
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, the trunk is ${this.isTrunkOpen ? 'open' : 'closed'}`)
    }

    go() {
        if (this.speed + 5 <= 200 && !this.isTrunkOpen) {
            this.speed += 5;
        }
        return this;
    }

    brake() {
        if (this.speed - 5 >= 0) {
            this.speed -= 5;
        }
        return this;
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car {
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    go() {
        if (this.speed + this.acceleration <= 300 && !this.isTrunkOpen) {
            this.speed += this.acceleration;
        }
        return this;
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h`)
    }

    openTrunk() {}

    closeTrunk() {}
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3')

car1.go().go().go().go().go()
car1.brake()

car2.openTrunk()
car2.go()

car1.displayInfo()
car2.displayInfo()

const car3 = new RaceCar('McLaren', 'F1', 20);

car3.go().go()
car3.displayInfo()