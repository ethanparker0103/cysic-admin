import Button from "@/components/Button";
import Input from "@/components/Input";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import axios from '@/service'
// import queryString from 'qs'
import { defaultChainId, mainUrl } from "@/config";
import { toast } from "react-toastify";
import clsx from "clsx";
import { convertErc2Cosmos } from "@/utils/tools";
import { useDebounce, useRequest } from "ahooks";
import { useTranslation } from "react-i18next";
import Upload from "@/components/Upload";

const FormItem = ({ title, children }: any) => {
  return <div className="flex flex-col gap-3">
    <div className="text-[#696F79]">{title}</div>
    {children}
  </div>
}

const Computility = () => {
  const uploadRef = useRef<any>();
  const { t } = useTranslation()
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/register')
  }

  const [formValue, setFormValue] = useState<any>({})
  const updateFromValue = (field: string | number, value: any) => {
    if (errorShow) {
      setErrorShow(false)
    }
    setFormValue((old: any) => {
      const _new = JSON.parse(JSON.stringify(old))
      _new[field] = value;
      return _new
    })
  }



  const { address, chainId } = useAccount()
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage()

  const [errorShow, setErrorShow] = useState(false)

  const confirmRender = useMemo(() => (<div className="flex flex-col gap-5">
    <div className="flex flex-col gap-1">
      <span className="text-[#A3A3A3]">{t('rewardClaimAddress')}</span>
      <span>{formValue?.claim_reward_address}</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="text-[#A3A3A3]">{t('proverAddress')}</span>
      <span>{formValue?.prover}</span>
    </div>
  </div>), [formValue?.prover, formValue?.claim_reward_address])



  const handleDoubleConfirm = async () => {
    try {
      if (!address) {
        openConnectModal?.()
        return
      }

      if (!formValue?.description || !formValue?.name || !formValue?.domain || !formValue?.logo || !formValue?.prover || !formValue?.claim_reward_address) {
        setErrorShow(true)
        throw { message: 'Invalid Params' }
      }


      dispatchEvent(new CustomEvent('doubleConfirmModalVisible', {
        detail: {
          callback: handleSubmit,
          renderCallback: confirmRender
        }
      }))
    } catch (e: any) {
      console.log('error', e)
      toast.error(e?.response?.data?.msg || e?.message)
    }
  }

  const handleSubmit = async (closeLoading: any) => {
    try {
      const timestamp = +dayjs().unix()
      const message = `${JSON.stringify(formValue)}${defaultChainId}${timestamp}`
      console.log('message', message)
      const sig = await signMessageAsync({ message: message })

      const header = {
        ['X-cysis-wallet']: address,
        ['X-cysis-signature']: sig,
        ['X-cysis-timestamp']: timestamp,
        ['X-cysis-chain-id']: defaultChainId
      }
      // todo axios
      await axios.post('/api/v1/provider', {
        ...formValue,
      }, {
        headers: header
      })
      // config.headers['X-cysis-wallet'] = address
      // config.headers['X-cysis-signature'] = sig
      // config.headers['X-cysis-timestamp'] = timestamp
      console.log('formValue', formValue)
      toast.success(t('registerSuccess'), {
        autoClose: false
      })
      setFormValue({})
      dispatchEvent(new CustomEvent('resetProviderUpload'))
      dispatchEvent(new CustomEvent('doubleConfirmModalClose'))
    } catch (e: any) {
      console.log('error', e)
      toast.error(e?.response?.data?.msg || e?.message)
    } finally {
      closeLoading?.()
    }
  }

  const debouncedClaimRewardAddr = useDebounce(formValue?.claim_reward_address)
  // convertAddr
  const { data: claimRewardData } = useRequest(() => convertErc2Cosmos(debouncedClaimRewardAddr), {
    ready: !!debouncedClaimRewardAddr,
    refreshDeps: [debouncedClaimRewardAddr],
  })

  const debouncedAddr = useDebounce(formValue?.prover)
  // convertAddr
  const { data } = useRequest(() => convertErc2Cosmos(debouncedAddr), {
    ready: !!debouncedAddr,
    refreshDeps: [debouncedAddr],
  })

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleBack}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8625 3.225L13.3792 1.75L5.13751 10L13.3875 18.25L14.8625 16.775L8.08751 10L14.8625 3.225Z"
              fill="#525252"
            />
          </svg>

          <span className="text-[#525252] font-[500]">{t('back')}</span>
        </div>
        <div className="gap-1 self-end">
          <div className="text-sm text-[#BDBDBD]">STEP 02/02</div>
          <div className="font-semibold	 text-[#6E6E6E]">{t('categoyInfo')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[10px]">
          <div className="text-[#fff] text-[30px] font-bold Gemsbuck">
            {t('submitProviderInfo')}
          </div>
          <div className="text-lg text-[#525252]">
            {t('submitProviderInfoDesc')}
          </div>
        </div>
        <div className="h-px bg-[#2B2B2B] " />
        <div className="flex flex-col gap-6 mt-8">
          <FormItem title={t("logo") + "*"}>
            <Upload
              resetEventName="resetProviderUpload"
              onChange={(v) => updateFromValue("logo", mainUrl + v)}
              className={
                errorShow && !formValue?.logo
                  ? "border border-[#da1a1a]"
                  : "border-[#525252]"
              }
            />
            {/* <Input value={formValue?.logo} onChange={(v) => updateFromValue('logo', v)} className={clsx((errorShow && !formValue?.logo) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="logo url" /> */}
          </FormItem>
          <FormItem title={t("name") + "*"}>
            <Input value={formValue?.name} onChange={(v) => updateFromValue('name', v)} className={clsx((errorShow && !formValue?.name) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="name" />
          </FormItem>
          <FormItem title={t("domain") + "*"}>
            <Input value={formValue?.domain} onChange={(v) => updateFromValue('domain', v)} className={clsx((errorShow && !formValue?.domain) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="domain" />
          </FormItem>
          <FormItem title={t("description") + "*"}>
            <textarea value={formValue?.description || ''} onChange={(v) => updateFromValue('description', v.target.value)} className="textarea border-[#525252] focus:!border-[#21E9FA] focus-within:!border-[#21E9FA] bg-[transparent] !outline-none" placeholder="Desc"></textarea>
          </FormItem>
          <FormItem title={t("rewardClaimAddress") + "*"}>
            <Input value={formValue?.claim_reward_address} onChange={(v) => updateFromValue('claim_reward_address', v)} className={clsx((errorShow && !formValue?.claim_reward_address) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="erc20" />
            {claimRewardData?.data?.cosmos_addr ? <Input disabled value={claimRewardData?.data?.cosmos_addr} className={clsx((errorShow && !formValue?.verifier) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px] opacity-40")} placeholder="cosmos" /> : null}
          </FormItem>
          <FormItem title={t("address") + "*"}>
            <Input value={formValue?.prover} onChange={(v) => updateFromValue('prover', v)} className={clsx((errorShow && !formValue?.prover) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="erc20" />
            {data?.data?.cosmos_addr ? <Input disabled value={formValue?.prover ? data?.data?.cosmos_addr : ''} className={clsx((errorShow && !formValue?.verifier) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px] opacity-40")} placeholder="cosmos" /> : null}
          </FormItem>
        </div>
        <Button onClick={handleDoubleConfirm} className="mt-10 w-full text-[#000]" style={{
          background: 'linear-gradient(83.04deg, #8624D3 5.44%, #54F2FF 54.92%)'
        }}>
          {address ? t('Submit') : t('Connect Wallet')}
        </Button>
      </div>

    </>
  );
};

export default Computility;
