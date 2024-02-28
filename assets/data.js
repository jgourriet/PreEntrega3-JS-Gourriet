const productos = [
    {
        id: 1,
        category: 'monitor',
        nombre: 'Monitor Benq Zowie 27"',
        descripcion: 'XL-40',
        img: './assets/img/monitor1.png',
        precio: '350000',
    },
    {
        id: 2,
        category: 'monitor',
        nombre: 'Monitor Asus 24"',
        descripcion: 'ROG STRIX',
        img: './assets/img/monitor2.png',
        precio: '125000',
    },
    {
        id: 3,
        category: 'monitor',
        nombre: 'Monitor Predator 34"',
        descripcion: 'x34 curvo',
        img: './assets/img/monitor3.png',
        precio: '245000',
    },
    {
        id: 4,
        category: 'memoria',
        nombre: 'hyperx kingston',
        descripcion: 'DDR4 8gb',
        img: './assets/img/memoriaram.png',
        precio: '35000',
    },
    {
        id: 5,
        category: 'memoria',
        nombre: 'Tridentz',
        descripcion: 'DDR4 8gb',
        img: './assets/img/memoriaram2.png',
        precio: '28000',
    },
    {
        id: 6,
        category: 'memoria',
        nombre: 'Corsair Vengeance led',
        descripcion: ' DDR4 8gb',
        img: './assets/img/memoriaram3.png',
        precio: '13500',
    },
    {
        id: 7,
        category: 'gabinete',
        nombre: 'Gabinete Razor',
        descripcion: 'ATX MID TOWER',
        img: './assets/img/cpu.png',
        precio: '71000',
    },
    {
        id: 8,
        category: 'gabinete',
        nombre: 'Gabinete Aorus',
        descripcion: 'Ac300g',
        img: './assets/img/cpu2.png',
        precio: '78000',
    },
    {
        id: 9,
        category: 'gabinete',
        nombre: 'Gabinete Azza',
        descripcion: 'ATX 310',
        img: './assets/img/cpu3.png',
        precio: '95000',
    },
    {
        id: 10,
        category: 'placa',
        nombre: 'Nvidia Geforce',
        descripcion: 'Rtx 3080',
        img: './assets/img/placa1.png',
        precio: '361000',
    },
    {
        id: 11,
        category: 'placa',
        nombre: 'Nvidia Titan V',
        descripcion: 'VOLTA 12GB',
        img: './assets/img/placa3.png',
        precio: '278000',
    },
    {
        id: 12,
        category: 'placa',
        nombre: 'Nvidia Geforce MSI',
        descripcion: 'GTX 1050 Ti',
        img: './assets/img/placa2.png',
        precio: '242000',
    },
    {
        id: 13,
        category: 'teclado',
        nombre: 'Teclado gamer',
        descripcion: 'HyperX',
        img: './assets/img/teclado1.png',
        precio: '46000',
    },
    {
        id: 14,
        category: 'teclado',
        nombre: 'Teclado gamer',
        descripcion: 'Nisuta',
        img: './assets/img/teclado2.png',
        precio: '24000',
    },
    {
        id: 15,
        category: 'teclado',
        nombre: 'Teclado gamer',
        descripcion: 'Steelseries',
        img: './assets/img/teclado3.png',
        precio: '32000',
    },
    {
        id: 16,
        category: 'mouse',
        nombre: 'mouse Asus Rog',
        descripcion: 'Spatha X 12',
        img: './assets/img/mouse1.png',
        precio: '80000',
    },
    {
        id: 17,
        category: 'mouse',
        nombre: 'Mouse Logitech',
        descripcion: 'G502 HERO',
        img: './assets/img/mouse2.png',
        precio: '55000',
    },
    {
        id: 18,
        category: 'mouse',
        nombre: 'Mouse Logitech',
        descripcion: 'Pro Series G Pro Hero 16K',
        img: './assets/img/mouse3.png',
        precio: '165000',
    },
    {
        id: 19,
        category: 'procesador',
        nombre: 'Procesador Intel',
        descripcion: 'Core I5',
        img: './assets/img/procesador1.png',
        precio: '83000',
    },
    {
        id: 20,
        category: 'procesador',
        nombre: 'Procesador Amd',
        descripcion: 'Ryzen 5',
        img: './assets/img/procesador2.png',
        precio: '87000',
    },
    {
        id: 21,
        category: 'procesador',
        nombre: 'Procesador Intel',
        descripcion: 'Core I9 X-SERIES',
        img: './assets/img/procesador3.png',
        precio: '231000',
    },
];


//para hacer la paginacion de ver mas
//usamos el array de productos y lo dividimos en arrays de size elementos
const splitProducts = size => {
    let dividedProducts = [];
    for (let i = 0; i < productos.length; i += size) {
        dividedProducts.push(productos.slice(i, i + size));
    }
    return dividedProducts;
}

//funcion para dividir los productos en arrays de 6 y manejar la paginacion
const productsController = {
    dividedProducts: splitProducts(3),
    nextProductsIndex: 1,
    productsLimit: splitProducts(3).length,
};
