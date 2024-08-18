import { $host,$authorizationHost} from "./index";

export const getCardsByTypeId  = async (typeId) => {

    const {data} = await $host.get(`api/goods?typeId=${typeId}`);
    
    return data;
}

export const getAllGoods  = async () => {

    const {data} = await $host.get(`api/goods/`);
    
    return data;
}

export const createNewGood  = async (formData) => {

        const {data} = await $authorizationHost.post('api/goods/create', formData);
    
         return data;
  
}

export const deleteOneGoodByName  = async (name) => {

    const {data} = await $authorizationHost.delete('api/goods/deleteGood', { data: { name }} );
    
    return data;
}
