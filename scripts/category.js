module.exports = class Category { 
    constructor(ID, categoryName) {
        this.ID = ID;
        this.categoryName = categoryName;
        this.subCategories = new Map();
        this.productList = new Set();
    }

    addProductToCategory(product) {
        this.productList.add(product);
        console.log(`${product.productName}, ${this.categoryName} kategorisine eklendi.`)
    }

    removeProductFromCategory(product) {
        this.productList.delete(product);
    }
}