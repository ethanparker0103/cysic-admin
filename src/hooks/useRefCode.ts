import useRef from "@/models/_global/ref";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const useRefCode = () => {
  const { refCode, setRefCode } = useRef();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const refParam = searchParams.get('ref');
    
    if (refParam) {
      setRefCode(refParam);
    }
  }, [location.search, setRefCode]);

  return { refCode, setRefCode };
};

export default useRefCode;