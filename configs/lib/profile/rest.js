import { HttpGet, HttpPost, HttpPut } from "../../axios";

export async function getProfile(){
    return await HttpGet('accounts', null);
}

export async function getTransactions(){
    return await HttpGet('transactions', null);
}

export async function uploadImage(data){
    return await HttpPost('uploads', data, {'Content-Type': 'multipart/form-data'}, null);
}

export async function createTrans(data){
    return await HttpPost('transactions', data, null, null);
}

export async function updateProfile(data){
    return await HttpPut('accounts/information', data, null);
}