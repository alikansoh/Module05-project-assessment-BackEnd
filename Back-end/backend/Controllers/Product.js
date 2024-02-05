import Product from "../Models/Product.js";

//create product
export const createProduct = async(req, res) => {
  try {
    const new_product = new Product(req.body);

    if (req.file) {
      new_product.image = req.file.path;
    }


    const product = await new_product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({featured: true})
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a product
export const updateProductById = async (req, res) => {
  try {
    const product_update_copy = req.body;

    if (req.file) {
      product_update_copy.image = req.file.path;
    }

    

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      product_update_copy,
      { new: true, runValidators: true } //new is to return updated object, validators is to validate conditions provided in models
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};