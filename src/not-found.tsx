import Button from "@/components/Button";
import { appUrl } from "@/config";
import { getImageUrl } from "@/utils/tools";
import { cn } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const redirectMap = {
  "/userPortal": appUrl + "/userPortal",
  "/userPortal/serviceHub": appUrl + "/userPortal/serviceHub",
  "/socialTask": appUrl + "/socialTask",
  "/bridge": appUrl + "/bridge",
  "/stake": appUrl + "/stake",

  "/m/userPortal": appUrl + "/userPortal",
  "/m/userPortal/serviceHub": appUrl + "/userPortal/serviceHub",
  "/m/socialTask": appUrl + "/socialTask",
  "/m/bridge": appUrl + "/bridge",
  "/m/stake": appUrl + "/stake",
};

const NotFound = () => {
  const location = useLocation();
  const { pathname, search, hash } = location;

  const ifExistInAppWeb =
    pathname in redirectMap ||
    pathname.startsWith("/zk") ||
    pathname.startsWith("/m/zk");

  useEffect(() => {
    if (ifExistInAppWeb) {
      const redirectUrl =
        redirectMap[pathname as keyof typeof redirectMap] ||
        appUrl + pathname.replace("/m", "").replace("/zk", "") + search + hash;
      // window.location.href = redirectUrl
      window.location.replace(redirectUrl);
    }
  }, [ifExistInAppWeb, pathname, search, hash]);

  if (ifExistInAppWeb) {
    return (
      <div className="size-full relative h-screen ">
        <div
          className={cn(
            "main-container py-12 lg:py-0 relative z-1 size-full flex flex-col gap-4 items-center justify-center"
          )}
        >
          Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="size-full relative h-screen ">
      <div
        className="absolute brightness-50 inset-0 size-full z-0"
        style={{
          backgroundImage: `url(${getImageUrl(
            "@/assets/images/_global/zk_landing_bg_3.png"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className={cn(
          "main-container py-12 lg:py-0 relative z-1 size-full flex flex-col gap-4 items-center justify-center"
        )}
      >
        <div className="flex flex-col gap-1 items-center">
          <span className={cn("slogen teachers-16-24-400 tracking-widest")}>
            Join Phase III: Ignition
          </span>
          <span className="unbounded-36-72-200 text-center">
            {ifExistInAppWeb ? "View On Our App" : "Page Not Found"}
          </span>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-6 w-full lg:w-auto">
          <a href={appUrl} target="_blank">
            <Button
              type="solid"
              className={cn(
                "backdrop-blur-sm px-6 py-4 lg:p-6 flex gap-4 items-center justify-between lg:justify-start uppercase"
              )}
            >
              <span>{"Join Testnet Phase III"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <Link to="/">
            <Button
              type="solid"
              className={cn(
                "backdrop-blur-sm px-6 py-4 lg:p-6 flex gap-4 items-center justify-between lg:justify-start uppercase"
              )}
            >
              <span>{"Back To Home"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
