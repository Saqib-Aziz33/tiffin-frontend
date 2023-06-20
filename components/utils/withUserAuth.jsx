/* eslint-disable react/display-name */
import { local } from "@/lib/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function withUserAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      // Get authentication state from local storage
      if (!localStorage.getItem(local.user)) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
