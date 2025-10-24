import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let mathchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            mathchingProduct = product;
        }
    })

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${mathchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${mathchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${mathchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(mathchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-${cartItem.productId}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${mathchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input js-quantity-input-${mathchingProduct.id}" data-product-id="${mathchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${mathchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${mathchingProduct.id}">
                    Delete
                    </span><br>
                    <span class="update-validation js-update-validation-${mathchingProduct.id}"></span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${mathchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${mathchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${mathchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
})

function updateCheckoutCartQuantity() {
    
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-checkout-item-counter').innerHTML = cartQuantity + ' items';
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCheckoutCartQuantity();
    })
})

document.querySelectorAll('.js-update-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
        const {productId} = link.dataset
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    })
})

document.querySelectorAll('.js-save-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
        const {productId} = link.dataset;
        saveUpdatedQuantity(productId);
    })
})

document.querySelectorAll('.js-quantity-input').forEach(element => {
    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const {productId} = element.dataset;
            saveUpdatedQuantity(productId);
        }
    })
})

function saveUpdatedQuantity(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
    let quantity = Number(inputElement.value);
    let timeoutId;

    if (quantity > 0) {
        updateQuantity(productId, quantity);
        document.querySelector(`.js-quantity-${productId}`).innerHTML = quantity;
        updateCheckoutCartQuantity();
    } else if (quantity === 0 && inputElement.value !== '') {
        removeFromCart(productId);
        container.remove();
        updateCheckoutCartQuantity();
    } else {
        const validationMessage = document.querySelector(`.js-update-validation-${productId}`);
        validationMessage.innerHTML = 'Invalid quantity';
        clearInterval(timeoutId);
        timeoutId = setTimeout(() => {
            validationMessage.innerHTML = '';
        }, 2000);
    }
    inputElement.value = '';
}

updateCheckoutCartQuantity();