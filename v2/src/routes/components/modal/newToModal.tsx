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
import { isMobile } from "react-device-detect";
import { RadioGroup } from "@nextui-org/react";
import Radio from "@/components/Radio";

enum Device {
  "pc" = "pc",
  "android" = "android"
}

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
  const [errorMsg, setErrormsg] = useState<string | undefined>(undefined)
  const [validationError, setValidationError] = useState<string | undefined>(undefined);
  const { t } = useTranslation();
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [errorShow, setErrorShow] = useState(false);
  const { visible, setVisible } = useModalState({
    eventName: "modal_new_to_visible",
  });
  const [formValue, setFormValue] = useState<any>({
    device: isMobile ? Device.android : Device.pc
  });
  console.log('formValue', formValue)

  const updateFromValue = (field: string | number, value: any) => {
    if (errorMsg) {
      setErrormsg(undefined);
    }
    if (errorShow) {
      setErrorShow(false);
    }
    setFormValue((old: any) => {
      const _new = JSON.parse(JSON.stringify(old));
      _new[field] = value;
      return _new;
    });

    if (field === 'name') {
      if (value) {
        const isValid = nameRegex.test(value);
        setValidationError(isValid ? undefined : 'Invalid Username');
      } else {
        setValidationError(undefined);
      }
    }
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

      const apiUrl ="/api/v1/register"
      const params = {
        ...formValue,
        claim_reward_address: address,
      }
      // todo axios
      const data: any = await axios.post(
        apiUrl,
        params,
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
    } catch (e: any) {
      console.log("error", e);
      const msg = e?.response?.data?.msg || e?.message
      setErrormsg(msg)
      // toast.error(msg);
    } finally {
      closeLoading?.();
    }
  };

  const nameRegex = /^[a-zA-Z0-9]{3,12}$/;

  const buttonDisabled = !address || !formValue?.name || !formValue?.logo || !!validationError || !!errorMsg
  return (
    <Modal
      isOpen={visible}
      onClose={() => { }}
      className="[&_button]:none max-w-[820px] border border-[#FFFFFF33]"
    >
      {/* <ModalBody> */}
      <div className={clsx("flex justify-between bg-[url(@/assets/images/_global/new_to_bg.png)]", isMobile ? "flex-col bg-contain bg-bottom" : "bg-cover")}>
        <div className={clsx("w-[380px]", isMobile ? "aspect-[380/140]" : "")} />
        <div className={clsx("flex flex-col gap-10 bg-[#0B0C0F] relative z-1", isMobile ? "w-full p-3 " : "w-[440px] p-10 ")}>
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
            <FormItem
              title={"Username"}
              errorMsg={validationError || errorMsg}
            >
              <Input
                value={formValue?.name}
                onChange={(v: any) => updateFromValue("name", v)}
                className={clsx(
                  ((errorShow && !formValue?.name) || validationError || errorMsg)
                    ? "!border-[#da1a1a]"
                    : "border-[#525252]",
                  "rounded-[8px]"
                )}
                placeholder="name"
              />
            </FormItem>
            <FormItem
              title={"Choose Your Device"}
            // errorMsg={validationError || errorMsg}
            >
              <RadioGroup
                value={formValue.device}
                onValueChange={(v: any) => {
                  updateFromValue("device", v)
                }} classNames={{ wrapper: '!flex-row !flex-nowrap justify-between' }} >
                <Radio value={Device.pc} classNames={{ base: 'flex-1', label: 'text-sm flex items-center gap-1' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="2.5" width="13" height="9" rx="1.5" stroke="#00F0FF" />
                    <rect x="3" y="4" width="10" height="6" rx="1" fill="#00F0FF" />
                    <rect x="3" y="13" width="10" height="1.5" rx="0.75" fill="#00F0FF" />
                  </svg>

                  <span>PC/Laptop</span>
                </Radio>
                <Radio value={Device.android} classNames={{ base: 'flex-1', label: 'text-sm flex items-center gap-1' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.46095 5.35894C2.71274 5.36009 2.95386 5.45739 3.13184 5.62964C3.30981 5.8019 3.41022 6.03517 3.41121 6.27868V10.1549C3.41121 10.4138 3.3197 10.6331 3.13668 10.8127C2.95366 10.9924 2.72842 11.0826 2.46095 11.0834C2.33425 11.0857 2.20841 11.0629 2.09118 11.0163C1.97396 10.9698 1.86783 10.9005 1.77936 10.8127C1.59324 10.6324 1.50009 10.4138 1.50009 10.1549V6.27831C1.49832 6.15743 1.52219 6.03748 1.57022 5.92587C1.61825 5.81426 1.68943 5.71335 1.77936 5.62938C1.96642 5.44884 2.19286 5.35894 2.46095 5.35894ZM10.1785 1.87992C10.8432 2.21061 11.3746 2.67179 11.7727 3.26347C12.1656 3.83979 12.3733 4.51573 12.3695 5.20604H3.74709C3.7433 4.51576 3.95088 3.83984 4.34368 3.26347C4.7414 2.67131 5.27589 2.21012 5.94713 1.87992L5.28447 0.698521C5.24111 0.620335 5.25664 0.560642 5.33142 0.518345C5.41151 0.481723 5.47418 0.500034 5.51773 0.572361L6.18872 1.76255C6.77956 1.51285 7.41738 1.38396 8.06217 1.38396C8.70695 1.38396 9.34478 1.51285 9.93561 1.76255L10.607 0.572361C10.6507 0.500034 10.7124 0.482273 10.7937 0.518345C10.8681 0.560642 10.884 0.620335 10.8402 0.698521L10.1785 1.87992ZM12.3417 5.53051V11.5346C12.3417 11.8106 12.2421 12.0449 12.0429 12.2375C11.9501 12.3305 11.8385 12.404 11.715 12.4535C11.5916 12.503 11.4589 12.5274 11.3253 12.5252H10.6248V14.5714C10.6248 14.8303 10.5317 15.05 10.3455 15.2305C10.1598 15.4105 9.93239 15.4999 9.66562 15.4999C9.39885 15.4999 9.17147 15.4105 8.98535 15.2305C8.79924 15.0506 8.70647 14.831 8.70647 14.5714V12.5252H7.42014V14.5714C7.42014 14.8303 7.3268 15.05 7.14012 15.2305C6.95344 15.4111 6.72662 15.5009 6.45966 15.4999C6.33469 15.5017 6.21066 15.4788 6.09523 15.4324C5.97979 15.3861 5.87539 15.3174 5.78847 15.2305C5.60141 15.0504 5.50864 14.831 5.50864 14.5714L5.49898 12.5244H4.80981C4.52373 12.5244 4.28082 12.4299 4.0824 12.2368C3.88398 12.0436 3.78382 11.8107 3.78382 11.5346V5.53051H12.3417ZM5.84433 3.59636C5.87633 3.62984 5.91529 3.6564 5.95866 3.67429C6.00202 3.69219 6.04881 3.70101 6.09595 3.70018C6.19235 3.70016 6.28479 3.66311 6.35295 3.59718C6.4211 3.53125 6.45939 3.44184 6.45939 3.34862C6.45939 3.25539 6.4211 3.16598 6.35295 3.10005C6.28479 3.03412 6.19235 2.99707 6.09595 2.99705C6.04881 2.99622 6.00202 3.00504 5.95866 3.02294C5.91529 3.04083 5.87633 3.06739 5.84433 3.10087C5.77837 3.16762 5.74156 3.25638 5.74156 3.34871C5.74156 3.44103 5.77837 3.52961 5.84433 3.59636ZM9.77298 3.59636C9.80622 3.62974 9.84619 3.65617 9.89041 3.67403C9.93463 3.69188 9.98217 3.70078 10.0301 3.70018C10.0772 3.70081 10.1239 3.6919 10.1673 3.67402C10.2106 3.65614 10.2496 3.62969 10.2817 3.59636C10.3475 3.52951 10.3841 3.44078 10.3841 3.34852C10.3841 3.25627 10.3475 3.16754 10.2817 3.10069C10.2496 3.06734 10.2106 3.04087 10.1673 3.02299C10.1239 3.00511 10.0772 2.99621 10.0301 2.99687C9.95821 2.99667 9.88788 3.01714 9.82805 3.05566C9.76821 3.09419 9.72155 3.14904 9.69401 3.21325C9.66646 3.27746 9.65926 3.34814 9.67332 3.41632C9.68738 3.4845 9.72206 3.54728 9.77298 3.59636ZM14.6248 6.27831V10.1547C14.6248 10.4136 14.5315 10.6329 14.345 10.8126C14.1584 10.9923 13.9317 11.0825 13.6649 11.0832C13.5399 11.0849 13.4159 11.0618 13.3005 11.0152C13.1852 10.9687 13.0809 10.8997 12.9943 10.8126C12.8068 10.6324 12.7144 10.4136 12.7144 10.1547V6.27831C12.7144 6.02001 12.8077 5.80224 12.9943 5.62499C13.0817 5.53909 13.1861 5.47123 13.3014 5.4255C13.4167 5.37977 13.5403 5.35713 13.6649 5.35894C13.932 5.35894 14.1592 5.44774 14.3452 5.62499C14.5311 5.80224 14.6248 6.02013 14.6248 6.27831Z" fill="#00F0FF" />
                  </svg>
                  <span>Android App</span>
                </Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <Button
            disabled={buttonDisabled}
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
