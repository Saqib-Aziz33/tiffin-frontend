/* eslint-disable react/display-name */
import { local } from "@/lib/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadAdminData from "./LoadAdminData";

export default function withAuth(WrappedComponent) {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [isLogedIn, setIsLogedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
      // Get authentication state from local storage
      if (!localStorage.getItem(local.admin)) {
        router.push("/admin/login");
      } else {
        setIsLogedIn(true);
      }
    }, [router]);

    if (!isLogedIn) return null;

    if (loading) return <LoadAdminData setLoading={setLoading} />;

    return <WrappedComponent {...props} />;
  };
}
