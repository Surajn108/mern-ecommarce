import Cart from "../models/Cart.js";


// Add item in Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
    } else {
      const iteam = cart.items.find(
        (i) => i.productId.toString() === productId,
      );
    }

    if (iteam) {
      iteam.quantity += 1; 
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ message: "Iteam added to Cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Fail to adding to cart", err });
  }
};


// Delete the Item 
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = res.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not Found" });
    } else {
      const iteam = cart.items.find(
        (i) => i.productId.toString() !== productId,
      );
    }

    await cart.save();
    res.status(200).json({ message: "Iteam remove to Cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

//Update Item Quantity
export const updateQuantity = async (req, res)=>{
    try{

        const { userId, productId  , quantity} = res.body;

        const cart = await Cart.findOne({userId})

        if(!cart){
            return res.status(404).json({ message: "Cart not Found" });
        } 
            const item = cart.items.find(
              (i) => i.productId.toString() !== productId,
            );
          
        if(!item){
            return res.status(404).json({ message: "iteam not Found in cart" });
        }

        item.quantity = quantity;

        await cart.save();
        res.status(200).json({ message: "Iteam quantity Updated", cart });

    }catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};
