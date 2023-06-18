import { local } from "@/lib/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withUserAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const { token } = JSON.parse(localStorage.getItem(local.user)); // Get authentication state from local storage

      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
