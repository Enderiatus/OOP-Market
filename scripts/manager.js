const Product = require('./product.js');
const Category = require('./category.js');
const Readable = require('./readable.js');
const Computer = require('./computer.js');
const Phone = require('./phone.js');

module.exports = class Manager {

                                                     // Product Manager
    /*
    *
    *                               Creating Product: 
    *   @params {productType, productID, productCategoryID, productName, productPrice, [options]}
    * 
    */

    static Products = new Map();
    static Categories = new Map();

    static createProduct(productType, productID, categoryID, subCategoryID, productName, productPrice, options=undefined) {
        if(this.Products.has(productID)) {
            console.log("Bu ID'de bir ürün zaten mevcut!")
            return;
        }
        if(!this.Categories.has(categoryID) && !this.Categories.get(categoryID).subCategories.has(subCategoryID)) {
            console.log("Yanlış kategori ID'si.")
            return;
        }
        let newProduct;
        if (options)  {
            newProduct = eval(`new ${productType}(${productID}, ${categoryID}, ${subCategoryID}, ${productName}, ${productPrice}, ${[...options]} )`);
        } else {
            newProduct = eval(`new ${productType}(${productID}, ${categoryID}, ${subCategoryID}, ${productName}, ${productPrice})`);
        }
        this.Products.set(productID, newProduct);
        this.Categories.get(categoryID).subCategories.get(subCategoryID).addProductToCategory(newProduct);
    }

    static removeProduct(productID) {
        if(!this.Products.has(productID)) {
            console.log("Bu ID'de bir ürün mevcut değil!")
            return;
        }
        let product = this.getProductByID(productID);
        this.Categories.get(product.categoryID).subCategories.get(product.subCategoryID).removeProductFromCategory(product);
        this.Products.delete(productID);
    }

    static getProductByID(productID) {
        if(!this.Products.has(productID))  {
            console.log('Böyle bir ürün yok.')
            return
        }
        return this.Products.get(productID);
    }

    static getAllProducts() {
        this.Products.forEach(product => {
            console.log(product)
        });
    }

    /*
    *   @param {Number} productID - product ID
    *   @param {String} uType - update Type [productID, productcategoryID, pName, pPrice]
    *   @param {String | Number} newValue - new value
    */

    static updateProduct(productID, uType, newValue) {
        let product = this.getProductByID(productID);
        if(product) {
            console.log(`Ürünün ${uType} değeri ${newValue} olarak değiştirildi.`)
            if(uType == 'subCategoryID' || uType == 'categoryID') {
                this.Categories.get(product.categoryID).subCategories.get(product.subCategoryID).removeProductFromCategory(product); //kategori değişiyorsa her türlü alttan silinir.
                if(uType == 'subCategoryID') {
                    this.Categories.get(product.categoryID).subCategories.get(newValue).addProductToCategory(product);
                }else if(uType == 'categoryID' && newValue != 0) { 
                    this.Categories.get(newValue).addProductToCategory(product); //alt kategori ataması yapılması gerekir.
                    console.log(`${product.productID} ID'li ürünün kategorisi değişti. Alt kategori ataması yapılması gerekli. `)
                }
            }
            product[uType] = newValue;
        }else {
            console.log('Böyle bir ürün bulunamadı.')
        }
    }

                                                    //Category Manager

    static showAllCategories() {
        this.Categories.forEach(ctg => {
            console.log(`${ctg.ID} - ${ctg.categoryName}`)
            if(ctg.subCategories.size > 0) {
                console.log('Sub Categories:')
                ctg.subCategories.forEach(sub => {
                    console.log(`  - ${sub.ID} - ${sub.categoryName}`)
                }) 
            }
        });
    }

    static showCategoryProducts(categoryID, subCategoryID) {
        this.getProductsBySubCategoryID(categoryID, subCategoryID).forEach(product => {
            console.log(product);
        });
    }

    static getProductsBySubCategoryID(mainCategoryID, subCategoryID) {
        return [...this.Categories.get(mainCategoryID).subCategories.get(subCategoryID)];
    }

    static getSubCategoriesByCategoryID(categoryID) {
        return this.Categories.get(categoryID).subCategories;
    }

    static createCategory(categoryID, categoryName) {
        if(this.Categories.has(categoryID)) {
            console.log("Bu ID'de bir kategori zaten mevcut!")
            return;
        }
        this.Categories.set(categoryID, new Category(categoryID, categoryName));
    }

    static createSubCategory(mainCategoryID, subCategoryID, categoryName) {
        if(!this.Categories.has(mainCategoryID)) {
            console.log("Bu ID'de bir kategori mevcut değil!")
            return;
        }
        this.Categories.get(mainCategoryID).subCategories.set(subCategoryID, new Category(subCategoryID, categoryName));
        console.log(`${this.Categories.get(mainCategoryID).categoryName} adlı kategoriye ${subCategoryID} ID ile ${categoryName} adlı alt kategori eklendi.`)
    }

    static deleteCategory(categoryID) { //Sadece kategoriyi siler, kategori içindeki ürünlerin kategori ID'si 0'a eşitlenir. 
        if(!this.Categories.has(categoryID)) {
            console.log("Bu ID'de bir kategori mevcut değil!")
            return;
        }
        this.getSubCategoriesByCategoryID(categoryID).forEach((value, key) => {
                value.productList.forEach(product => {
                    this.updateProduct(product.productID, 'categoryID', 0);
                });
        });
        this.Categories.delete(categoryID);
    }

    static deleteSubCategory(mainCategoryID, subCategoryID) { //Sadece kategoriyi siler, kategori içindeki ürünlerin kategori ID'si 0'a eşitlenir. 
        if(!this.Categories.has(mainCategoryID)) {
            console.log("Bu ID'de bir kategori mevcut değil!")
            return;
        }
        if(!this.Categories.get(mainCategoryID).subCategories.has(subCategoryID)) {
            console.log("Bu ID'de bir alt kategori mevcut değil!")
            return;
        }
        this.getProductsBySubCategoryID(mainCategoryID, subCategoryID).forEach(product => {
            this.updateProduct(product.productID, 'subCategoryID', 0); //alt kategori ataması yapılması gerekli, tekrardan.
        })
        this.Categories.delete(categoryID);
    }



}