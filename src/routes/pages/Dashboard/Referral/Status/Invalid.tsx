import Button from "@/components/Button";
import { bindTwitter, bindDiscord, bindTwitterCheck, bindDiscordCheck } from "@/mock/referral";
import useReferral from "@/models/_global/referral";
import { mock } from "@/routes/pages/Dashboard/Referral";
import { shortStr } from "@/utils/tools";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import { useAccount } from "wagmi";

function checkIfWindowIsClosed(smallWindow: any, callback: any) {
    if (smallWindow && smallWindow.closed) {
        callback?.()
    }
}


const Invalid = () => {
    const { setState, discordBinded, twitterBinded, discordAuthConfig, twitterAuthConfig } = useReferral()
    const { address } = useAccount()
    const { openConnectModal: open } = useConnectModal();

    // 10.7 社交媒体绑定 - 跳转 twitter oauth2 链接获取已经邀请人员列表
    useRequest(() => axios.get(`/api/v1/referral/bind/twitter/${address}`), {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(e) {
            setState({
                twitterAuthConfig: e?.data
            })
        },
        onFinally() {
            if (!mock) return;
            setState({
                twitterAuthConfig: bindTwitter?.data
            })
        }
    })
    // 10.8 社交媒体绑定 - 跳转 discord oauth2 链接获取已经邀请人员列表
    useRequest(() => axios.get(`/api/v1/referral/bind/discord/${address}`), {
        ready: !!address,
        refreshDeps: [address],
        onSuccess(e) {
            setState({
                discordAuthConfig: e?.data
            })
        },
        onFinally() {
            if (!mock) return;
            setState({
                discordAuthConfig: bindDiscord?.data
            })
        }
    })
    // 10.9 社交媒体绑定 - 检查 twitter  
    const { loading: twittercheckLoading, run: twitterCheckRun } = useRequest(() => axios.get(`/api/v1/referral/bind/twitter/check/${address}`), {
        ready: !!address && twitterAuthConfig?.needOauth == false,
        refreshDeps: [address, twitterAuthConfig?.needOauth],
        onSuccess(e) {
            setState({
                twitterBinded: e?.code == 10000
            })
        },
        onFinally() {
            if (!mock) return;
            setState({
                twitterBinded: bindTwitterCheck?.code == 10000
            })
        }
    })
    // 10.10 社交媒体绑定 - 检查 discord
    const { loading: discordcheckLoading, run: discordCheckRun } = useRequest(() => axios.get(`/api/v1/referral/bind/discord/check/${address}`), {
        ready: !!address && discordAuthConfig?.needOauth == false,
        refreshDeps: [address, discordAuthConfig?.needOauth],
        onSuccess(e) {
            setState({
                discordBinded: e?.code == 10000
            })
        },
        onFinally() {
            if (!mock) return;
            setState({
                discordBinded: bindDiscordCheck?.code == 10000
            })
        }
    })

    const handleVerifyX = () => {
        if (twitterAuthConfig.authURL) {
            const discordWindow = window.open(twitterAuthConfig.authURL, 'Discord', 'width=500,height=400,left=250,top=100,resizable=no,scrollbars=no');
        }
    }
    const handleVerifyDiscord = async () => {
        if (discordAuthConfig.authURL) {
            const discordWindow = window.open(discordAuthConfig.authURL, 'Discord', 'width=500,height=400,left=250,top=100,resizable=no,scrollbars=no');
        }
    }

    const handleVerifyAll = () => {
        twitterCheckRun()
        discordCheckRun()
    }

    const handleAbout = () => {
        setState({
            twitterBinded: true,
            discordBinded: true
        })
    }
    return (
        <div className="flex flex-col gap-12 items-center w-full max-w-[560px] mx-auto">
            <div className="flex flex-col gap-12 w-full">
                <div className="text-[40px] font-[500] text-center">
                    <span className="text-gradient">Join</span> CYSIC
                </div>
                <div className="w-full flex flex-col gap-6 items-center text-base w-fit mx-auto">

                    <div className="w-full font-[500] rounded-[12px] border border-[#FFFFFF99] py-5 px-4 flex items-center justify-between">
                        <span>Connect Wallet</span>
                        {
                            address ? (<div className="text-[#00F0FF]">Connected as {shortStr(address || '', 10)}</div>) : (<Button className="h-9 min-h-fit" onClick={open}>Connect Wallet</Button>)
                        }
                    </div>
                    <div className={clsx(twitterAuthConfig?.needOauth == false ? '' : 'opacity-30', "w-full font-[500] rounded-[12px] border border-[#FFFFFF99] py-5 px-4 flex items-center justify-between")}>
                        <span>Follow @cysic_xyz on X</span>
                        {
                            twitterBinded ? (<div className="text-[#00F0FF]">Verified</div>) : (<Button loading={twittercheckLoading} className="h-9 min-h-fit" onClick={handleVerifyX}>Open X</Button>)
                        }
                    </div>
                    <div className={clsx(discordAuthConfig?.needOauth == false ? '' : 'opacity-30', "w-full font-[500] rounded-[12px] border border-[#FFFFFF99] py-5 px-4 flex items-center justify-between")}>
                        <span>Follow @cysic_xyz on Discord</span>
                        {
                            discordBinded ? (<div className="text-[#00F0FF]">Verified</div>) : (<Button loading={discordcheckLoading} className="h-9 min-h-fit" onClick={handleVerifyDiscord}>Open Discord</Button>)
                        }
                    </div>
                    <Button loading={discordcheckLoading || twittercheckLoading} onClick={handleVerifyAll} type="gradient" className="w-[320px]">Verify All</Button>
                    <div onClick={handleAbout} className="w-full flex flex-col gap-4 items-center text-[#A3A3A3]">
                        <div className="text-sm flex items-center cursor-pointer">
                            Read about cysic{" "}
                            <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.614 10.5647C10.9361 10.5647 11.1973 10.3035 11.1973 9.98138L11.1971 4.20654C11.1971 3.88666 10.9395 3.62646 10.6196 3.62325L4.78645 3.56476C4.4643 3.56153 4.20053 3.82006 4.19729 4.14221C4.19406 4.46436 4.4526 4.72813 4.77475 4.73137L9.21942 4.77594L4.01411 9.98124C3.78631 10.209 3.78631 10.5784 4.01411 10.8062C4.24192 11.034 4.61127 11.034 4.83907 10.8062L10.0305 5.6148L10.0306 9.98141C10.0306 10.3036 10.2918 10.5647 10.614 10.5647Z"
                                    fill="#A3A3A3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Invalid;
