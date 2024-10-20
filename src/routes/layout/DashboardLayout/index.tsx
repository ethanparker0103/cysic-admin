import { getImageUrl } from "@/utils/tools";
import { Suspense, useState } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@arco-design/web-react/dist/css/arco.css";
import clsx from "clsx";
import { Accordion, AccordionItem, NextUIProvider, Tooltip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import ConnectButton from "@/components/connectButton";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { useRequest } from "ahooks";
import axios from "axios";
import useAccount from "@/hooks/useAccount";
import Search from "@/routes/components/Search";
import ConnectCosmosButton from "@/components/connectCosmosButton";
import BasicDoubleconfirmModal from "@/components/BasicDoubleconfirmModal";
import useCosmosUpdate from "@/hooks/cosmos/useCosmosUpdate";
import SlippageModal from "@/routes/pages/Dashboard/My/components/assets/Modal/slippage";
import ExchangeModal from "@/routes/pages/Dashboard/My/components/assets/Modal/exchange";
import BigNumber from "bignumber.js";
import useRewardPoints from "@/models/_global/useRewardPoints";

const Accordion_ = ({ origin, navs, children }: any) => {
  const matches = useMatches();
  const navigate = useNavigate();
  const lastPathname = JSON.parse(JSON.stringify(matches))?.reverse()?.[0]
    ?.pathname;

  return navs?.children?.length ? <Accordion defaultSelectedKeys="all" fullWidth className="accordion !px-0 [&_button]:!py-0 [&_data-[open=true]_.nav-item]:!pb-0">
    <AccordionItem key={navs?.text} aria-label={navs?.text} title={children} className="">
      <div className="flex flex-col gap-3">
        {
          navs?.children?.map((i, index) => {
            return <div key={i?.text || index} className={clsx("text-base pl-12 cursor-pointer text-[#A3A3A3]",
              (lastPathname.includes(i.link) &&
                i?.link != origin?.[0]?.link) ||
                lastPathname == i.link
                ? "font-semibold !text-[#fff]"
                // shadow-[0px_4px_0px_0px_#000000]
                : ""

            )} onClick={() => navigate(i.link)}>
              <div>{(i?.text)}</div>
            </div>
          })
        }
      </div>
    </AccordionItem>

  </Accordion> : <>{children}</>
}

const HeaderNotice = () => {
  return <div className="py-4 px-10 mb-6 flex items-center gap-2 bg-gradient-to-r from-[#9D47FF40] to-[#00F0FF40]">
    <img className="size-6" src={getImageUrl('@/assets/images/_global/logo.svg')} />
    <span>Cysic phase ll is now live!</span>
  </div>
}

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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="4.5" r="3.75" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" />
    <circle cx="4" cy="9.5" r="2.25" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" />
    <circle cx="20" cy="9.5" r="2.25" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" />
    <mask id="path-4-inside-1_861_2525" fill="currentColor">
      <path d="M1 17C1 15.3431 2.34315 14 4 14H5C5.55228 14 6 14.4477 6 15V23C6 23.5523 5.55228 24 5 24H2C1.44772 24 1 23.5523 1 23V17Z" />
    </mask>
    <path d="M1 17C1 15.3431 2.34315 14 4 14H5C5.55228 14 6 14.4477 6 15V23C6 23.5523 5.55228 24 5 24H2C1.44772 24 1 23.5523 1 23V17Z" stroke="white" strokeOpacity="1" strokeWidth="3" mask="url(#path-4-inside-1_861_2525)" />
    <mask id="path-5-inside-2_861_2525" fill="currentColor">
      <path d="M7 14C7 12.3431 8.34315 11 10 11H14C15.6569 11 17 12.3431 17 14V23C17 23.5523 16.5523 24 16 24H8C7.44772 24 7 23.5523 7 23V14Z" />
    </mask>
    <path d="M7 14C7 12.3431 8.34315 11 10 11H14C15.6569 11 17 12.3431 17 14V23C17 23.5523 16.5523 24 16 24H8C7.44772 24 7 23.5523 7 23V14Z" stroke="white" strokeOpacity="1" strokeWidth="3" mask="url(#path-5-inside-2_861_2525)" />
    <mask id="path-6-inside-3_861_2525" fill="currentColor">
      <path d="M23 17C23 15.3431 21.6569 14 20 14H19C18.4477 14 18 14.4477 18 15V23C18 23.5523 18.4477 24 19 24H22C22.5523 24 23 23.5523 23 23V17Z" />
    </mask>
    <path d="M23 17C23 15.3431 21.6569 14 20 14H19C18.4477 14 18 14.4477 18 15V23C18 23.5523 18.4477 24 19 24H22C22.5523 24 23 23.5523 23 23V17Z" stroke="white" strokeOpacity="1" strokeWidth="3" mask="url(#path-6-inside-3_861_2525)" />
  </svg>


);

const Provider = (props?: any) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="7" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="10.5" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="14" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="17.5" y="1" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="7" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="10.5" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="14" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="17.5" y="22" width="1.5" height="3" rx="0.75" fill="currentColor" fillOpacity="1" />
    <rect x="25" y="7" width="1.5" height="3" rx="0.75" transform="rotate(90 25 7)" fill="currentColor" fillOpacity="1" />
    <rect x="25" y="10.5" width="1.5" height="3" rx="0.75" transform="rotate(90 25 10.5)" fill="currentColor" fillOpacity="1" />
    <rect x="25" y="14" width="1.5" height="3" rx="0.75" transform="rotate(90 25 14)" fill="currentColor" fillOpacity="1" />
    <rect x="25" y="17.5" width="1.5" height="3" rx="0.75" transform="rotate(90 25 17.5)" fill="currentColor" fillOpacity="1" />
    <rect x="4" y="7" width="1.5" height="3" rx="0.75" transform="rotate(90 4 7)" fill="currentColor" fillOpacity="1" />
    <rect x="4" y="10.5" width="1.5" height="3" rx="0.75" transform="rotate(90 4 10.5)" fill="currentColor" fillOpacity="1" />
    <rect x="4" y="14" width="1.5" height="3" rx="0.75" transform="rotate(90 4 14)" fill="currentColor" fillOpacity="1" />
    <rect x="4" y="17.5" width="1.5" height="3" rx="0.75" transform="rotate(90 4 17.5)" fill="currentColor" fillOpacity="1" />
    <rect x="6.75" y="6.75" width="12.5" height="12.5" rx="2.25" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" />
    <mask id="path-18-inside-1_439_12346" fill="#fff">
      <rect x="10" y="10" width="6" height="6" rx="1" />
    </mask>
    <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeOpacity="1" strokeWidth="3" mask="url(#path-18-inside-1_439_12346)" />
  </svg>

);

const Verifier = (props?: any) => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="2.75" y="2.75" width="20.5" height="20.5" rx="2.25" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" />
    <rect x="6.5" y="19.5" width="13" height="1.5" rx="0.75" fill="currentColor" fillOpacity="1" />
    <circle cx="13" cy="11.5" r="5.75" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" />
    <path d="M10.5 11.5L12 13L16 9.5" stroke="currentColor" strokeOpacity="1" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
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

const MyPage = (props?: any) => {
  return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 7.5C17.5 9.98528 15.4853 12 13 12C10.5147 12 8.5 9.98528 8.5 7.5C8.5 5.01472 10.5147 3 13 3C15.4853 3 17.5 5.01472 17.5 7.5ZM16 7.5C16 9.15685 14.6569 10.5 13 10.5C11.3431 10.5 10 9.15685 10 7.5C10 5.84315 11.3431 4.5 13 4.5C14.6569 4.5 16 5.84315 16 7.5Z" fill="currentColor" />
    <path d="M9 13.25C6.37665 13.25 4.25 15.3766 4.25 18V21C4.25 21.9665 5.0335 22.75 6 22.75H10C10.4142 22.75 10.75 22.4142 10.75 22C10.75 21.5858 10.4142 21.25 10 21.25H6C5.86193 21.25 5.75 21.1381 5.75 21V18C5.75 16.2051 7.20507 14.75 9 14.75H12C12.4142 14.75 12.75 14.4142 12.75 14C12.75 13.5858 12.4142 13.25 12 13.25H9Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17.5 20C20.5376 20 23 18.8807 23 17.5C23 16.1193 20.5376 15 17.5 15C14.4624 15 12 16.1193 12 17.5C12 18.8807 14.4624 20 17.5 20ZM21.4232 17.5C21.329 17.4094 21.1399 17.2667 20.7684 17.0978C20.0092 16.7527 18.8551 16.5 17.5 16.5C16.1449 16.5 14.9908 16.7527 14.2316 17.0978C13.8601 17.2667 13.671 17.4094 13.5768 17.5C13.671 17.5906 13.8601 17.7333 14.2316 17.9022C14.9908 18.2473 16.1449 18.5 17.5 18.5C18.8551 18.5 20.0092 18.2473 20.7684 17.9022C21.1399 17.7333 21.329 17.5906 21.4232 17.5Z" fill="currentColor" />
    <path d="M13.305 19.5571C13.6045 19.7674 13.7033 20.157 13.5582 20.4787C13.6106 20.5306 13.6954 20.6022 13.8292 20.6874C14.1495 20.8913 14.6364 21.0971 15.2798 21.2517C15.9158 21.4045 16.6414 21.492 17.3946 21.4995C18.1475 21.507 18.8838 21.4341 19.5396 21.2928C20.2018 21.1501 20.7212 20.951 21.0785 20.7433C21.2763 20.6284 21.39 20.5315 21.4524 20.4676C21.3426 20.1405 21.4708 19.7699 21.7791 19.5857C22.1347 19.3732 22.5952 19.4893 22.8076 19.8448C22.9041 20.0063 22.9814 20.198 22.997 20.419C23.0129 20.6439 22.9607 20.8381 22.891 20.995C22.7219 21.3757 22.3597 21.7336 21.8322 22.0402C21.3053 22.3465 20.6284 22.5926 19.8555 22.7592C19.0825 22.9257 18.2348 23.0079 17.3797 22.9995C16.5245 22.991 15.6855 22.8919 14.9293 22.7102C14.1731 22.5285 13.5206 22.2691 13.0236 21.9527C12.5257 21.6357 12.1986 21.2708 12.0663 20.8874C12.0119 20.7296 11.9788 20.5342 12.0156 20.3113C12.0512 20.0959 12.1436 19.9062 12.2602 19.74C12.4982 19.401 12.966 19.3191 13.305 19.5571Z" fill="currentColor" />
  </svg>
}

const LeadingBoard = (props?: any) => {
  return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.4859 3.17161C13.1751 2.65374 12.4246 2.65373 12.1139 3.17161L11.0168 5.00011H9.86043C9.22147 5.00011 8.84036 5.71222 9.19479 6.24387L10.7948 8.64387C10.9432 8.86643 11.1929 9.00011 11.4604 9.00011H14.6145C14.9175 9.00011 15.1945 8.82891 15.33 8.55788L16.53 6.15788C16.796 5.62596 16.4092 5.00011 15.8145 5.00011H14.583L13.4859 3.17161ZM11.816 5.6117L12.7999 3.97193L13.7837 5.6117C13.9283 5.85267 14.1887 6.00011 14.4697 6.00011H15.4909L14.4909 8.00011H11.5675L10.2341 6.00011H11.13C11.411 6.00011 11.6714 5.85267 11.816 5.6117Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9.75 12C9.75 11.0335 10.5335 10.25 11.5 10.25H14.5C15.4665 10.25 16.25 11.0335 16.25 12V16.2677C16.3317 16.256 16.4151 16.25 16.5 16.25H19C19.9665 16.25 20.75 17.0335 20.75 18V21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H4C3.44772 23 3 22.5523 3 22C3 21.4477 3.44772 21 4 21H5.25V16C5.25 15.0335 6.0335 14.25 7 14.25H9.5C9.58488 14.25 9.66835 14.256 9.75 14.2677V12ZM19.25 18V21H16.25V18C16.25 17.8619 16.3619 17.75 16.5 17.75H19C19.1381 17.75 19.25 17.8619 19.25 18ZM14.75 21H11.25V12C11.25 11.8619 11.3619 11.75 11.5 11.75H14.5C14.6381 11.75 14.75 11.8619 14.75 12V21ZM9.75 16V21H6.75V16C6.75 15.8619 6.86193 15.75 7 15.75H9.5C9.63807 15.75 9.75 15.8619 9.75 16Z" fill="currentColor" />
  </svg>

}

const Referral = (props?: any) => {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1608_4762)">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.3086 6.53856C12.3086 8.45032 10.7588 10.0001 8.84706 10.0001C6.9353 10.0001 5.38552 8.45032 5.38552 6.53856C5.38552 4.62681 6.9353 3.07703 8.84706 3.07703C10.7588 3.07703 12.3086 4.62681 12.3086 6.53856ZM11.0009 6.53856C11.0009 7.7281 10.0366 8.69241 8.84706 8.69241C7.65752 8.69241 6.69321 7.7281 6.69321 6.53856C6.69321 5.34903 7.65752 4.38472 8.84706 4.38472C10.0366 4.38472 11.0009 5.34903 11.0009 6.53856Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.30859 14.5295V16.1538C2.30859 16.5786 2.65299 16.923 3.07782 16.923H15.3855C15.8104 16.923 16.1547 16.5786 16.1547 16.1538V14.5295C16.1547 13.0254 15.0673 11.7418 13.5837 11.4945L10.4963 10.9799C9.65898 10.8404 8.80436 10.8404 7.96706 10.9799L4.87967 11.4945C3.39602 11.7418 2.30859 13.0254 2.30859 14.5295ZM15.0009 15.7691H3.46244V14.5295C3.46244 13.5895 4.14208 12.7872 5.06936 12.6326L8.15675 12.1181C8.86846 11.9994 9.59488 11.9994 10.3066 12.1181L13.394 12.6326C14.3213 12.7872 15.0009 13.5895 15.0009 14.5295V15.7691Z" fill="currentColor" />
      <path d="M14.8086 9.03856H13.0778V7.88472H14.8086V6.15395H15.9624V7.88472H17.6932V9.03856H15.9624V10.7693H14.8086V9.03856Z" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip0_1608_4762">
        <rect width="20" height="20" fill="currentColor" />
      </clipPath>
    </defs>
  </svg>


}

const Flag = (props?: any) => {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.84614 3.07703C4.27097 3.07703 4.61537 3.42142 4.61537 3.84626V4.03856H9.99998C10.9683 4.03856 11.7846 4.68914 12.0357 5.57703H14.8077C15.976 5.57703 16.9231 6.52412 16.9231 7.69241V12.3078C16.9231 13.4761 15.976 14.4232 14.8077 14.4232H9.61537C8.65949 14.4232 7.8846 13.6483 7.8846 12.6924V12.1155H4.61537V16.1539C4.61537 16.5788 4.27097 16.9232 3.84614 16.9232C3.4213 16.9232 3.0769 16.5788 3.0769 16.1539V3.84626C3.0769 3.42142 3.4213 3.07703 3.84614 3.07703ZM9.03844 12.1155V12.6924C9.03844 13.011 9.29674 13.2693 9.61537 13.2693H14.8077C15.3387 13.2693 15.7692 12.8388 15.7692 12.3078V7.69241C15.7692 7.16137 15.3387 6.73087 14.8077 6.73087H12.1154V10.3847C12.1154 11.3406 11.3405 12.1155 10.3846 12.1155H9.03844ZM4.61537 10.9616V5.19241H9.99998C10.531 5.19241 10.9615 5.62291 10.9615 6.15395V10.3847C10.9615 10.7033 10.7032 10.9616 10.3846 10.9616H4.61537Z" fill="currentColor" />
  </svg>
}


const SocialTasks = (props?: any) => {
  return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path fillRule="evenodd" clipRule="evenodd" d="M5 4.00012C5.55228 4.00012 6 4.44784 6 5.00012V5.25012H13C14.2588 5.25012 15.32 6.09587 15.6465 7.25012H19.25C20.7688 7.25012 22 8.48134 22 10.0001V16.0001C22 17.5189 20.7688 18.7501 19.25 18.7501H12.5C11.2574 18.7501 10.25 17.7428 10.25 16.5001V15.7501H6V21.0001C6 21.5524 5.55228 22.0001 5 22.0001C4.44772 22.0001 4 21.5524 4 21.0001V5.00012C4 4.44784 4.44772 4.00012 5 4.00012ZM11.75 15.7501V16.5001C11.75 16.9143 12.0858 17.2501 12.5 17.2501H19.25C19.9404 17.2501 20.5 16.6905 20.5 16.0001V10.0001C20.5 9.30977 19.9404 8.75012 19.25 8.75012H15.75V13.5001C15.75 14.7428 14.7426 15.7501 13.5 15.7501H11.75ZM6 14.2501V6.75012H13C13.6904 6.75012 14.25 7.30977 14.25 8.00012V13.5001C14.25 13.9143 13.9142 14.2501 13.5 14.2501H6Z" fill="currentColor"/>
  </svg>
}

export const dashboardNavs_ = [
  {
    prefix: <Hero className="size-6" />,
    text: "Dashboard",
    link: "/dashboard/",
  },
  {
    prefix: <Flag className="size-6 scale-[1.3]" />,
    text: "Stake",
    // link: "/dashboard/stake",
    children: [
      {
        text: "Stake CGT",
        link: "/dashboard/stake/cgt",
      },
      {
        text: "Delegate veCompute",
        link: "/dashboard/stake/veCompute",
      },
    ]
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
  {
    prefix: <LeadingBoard className="size-6 scale-[1.3]" />,
    text: "Leaderboard",
    link: "/dashboard/leadingboard",
  },
  {
    prefix: <Referral className="size-6 scale-[1.3]" />,
    text: "Invite",
    link: "/dashboard/referral",
  },
  {
    prefix: <SocialTasks className="size-6 scale-[1.3]" />,
    text: "Social Tasks",
    link: "/dashboard/socialTasks",
  }
];

export default function App() {
  const { setState: setRewawrdPoints, phase1 } = useRewardPoints()
  const { t } = useTranslation();
  useCosmosUpdate()
  const matches = useMatches();
  const navigate = useNavigate();
  const lastPathname = JSON.parse(JSON.stringify(matches))?.reverse()?.[0]
    ?.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { address } = useAccount();

  const dashboardNavs = dashboardNavs_?.filter(i => i?.needAccount ? !!address : true)

  useRequest(
    () => axios.get(`/api/v1/myPage/${address}/v1/overview`),
    {
      refreshDeps: [address],
      ready: !!address,
      onSuccess(e){
        const data = e?.data?.data || {}
        setRewawrdPoints({
          phase1: {
            ...data,
            total: BigNumber(data?.activity_points || 0).plus(data?.verifier_points || 0).plus(data?.prover_points || 0).plus(data?.reward_points || 0).toString()
          }
        })
      }
    }
  );

  return (
    <>

      <ToastContainer theme="dark" />
      <BasicDoubleconfirmModal />
      <ExchangeModal />
      <SlippageModal />

      <NextUIProvider>
        <div className="text-[#fff] h-screen overflow-hidden bg-white flex dark bg-[#000]">
          <BrowserView className="h-full px-8 pt-10 flex flex-col gap-8 items-start justify-start w-[264px] relative bg-[#10141A]">
            <div className="relative">
              <img
                className="w-[154px]"
                src={getImageUrl("@/assets/images/_global/logo_content.svg")}
              />
              <svg className="absolute top-0 right-0 translate-x-full -translate-y-full" width="46" height="18" viewBox="0 0 46 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="45" height="17" rx="3.5" fill="url(#paint0_linear_1053_13338)" fill-opacity="0.2" />
                <rect x="0.5" y="0.5" width="45" height="17" rx="3.5" stroke="url(#paint1_linear_1053_13338)" />
                <path d="M6.96484 6.64H4.50484V6H10.1648V6.64H7.70484V13H6.96484V6.64ZM15.2302 10.59H10.8302C10.8702 11.1367 11.0802 11.58 11.4602 11.92C11.8402 12.2533 12.3202 12.42 12.9002 12.42C13.2268 12.42 13.5268 12.3633 13.8002 12.25C14.0735 12.13 14.3102 11.9567 14.5102 11.73L14.9102 12.19C14.6768 12.47 14.3835 12.6833 14.0302 12.83C13.6835 12.9767 13.3002 13.05 12.8802 13.05C12.3402 13.05 11.8602 12.9367 11.4402 12.71C11.0268 12.4767 10.7035 12.1567 10.4702 11.75C10.2368 11.3433 10.1202 10.8833 10.1202 10.37C10.1202 9.85667 10.2302 9.39667 10.4502 8.99C10.6768 8.58333 10.9835 8.26667 11.3702 8.04C11.7635 7.81333 12.2035 7.7 12.6902 7.7C13.1768 7.7 13.6135 7.81333 14.0002 8.04C14.3868 8.26667 14.6902 8.58333 14.9102 8.99C15.1302 9.39 15.2402 9.85 15.2402 10.37L15.2302 10.59ZM12.6902 8.31C12.1835 8.31 11.7568 8.47333 11.4102 8.8C11.0702 9.12 10.8768 9.54 10.8302 10.06H14.5602C14.5135 9.54 14.3168 9.12 13.9702 8.8C13.6302 8.47333 13.2035 8.31 12.6902 8.31ZM18.0953 13.05C17.6686 13.05 17.2586 12.99 16.8653 12.87C16.4786 12.7433 16.1753 12.5867 15.9553 12.4L16.2753 11.84C16.4953 12.0133 16.772 12.1567 17.1053 12.27C17.4386 12.3767 17.7853 12.43 18.1453 12.43C18.6253 12.43 18.9786 12.3567 19.2053 12.21C19.4386 12.0567 19.5553 11.8433 19.5553 11.57C19.5553 11.3767 19.492 11.2267 19.3653 11.12C19.2386 11.0067 19.0786 10.9233 18.8853 10.87C18.692 10.81 18.4353 10.7533 18.1153 10.7C17.6886 10.62 17.3453 10.54 17.0853 10.46C16.8253 10.3733 16.602 10.23 16.4153 10.03C16.2353 9.83 16.1453 9.55333 16.1453 9.2C16.1453 8.76 16.3286 8.4 16.6953 8.12C17.062 7.84 17.572 7.7 18.2253 7.7C18.5653 7.7 18.9053 7.74667 19.2453 7.84C19.5853 7.92667 19.8653 8.04333 20.0853 8.19L19.7753 8.76C19.342 8.46 18.8253 8.31 18.2253 8.31C17.772 8.31 17.4286 8.39 17.1953 8.55C16.9686 8.71 16.8553 8.92 16.8553 9.18C16.8553 9.38 16.9186 9.54 17.0453 9.66C17.1786 9.78 17.342 9.87 17.5353 9.93C17.7286 9.98333 17.9953 10.04 18.3353 10.1C18.7553 10.18 19.092 10.26 19.3453 10.34C19.5986 10.42 19.8153 10.5567 19.9953 10.75C20.1753 10.9433 20.2653 11.21 20.2653 11.55C20.2653 12.01 20.072 12.3767 19.6853 12.65C19.3053 12.9167 18.7753 13.05 18.0953 13.05ZM24.3479 12.68C24.2146 12.8 24.0479 12.8933 23.8479 12.96C23.6546 13.02 23.4512 13.05 23.2379 13.05C22.7446 13.05 22.3646 12.9167 22.0979 12.65C21.8312 12.3833 21.6979 12.0067 21.6979 11.52V8.34H20.7579V7.74H21.6979V6.59H22.4079V7.74H24.0079V8.34H22.4079V11.48C22.4079 11.7933 22.4846 12.0333 22.6379 12.2C22.7979 12.36 23.0246 12.44 23.3179 12.44C23.4646 12.44 23.6046 12.4167 23.7379 12.37C23.8779 12.3233 23.9979 12.2567 24.0979 12.17L24.3479 12.68ZM28.3204 7.7C28.9804 7.7 29.5037 7.89333 29.8904 8.28C30.2837 8.66 30.4804 9.21667 30.4804 9.95V13H29.7704V10.02C29.7704 9.47333 29.6337 9.05667 29.3604 8.77C29.0871 8.48333 28.6971 8.34 28.1904 8.34C27.6237 8.34 27.1737 8.51 26.8404 8.85C26.5137 9.18333 26.3504 9.64667 26.3504 10.24V13H25.6404V7.74H26.3204V8.71C26.5137 8.39 26.7804 8.14333 27.1204 7.97C27.4671 7.79 27.8671 7.7 28.3204 7.7ZM37.0075 10.59H32.6075C32.6475 11.1367 32.8575 11.58 33.2375 11.92C33.6175 12.2533 34.0975 12.42 34.6775 12.42C35.0042 12.42 35.3042 12.3633 35.5775 12.25C35.8508 12.13 36.0875 11.9567 36.2875 11.73L36.6875 12.19C36.4542 12.47 36.1608 12.6833 35.8075 12.83C35.4608 12.9767 35.0775 13.05 34.6575 13.05C34.1175 13.05 33.6375 12.9367 33.2175 12.71C32.8042 12.4767 32.4808 12.1567 32.2475 11.75C32.0142 11.3433 31.8975 10.8833 31.8975 10.37C31.8975 9.85667 32.0075 9.39667 32.2275 8.99C32.4542 8.58333 32.7608 8.26667 33.1475 8.04C33.5408 7.81333 33.9808 7.7 34.4675 7.7C34.9542 7.7 35.3908 7.81333 35.7775 8.04C36.1642 8.26667 36.4675 8.58333 36.6875 8.99C36.9075 9.39 37.0175 9.85 37.0175 10.37L37.0075 10.59ZM34.4675 8.31C33.9608 8.31 33.5342 8.47333 33.1875 8.8C32.8475 9.12 32.6542 9.54 32.6075 10.06H36.3375C36.2908 9.54 36.0942 9.12 35.7475 8.8C35.4075 8.47333 34.9808 8.31 34.4675 8.31ZM41.2327 12.68C41.0993 12.8 40.9327 12.8933 40.7327 12.96C40.5393 13.02 40.336 13.05 40.1227 13.05C39.6293 13.05 39.2493 12.9167 38.9827 12.65C38.716 12.3833 38.5827 12.0067 38.5827 11.52V8.34H37.6427V7.74H38.5827V6.59H39.2927V7.74H40.8927V8.34H39.2927V11.48C39.2927 11.7933 39.3693 12.0333 39.5227 12.2C39.6827 12.36 39.9093 12.44 40.2027 12.44C40.3493 12.44 40.4893 12.4167 40.6227 12.37C40.7627 12.3233 40.8827 12.2567 40.9827 12.17L41.2327 12.68Z" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_1053_13338" x1="0" y1="0" x2="37.3883" y2="27.8478" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9A4BFE" />
                    <stop offset="0.316659" stopColor="#1CD6FF" />
                    <stop offset="1" stopColor="#1BFEDF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_1053_13338" x1="3.72973" y1="-3.91551e-07" x2="38.9513" y2="24.041" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9A4BFE" />
                    <stop offset="0.500189" stopColor="#1CD6FF" />
                    <stop offset="1" stopColor="#1BFEDF" />
                  </linearGradient>
                </defs>
              </svg>

            </div>


            <div className="w-full flex flex-col gap-1 text-lg overflow-y-auto">
              {dashboardNavs?.map((i) => {
                return (
                  <Accordion_ origin={dashboardNavs} navs={i} key={i.text}>
                    <div
                      onClick={() => i.link ? navigate(i.link) : null}
                      className={clsx(
                        "nav-item",
                        "flex items-center gap-3 cursor-pointer py-2 px-2 rounded-[16px] relative border border-[transparent] text-[#A3A3A3]",
                        (lastPathname.includes(i.link) &&
                          i?.link != dashboardNavs?.[0]?.link) ||
                          lastPathname == i.link
                          ? "font-semibold !text-[#fff] bg-[#FFFFFF0D] border-[#000] "
                          // shadow-[0px_4px_0px_0px_#000000]
                          : ""
                      )}
                    >

                      <>
                        {i.prefix}
                        <span>{t(i.text)}</span>
                      </>
                    </div>
                  </Accordion_>
                );
              })}
            </div>
          </BrowserView>

          <MobileView className="z-[100] bg-[#000] border-b border-[#FFFFFF1F] w-full fixed top-0 p-3 flex items-center justify-between">
            <img
              className="w-8"
              src={getImageUrl("@/assets/images/_global/logo.svg")}
            />
            <div className="px-2 flex-1 [&>div]:ml-auto"><Search /></div>

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
              <div className="flex items-center gap-1">
                {
                  false && address ? (<Tooltip closeDelay={0} disableAnimation content={<div className="flex flex-col gap-2 text-sm">
                    <div className="text-[#A3A3A3]">My Points Desc</div>

                    <div className="flex flex-col gap-1 text-[#fff]">
                      <div className="flex items-center justify-between gap-2"><span className="text-[#A3A3A3]">Phase 1</span>&nbsp;<span>{phase1?.total || '-'}</span></div>
                      <div className="flex items-center justify-between gap-2"><span className="text-[#A3A3A3]">Phase 2</span>&nbsp;<span>0</span></div>
                    </div>
                  </div>}>

                    <div className="px-3 text-[#A3A3A3] text-sm font-[500] h-10 bg-[#FFFFFF1F] rounded-[6px] flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.88537 4.1695C2.65657 4.3855 2.60137 4.5543 2.60137 4.6679C2.60137 4.7807 2.65657 4.9495 2.88537 5.1655C3.11497 5.3831 3.47977 5.6071 3.98137 5.8071C4.97977 6.2071 6.39977 6.4671 7.99977 6.4671C9.59977 6.4671 11.0198 6.2071 12.0182 5.8071C12.5198 5.6071 12.8846 5.3831 13.1142 5.1655C13.3438 4.9495 13.3982 4.7815 13.3982 4.6679C13.3982 4.5543 13.343 4.3863 13.1142 4.1695C12.8846 3.9519 12.519 3.7287 12.0182 3.5279C11.0198 3.1287 9.59977 2.8687 7.99977 2.8687C6.39977 2.8687 4.97977 3.1287 3.98137 3.5279C3.47977 3.7279 3.11497 3.9519 2.88537 4.1695ZM3.53577 2.4143C4.70777 1.9447 6.28617 1.6687 7.99977 1.6687C9.71337 1.6687 11.2918 1.9447 12.4638 2.4143C13.0486 2.6479 13.5622 2.9415 13.939 3.2975C14.3174 3.6559 14.5982 4.1183 14.5982 4.6679C14.5982 5.2175 14.3174 5.6799 13.939 6.0375C13.5622 6.3943 13.0486 6.6879 12.4646 6.9215C11.2918 7.3903 9.71257 7.6671 7.99977 7.6671C6.28617 7.6671 4.70777 7.3903 3.53577 6.9215C2.95097 6.6879 2.43737 6.3935 2.06057 6.0375C1.68217 5.6799 1.40137 5.2175 1.40137 4.6679C1.40137 4.1183 1.68217 3.6559 2.06057 3.2975C2.43737 2.9415 2.95097 2.6479 3.53577 2.4143Z" fill="#A3A3A3" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.40857 7.40244C2.47834 7.43909 2.5402 7.48913 2.59062 7.5497C2.64105 7.61027 2.67905 7.68018 2.70245 7.75543C2.72585 7.83069 2.7342 7.90982 2.72701 7.9883C2.71982 8.06679 2.69725 8.14308 2.66057 8.21284C2.62321 8.2791 2.60287 8.35359 2.60137 8.42964C2.60137 8.54244 2.65657 8.71124 2.88537 8.92724C3.11497 9.14484 3.47977 9.36884 3.98137 9.56884C4.97977 9.96884 6.39977 10.2288 7.99977 10.2288C9.59977 10.2288 11.0198 9.96884 12.0182 9.56884C12.5198 9.36884 12.8846 9.14484 13.1142 8.92724C13.3438 8.71124 13.3982 8.54324 13.3982 8.42964C13.3967 8.35359 13.3763 8.2791 13.339 8.21284C13.2649 8.07195 13.2499 7.90743 13.2971 7.75545C13.3444 7.60347 13.4501 7.47649 13.591 7.40244C13.7318 7.32839 13.8964 7.31334 14.0484 7.3606C14.2003 7.40786 14.3273 7.51355 14.4014 7.65444C14.5254 7.89124 14.5982 8.15204 14.5982 8.42964C14.5982 8.97924 14.3174 9.44164 13.939 9.79924C13.5622 10.156 13.0486 10.4496 12.4646 10.6832C11.2918 11.152 9.71257 11.4288 7.99977 11.4288C6.28617 11.4288 4.70777 11.152 3.53577 10.6832C2.95097 10.4496 2.43737 10.156 2.06057 9.79924C1.68217 9.44164 1.40137 8.97924 1.40137 8.42964C1.40137 8.15204 1.47417 7.89124 1.59817 7.65444C1.63482 7.58467 1.68486 7.52281 1.74543 7.47238C1.806 7.42196 1.87591 7.38396 1.95116 7.36056C2.02642 7.33716 2.10555 7.32881 2.18403 7.336C2.26251 7.34318 2.33881 7.36576 2.40857 7.40244Z" fill="#A3A3A3" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.40857 11.0641C2.47834 11.1007 2.5402 11.1508 2.59062 11.2113C2.64105 11.2719 2.67905 11.3418 2.70245 11.4171C2.72585 11.4923 2.7342 11.5714 2.72701 11.6499C2.71982 11.7284 2.69725 11.8047 2.66057 11.8745C2.62321 11.9407 2.60287 12.0152 2.60137 12.0913C2.60137 12.2041 2.65657 12.3729 2.88537 12.5897C3.11497 12.8073 3.47977 13.0305 3.98137 13.2305C4.97977 13.6305 6.39977 13.8905 7.99977 13.8905C9.59977 13.8905 11.0198 13.6305 12.0182 13.2305C12.5198 13.0305 12.8846 12.8065 13.1142 12.5897C13.3438 12.3737 13.3982 12.2041 13.3982 12.0913C13.3967 12.0152 13.3763 11.9407 13.339 11.8745C13.2649 11.7336 13.2499 11.569 13.2971 11.4171C13.3444 11.2651 13.4501 11.1381 13.591 11.0641C13.7318 10.99 13.8964 10.975 14.0484 11.0222C14.2003 11.0695 14.3273 11.1752 14.4014 11.3161C14.5254 11.5529 14.5982 11.8137 14.5982 12.0921C14.5982 12.6409 14.3174 13.1033 13.939 13.4609C13.5622 13.8177 13.0486 14.1113 12.4646 14.3449C11.2918 14.8137 9.71257 15.0905 7.99977 15.0905C6.28617 15.0905 4.70777 14.8137 3.53577 14.3449C2.95097 14.1113 2.43737 13.8177 2.06057 13.4609C1.68217 13.1033 1.40137 12.6409 1.40137 12.0913C1.40137 11.8137 1.47417 11.5529 1.59817 11.3161C1.63482 11.2463 1.68486 11.1844 1.74543 11.134C1.806 11.0836 1.87591 11.0456 1.95116 11.0222C2.02642 10.9988 2.10555 10.9904 2.18403 10.9976C2.26251 11.0048 2.33881 11.0274 2.40857 11.0641Z" fill="#A3A3A3" />
                        </svg>

                        <span className="whitespace-nowrap">{t('myPoints')}</span>
                      </div>
                      <span className="text-[#00F0FF]">{phase1?.total || "0.00"}&nbsp;{t('Points')}</span>
                    </div>
                  </Tooltip>) : null
                }
                <ConnectButton />
                <ConnectCosmosButton />
              </div>
            </BrowserView>

            <HeaderNotice />
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
