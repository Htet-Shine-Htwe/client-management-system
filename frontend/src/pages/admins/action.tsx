import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import InputError from "@/components/ui/input-error"
import useMutate, { useMutateCallbackType } from "@/hooks/useMutate"
import useServerValidation from "@/hooks/useServerValidation"

import { adminRegisterValidation } from "./validation"

interface adminRegistrationForm {
    name: string,
    code: string,
    password: string,
    password_confirmation: string
}

const Action = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<adminRegistrationForm>({
        resolver: yupResolver(adminRegisterValidation)
    });
    const { handleServerErrors } = useServerValidation();

    const registerOnSuccess: useMutateCallbackType = (response: any) => {
        navigate("/admins");
    }

    const [postLogin, { isLoading }] = useMutate({ callback: registerOnSuccess, navigateBack: false });
    const onSubmit = async (data: adminRegistrationForm) => {
        const response = await postLogin("admins", data) as any;
        console.log(response);
        if (response && response.error) {
            handleServerErrors(response.error, setError);
        }
    }


    return (
        <div className="w-full h-screen ">

            <div className=" w-full ">

                <Card className="pt-12 min-w-2xl px-96">

                    <CardHeader className="space-y-3">
                        <CardTitle className="text-2xl font-bold">Register New Admin</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter your admin code" type="text"
                                        {...register("name")} />
                                    <InputError field={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Code</Label>
                                    <Input id="email" placeholder="Enter your admin code" type="text"
                                        {...register("code")} />
                                    <InputError field={errors.code} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" placeholder="" type="password"
                                        {...register("password")} />
                                    <InputError field={errors.password} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Password Confirmation</Label>
                                    <Input id="password_confirmation" type="password"
                                        {...register("password_confirmation")}
                                    />
                                    <InputError field={errors.password_confirmation} />
                                </div>
                                <Button className="w-full" type="submit" disabled={isLoading}>
                                    Register
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <Toaster />

        </div>
    )
}

export default Action