//!SELECCIONANDO ELEMENTOS DEL DOM:
const products = document.querySelector('.cards-cont');
const productsCart = document.querySelector('.prod-cont');
const total = document.querySelector('.total');
const categories = document.querySelector('.cat-cont');
const categoriesList = document.querySelectorAll('.category');
const btnLoad = document.querySelector('.btn-cat');
const buyBtn = document.querySelector('.btn-buy');
const cartBtn = document.querySelector('.cart-i');
const cartMenu = document.querySelector('.carrito-cont');
const deleteBtn = document.querySelector('.btn-delete');
const closeBtn = document.getElementById('close');
const contadorCarrito = document.querySelector('.contador-cont');
const contadorSpan = document.getElementById('contador-span');
const burgerBtn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const burgerList = document.querySelector('.burger-list');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');

// Recuperación de datos del carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar en el localStorage
const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
};
//Función de renderizado de productos
//Genero el HTML de la tarjeta de producto, incluyendo la imagen, nombre, descripción, precio y botón para añadir al carrito.
const renderProduct = product => {
    const { id, nombre, descripcion, img, precio } = product;
    return `
    <div class="card">
        <div class="card-img">
        <img src="${img}
        " alt="">
    </div>
        <div class="card-info">
        <div class="titulo-sub">
            <h1>
            ${nombre}</h1>
            <h2>${descripcion}</h2>
        </div>
        <div class="precio-btn-card">
            <span class="card-precio">$${precio}</span>
            <button class="btn-card"
            data-id='${id}'
            data-name='${nombre}'
            data-precio='${precio}'
            data-img='${img}'
            >Agregar</button>
        </div>
        </div>
    </div>
    `;
};


//funcion para renderizar los productos divididos.
//recibe un index, si no recibe nada por defecto va a ser 0
//si el index es 0, renderiza el primer array del data
const renderDividedProducts = (index = 0) => {
    products.innerHTML += productsController.dividedProducts[index].map(renderProduct).join('');
};


const renderFilteredProducts = (category) => {
    const productList = productos.filter((product) => product.category === category);

    products.innerHTML = productList.map(renderProduct).join('');


}

//funcion para renderizar productos 
//recibe un index, si no le pasamos nada por default va a ser 0 y una categoria, si no le pasamos nada por default va a ser undefined
//si no hay categoria renderizame los productos del array dividido
const renderProducts = (index = 0, category = undefined) => {
    if (!category) {
        renderDividedProducts(index);
        return;
    }
    renderFilteredProducts(category);
};

//logica de filtros
const changeShowMoreBtnState = category => {
    if (!category) {
        btnLoad.classList.remove('hidden');
        return;
    };
    btnLoad.classList.add('hidden');
}

const changeBtnActiveState = selectedCategory => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectedCategory) {
            categoryBtn.classList.remove('active');
            return;
        }
        categoryBtn.classList.add('active');
    })
}

const changeFilterState = e => {
    const selectedCategory = e.target.dataset.category;
    changeBtnActiveState(selectedCategory);
    changeShowMoreBtnState(selectedCategory);
};

const applyFilter = e => {
    if (!e.target.classList.contains('category')) return;
    changeFilterState(e);
    if (!e.target.dataset.category) {
        products.innerHTML = '';
        renderProducts();
    } else {
        renderProducts(0, e.target.dataset.category);
        productsController.nextProductsIndex = 1;
    }

};

//funcion que chekee si estamos en el ultimo array de productos divididos
const isLastIndexOf = () => productsController.nextProductsIndex === productsController.productsLimit;

//funcion para cargar mas productos
const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndexOf()) {
        btnLoad.classList.add('hidden');
    }
}

//Logica para abrir y cerrar el carrito
const toggleCart = () => {
    cartMenu.classList.toggle('show-cart');
    burgerMenu.classList.remove('show-burger-menu');
};

const closeCartX = () => {
    closeBtn.addEventListener('click', () => {
        if (cartMenu.classList.contains('show-cart')) {
            cartMenu.classList.remove('show-cart');
        }
    });
};


//funcion render carrito
const renderCartProduct = (cartProduct) => {
    const { id, name, precio, img, cantidad } = cartProduct;
    return `
    <div class="cart-item">
        <img src="${img}" alt="" class="cart-img">
        <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <p class="item-bid"></p>
            <span class="item-price">$${precio}</span>
        </div>
        <div class="item-handler">
            <button class="quantity-handler down" data-id=${id}>-</button>
            <span class="item-quantity">${cantidad}</span>
            <button class="quantity-handler up" data-id=${id}>+</button>
        </div>    
    </div>
    `;
};

const renderCart = () => {
    if (!cart.length) {
        productsCart.innerHTML =
            `
        <p class="empty-msg">No hay productos en el carrito</p>
        `;
        return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join('');
};

const getCartTotal = () => {
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.cantidad, 0);
}

const showTotal = () => {
    total.innerHTML = `$ ${getCartTotal()}`

};

const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add('disable');
    } else {
        btn.classList.remove('disable');
    }
};

const createProductData = (id, name, precio, img) => {
    return { id, name, precio, img };
}

const isExistingCartProduct = (product) => {
    return cart.find((item) => item.id === product.id);
};

const addUnitToProduct = (product) => {
    cart = cart.map((cartProduct) => {
        return cartProduct.id === product.id ? { ...cartProduct, cantidad: cartProduct.cantidad + 1 } : cartProduct
    })
}

const createCartProduct = (product) => {
    cart = [...cart, { ...product, cantidad: 1 }]
}

const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
    actContador();
};

const addProduct = e => {
    if (!e.target.classList.contains('btn-card')) return;
    const { id, name, precio, img } = e.target.dataset;
    const product = createProductData(id, name, precio, img);
    console.log(product);

    if (isExistingCartProduct(product)) {
        //añadir una unidad
        addUnitToProduct(product);
    } else {
        //crear el producto
        createCartProduct(product);
    }
    checkCartState();
};

const removeProductFromCart = (existingProduct) => {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    checkCartState()
}

const substractProductUnit = (existingProduct) => {
    cart = cart.map(product => {
        return product.id === existingProduct.id ? { ...product, cantidad: Number(product.cantidad) - 1 } : product;
    })
}

const handleMinusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);

    if (existingCartProduct.cantidad === 1) {
        if (window.confirm('¿Desea eliminar el producto del carrito?')) {
            removeProductFromCart(existingCartProduct)
        }
        return;
    }
    substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
    const existingCartProduct = cart.find((item) => item.id === id);
    addUnitToProduct(existingCartProduct);
};

const handleQuantity = (e) => {
    if (e.target.classList.contains('down')) {
        handleMinusBtnEvent(e.target.dataset.id);
    } else if (e.target.classList.contains('up')) {
        handlePlusBtnEvent(e.target.dataset.id)
    }
    checkCartState();
};

const resetCartItems = () => {
    cart = [];
    checkCartState();
};

const completeCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItems();
        alert(successMsg);
    }
};

const completeBuy = () => {
    completeCartAction('¿Desea completar su compra?', '¡Gracias por su compra!');
};

const deleteCart = () => {
    completeCartAction('¿Desea eliminar su compra?', 'El carrito esta vacio');
};

const actContador = () => {
    if (localStorage.getItem('cart')) {
        let contador;
        arrayCarrito = JSON.parse(localStorage.getItem('cart'));
        cantidadesLS = arrayCarrito.map(i => i.cantidad)
        contador = cantidadesLS.reduce((a, b) => {
            return a + b;
        }, 0);

        contadorSpan.innerHTML = `${contador}`;

        if (contador === 0) {
            contadorCarrito.style.visibility = 'hidden';
            contadorSpan.style.visibility = 'hidden';
        } else {
            contadorCarrito.style.visibility = 'visible';
            contadorSpan.style.visibility = 'visible';
        }
    };

};

const showBurgerMenu = (e) => {
    burgerMenu.classList.toggle('show-burger-menu');
    navLinks.classList.toggle('burger-list');
    cartMenu.classList.remove('show-cart');
};


const closeOnClick = (e) => {
    if (!e.target.classList.contains('navbar-link')) return;
    navLinks.classList.remove('burger-list');

}

//funcion inicializadora
const init = () => {
    renderProducts();
    closeCartX();
    categories.addEventListener('click', applyFilter);
    btnLoad.addEventListener('click', showMoreProducts);
    cartBtn.addEventListener('click', toggleCart);
    document.addEventListener('DOMContentLoaded', renderCart);
    document.addEventListener('DOMContentLoaded', showTotal);
    products.addEventListener('click', addProduct);
    productsCart.addEventListener('click', handleQuantity);
    disableBtn(deleteBtn);
    disableBtn(buyBtn);
    buyBtn.addEventListener('click', completeBuy);
    deleteBtn.addEventListener('click', deleteCart);
    actContador();
    burgerBtn.addEventListener('click', showBurgerMenu);
};

init();

