import { Product } from "./Product.js";
import { ProductService } from "./ProductService.js";

const btnAdd = document.getElementById("btnAdd");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const stockInput = document.getElementById("stock");
const imageInput = document.getElementById("image");
const list = document.getElementById("productList");

let editId = null;

function render() {
    //Mapeo de JSON a product

    //Traigo los productos desde el servicio
    const productToRender = ProductService.list();

    //Convierto cada producto en HTML y lo pongo dentro de la lista
    list.innerHTML = productToRender
                    .map(product => product.toHTML())
                    .join("");

    //Delete
    //Recorro todos los botones de eliminar que acabo de dibujar
    document.querySelectorAll(".btnDelete").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id,10);
            ProductService.delete(id);
            render();
        })
    })
    
    //Edit
    //Recorro todos los botones de editaar que acabo de dibujar
    document.querySelectorAll(".btnEdit").forEach( btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id,10);
            const product = ProductService.findById(id);

            if(product){
                nameInput.value = product.name;
                priceInput.value = product.price;
                stockInput.value = product.stock;
                imageInput.value = product.image;
                editId = id;
                btnAdd.textContent = "Actualizar.";
            }
        });
    });
}

btnAdd.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const stock = stockInput.value.trim();
    const image = imageInput.value.trim();

    if(!name || !price || !stock) {
        return alert("AVISO: Complete todos los campos.");
    }

    if(editId === null){
        ProductService.add(name, price, stock, image);
    } else {
        ProductService.update(editId, name, price, stock, image);
        editId = null;
        btnAdd.textContent = "Agregar";
    }

    nameInput.value = "";
    priceInput.value = "";
    stockInput.value = "";
    imageInput.value = "";
    render();
})

render();