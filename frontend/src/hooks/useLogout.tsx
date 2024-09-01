import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { adminLogout } from "@/redux/slices/admin-auth-slice";
import { toast } from "./use-toast";

const useLogout = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logout = useCallback((withToast=true,type="admin") => {
    const navigateTo = '/auth/login' ;
    localStorage.removeItem('auth-token');
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("auth-type");

    withToast && toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
      variant: "destructive",
    });
    dispatch(adminLogout())
    navigate(navigateTo);
  }, [navigate]);

  return logout;
}

export default useLogout;
