import Image from "@/components/Image";
import { baseStatus } from "@/config";
import { getImageUrl } from "@/utils/tools";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { BrowserView, isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

const MainDetail = ({ displayBonus, worker_cosmos, prover_cosmos, verifier_cosmos, total_reward_amount, finish_task_cnt, running_task, success_task, status, verifier, prover, claim_reward_amount, success_task_cnt, coin_info, logo, name, domain, worker, description, total_task_cnt }: any) => {
  const { t } = useTranslation()
  return (
    <div className={clsx(isMobile ? "px-4 py-6" : "p-8", "flex gap-8 rounded-[16px] border border-[#FFFFFF33] shadow-[0px_4px_0px_0px_#000000]")}>
      <BrowserView>
        <Image text={name?.[0]} src={logo} className="size-16" />
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
          <span>{BigNumber((total_reward_amount || claim_reward_amount || 0)).div(1e0).toString()}</span>
        </div>

        {description ? (
          <div className="flex items-start gap-10 py-2">
            <span className={clsx(isMobile ? "w-[25%]" : "min-w-40")}>{t('desc')}</span>
            <span>{description}</span>
          </div>
        ) : null}




      </div>
    </div>
  );
};

export default MainDetail;
