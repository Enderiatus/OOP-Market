module.exports = class Product {
    constructor(productID, categoryID, subCategoryID, productName, productPrice) {
        this.productID = productID;
        this.categoryID = categoryID;
        this.subCategoryID = subCategoryID;
        this.productName = productName;
        this.productPrice = productPrice;
    }
}

