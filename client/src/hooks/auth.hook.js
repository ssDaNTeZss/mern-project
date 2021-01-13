import {useState, useCallback, useEffect} from 'react';
import {useHttp} from "./http.hook";

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [role, setRole] = useState(null);

    const {request} = useHttp();
    const roleHandler = async (token, userId, firstName) => {
        try {
            const getData = await request(
                '/api/auth/role',
                'POST',
                {id: userId});
            login(token, userId, firstName, getData.role);
        } catch (e) {}
    };

    const login = useCallback((jwtToken, id, firstName, R) => {
        setToken(jwtToken);
        setUserId(id);
        setUserName(firstName);
        setRole(R);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userName: firstName, role: R
        }))
    }, []);


    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            //login(data.token, data.userId, data.userName);
            roleHandler(data.token, data.userId, data.userName);
        }

        setReady(true);
    }, [login]);

    return { login, logout, token, userId, ready, userName, role }
};