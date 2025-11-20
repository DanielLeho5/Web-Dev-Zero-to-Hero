import { orders } from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import { loadProductsFetch, products } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";

const ordersGrid = document.querySelector('.js-orders-grid');

async function generatePage(){

    await loadProductsFetch()

    let html = ''

    orders.forEach(order => {

        const date = new Date(order.orderTime).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric"
        })

        const total = formatCurrency(order.totalCostCents)

        console.log(order)
        let orderDetails = '';
        order.products.forEach(product => {

            const matchingProduct = products.find(prod => prod.id === product.productId)

            const estimatedDelivery = new Date(product.estimatedDeliveryTime).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric"
            })

            orderDetails += `
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                <div class="product-delivery-date">
                    Arriving on: ${estimatedDelivery}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${product.productId}" data-quantity="${product.quantity}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>
            `
        })

        const orderHTML = `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${date}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${total}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderDetails}
          </div>
        </div>
        `

        html += orderHTML;
    });

    ordersGrid.innerHTML = html

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.productId
        const quantity = Number(button.dataset.quantity)
        addToCart(id, quantity)
        updateCartQuantity()
      })
    })
}

updateCartQuantity()
generatePage()