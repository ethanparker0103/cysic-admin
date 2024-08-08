import { getImageUrl } from "@/utils/tools";
import { Suspense, useState } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import clsx from "clsx";
import { NextUIProvider } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import ConnectButton from "@/components/connectButton";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { useRequest } from "ahooks";
import axios from "axios";
import { useAccount } from "wagmi";
import Search from "@/routes/components/Search";

const Hero = (props?: any) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_176_4165)">
      <mask
        id="mask0_176_4165"
        // style="mask-type :luminance"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M24 0H0V24H24V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_176_4165)">
        <path
          d="M15.375 4.96875C15.375 6.83271 13.864 8.34375 12 8.34375C10.136 8.34375 8.625 6.83271 8.625 4.96875C8.625 3.10479 10.136 1.59375 12 1.59375C13.864 1.59375 15.375 3.10479 15.375 4.96875Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M19.0312 15.375C17.1674 15.375 15.6562 13.864 15.6562 12C15.6562 10.136 17.1674 8.625 19.0312 8.625C20.8951 8.625 22.4062 10.136 22.4062 12C22.4062 13.864 20.8951 15.375 19.0312 15.375Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M15.375 19.0312C15.375 20.8951 13.864 22.4062 12 22.4062C10.136 22.4062 8.625 20.8951 8.625 19.0312C8.625 17.1674 10.136 15.6562 12 15.6562C13.864 15.6562 15.375 17.1674 15.375 19.0312Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M4.96875 15.375C3.10479 15.375 1.59375 13.864 1.59375 12C1.59375 10.136 3.10479 8.625 4.96875 8.625C6.83271 8.625 8.34375 10.136 8.34375 12C8.34375 13.864 6.83271 15.375 4.96875 15.375Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_176_4165">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Projector = (props?: any) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="13" cy="5.5" r="3.75" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" />
    <circle cx="5" cy="10.5" r="2.25" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" />
    <circle cx="21" cy="10.5" r="2.25" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" />
    <mask id="path-4-inside-1_439_10430" fill="currentColor">
      <path d="M2 18C2 16.3431 3.34315 15 5 15H6C6.55228 15 7 15.4477 7 16V24C7 24.5523 6.55228 25 6 25H3C2.44772 25 2 24.5523 2 24V18Z" />
    </mask>
    <path d="M2 18C2 16.3431 3.34315 15 5 15H6C6.55228 15 7 15.4477 7 16V24C7 24.5523 6.55228 25 6 25H3C2.44772 25 2 24.5523 2 24V18Z" stroke="currentColor" stroke-opacity="1" stroke-width="3" mask="url(#path-4-inside-1_439_10430)" />
    <mask id="path-5-inside-2_439_10430" fill="currentColor">
      <path d="M8 15C8 13.3431 9.34315 12 11 12H15C16.6569 12 18 13.3431 18 15V24C18 24.5523 17.5523 25 17 25H9C8.44772 25 8 24.5523 8 24V15Z" />
    </mask>
    <path d="M8 15C8 13.3431 9.34315 12 11 12H15C16.6569 12 18 13.3431 18 15V24C18 24.5523 17.5523 25 17 25H9C8.44772 25 8 24.5523 8 24V15Z" stroke="currentColor" stroke-opacity="1" stroke-width="3" mask="url(#path-5-inside-2_439_10430)" />
    <mask id="path-6-inside-3_439_10430" fill="currentColor">
      <path d="M24 18C24 16.3431 22.6569 15 21 15H20C19.4477 15 19 15.4477 19 16V24C19 24.5523 19.4477 25 20 25H23C23.5523 25 24 24.5523 24 24V18Z" />
    </mask>
    <path d="M24 18C24 16.3431 22.6569 15 21 15H20C19.4477 15 19 15.4477 19 16V24C19 24.5523 19.4477 25 20 25H23C23.5523 25 24 24.5523 24 24V18Z" stroke="currentColor" stroke-opacity="1" stroke-width="3" mask="url(#path-6-inside-3_439_10430)" />
  </svg>

);

const Provider = (props?: any) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="7" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="10.5" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="14" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="17.5" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="7" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="10.5" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="14" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="17.5" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fill-opacity="1" />
    <rect x="25" y="7" width="1.5" height="3" rx="0.75" transform="rotate(90 25 7)" fill="currentColor" fill-opacity="1" />
    <rect x="25" y="10.5" width="1.5" height="3" rx="0.75" transform="rotate(90 25 10.5)" fill="currentColor" fill-opacity="1" />
    <rect x="25" y="14" width="1.5" height="3" rx="0.75" transform="rotate(90 25 14)" fill="currentColor" fill-opacity="1" />
    <rect x="25" y="17.5" width="1.5" height="3" rx="0.75" transform="rotate(90 25 17.5)" fill="currentColor" fill-opacity="1" />
    <rect x="4" y="7" width="1.5" height="3" rx="0.75" transform="rotate(90 4 7)" fill="currentColor" fill-opacity="1" />
    <rect x="4" y="10.5" width="1.5" height="3" rx="0.75" transform="rotate(90 4 10.5)" fill="currentColor" fill-opacity="1" />
    <rect x="4" y="14" width="1.5" height="3" rx="0.75" transform="rotate(90 4 14)" fill="currentColor" fill-opacity="1" />
    <rect x="4" y="17.5" width="1.5" height="3" rx="0.75" transform="rotate(90 4 17.5)" fill="currentColor" fill-opacity="1" />
    <rect x="6.75" y="6.75" width="12.5" height="12.5" rx="2.25" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" />
    <mask id="path-18-inside-1_439_12346" fill="currentColor">
      <rect x="10" y="10" width="6" height="6" rx="1" />
    </mask>
    <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" stroke-opacity="1" stroke-width="3" mask="url(#path-18-inside-1_439_12346)" />
  </svg>

);

const Verifier = (props?: any) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2.75" y="2.75" width="20.5" height="20.5" rx="2.25" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" />
    <rect x="6.5" y="19.5" width="13" height="1.5" rx="0.75" fill="currentColor" fill-opacity="1" />
    <circle cx="13" cy="11.5" r="5.75" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" />
    <path d="M10.5 11.5L12 13L16 9.5" stroke="currentColor" stroke-opacity="1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

);

const TaskList = (props?: any) => {
  return <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 4.75H17.25C18.6307 4.75 19.75 5.86929 19.75 7.25V12C19.75 12.4142 20.0858 12.75 20.5 12.75C20.9142 12.75 21.25 12.4142 21.25 12V7.25C21.25 5.04086 19.4591 3.25 17.25 3.25H8.75C6.54086 3.25 4.75 5.04086 4.75 7.25V18.75C4.75 20.9591 6.54086 22.75 8.75 22.75H11.25C11.6642 22.75 12 22.4142 12 22C12 21.5858 11.6642 21.25 11.25 21.25H8.75C7.36929 21.25 6.25 20.1307 6.25 18.75V7.25C6.25 5.86929 7.36929 4.75 8.75 4.75Z" fill="currentColor" />
    <circle cx="17.5" cy="18.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.4412 18.4983L16.6522 19.9031L19.3862 17.6697" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="11" width="6" height="1.5" rx="0.75" fill="currentColor" />
    <rect x="8" y="7.5" width="10" height="1.5" rx="0.75" fill="currentColor" />
  </svg>
}

const MyPage = (props?: any)=>{
  return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M16.4939 10.0644C16.8056 9.79168 16.8372 9.31786 16.5644 9.00613C16.2917 8.6944 15.8178 8.66282 15.5061 8.93558L12.0342 11.9735L11.0303 10.9697C10.7374 10.6768 10.2626 10.6768 9.96967 10.9697C9.67678 11.2626 9.67678 11.7374 9.96967 12.0303L11.4697 13.5303C11.7489 13.8095 12.1967 13.8245 12.4939 13.5644L16.4939 10.0644Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V21C2 22.6569 3.34315 24 5 24H21C22.6569 24 24 22.6569 24 21V5C24 3.34315 22.6569 2 21 2H5ZM7.25 19.5C6.83579 19.5 6.5 19.8358 6.5 20.25C6.5 20.6642 6.83579 21 7.25 21H18.75C19.1642 21 19.5 20.6642 19.5 20.25C19.5 19.8358 19.1642 19.5 18.75 19.5H7.25ZM19.5 11.5C19.5 15.0899 16.5899 18 13 18C9.41015 18 6.5 15.0899 6.5 11.5C6.5 7.91015 9.41015 5 13 5C16.5899 5 19.5 7.91015 19.5 11.5Z" fill="currentColor"/>
  </svg>
  
}

export const dashboardNavs_ = [
  {
    prefix: <Hero className="size-6" />,
    text: "Dashboard",
    link: "/dashboard/",
  },
  {
    prefix: <Projector className="size-6" />,
    text: "Project",
    link: "/dashboard/project",
  },
  {
    prefix: <Provider className="size-6" />,
    text: "Prover",
    link: "/dashboard/provider",
  },
  {
    prefix: <Verifier className="size-6" />,
    text: "Verifier",
    link: "/dashboard/verifier",
  },
  {
    prefix: <TaskList className="size-6 scale-[1.3]" />,
    text: "TaskList",
    link: "/dashboard/task",
  },
  {
    prefix: <MyPage className="size-6 scale-[1.3]" />,
    text: "MyPage",
    link: "/dashboard/my",
    needAccount: true,
  },
];

export default function App() {
  const { t } = useTranslation();
  const matches = useMatches();
  const navigate = useNavigate();
  const lastPathname = JSON.parse(JSON.stringify(matches))?.reverse()?.[0]
    ?.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = () => { };

  const { address } = useAccount();

  const dashboardNavs = dashboardNavs_?.filter(i=> i?.needAccount ? !!address : true)


  const { data: myPoints } = useRequest(
    () => axios.get(`/api/v1/dashboard/myPoint/${address}`),
    {
      refreshDeps: [address],
      ready: !!address,
    }
  );
  return (
    <>
      <ToastContainer theme="dark" />

      <NextUIProvider>
        <div className="text-[#fff] h-screen overflow-hidden bg-white flex dark bg-[#000]">
          <BrowserView className="h-full px-8 py-10 flex flex-col gap-14 items-start justify-start w-[264px] relative bg-[#10141A]">
            <img
              className="w-[154px]"
              src={getImageUrl("@/assets/images/_global/logo_content.svg")}
            />

            <div className="flex flex-col gap-3 text-lg">
              {dashboardNavs?.map((i) => {
                return (
                  <div
                    onClick={() => navigate(i.link)}
                    key={i.text}
                    className={clsx(
                      "flex items-center gap-3 cursor-pointer py-5 px-6 rounded-[16px] relative border border-[transparent] text-[#A3A3A3]",
                      (lastPathname.includes(i.link) &&
                        i?.link != dashboardNavs?.[0]?.link) ||
                        lastPathname == i.link
                        ? "font-semibold !text-[#fff] bg-[#FFFFFF0D] border-[#000] "
                        // shadow-[0px_4px_0px_0px_#000000]
                        : ""
                    )}
                  >
                    {i.prefix}
                    <span>{t(i.text)}</span>
                  </div>
                );
              })}
            </div>
          </BrowserView>

          <MobileView className="z-[100] bg-[#000] border-b border-[#FFFFFF1F] w-full fixed top-0 p-3 flex items-center justify-between">
            <img
              className="w-8"
              src={getImageUrl("@/assets/images/_global/logo.svg")}
            />
            <div className="flex items-center gap-2">
              <ConnectButton className="!py-0 !min-h-10 !h-10 [&>span]:!text-xs !px-4" />

              <Navbar
                classNames={{
                  wrapper: "!p-0 !size-10",
                }}
                onMenuOpenChange={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
              >
                <NavbarContent>
                  <NavbarMenuToggle
                    className="!p-0 w-full"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    icon={
                      <div className="rounded-[6px] border border-[#FFFFFF33] border-solid size-10 flex items-center justify-center">
                        <img
                          className="w-5 h-4"
                          src={getImageUrl(
                            "@/assets/images/_global/list_ul.svg"
                          )}
                        />
                      </div>
                    }
                  />
                </NavbarContent>

                <NavbarMenu className="flex flex-col gap-2 pt-8 bg-[#000]">
                  {dashboardNavs.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                      <Link
                        className="w-full flex items-center justify-between"
                        to={item?.link}
                        onClick={() => {
                          console.log(111)
                          setIsMenuOpen(false)
                        }}
                      >
                        <div className="flex items-center gap-1 py-3">
                          {item?.prefix}
                          <span>{t(item?.text)}</span>
                        </div>

                        <svg
                          className="size-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.54 11.29L9.87998 5.64001C9.78702 5.54628 9.67642 5.47188 9.55456 5.42111C9.4327 5.37035 9.30199 5.34421 9.16998 5.34421C9.03797 5.34421 8.90726 5.37035 8.78541 5.42111C8.66355 5.47188 8.55294 5.54628 8.45998 5.64001C8.27373 5.82737 8.16919 6.08082 8.16919 6.34501C8.16919 6.60919 8.27373 6.86264 8.45998 7.05001L13.41 12.05L8.45998 17C8.27373 17.1874 8.16919 17.4408 8.16919 17.705C8.16919 17.9692 8.27373 18.2226 8.45998 18.41C8.5526 18.5045 8.66304 18.5797 8.78492 18.6312C8.90679 18.6827 9.03767 18.7095 9.16998 18.71C9.30229 18.7095 9.43317 18.6827 9.55505 18.6312C9.67692 18.5797 9.78737 18.5045 9.87998 18.41L15.54 12.76C15.6415 12.6664 15.7225 12.5527 15.7779 12.4262C15.8333 12.2997 15.8619 12.1631 15.8619 12.025C15.8619 11.8869 15.8333 11.7503 15.7779 11.6238C15.7225 11.4973 15.6415 11.3836 15.54 11.29Z"
                            fill="#FFFFFF73"
                          />
                        </svg>
                      </Link>
                    </NavbarMenuItem>
                  ))}
                </NavbarMenu>
              </Navbar>
            </div>
          </MobileView>

          <div
            className={clsx(
              "flex-[6] overflow-auto flex flex-col pb-12 text-lg pt-0",
              isMobile ? "pt-20 px-4" : ""
            )}
          >

            <BrowserView className="px-10 pt-4 pb-8 sticky top-0 right-0 left-0 w-full backdrop-blur bg-[#00000065] z-[1] flex items-center justify-between gap-1">
              <Search />
              {
                address ? (<div className="px-3 text-[#A3A3A3] text-sm font-[500] h-10 bg-[#FFFFFF1F] rounded-[6px] flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.88537 4.1695C2.65657 4.3855 2.60137 4.5543 2.60137 4.6679C2.60137 4.7807 2.65657 4.9495 2.88537 5.1655C3.11497 5.3831 3.47977 5.6071 3.98137 5.8071C4.97977 6.2071 6.39977 6.4671 7.99977 6.4671C9.59977 6.4671 11.0198 6.2071 12.0182 5.8071C12.5198 5.6071 12.8846 5.3831 13.1142 5.1655C13.3438 4.9495 13.3982 4.7815 13.3982 4.6679C13.3982 4.5543 13.343 4.3863 13.1142 4.1695C12.8846 3.9519 12.519 3.7287 12.0182 3.5279C11.0198 3.1287 9.59977 2.8687 7.99977 2.8687C6.39977 2.8687 4.97977 3.1287 3.98137 3.5279C3.47977 3.7279 3.11497 3.9519 2.88537 4.1695ZM3.53577 2.4143C4.70777 1.9447 6.28617 1.6687 7.99977 1.6687C9.71337 1.6687 11.2918 1.9447 12.4638 2.4143C13.0486 2.6479 13.5622 2.9415 13.939 3.2975C14.3174 3.6559 14.5982 4.1183 14.5982 4.6679C14.5982 5.2175 14.3174 5.6799 13.939 6.0375C13.5622 6.3943 13.0486 6.6879 12.4646 6.9215C11.2918 7.3903 9.71257 7.6671 7.99977 7.6671C6.28617 7.6671 4.70777 7.3903 3.53577 6.9215C2.95097 6.6879 2.43737 6.3935 2.06057 6.0375C1.68217 5.6799 1.40137 5.2175 1.40137 4.6679C1.40137 4.1183 1.68217 3.6559 2.06057 3.2975C2.43737 2.9415 2.95097 2.6479 3.53577 2.4143Z" fill="#A3A3A3" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.40857 7.40244C2.47834 7.43909 2.5402 7.48913 2.59062 7.5497C2.64105 7.61027 2.67905 7.68018 2.70245 7.75543C2.72585 7.83069 2.7342 7.90982 2.72701 7.9883C2.71982 8.06679 2.69725 8.14308 2.66057 8.21284C2.62321 8.2791 2.60287 8.35359 2.60137 8.42964C2.60137 8.54244 2.65657 8.71124 2.88537 8.92724C3.11497 9.14484 3.47977 9.36884 3.98137 9.56884C4.97977 9.96884 6.39977 10.2288 7.99977 10.2288C9.59977 10.2288 11.0198 9.96884 12.0182 9.56884C12.5198 9.36884 12.8846 9.14484 13.1142 8.92724C13.3438 8.71124 13.3982 8.54324 13.3982 8.42964C13.3967 8.35359 13.3763 8.2791 13.339 8.21284C13.2649 8.07195 13.2499 7.90743 13.2971 7.75545C13.3444 7.60347 13.4501 7.47649 13.591 7.40244C13.7318 7.32839 13.8964 7.31334 14.0484 7.3606C14.2003 7.40786 14.3273 7.51355 14.4014 7.65444C14.5254 7.89124 14.5982 8.15204 14.5982 8.42964C14.5982 8.97924 14.3174 9.44164 13.939 9.79924C13.5622 10.156 13.0486 10.4496 12.4646 10.6832C11.2918 11.152 9.71257 11.4288 7.99977 11.4288C6.28617 11.4288 4.70777 11.152 3.53577 10.6832C2.95097 10.4496 2.43737 10.156 2.06057 9.79924C1.68217 9.44164 1.40137 8.97924 1.40137 8.42964C1.40137 8.15204 1.47417 7.89124 1.59817 7.65444C1.63482 7.58467 1.68486 7.52281 1.74543 7.47238C1.806 7.42196 1.87591 7.38396 1.95116 7.36056C2.02642 7.33716 2.10555 7.32881 2.18403 7.336C2.26251 7.34318 2.33881 7.36576 2.40857 7.40244Z" fill="#A3A3A3" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.40857 11.0641C2.47834 11.1007 2.5402 11.1508 2.59062 11.2113C2.64105 11.2719 2.67905 11.3418 2.70245 11.4171C2.72585 11.4923 2.7342 11.5714 2.72701 11.6499C2.71982 11.7284 2.69725 11.8047 2.66057 11.8745C2.62321 11.9407 2.60287 12.0152 2.60137 12.0913C2.60137 12.2041 2.65657 12.3729 2.88537 12.5897C3.11497 12.8073 3.47977 13.0305 3.98137 13.2305C4.97977 13.6305 6.39977 13.8905 7.99977 13.8905C9.59977 13.8905 11.0198 13.6305 12.0182 13.2305C12.5198 13.0305 12.8846 12.8065 13.1142 12.5897C13.3438 12.3737 13.3982 12.2041 13.3982 12.0913C13.3967 12.0152 13.3763 11.9407 13.339 11.8745C13.2649 11.7336 13.2499 11.569 13.2971 11.4171C13.3444 11.2651 13.4501 11.1381 13.591 11.0641C13.7318 10.99 13.8964 10.975 14.0484 11.0222C14.2003 11.0695 14.3273 11.1752 14.4014 11.3161C14.5254 11.5529 14.5982 11.8137 14.5982 12.0921C14.5982 12.6409 14.3174 13.1033 13.939 13.4609C13.5622 13.8177 13.0486 14.1113 12.4646 14.3449C11.2918 14.8137 9.71257 15.0905 7.99977 15.0905C6.28617 15.0905 4.70777 14.8137 3.53577 14.3449C2.95097 14.1113 2.43737 13.8177 2.06057 13.4609C1.68217 13.1033 1.40137 12.6409 1.40137 12.0913C1.40137 11.8137 1.47417 11.5529 1.59817 11.3161C1.63482 11.2463 1.68486 11.1844 1.74543 11.134C1.806 11.0836 1.87591 11.0456 1.95116 11.0222C2.02642 10.9988 2.10555 10.9904 2.18403 10.9976C2.26251 11.0048 2.33881 11.0274 2.40857 11.0641Z" fill="#A3A3A3" />
                    </svg>

                    <span className="whitespace-nowrap">{t('myPoints')}</span>
                  </div>
                  <span className="text-[#00F0FF]">{myPoints?.data || "0.00"}&nbsp;{t('Points')}</span>
                </div>) : null
              }
              <ConnectButton />
            </BrowserView>
            <div className={clsx(isMobile ? "px-0" : "px-10")}>
              <Suspense>
                <Outlet />
              </Suspense>
            </div>
          </div>

        </div>
      </NextUIProvider>
    </>
  );
}
