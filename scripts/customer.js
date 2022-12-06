var Basket = require('./basket.js');

module.exports = class Customer {
    constructor(customerName) {
        this.customerName = customerName;
        this.customerBasket = new Basket();
    }

    getBasket() {
        return this.customerBasket;
    }

    getCustomerName() {
        return this.customerName;
    }
    

}