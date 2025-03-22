import { useEffect } from "react";
import { todoActions } from "@/store/todo-slice";
import { Hub } from "aws-amplify/utils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useHub = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const hubListenerCancelToken = Hub.listen("auth", (data) => {
      console.log("Listening for all auth events: ", data.payload.message);
      switch (data.payload.event) {
        case "signedIn":
          dispatch(todoActions.setAuth(true));
          router.push("/todos");
          break;
        case "signedOut":
          dispatch(todoActions.setAuth(false));
          router.push("/sign-in");
          break;
      }
    });

    return () => hubListenerCancelToken();
  }, [dispatch, router]);
};

export default useHub;
