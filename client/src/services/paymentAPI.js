import { $authorizationHost } from "./index";


export const makeOrder = async () => {

    const {data} = await $authorizationHost.post('api/payment/payment-order');
    
    return data;
}


export const getAllOrders  = async () => {

    const {data} = await $authorizationHost.get('api/payment/getAllOrders');
    
    return data;

}
