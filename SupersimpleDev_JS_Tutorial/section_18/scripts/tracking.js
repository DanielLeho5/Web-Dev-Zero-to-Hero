import {products, getProduct, loadProductsFetch} from "../data/products.js"
import {orders} from "../data/orders.js"
import { updateCartQuantity } from "../data/cart.js"

const url = new URL(window.location.href)

const orderId = url.searchParams.get('orderId')
const productId = url.searchParams.get('productId')

async function renderPage() {
    await loadProductsFetch()

    const product = getProduct(productId)
    //console.log(product.id)

    const order = orders.find(o => o.id === orderId)
    //console.log(order)

    const orderedProduct = order.products
        .find(p => p.productId === product.id)
    //console.log(orderedProduct)

    const date = new Date(orderedProduct.estimatedDeliveryTime).toLocaleDateString(
    "en-US", 
    {
        weekday: "long",
        month: "long",
        day: "numeric"
    })
    //console.log(date)

    document.querySelector('.js-order-tracking').innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${date}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderedProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>
    `

    setProgressBar(new Date(orderedProduct.estimatedDeliveryTime), new Date(order.orderTime))
}

function setProgressBar(estDelivery, orderTime) {
    const today = new Date()
    const progress = (today - orderTime) / (estDelivery - orderTime) * 100
    
    document.querySelector('.js-progress-bar').style.width = `${progress}%`
}

updateCartQuantity()
renderPage()