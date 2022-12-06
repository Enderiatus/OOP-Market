'use strict';
const Manager = require('./manager.js');
const CustomerManager = require('./customermanager.js');

CustomerManager.createCustomer('Zek');
CustomerManager.createCustomer('Tuna');

Manager.createCategory(1, 'Bilgisayar');
Manager.createCategory(2, 'Telefon');
Manager.createCategory(3, 'Kitap');

Manager.createSubCategory(1, 1, 'Masaüstü Bilgisayarlar') //Alt kategori
Manager.createSubCategory(1, 2, 'Dizüstü Bilgisayarlar') //Alt kategori

Manager.createSubCategory(2, 1, 'Android Telefonlar') //Alt kategori
Manager.createSubCategory(2, 2, 'IOS Telefonlar') //Alt kategori

Manager.createSubCategory(3, 1, 'Ütopik Kitaplar') //Alt kategori
Manager.createSubCategory(3, 2, 'Tarih Kitapları') //Alt kategori
//CategoryManager.deleteCategory(1)
Manager.showAllCategories();
//productID, categoryID, subCategoryID, productName, productPrice
Manager.createProduct('Computer', 1, 1, 1, '"Asus Bilgisayar"', 15000, [32, '"Ryzen 5800x3D"']);
Manager.createProduct('Computer', 2, 1, 2, '"MSI Bilgisayar"', 25000, [32, '"Intel Core i7 12900K"']);
Manager.createProduct('Phone', 7, 2, 1, '"Samsung Telefon"', 11000, ["'128MP'", "'Android'"]);
Manager.createProduct('Phone', 8, 2, 2, '"Apple Telefon"', 19000, ["'32MP'", "'iOS'"]);
Manager.createProduct('Readable', 9, 3, 1, '"1984"', 55, [384, '"George Orwell"']); 
Manager.getAllProducts();
//Manager.deleteCategory(2); // telefon kategorisini siler.
//Manager.showAllCategories() // kategorileri listeler.
let customer = CustomerManager.Customers.get('Zek');
if(customer) {
    customer.getBasket().addProductBasket(Manager.getProductByID(1), 2)
    customer.getBasket().addProductBasket(Manager.getProductByID(9), 2)
    console.log(`${customer.getCustomerName()} sepet tutarı: ${customer.getBasket().calculateBasketPrice()}`);
}else {
    console.log('Böyle bir kullanıcı bulunamadı.')
}

    




