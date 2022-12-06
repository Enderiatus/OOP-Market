module.exports = class Basket {

    constructor() {
        this.products = new Map();
    }

    getBasketProducts() {
        return this.products;
    }
    
    addProductBasket(product, amount) {
        if(this.products.has(product)) {
            this.products.set(product, this.products.get(product)+amount);
            console.log(`${product} ürününe ${amount} adet daha eklendi.`);
            return;
        }
        this.products.set(product, amount);
        console.log(`Sepete ${product.productName}, ${amount} adet yeni eklendi.`);
    }

    reduceProductBasket(product, amount) {
        if(this.products.has(product)) {
            if(this.products.get(product)-1 == 0) {
                this.removeProductBasket(product, amount)
                console.log(`${product} ürünü silindi..`)
                return;
            }else {
                this.products.set(product, this.products.get(product)-1);
                console.log(`${product.productName} ürünü sayısı ${amount} azaltıldı.`)
                return;
            }
        }else {
            console.log('Böyle bir ürün bulunamadı.')
        }
    }

    removeProductBasket(product) {
        if(!this.products.has(product)) {
            console.log('Böyle bir ürün sepette yok.');
            return;
        }
        this.products.delete(product);
        console.log('Ürün sepetten silindi.')
    }

    calculateBasketPrice() {
        let price = 0;
        this.getBasketProducts().forEach(function(value, key) {
            price += key.productPrice*value;
        });
        return price;
    }
}