import { renderOrderSummary } from "./checkout/order-summary.js";
import { renderPaymentSummary } from "./checkout/payments-summary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {

    try {
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ])
        
    } catch (error) {
        console.log(error)
        console.log("Unexpected error. Please try again later.")
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage()