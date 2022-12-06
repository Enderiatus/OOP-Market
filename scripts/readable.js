var Product = require('./product.js');

module.exports = class Readable extends Product {
    constructor(productID, categoryID, subCategoryID, productName, productPrice, pageNumber, author) {
        super(productID, categoryID, subCategoryID, productName, productPrice);
        this.pageNumber = pageNumber;
        this.author = author;
    }
    getPageNumber() {
        return this.pageNumber;
    }

    getAuthor() {
        return this.author;
    }
}