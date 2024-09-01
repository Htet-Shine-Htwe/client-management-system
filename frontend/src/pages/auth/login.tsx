import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useNavigate } from "react-router-dom"
import { loginValidationSchema } from "./LoginValidation"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import InputError from "@/components/ui/input-error"
import useMutate, { useMutateCallbackType } from "@/hooks/useMutate"
import useServerValidation from "@/hooks/useServerValidation"
import { useAppDispatch } from "@/redux/hooks"
import useSecureStorage from "@/hooks/useSecureStorage"
import { toast } from "@/hooks/use-toast"
import { setAdmin } from "@/redux/slices/admin-auth-slice"

interface loginSubmitForm {
    code: string,
    password: string
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { set } = useSecureStorage();
      const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
      } = useForm<loginSubmitForm>({
        resolver: yupResolver(loginValidationSchema)
      });
      const {handleServerErrors} = useServerValidation();


      const loginOnSuccess : useMutateCallbackType = (response : any) => {
        console.log(response);
        set("auth-token", response.token);
        set("auth-type", response?.user?.role_name);
        localStorage.setItem("expiresAt", (new Date().getTime() + 24 * 60 * 60 * 1000).toString());

        dispatch(setAdmin(response.user));

        toast({
          title: "Login Successful",
          description: "You have been logged in successfully",
          variant: "success",
        });
        navigate("/");
      }

      const [postLogin, { isLoading }] = useMutate({ callback: loginOnSuccess, navigateBack: false});
      const onSubmit =  async (data: loginSubmitForm) => {
        const response =  await postLogin("login", data) as any;
        console.log(response);
        if (response && response.error) {
          handleServerErrors(response.error,setError);
         }
        }


    return (
        <div className="w-full h-screen flex justify-center items-center">

            <div className="">

            <Card className="mx-auto max-w-md">
                
                <CardHeader className="space-y-3">
                    <CardTitle className="text-2xl font-bold">Client Management System</CardTitle>
                    <CardDescription>Enter your code and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Code</Label>
                            <Input id="email" placeholder="Enter your admin code" type="text"
                            {...register("code")} />
                            <InputError field={errors.code} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password"  type="password" 
                            {...register("password")}
                            />
                            <InputError field={errors.password} />
                        </div>
                        
                    </div>
                    <Button className="w-full mt-10" type="submit" disabled={isLoading}>
                            Login
                        </Button>
                </form>
                </CardContent>
            </Card>
            </div>

        <Toaster  />

        </div>
    )
}

export default Login