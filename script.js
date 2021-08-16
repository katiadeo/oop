class Order {
    paid = false;

    constructor() {
        this.orderArray = [];
    }

    addItem(item) {
        if (this.paid) {
            throw new Error ('No changes are allowed after payment');
        }

        this.orderArray.push(item);
        return this;
    }

    deleteItem(item) {
        if (this.paid) {
            throw new Error ('No changes are allowed after payment');
        }

        this.orderArray.length ? this.orderArray.splice(this.orderArray.indexOf(item), 1) : console.log('The order is empty');
        return this;
    }

    pay() {
        this.paid ? console.log('The order has been paid') : this.paid = true;
        return this;
    }

    getTotalPrice() {
        return this.orderArray.slice().reduce((amount, item) => {
            return amount + item.calculatePrice();
        }, 0);
    }

    getTotalCalories() {
        return this.orderArray.slice().reduce((amount, item) => {
            return amount + item.calculateCalories();
        }, 0);
    }
}

class MenuItem {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }

    calculatePrice() {
        return this.price;
    }

    calculatePrice() {
        return this.calories;
    }
}

class Hamburger extends MenuItem {
    constructor(size, stuffing) {
        super();
        this.size = size;
        this.stuffing = stuffing;
        this.price = this.calculatePrice();
        this.calories = this.calculateCalories();
    }
    
    static SIZE_SMALL = { type: 'small', price: 50, calories: 20 };
    static SIZE_LARGE = { type: 'large', price: 100, calories: 40 };
    static STUFFING_CHEESE = { type: 'cheese', price: 10, calories: 20 };
    static STUFFING_SALAD = { type: 'salad', price: 20, calories: 5 };
    static STUFFING_POTATO = { type: 'potato', price: 15, calories: 10 };

    getSize() {
        return this.size.type;
    }

    getStuffing() {
        return this.stuffing.type;
    }

    calculatePrice() {
        return this.size.price + this.stuffing.price;
    }

    calculateCalories() {
        return this.size.calories + this.stuffing.calories;
    }
}

class Salad extends MenuItem {
    constructor(name, weight) {
        super();
        this.name = name;
        this.weight = weight;
        this.price = this.calculatePrice();
        this.calories = this.calculateCalories();
    }

    static CAESAR = { type: 'caesar', price: 200, calories: 20 };
    static OLIVIE = { type: 'olivie', price: 50, calories: 80 };

    calculatePrice() {
        return this.name.price * (this.weight / 100);
    }

    calculateCalories() {
        return this.name.calories * (this.weight / 100);
    }
}

class Drink extends MenuItem {
    constructor(name) {
        super();
        this.name = name;
        this.price = this.calculatePrice();
        this.calories = this.calculateCalories();
    }

    static COLA = { type: 'cola', price: 50, calories: 40 };
    static COFFEE = { type: 'coffee', price: 80, calories: 20 };

    calculatePrice() {
        return this.name.price;
    }

    calculateCalories() {
        return this.name.calories;
    }
}


// create an order
const order = new Order();

// create order items
const burger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_SALAD);
const salad = new Salad(Salad.CAESAR, 200);
const coffee = new Drink(Drink.COFFEE);

console.log(burger);
console.log(salad);
console.log(coffee);

// add items to the order
order.addItem(burger).addItem(salad).addItem(coffee).addItem(coffee);

// change the order
console.log(order.deleteItem(coffee));

// calculate total price of the order
console.log(order.getTotalPrice());

// pay for the order
console.log(order.pay());

// try to change the order after payment and get an error
console.log(order.addItem(burger))
