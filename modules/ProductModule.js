const Product = require("../model/product");
const sharp = require("sharp");

//^----------------------> Post Product <----------------------^//
exports.PostProduct = async (req, res, next) => {
    let primary_image = 1;
    let file_array = await ImageFormat(req.files, primary_image);
    const product_data = DataFormat(req.body);
    product_data.product_images = file_array;

    try {
        let response = await Product(product_data).save();
        res.status(201).json({
            data: response,
            msg: "You have successfully updated the product details..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//^----------------------> Get All Product <----------------------^//
exports.GetProduct = async (req, res, next) => {
    let response = await Product.find();
    res.send(response);
};

//^----------------------> Get Product By Name <----------------------^//
exports.GetProductByName = async (req, res, next) => {
    let response = await User.find({ team: req.params.team });
    if (!Team) {
        return res
            .status(400)
            .send({ msg: "Product not available", status: "error" });
    }
    res.send(response);
};

//^----------------------> Get Product By ID <----------------------^//
exports.GetProductById = async (req, res, next) => {
    let response = await Product.findById(req.params.id);
    res.send(response);
};

//^----------------------> Update Product By ID <----------------------^//
exports.UpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res
                .status(400)
                .send({ msg: "Product not available", status: "error" });
        }

        const data = DataFormat(req.body);

        const response = await Product.findByIdAndUpdate(
            req.params.productId,
            data,
            { new: true }
        );

        res.status(200).json({
            data: response,
            msg: "You have successfully updated the product details..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

//^----------------------> Delete Product By ID <----------------------^//
exports.DeleteProduct = async (req, res, next) => {
    let response = await Product.findByIdAndRemove(req.params.productId);
    res.send(response);
};

//^--------------------------> Image Resize <--------------------------^//
const ImageResize = async (file, type, size) => {
    return await sharp(file.buffer)
        .resize({ width: size, fit: sharp.fit.cover })
        .toFormat("png")
        .toBuffer();
};

//^--------------------------> Data Format <--------------------------^//
const DataFormat = (data) => {
    return {
        team: data.team,
        kit_type: data.kit_type,
        product_name: data.product_name,
        avl_quantity: JSON.parse(data.avl_quantity),
        price: JSON.parse(data.price),
        available: data.available,
    };
};

//^--------------------------> Image Format <--------------------------^//
const ImageFormat = async (files, primary) => {
    let file_array = [];

    for (let file of files) {
        let image_resize = {
            cover: await ImageResize(file, "cover", 300),
            thumbnail: await ImageResize(file, "thumbnail", 100),
            primary: file_array.length === primary - 1 ? true : false,
        };

        file_array.push(image_resize);
    }
    return file_array;
};
