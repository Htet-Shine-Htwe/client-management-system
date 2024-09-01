import useSecureStorage from "./useSecureStorage";

const useAuth = () : boolean => 
{   
    const { get } = useSecureStorage();
    const token = get('auth-token');
    const expiresAt = localStorage.getItem('expiresAt');


    if (!token || !expiresAt) {
        return false;
    }

    const isExpired = new Date().getTime() > parseInt(expiresAt);
   
    return !isExpired;
}

export default useAuth;


