import {products, getProduct, Product, Clothing, Appliance} from '../../data/products.js';

describe('test suite: getProduct()', () => {
    it('get a product by id', () => {
        expect(getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")).toEqual(
            new Product ({
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
            })
        )
    })
})

describe('test suite: Classes', () => {
    it('Product class', () => {
        const product = new Product({
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
        })

        expect(product.getStartUrl()).toEqual(`./images/ratings/rating-${product.rating.stars * 10}.png`)
        expect(product.getPrice()).toEqual('10.90')
        expect(product.extraInfoHTML()).toEqual('')
    })

    it('Clothing class', () => {
        const product = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing",
            sizeChartLink: "images/clothing-size-chart.png"
        })

        expect(product.extraInfoHTML()).toEqual(`<a href="${product.sizeChartLink}" target="_blank">Size chart</a>`)
    })

    it('Clothing class', () => {
        const product = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: 'appliance',
            instructionsLink: 'images/appliance-instructions.png',
            warrantyLink: 'images/appliance-warranty.png'
        })

        expect(product.extraInfoHTML()).toEqual(`<a href="${product.instructionsLink}" target="_blank">Instructions</a><a href="${product.warrantyLink}" target="_blank">Warranty</a>`)
    })
})