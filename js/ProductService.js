import { Product } from "./Product.js";

let products = [];

export const ProductService = {
    add: (name, price, stock, image) => {
        const product = new Product(name, price, stock, image);
        products.push(product);
        saveToLocalStorage();
    },

    list: () => {
        const productItem = localStorage.getItem("products");

        if(productItem){
            let productPlain = JSON.parse(productItem);
            products = productPlain
                    .map(product => new Product(
                        product.name,
                        product.price,
                        product.stock,
                        product.image,
                        product.id)); //Restauro el id de la lista
        }
        return products;
    },

    delete: (id) => {
        products = products.filter(product => product.id !== id);
        saveToLocalStorage();
    },

    update: (id,newName,newPrice,newStock,newImage) => {
        const product = products.find(p => p.id === id);

        if (product) {
            product.name = newName;
            product.price = newPrice;
            product.stock = newStock;
            product.image = newImage;
            saveToLocalStorage();
        }
    },

    findById: (id) => {
        return products.find(product => product.id === id) || null; // agrego NULL por si no lo encuentra

    }
}

// funcion que guarda los productos en un json en el LS
const saveToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(products));
}

