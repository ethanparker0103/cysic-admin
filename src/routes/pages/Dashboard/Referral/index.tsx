import Button from "@/components/Button";
import useAccount from "@/hooks/useAccount";
import useModalState from "@/hooks/useModalState";
import { referralLevel } from "@/mock/referral";
import useReferral from "@/models/_global/referral";
import HowInviteWorkModal from "@/routes/components/modal/howInviteWorkModal";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import Valid from "@/routes/pages/Dashboard/Referral/Status/Valid";
import { useRequest } from "ahooks";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const mock = false;
const Referral = () => {
    const [searchParams] = useSearchParams();
    const codeFromUrl = searchParams.get("code");

    useEffect(() => {
        if (codeFromUrl) {
            setBindCode(codeFromUrl);
        }
    }, [codeFromUrl]);

    const { address } = useAccount();

    const {
        setState,
        discordBinded,
        twitterBinded,
        twitterAuthConfig,
        discordAuthConfig,
    } = useReferral();

    const allVerifiedNeeded = [
        {
            needOauth: twitterAuthConfig?.needOauth,
            type: "twitter",
            status: twitterBinded,
        },
        {
            needOauth: discordAuthConfig?.needOauth,
            type: "discord",
            status: discordBinded,
        },
    ].filter((i) => i.needOauth);

    const remainToBeChecked = allVerifiedNeeded.filter((i) => !i.status);

    const valid =
        twitterAuthConfig != undefined &&
        discordAuthConfig != undefined &&
        address &&
        remainToBeChecked?.length == 0;

    // 10.1 获取等级列表
    useRequest(() => axios.get(`/api/v1/referral/level`), {
        onSuccess(e) {
            const data = e?.data?.list;
            let termRequire = 0;

            for (let i = 0; i < e?.data?.list?.length; i++) {
                termRequire += +data?.[i]?.Require || 0;
                data[i].termRequire = termRequire;
            }

            setState({
                levelList: data,
                levelListMap: data?.reduce((prev: any, next: any) => {
                    if (!prev?.[next?.Level]) {
                        prev[next?.Level] = {};
                    }

                    prev[next?.Level] = next;
                    return prev;
                }, {}),
            });
        },
        onFinally() {
            if (!mock) return;
            const data: any = referralLevel?.data?.list;
            let termRequire = 0;

            for (let i = 0; i < referralLevel?.data?.list?.length; i++) {
                termRequire += +data?.[i]?.Require || 0;
                data[i].termRequire = termRequire;
            }

            setState({
                levelList: data,
                levelListMap: data?.reduce((prev: any, next: any) => {
                    if (!prev?.[next?.Level]) {
                        prev[next?.Level] = {};
                    }

                    prev[next?.Level] = next;
                    return prev;
                }, {}),
            });
        },
    });
    const [bindCode, setBindCode] = useState<string>();

    const { dispatch } = useModalState({eventName: "modal_how_invite_work_visible"});
    return (
        <>
            <MainContainer
                title={
                    <div className="flex items-center gap-2">
                        <div>Referral</div>
                        <Button onClick={()=>dispatch({visible: true})} className="text-[#fff] p-0 rounded-full h-fit min-h-fit" type="solidGradient">
                            <div className="flex items-center gap-1 gradient-sub-bg text-xs px-2 py-1">
                                How invite works <ArrowUpRight size={12} />
                            </div>
                        </Button>
                    </div>
                }
            >
                <Valid />
            </MainContainer>
        </>
    );
};

export default Referral;
