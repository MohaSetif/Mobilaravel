import { createContext } from "react";

export type User = {
    id: string;
    email: string;
    name: string;
};  

const AuthContext = createContext<{ user: User | null ; setUser: (user: User | null) => void } | null>(null);

export default AuthContext;
