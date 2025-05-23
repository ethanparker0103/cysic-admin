import { cn } from "@nextui-org/react";
import copy from "copy-to-clipboard";
import { Check, Copy as CopyIcon } from "lucide-react";
import { useState } from "react";

const Copy = ({ className, value, children }: any) => {

  const [copied, setCopied] = useState(false);
  const handleCopied = () => {
    copy(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }
  return (
    <div
     className={cn("cursor-pointer flex gap-1 items-center", className)}
      onClick={handleCopied}
    >
      {children}
      {
        copied ? (<Check className="w-4 h-4 text-lightBrand" />) : (<CopyIcon className="w-4 h-4" />)
      }
     
    </div>
  );
};


export default Copy