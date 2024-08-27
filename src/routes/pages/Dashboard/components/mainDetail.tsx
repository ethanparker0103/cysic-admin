import Image from "@/components/Image";
import { baseStatus } from "@/config";
import { getImageUrl } from "@/utils/tools";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { BrowserView, isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

const MainDetail = ({ displayBonus, worker_cosmos, prover_cosmos, verifier_cosmos, total_reward_amount, finish_task_cnt, running_task, success_task, status, verifier, prover, claim_reward_amount, success_task_cnt, coin_info, logo, name, domain, worker, description, total_task_cnt, ...props }: any) => {
  const { t } = useTranslation()

  const in_whitelist = props?.in_whitelist
  const is_activated = props?.is_activated

  return (
    <div className={clsx(isMobile ? "px-4 py-6" : "p-8", "flex gap-8 rounded-[16px] border border-[#FFFFFF33] shadow-[0px_4px_0px_0px_#000000]")}>
      <BrowserView>
        <Image text={name?.[0]} src={logo} className="size-16 rounded-full" />
      </BrowserView>
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-10 py-2">
          <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t("name")}</span>
          <span className={clsx(isMobile ? "text-xs" : "text-[24px]", "text-[#fff] font-bold")}>{name}</span>
        </div>

        {domain ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('domain')}</span>
            <a href={domain} target="_blank">
              <div className="flex items-center gap-1">
                <span>{domain}</span>
                <Image className="size-3" src={getImageUrl('@/assets/images/dashboard/share.svg')} />
              </div>
            </a>


          </div>
        ) : null}
        {worker ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('address')}</span>
            <div className="flex flex-col gap-1 break-all	flex-1">
              <span>{worker}</span>
              <span>{worker_cosmos}</span>
            </div>
          </div>
        ) : null}
        {prover ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('address')}</span>
            <div className="flex flex-col gap-1 break-all	flex-1">
              <span>{prover}</span>
              <span>{prover_cosmos}</span>
            </div>
          </div>
        ) : null}
        {verifier ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('address')}</span>
            <div className="flex flex-col gap-1 break-all	flex-1">
              <span>{verifier}</span>
              <span>{verifier_cosmos}</span>
            </div>
          </div>
        ) : null}

        {coin_info ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('coinInfo')}</span>

            <a href={coin_info} target="_blank">
              <div className="flex items-center gap-1">
                <span>{coin_info}</span>
                <Image className="size-3" src={getImageUrl('@/assets/images/dashboard/share.svg')} />
              </div>
            </a>
          </div>
        ) : null}

        {total_task_cnt !== undefined ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('task_cnt')}</span>
            <span>{total_task_cnt}</span>
          </div>
        ) : null}

        {success_task_cnt ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('finish_task_cnt')}</span>
            <span>{success_task_cnt}</span>
          </div>
        ) : null}

        {running_task ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('running_task')}</span>
            <span>{running_task}</span>
          </div>
        ) : null}

        {finish_task_cnt ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('finish_task_cnt')}</span>
            <span>{finish_task_cnt}</span>
          </div>
        ) : null}

        {status ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('status')}</span>
            <span>{baseStatus[status]}</span>
          </div>
        ) : null}


        <div className="flex items-start gap-10 py-2">
          <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{displayBonus ? t('bonus') : t('reward')}</span>
          <span>{BigNumber((total_reward_amount || claim_reward_amount || 0)).div(1e0).toFixed(2, BigNumber.ROUND_DOWN)}</span>
        </div>

        {description ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('desc')}</span>
            <span>{description}</span>
          </div>
        ) : null}

        {in_whitelist !== undefined ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('whiteList')}</span>
            <div className="flex items-center gap-2">
              <span>{in_whitelist ? 'Yes' : 'No'}</span>
              <div className="w-px h-3 bg-[#FFFFFF33]" />
              <a href="https://discord.com/invite/cysic" target="_blank">
                <div className="flex items-center gap-1 cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9.68928 4C10.5418 4.13712 11.3736 4.38103 12.1652 4.72598C13.5232 6.61793 14.1978 8.75321 13.9492 11.2145C13.0242 11.8643 11.9972 12.3553 10.9106 12.6671C10.6653 12.3531 10.4479 12.0185 10.2599 11.6685C10.6149 11.5426 10.9584 11.3865 11.2866 11.2018C11.2006 11.1425 11.1172 11.0805 11.0352 11.0165C9.08463 11.8785 6.93935 11.8785 4.96474 11.0165C4.88341 11.0811 4.79941 11.1425 4.71341 11.2018C5.04089 11.3856 5.38346 11.541 5.73739 11.6665C5.55072 12.0165 5.3334 12.3504 5.0874 12.6664C4.00163 12.3541 2.97541 11.8631 2.05082 11.2138C1.83882 9.09053 2.26348 6.93659 3.8301 4.72731C4.62191 4.38146 5.45427 4.13709 6.30737 4C6.42552 4.19869 6.53279 4.40365 6.6287 4.61398C7.53853 4.48452 8.46212 4.48452 9.37196 4.61398C9.45796 4.42199 9.58262 4.18 9.68928 4ZM4.92807 8.76321C4.92807 9.39186 5.41339 9.90785 6.00671 9.90785C6.61003 9.90785 7.08668 9.39186 7.08535 8.76321C7.09602 8.13323 6.61003 7.61724 6.00671 7.61724C5.4034 7.61724 4.92807 8.13456 4.92807 8.76321ZM8.91464 8.76321C8.91464 9.39186 9.39996 9.90785 9.99328 9.90785C10.5966 9.90785 11.0719 9.39186 11.0719 8.76321C11.0826 8.13323 10.5966 7.61724 9.99328 7.61724C9.38996 7.61724 8.91464 8.13456 8.91464 8.76321Z" fill="#00F0FF" />
                  </svg>
                  <span className="text-sm text-[#00F0FF]">Discord</span>
                  <Image className="size-3" src={getImageUrl('@/assets/images/dashboard/share.svg')} />
                </div>
              </a>
            </div>
          </div>
        ) : null}

        {
          is_activated !== undefined ? (<div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('Activated')}</span>
            <div className="flex items-center gap-2">
              <span>{is_activated ? 'Accepted' : 'Pending'}</span>
            </div>
          </div>) : null
        }



      </div>
    </div>
  );
};

export default MainDetail;
