export interface User {
    username: string;
    password: string;
    name: string;
    email: string;
}

export interface Courier extends User {
    id?: number
}
