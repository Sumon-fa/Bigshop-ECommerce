const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const ApiFeature = require("../utils/apiFeature");
const catchAsyncError = require("../middlewares/catchAsyncError");
//create newProduct => /api/v1/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  console.log(req.body.user);
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
// get All products =>/api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;

  const apiFeatures = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const productCount = await Product.countDocuments();

  const products = await apiFeatures.query; //this
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});
// get single products =>/api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
// update  products =>/api/v1/admin/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    success: true,
    product,
  });
});
// delete products =>/api/v1/admin/delete/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(201).json({
    success: true,
    message: "Product deleted successfully",
  });
});
