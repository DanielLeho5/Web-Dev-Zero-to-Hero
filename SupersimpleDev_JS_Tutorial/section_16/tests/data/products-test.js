import {products, getProduct} from '../../data/products.js'

describe('test suite: getProduct()', () => {
    it('get a product by id', () => {
        expect(getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")).toEqual(
            {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                stars: 4.5,
                count: 87
                },
                priceCents: 1090,
                keywords: [
                "socks",
                "sports",
                "apparel"
                ]
            }
        )
    })
})