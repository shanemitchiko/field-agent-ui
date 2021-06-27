import { createContext } from "react";

const LoginContext = createContext({
    username: null,
    setUsername: () => { }
});

export default LoginContext;