import {productModel} from '../../models/product.model.js'

class ProductDao{
    async getAll({limit=10, page=1, sort, category, status}){
        const sortValidValues=[-1,1,'-1','1']
        try{
            let query={};
            if (category||status){
                query={category} || {status};
            }
            if(isNaN(limit)||limit<=0){
                throw 'el limite debe ser un número mayor a 0'
            }
            if(isNaN(limit)||limit<=0){
                throw 'La página no es un número';
            }
            if(sortValidValues.includes(sort)){
                return await productModel.paginate(query,{limit:limit,page:page,sort:{price:sort}})
            }else{
                if(sort){
                    throw 'El valor de sort sólo debe ser 1 o -1' 
                }
            }
            return await productModel.paginate(query,{limit:limit || 10,page:page||1})
        }catch (err){
            console.log(err)
        }
    }
    async getById(id){
        return await productModel.findById(id);
    }

    async create(data){
        return await productModel.create(data)
    }

    async update(id, data){
        return await productModel.findAndUpdate(id, data,{new:true})    
    }

    async delete(id){
        return await productModel.findByIdAndDelete(id);
    }
    
};

export default new ProductDao();