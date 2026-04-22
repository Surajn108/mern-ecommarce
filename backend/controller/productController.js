import Products from "../models/Products";

// Create new Products 
const createProduct = async (req , res) =>{
    console.log(req.body);

    try{
        if (!req.body) {
            return res.status(400).json({ message: "Body is missing" });
        }

        const product= await product.create(req,body);
            res.json({message:"Product Created Successfuly"})
    }catch(err){
        res.status(500).json({message:"Product creation Fail" , err});

    }


};
// Get all the Products 
const getProducts = async (req , res) =>{
    console.log(req.body);

    try{
        const products = await Products.find().sort({ createdAt:-1 });

        res.status(200).json({
            message:"Products ",
            products,
        });
    }catch(err){
        res.status(500).json({message:"Products not Found", err});

    }
}

//Update Products


const updateProduct = async(req , res)=>{
    console.log(req.body);

    try {
        if (!req.body) {
          return res.status(400).json({ message: "Body is missing" });
        }
        
    }catch (error) {
        res.status(500).json({
          message: "Server error",
          error: error.message,
        });
      }

    try{
        const updateP = await Products.findByIdAndUpdate();


    }catch(err){
        res.status(500).json({message:"Server Error", err});

    }

}