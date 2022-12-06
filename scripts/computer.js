var Product = require('./product.js');

module.exports = class Computer extends Product {
    constructor(productID, categoryID, subCategoryID, productName, productPrice, memorySize, processor) {
        super(productID, categoryID, subCategoryID, productName, productPrice);
        this.memorySize = memorySize;
        this.processor = processor;
    }
    getMemorySize() {
        return this.memorySize;
    }

    getProcessor() {
        return this.processor;
    }
}