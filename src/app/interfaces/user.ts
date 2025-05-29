export interface User {
    username: string;
    role: 'admin' | 'employee';
    token: string;
}
