import { $host ,$authorizationHost} from ".";


export const getTypes  = async () => {

    const {data} = await $host.get('api/type/getAllTypes');
    
    return data;
}

export const createType = async ({name, route}) => {

    const {data} = await $authorizationHost.post('api/type/createType',{name,route});
    
    return data;
}

export const getOneTypeById  = async (route) => {

    const {data} = await $host.get('api/type/' + route);
    
    return data;
}

export const deleteTypeByName  = async (typeName) => {

    const {data} = await $authorizationHost.delete('api/type/delete', { data: { typeName } });
    
    return data;
}