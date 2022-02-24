const express = require("express");
const request = require("request-promise");

const app = express();
const PORT =  process.env.PORT || 5000;

interface RequestParams {

}

// const apiKey = "089dafaeab51ea38460dc92f1c63652e";

const generateUrl = (apiKey: any) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

// The initial root route for the API.
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("API Working");
});

// GET product details
app.get("/products/:productId", async (req: { params: { productId: any; }, query: any; }, res: { json: (arg0: any) => void; }) => {
    const { productId  } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${ generateUrl(apiKey) }&url=https://www.amazon.ae/dp/${ productId }`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

// GET product reviews
app.get("/products/:productId/reviews", async (req: { params: { productId: any; }, query: any; }, res: { json: (arg0: any) => void; }) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${ generateUrl(apiKey) }&url=https://www.amazon.ae/product-reviews/${ productId }`)

        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});

// GET product offers
app.get("/products/:productId/offers", async (req: { params: { productId: any; }, query: any; }, res: { json: (arg0: any) => void; }) => {
    const { productId } = req.params
    const { api_key } = req.query
    
    try {
        const response = await request(`${ generateUrl(apiKey) }&url=https://www.amazon.ae/gp/offer-listing/${ productId }`)

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

// GET search results
app.get("/search/:searchQuery", async (req: { params: { searchQuery: any; }, query: any; }, res: { json: (arg0: any) => void; }) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query

    try {
        const response = await request(`${ generateUrl(apiKey) }&url=https://www.amazon.ae/s?k=${ searchQuery }`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

app.listen(PORT, () => {
    console.log("Server up and running! 🚀")
});