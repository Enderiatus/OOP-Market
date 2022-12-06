
const Customer = require("./customer");

module.exports = class CustomerManager {
    static Customers = new Map();

    static createCustomer(customerName) {
        if (this.Customers.has(customerName)) {
            console.log('Böyle bir müşteri zaten mevcut.')
            return;
        }
        this.Customers.set(customerName, new Customer(customerName, customerName))
    }

    static removeCustomer(customerName) {
        if (!this.Customers.has(customerName)) {
            console.log('Böyle bir müşteri mevcut değil.')
            return;
        }
        this.Customers.delete(customerName)
    }

}