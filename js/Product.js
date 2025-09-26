export class Product {
    constructor(name, price, stock, image, id = Date.now()){
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.id = id;
    }

    toHTML(){ //No recibo el id y lo paso directamente al boton con this.id
        return `
                <li>
                    <img src="${this.image}" alt="${this.name}">
                    <h3>${this.name}</h3>
                    <p>Precio: ${this.price}</p>
                    <p>Stock: ${this.stock}</p>
                    <button data-id="${this.id}" class="btnEdit" >Editar</button>
                    <button data-id="${this.id}" class="btnDelete" >Eliminar</button>
                </li>`
    }
}