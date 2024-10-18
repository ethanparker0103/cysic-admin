import Button from "@/components/Button";
import Input from "@/components/Input";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount, useSignMessage } from "wagmi";
import axios from '@/service'
// import queryString from 'qs'
import { defaultChainId, mainUrl } from "@/config";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useDebounce, useRequest } from "ahooks";
import { convertErc2Cosmos } from "@/utils/tools";
import { useTranslation } from "react-i18next";
import Upload from "@/components/Upload";

const FormItem = ({ title, children }: any) => {
  return <div className="flex flex-col gap-3">
    <div className="text-[#696F79]">{title}</div>
    {children}
  </div>
}

const Verify = () => {
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
    {/* <div className="flex flex-col gap-1">
      <span className="text-[#A3A3A3]">{t('proverAddress')}</span>
      <span>{formValue?.verifier}</span>
    </div> */}
  </div>), [formValue?.claim_reward_address])



  const handleDoubleConfirm = async () => {
    try {
      if (!address) {
        openConnectModal?.()
        return
      }

      if (!formValue?.description || !formValue?.name || !formValue?.logo || !formValue?.claim_reward_address) {
        setErrorShow(true)
        throw { message: 'Invalid Params' }
      }


      dispatchEvent(new CustomEvent('basicDoubleconfirmModalVisible', {
        detail: {
          callback: handleSubmit,
          renderCallback: confirmRender
        }
      }))
    } catch (e: any) {
      console.log('error', e)
      toast.error(e?.response?.data?.msg || e?.message || e?.msg)
    }
  }


  const [ifInWL, setIfInWL] = useState<undefined | boolean>(undefined)
  const { run } = useRequest(() => axios.get(`/api/v1/dashboard/queryByReward/${formValue?.claim_reward_address}`), {
    manual: true,
    onSuccess(e) {
      setIfInWL(e?.data?.inWhitelist)

    }
  })

  const handleCheckWhitelist = async () => {
    if (!address) return null
    run()
  }

  const handleSubmit = async () => {
    try {
      setIfInWL(undefined)
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
      await axios.post('/api/v1/verifier', {
        ...formValue,
      }, {
        headers: header
      })

      // 检查白名单
      await handleCheckWhitelist()
      console.log('formValue', formValue)
      toast.success(t('registerSuccess'), {
        autoClose: false
      })
      // setFormValue({})
      // dispatchEvent(new CustomEvent('resetVerifierUpload'))
      dispatchEvent(new CustomEvent('doubleConfirmModalClose'))
    } catch (e: any) {
      console.log('error', e)
      toast.error(e?.response?.data?.msg || e?.message || e?.msg)
    }
  }

  const debouncedClaimRewardAddr = useDebounce(formValue?.claim_reward_address)
  // convertAddr
  const { data: claimRewardData } = useRequest(() => convertErc2Cosmos(debouncedClaimRewardAddr), {
    ready: !!debouncedClaimRewardAddr,
    refreshDeps: [debouncedClaimRewardAddr],
    onError(e: any) {
      console.log('error', e)
      toast.error(e?.msg)
    }
  })

  const debouncedAddr = useDebounce(formValue?.verifier)
  // convertAddr
  const { data } = useRequest(() => convertErc2Cosmos(debouncedAddr), {
    ready: !!debouncedAddr,
    refreshDeps: [debouncedAddr],
    onError(e: any) {
      console.log('error', e)
      toast.error(e?.message || e?.msg)
    }
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
          <div className="font-semibold	 text-[#6E6E6E]">{t('categoryInfo')}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 max-w-[36rem] w-full">
        <div className="flex flex-col gap-[10px]">
          <div className="text-[#fff] text-[30px] font-bold Gemsbuck">
            {t('submitVerifierInfo')}
          </div>
          <div className="text-lg text-[#525252]">
            {t('submitVerifierInfoDesc')}
          </div>
        </div>
        <div className="h-px bg-[#2B2B2B] " />
        <div className="flex flex-col gap-6 mt-8">
          <FormItem title={t("logo") + "*"}>
            <Upload
              resetEventName="resetVerifierUpload"
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
          <FormItem title={t("description") + "*"}>
            <textarea value={formValue?.description || ''} onChange={(v) => updateFromValue('description', v.target.value)} className="textarea border-[#525252] focus:!border-[#21E9FA] focus-within:!border-[#21E9FA] bg-[transparent] !outline-none" placeholder="Desc"></textarea>
          </FormItem>
          <FormItem title={t("rewardClaimAddress") + "*"}>
            <Input value={formValue?.claim_reward_address} onChange={(v) => updateFromValue('claim_reward_address', v)} className={clsx((errorShow && !formValue?.claim_reward_address) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="erc20" />
            {claimRewardData?.data?.cosmos_addr ? <Input disabled value={claimRewardData?.data?.cosmos_addr} className={clsx((errorShow && !formValue?.verifier) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px] opacity-40")} placeholder="cosmos" /> : null}
            {ifInWL == undefined ? null : <span className="mt-4 gradient-bg-20 px-5 py-3 rounded-xl font-[500] flex items-center gap-4">
              {
                ifInWL
                  ? <svg stroke="#00F0FF" fill="#00F0FF" strokeWidth="0" viewBox="0 0 24 24" height="3.925rem" width="3.925rem" xmlns="http://www.w3.org/2000/svg"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                  : <svg stroke="#00F0FF" fill="#00F0FF" strokeWidth="0" viewBox="0 0 24 24" height="3.925rem" width="3.925rem" xmlns="http://www.w3.org/2000/svg"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
              }

              {
                ifInWL
                  ? <span className="flex-1">Congratulations! <br /> You've secured your spot on the Cysic Verifier Whitelist! Head over to the <Link to="/dashboard" className="!underline !text-[--brand-color]">Dashboard</Link> now, connect your wallet, and follow our <a className="!underline !text-[--brand-color]" href="https://medium.com/@cysic/join-the-cysic-testnet-as-a-verifier-7b9f31674b41" target="_blank">step-by-step guide</a> to become a Cysic Network verifier. </span>
                  : <span className="flex-1">Unfortunately, you're not on the Whitelist this time.<br />  But don't worry, more opportunities are coming! <a className="!underline !text-[--brand-color]" href="https://discord.gg/cysic" target="_blank"> Join our Discord community</a> to stay updated and be ready for the next chance!</span>
              }
            </span>}
          </FormItem>
          {/* <FormItem title={t("address") + "*"}>
            <Input value={formValue?.verifier} onChange={(v) => updateFromValue('verifier', v)} className={clsx((errorShow && !formValue?.verifier) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px]")} placeholder="erc20" />
            {data?.data?.cosmos_addr ? <Input disabled value={formValue?.verifier ? data?.data?.cosmos_addr : ''} className={clsx((errorShow && !formValue?.verifier) ? "border-[#da1a1a]" : "border-[#525252]", "rounded-[8px] opacity-40")} placeholder="cosmos" /> : null}
          </FormItem> */}
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

export default Verify;
