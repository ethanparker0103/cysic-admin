import Button from "@/components/Button";
import useModalState from "@/hooks/useModalState";
import Input from "@/components/Input";
import Upload from "@/components/Upload";
import { useState } from "react";
import { defaultChainId, mainUrl } from "@/config";
import clsx from "clsx";
import Modal from "@/components/Modal";
import { useAccount, useSignMessage } from "wagmi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FormItem = ({ title, children, errorMsg }: any) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[#696F79]">{title}</div>
      <div className="flex flex-col gap-1">
        {children}
        {errorMsg ? <div className="text-[--toastify-icon-color-error]">{errorMsg}</div> : null}
      </div>
    </div>
  );
};

const NewToModal = () => {
  const navigate = useNavigate()
  const [errorMsg, setErrormsg] = useState()
  const { t } = useTranslation();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [errorShow, setErrorShow] = useState(false);
  const { visible, setVisible } = useModalState({
    eventName: "modal_new_to_visible",
  });
  const [formValue, setFormValue] = useState<any>({});
  const updateFromValue = (field: string | number, value: any) => {
    if(errorMsg){
      setErrormsg(undefined)
    }
    if (errorShow) {
      setErrorShow(false);
    }
    setFormValue((old: any) => {
      const _new = JSON.parse(JSON.stringify(old));
      _new[field] = value;
      return _new;
    });
  };

  const handleSubmit = async (closeLoading: any) => {
    try {
      if (!address) {
        toast.error("Connect First Please");
        return;
      }
      const timestamp = +dayjs().unix();
      const message = `${JSON.stringify(
        formValue
      )}${defaultChainId}${timestamp}`;
      const sig = await signMessageAsync({ message: message });

      const header = {
        ["X-cysis-wallet"]: address,
        ["X-cysis-signature"]: sig,
        ["X-cysis-timestamp"]: timestamp,
        ["X-cysis-chain-id"]: defaultChainId,
      };
      // todo axios
      const data: any = await axios.post(
        "/api/v1/register",
        {
          ...formValue,
          claim_reward_address: address,
        },
        {
          headers: header,
        }
      );
      // config.headers['X-cysis-wallet'] = address
      // config.headers['X-cysis-signature'] = sig
      // config.headers['X-cysis-timestamp'] = timestamp
      toast.success(t("registerSuccess"));
      setFormValue({});
      dispatchEvent(new CustomEvent("resetProviderUpload"));
      dispatchEvent(new CustomEvent("refresh_profile"));
      if(data?.code == '10000'){
        navigate('my')
      }
    } catch (e: any) {
      console.log("error", e);
      const msg = e?.response?.data?.msg || e?.message
      setErrormsg(msg)
      // toast.error(msg);
    } finally {
      closeLoading?.();
    }
  };



  return (
    <Modal
      isOpen={visible}
      onClose={() => {}}
      className="[&_button]:none max-w-[820px] border border-[#FFFFFF33]"
    >
      {/* <ModalBody> */}
      <div className="flex justify-between bg-[url(@/assets/images/_global/new_to_bg.png)] bg-cover">
        <div className="w-[380px]" />
        <div className="w-[440px] p-10 flex flex-col gap-10 bg-[#0B0C0F] relative z-1">
          <div className="flex flex-col gap-3">
            <div className="uppercase text-[40px] Gemsbuck">New To Cysic</div>
            <div className="text-[#A1A1AA] text-lg">Sign up for free</div>
          </div>
          <div className="flex flex-col gap-4 -mt-3">
            <div className="w-full h-[100px] relative [&_.arco-upload-list]:flex [&_.arco-upload-list]:items-center [&_.arco-upload-list]:justify-center">
              <Upload
                resetEventName="resetProviderUpload"
                onChange={(v: any) => updateFromValue("logo", mainUrl + v)}
                className={clsx(
                  "absolute left-1/2 -translate-x-1/2 [&_.arco-upload-trigger-picture]:rounded-full [&_.arco-upload-trigger-picture]:border-gradient",
                  errorShow && !formValue?.logo
                    ? "border border-[#da1a1a]"
                    : "border-[#525252]"
                )}
              />
            </div>
            <FormItem title={"Username"} errorMsg={errorMsg}>
              <Input
                value={formValue?.name}
                onChange={(v: any) => updateFromValue("name", v)}
                className={clsx(
                  ((errorShow && !formValue?.name)||errorMsg)
                    ? "border-[#da1a1a]"
                    : "border-[#525252]",
                  "rounded-[8px]"
                )}
                placeholder="name"
              />
            </FormItem>
          </div>
          <Button
            disabled={!address || !formValue?.name || !formValue?.logo}
            needLoading
            onClick={handleSubmit}
            type="gradient"
          >
            Register Account
          </Button>
        </div>
      </div>
      {/* </ModalBody> */}
    </Modal>
  );
};

export default NewToModal;
