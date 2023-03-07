import {cartModel} from '../../models/cart.model.js';

class CartDao {
    async createCart() {
        return await cartModel.create();
    }

    async getCartById(id) {
        return await cartModel.findByOne({ id });
    }

    async addProductToCart(cid, list) {
        list.forEach(async (data) => {
            let { product, quantity } = data;
            const isInCart = await cartModel.findOne({ _id: cid, "products.product": product })

            console.log(isInCart)

            if (!isInCart) {
                await cartModel.findOneAndUpdate({ _id: cid }, { $push: { products: { product: product, quantity: quantity || 1 } } });
            } else {
                await cartModel.findOneAndUpdate({ _id: cid, "products.product": product }, { $inc: { "products.$.quantity": quantity } })
            }
        })
        return await cartModel.$find({ _id: cid });
    }
    
    async addQuantity(cid, pid, qty){
        return await cartModel.findOneAndUpdate({_id:cid, "products.product":pid}, {$inc:{"products.$.quantity":qty}});
    }
   
    async deleteProduct(cid, pid) {
        return await cartModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: pid } } });
    }
   
    async deleteAllProducts(cid){
        return await cartModel.findeOneAndReplace({_id:cid},{products:[]});
    }
}

export default new CartDao();