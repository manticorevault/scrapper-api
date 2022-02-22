const express = require("express");
const request = require("request-promise");

const app = express();
const PORT =  process.env.PORT || 5000;

const apiKey = "089dafaeab51ea38460dc92f1c63652e";
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

// The initial root route for the API.
app.get("/", (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("API Working");
})

// GET product details
app.get("/products/:productId", async (req: { params: { productId: any; }; }, res: { json: (arg0: any) => void; }) => {
    const { productId  } = req.params

    try {
        const response = await request(`${ baseUrl }&url=https://www.amazon.ae/dp/${ productId }`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
});

// GET products reviews
app.get("/products/:productId/reviews", async (req: { params: { productId: any; }; }, res: { json: (arg0: any) => void; }) => {
    const { productId } = req.params

    try {
        const response = await request(`${ baseUrl }&url=https://www.amazon.ae/product-reviews/${ productId }`)

        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
});

app.listen(PORT, () => {
    console.log("Server up and running! 🚀")
});