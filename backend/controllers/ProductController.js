/* === IMPORT === */
import Product from "../models/ProductModel.js";

/* === GET PRODUCTS */
export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll(); // find the products
        res.status(200).json(response); // res status ok
    } catch (error) {
        console.log(error.message); // error message
    }
}

/* === GET PRODUCT BY ID */
export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            where: {
                id: req.params.id
            }
        }); // find the product
        res.status(200).json(response); // res status ok
    } catch (error) {
        console.log(error.message); // error message
    }
}

/* === CREATE PRODUCT */
export const createProduct = async (req, res) => {
    try {
        await Product.create(req.body); // create product
        res.status(201).json({msg: "Product has been Added"}); // created
    } catch (error) {
        console.log(error.message); // error message
    }
}

/* === UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
    try {
        await Product.update(req.body, {
            where: {
                id: req.params.id
            }
        }); // create product
        res.status(200).json({msg: "Product has been Updated"}); // created
    } catch (error) {
        console.log(error.message); // error message
    }
}

/* === DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        }); // create product
        res.status(200).json({msg: "Product has been Deleted"}); // created
    } catch (error) {
        console.log(error.message); // error message
    }
}