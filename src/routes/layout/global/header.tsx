import GradientBorderCard from "@/components/GradientBorderCard";
import GradientNavDropdown from "@/components/GradientNavDropdown";
import {
  getImageUrl,
  handleLoginPersonalMessage,
  scrollToTop,
} from "@/utils/tools";

import { ArrowRight, Menu } from "lucide-react";
import useNav from "@/hooks/useNav";
import { Link, useLocation } from "react-router-dom";
import { cn, Drawer, DrawerContent, useDisclosure } from "@nextui-org/react";
import Button from "@/components/Button";
import { createPortal } from "react-dom";
import { appUrl } from "@/config";
import { Notify } from "@/routes/layout/global/notify";

const size = "full";


export default function Header() {
  const { currentNavs } = useNav();
  const location = useLocation();



  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  // const handleOpenChange = (v: any)=>{
  //   if(v){
  //     document.body.style.overflow = 'auto'
  //   }else{
  //     document.body.style.overflow = 'hidden'
  //   }
  // }

  const handleScrollToTopInHome = () => {
    const path = location.pathname;
    if (path == '/') {
      scrollToTop()
    }
  }

  // useEffect(()=>{
  //   if(isOpen){
  //     document.body.style.overflow = 'auto'
  //   }
  // }, [isOpen])

  return (
    <>
      <>
        <div className="lg:hidden h-[5.625rem] flex items-center relative z-[1] flex flex-col">
          <div className="flex flex-wrap gap-3 relative w-full">
            <Button onClick={handleOpen}>
              <Menu width={30} height={30} />
            </Button>

            <Link
              to={"/"}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <img
                src={getImageUrl("@/assets/images/logo/cysic.svg")}
                className="w-[11.25rem]"
              />
            </Link>
          </div>
          <Notify className="!px-4 w-screen" />


          <Drawer isOpen={isOpen} size={size} onClose={onClose} shouldBlockScroll classNames={{ wrapper: 'z-[51]' }}>
            <DrawerContent className="bg-[#090A09]">
              {(onClose) => (
                <>
                  <div className="h-[5.625rem] flex flex-wrap gap-3 relative w-full -z-[1]">
                    <Link
                      to={"/"}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <img
                        src={getImageUrl("@/assets/images/logo/cysic.svg")}
                        className="w-[11.25rem]"
                      />
                    </Link>
                  </div>

                  <div className="overflow-y-auto">
                    <div className="flex flex-col items-center gap-10 overflow-hidden py-12">
                      {currentNavs?.map((i: any) => {
                        if (i?.children?.length) {
                          return i?.children?.map((j: any) => {
                            return (
                              <Link
                                onClick={onClose}
                                to={j?.href}
                                className={cn(
                                  "text-xl !text-sub",
                                  j?.disabled && "blur-[5px]"
                                )}
                              >
                                {j.content}
                              </Link>
                            );
                          });
                        } else {
                          return (
                            <Link
                              onClick={onClose}
                              to={i?.href || "/"}
                              className={cn(
                                "text-xl !text-sub",
                                i?.disabled && "blur-[5px]"
                              )}
                            >
                              {i.content}
                            </Link>
                          );
                        }
                      })}
                    </div>
                  </div>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </>

      <>
        {createPortal(
          <div className="hidden lg:block main-container fixed top-0 z-[11] h-[8rem] w-full left-1/2 -translate-x-1/2">
            <div className="relative py-6">
              <GradientBorderCard className="h-20 flex items-center backdrop-blur bg-[#090A09B2]">
                <div className="w-full h-full flex justify-between items-center">
                  <div className="flex items-center h-full flex-1">
                    <Link to={"/"} onClick={handleScrollToTopInHome}>
                      <img
                        src={getImageUrl("@/assets/images/logo/cysic.svg")}
                        className="flex-1 max-w-[11.25rem]"
                      />
                    </Link>

                    {currentNavs.map((nav: any) => (
                      <GradientNavDropdown
                        className="flex-1 max-w-[11.25rem] text-center"
                        key={nav.content}
                        item={nav}
                      />
                    ))}
                  </div>
                  <div className="h-full flex items-center justify-end w-[26.75rem]">
                    <a
                      href={appUrl}
                      target="_blank"
                      className="px-10 w-fit h-full flex items-center justify-end gap-1 cursor-pointer hover:bg-gradient-to-r from-[#17D1B2] to-[#4C1F99] "
                    >
                      <span className="text-sub font-[400] uppercase text-sm">
                        Get Started
                      </span>
                      <ArrowRight width={16} height={16} />
                    </a>
                  </div>
                </div>
              </GradientBorderCard>

              {
                // @ts-ignore
                currentNavs?.[0]?.type == 'subNav' && (
                  <div className="hidden lg:block main-container left-1/2 -translate-x-1/2 !px-4 absolute top-[calc(5rem+18px)] w-full">
                    <GradientBorderCard gradientTo="rgba(255, 255, 255, 0)" direction="0deg" className="bg-gradient-to-t from-[#212121] to-[transparent] px-6 flex items-center h-[65px]">
                      {
                        // @ts-ignore
                        currentNavs?.[0]?.children?.map(i => {
                          return <Link to={i.href} key={i.key} className="flex-1 max-w-[11.25rem] p-6 flex items-center justify-center hover:bg-default/40">
                            <span className="teachers-14-400">{i.content}</span>
                          </Link>
                        })
                      }
                    </GradientBorderCard>
                  </div>
                )
              }
            </div>

            <Notify className="left-1/2 -translate-x-1/2 !px-4 absolute top-[calc(6.6rem)] w-screen" />
          </div>,
          document.body
        )}
      </>
    </>
  );
}
