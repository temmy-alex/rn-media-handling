import { HttpPost } from "../../axios";

export async function login(data){
    return await HttpPost('auths/login', data, {}, null);
}

export async function register(data){
    return await HttpPost('auths/register', data, {}, null);
}