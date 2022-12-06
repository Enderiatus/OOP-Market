var Product = require('./product.js');

module.exports = class Phone extends Product {
    constructor(productID, categoryID, subCategoryID, productName, productPrice, camera, os) {
        super(productID, categoryID, subCategoryID, productName, productPrice);
        this.camera = camera;
        this.os = os;
    }
    getCamera() {
        return this.camera;
    }

    getOS() {
        return this.os;
    }
}