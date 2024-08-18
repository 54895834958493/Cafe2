import { $authorizationHost} from "./index";


export const getInformation  = async () => {

    const {data} = await $authorizationHost.get('api/information/getInfo');
    
    return data;
}


export const changeInformation = async ({name,surname,patronymic,phone}) => {

    const {data} = await $authorizationHost.put('api/information/changeInfo',{name,surname,patronymic,phone});


    return data;    
}


export const getAddress  = async () => {

    const {data} = await $authorizationHost.get('api/address/getAddress');
    
    return data;
}

export const changeAddress = async ({city,street,region,index}) => {

    const {data} = await $authorizationHost.put('api/address/changeAddress',{city,street,region,index});


    return data;    
}