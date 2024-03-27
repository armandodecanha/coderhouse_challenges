function propsProducts(req, res, next) {
  const { title, photo, price, stock} = req.body;
  if (!title || !price || !stock) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} Title, photo, price and stock are required`,
    });
  } else {
    return next();
  }
}

export default propsProducts;