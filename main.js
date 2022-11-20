'use strict'

let pizzas = [
    {
        id: 1,
        nombre: 'Muzzarella',
        ingredientes: ['Queso mozzarella', ' aceitunas', ' y oregano'],
        precio: 1200, 
        imagen: 'imagenes/muzza.jpg',
    },
    {
        id: 2,
        nombre: 'Fugazzetta',
        ingredientes: ['Queso mozzarella', ' cebolla', ' y oregano'],
        precio: 1300,
        imagen: 'imagenes/fugazzeta.jpeg',
    },
    {
        id: 3,
        nombre: 'Jamon y Queso',
        ingredientes: ['Queso mozzarella', ' jamón'],
        precio: 1400,
        imagen: 'imagenes/jamon.jpg',
    },
    {
        id: 4,
        nombre: 'de Cancha',
        ingredientes: ['Salsa de tomate', ' salsa picante'],
        precio: 500,
        imagen: 'imagenes/decancha.jpg',
    },
    {
        id: 5,
        nombre: 'Peperonni',
        ingredientes: ['Queso mozzarella', ' queso parmesano', ' y el pepperoni'],
        precio: 1500,
        imagen: 'imagenes/pepperoni.jpg',
    },
    {
        id: 6,
        nombre: 'Cuatro quesos',
        ingredientes: ['Queso Muzzarella', ' queso fontana', ' queso gorgonzola', ' y queso parmesano'],
        precio: 1600,
        imagen: 'imagenes/cuatroquesos.jpg',
    }
]



const FORM = document.getElementById("formulario");
const INPUT = document.getElementById("input_number");
const SECTION = document.getElementById("guardar")


/* Ejercicio 3 */

const activePizza = JSON.parse(localStorage.getItem("pizza")) || null;

const saveLocalStorage = (pizza) => {
    if(!pizza) return
    localStorage.setItem("pizza",JSON.stringify(pizza))
}


const pizzaPorID = (value) => pizzas.find((pizza) => pizza.id === value)

/* let pizza = JSON.parse(localStorage.getItem("pizza")) || null;


const saveLocalStorage = () => {
    return localStorage.setItem("pizza", JSON.stringify(pizzas));
}
 */
const isEmpty = () => {
    SECTION.innerHTML = 
    `
    <h2>No pudimos encontrar tu pizza, ingresa un número por favor.</h2>
    `
}


const renderCardPizza = (pizza) => {
    const {nombre, precio, ingredientes, imagen} = pizza;
    return `
    <div class="card">
    <img src="${imagen}">
    <h2>Genial! Tu pizza es: ${nombre.toUpperCase()}</h2>
    <p>Los ingredientes son: ${ingredientes.map((ingrediente) => ingrediente).join(", ")}</p>
    <h3>Con un precio de: $${precio}</h3>
    </div>
    `
}


const renderResult = (pizza) => {
    if (!pizza) {
        SECTION.innerHTML = `<h2>No pudimos encontrar tu pizza, ingresa un número entre 1 y 6.</h2>`
      } else {
        SECTION.innerHTML = renderCardPizza(pizza);
      }
}

const initialRender = () => {
  if (!activePizza) {
    SECTION.innerHTML = `
    <h2 class = "texto_h2">No hay ninguna pizza guardada en LocalStorage.</h2>
    `
  } else {
    SECTION.innerHTML = `
    <h2>Última pizza encontrada.</h2>
    ${renderCardPizza(activePizza)};
    `
  }
}
/*     if (!pizza) {
        SECTION.innerHTML = `<h2>No pudimos encontrar tu pizza, ingresa un número entre 1 y 6.</h2>`
      } else {
    SECTION.innerHTML = `
    <div class="card">
    <img src="${pizza.imagen}">
    <h2>Genial! Tu pizza es: ${pizza.nombre}</h2>
    <p>Los ingredientes son: ${pizza.ingredientes}</p>
    <h3>Con un precio de: $${pizza.precio}</h3>
    </div>
    `
  } */


/* const renderForm = (dataPizza) => dataPizza.map((pizza) => render(pizza)).join(", ");
 */
const showPizza = (e) => {
    e.preventDefault();
    const idNumero = INPUT.value;
    if (!idNumero) {
        isEmpty(idNumero)
        return;
    } else {
    const pedirPizza = pizzaPorID(Number(idNumero));
    renderResult(pedirPizza);   
    saveLocalStorage(pedirPizza);
    FORM.reset();
}   
}


const init = () => {
  initialRender();  
  FORM.addEventListener("submit", showPizza);
}

init();