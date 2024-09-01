import { usePostDataMutation } from "@/redux/api/queryApi";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "./use-toast";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type ReturnType = [
  (
    url: string,
    values?: any | undefined,
    method?: MethodType,
    isFormData?: boolean
  ) => Promise<string | void>,
  { isLoading: boolean }
];

type CallbackType = (value: any, navigate: NavigateFunction) => void;

type ParamsType = {
  callback?: CallbackType;
  navigateBack?: boolean;
  disableAlert?: boolean;
  disableInvalidate?: boolean;
};

const useMutate = (params: ParamsType = {}): ReturnType => {
  const {
    callback,
    navigateBack = true,
    disableAlert = false,
  } = params;

  const navigate = useNavigate();
  const [mutate, { isLoading, isError, error }] = usePostDataMutation();

  const onSubmit = async (
    url: string,
    values: any | undefined = undefined,
    method: MethodType = "POST"
  ) => {
    try {

      const result = await mutate({ url, method, body: values ?? {} }) as any;
      if (result.error || result.errors) {
        if (result.error.data) {
          toast({
            title: "❗️Error",
            description: result.error.data.message,
            variant: "destructive",
          });
        }

        if (result.error.error) {
          toast({
            title: "❗️Error",
            description: result.error.error,
            variant: "destructive",
          });
          return;
        }
        // handle request time out

        if (result.error && result.error.name) {
          toast({
            title: "❗️ Server Request timeout",
            variant: "destructive"
          });
        }
        return result;
      }

      if (isError) {
        console.log('server error', error);
      }

      if (result?.data?.message && !disableAlert) {
        toast({
          title: "Success",
          description: result?.data.message,
          variant: "success",
        });
      }

      if (callback) {
        return callback(result?.data, navigate);
      }

      if (navigateBack && method !== "DELETE") {
        return navigate(-1);
      }


    } catch (err: any) {

      // if (err?.status === 401) {
      //   toast({
      //     title: "Unauthorized",
      //     description: "You have been logged out",
      //     variant: "destructive",
      //   });
      //   return logout();
      // }
      toast({
        title: "Unexpected Error",
        description: err?.data?.message || "Something went wrong",
        variant: "success",
      });
    }

  };

  return [onSubmit, { isLoading }];
};

export type useMutateCallbackType = CallbackType;

export default useMutate;
