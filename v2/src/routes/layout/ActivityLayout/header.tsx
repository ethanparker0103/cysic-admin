import { getImageUrl } from "@/utils/tools"
import clsx from "clsx"
import { isMobile } from "react-device-detect"
import Button from "@/components/Button";
import { CircleAlert, CircleHelp } from "lucide-react";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return <>
        <style>
            {`
        
            .gradient-border {
                border: 1px solid transparent;
                background-clip: padding-box, border-box;
                background-origin: padding-box, border-box;
                background-image: linear-gradient(to right, #000, #000), linear-gradient(83.04deg, #9D47FF 5.44%, #00F0FF 54.92%);

            }
        `}
        </style>

        <div className="w-full flex items-center justify-between gap-4">
            <a href="https://cysic.xyz/" >
                <img
                    className={clsx(isMobile ? "w-8" : "w-[9.375rem]")}
                    src={isMobile ? getImageUrl("@/assets/images/_global/logo.svg") : getImageUrl("@/assets/images/_global/logo_content.svg")}
                />
            </a>
            <div className="flex items-center gap-3">
                <Button
                  className="rounded-full min-h-fit h-fit p-3 flex gap-1"
                  type="solidGradient"
                  onClick={() => navigate("/about")}
                >
                  <CircleAlert size={16} />
                  <span>About</span>
                </Button>

                <Button
                  className="rounded-full min-h-fit h-fit p-3 flex gap-1"
                  type="solidGradient"
                  onClick={() => navigate("/faq")}
                >
                  <CircleHelp size={16} />
                  <span>FAQs</span>
                </Button>

              </div>

        </div>
    </>
}

export default Header