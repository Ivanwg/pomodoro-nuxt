import ErrorBlock from "@/components/ErrorBlock";
import { useRouter } from "next/router";
import { useEffect } from "react";

function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [router]);

  return ( 
    <ErrorBlock errCode='404' errMsg='cтраница не найдена' />
   );
}

export default NotFound;