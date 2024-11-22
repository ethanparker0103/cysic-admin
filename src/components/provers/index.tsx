import MainCard from "@/components/MainCard";
import useAccount from "@/hooks/useAccount";
import useUser from "@/models/_global/user";
import { getImageUrl } from "@/utils/tools";
import { useRequest } from "ahooks";
import axios from "axios";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Status = ({ suc }: any) => {

  return (
    <div className={clsx("flex items-center gap-1", suc == undefined ? 'text-[#4e4e4e]' : suc ? 'text-[#11D473]' : 'text-[#FF401A]')}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6" cy="6" r="6" fill="currentColor" fillOpacity="0.2" />
        <circle cx="6" cy="6" r="3" fill="currentColor" />
      </svg>
      <span className="text-sm font-[400]">{suc == undefined ? 'Pending' : suc ? 'Active' : 'Inactive'}</span>
    </div>
  );
};

const Provers = () => {
  const { address } = useAccount()
  const { profile } = useUser()

  const aleoAddress = profile?.[address as string]?.aleoAddress
  const scrollProverStatus = profile?.[address as string] ? !!profile?.[address as string]?.provider?.find((i: any) => +i?.provider_id) : undefined

  const [aleoProverStatus, setAleoProverStatus] = useState<undefined | boolean>(undefined)
  useRequest(() => {
    return axios.post('https://api.47s3rx.org/graphql', {
      "query": "query userInfo($userId: String!) {\n  userInfo(userId: $userId) {\n    id\n    totalIncomes\n    paid\n    unpaid\n    todayIncomes\n    realtimeHashRate\n    realtimeHashRateUnit\n    balance\n    totalPayouts\n    totalShares\n  }\n  userWorkerStat(userId: $userId) {\n    all\n    online\n    offline\n    invalid\n  }\n}",
      "variables": {
        "userId": aleoAddress
      },
      "operationName": "userInfo"
    })
  }, {
    ready: !!aleoAddress,
    refreshDeps: [aleoAddress],
    onSuccess(e: any) {
      console.log('aleo result', e)
      if (e?.data) {
        setAleoProverStatus(true)
        return
      }
      if (e?.errors) {
        setAleoProverStatus(false)
        return
      }
    },
    onError(e) {
      console.log('aleo error', e)
      setAleoProverStatus(false)
      return
    }
  })


  return (
    <div className="flex items-center gap-4">
      <MainCard className="flex flex-col gap-6 rounded-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="size-[28px]" src={getImageUrl('@/assets/images/tokens/veScroll.svg')} />
            <div className="text-[24px] font-[500]">Scroll Prover</div>
          </div>
          <Status suc={scrollProverStatus} />
        </div>

        <div className="flex flex-col gap-2 text-[#A1A1AA] text-sm font-[400]">
          <div>Scroll Prover can now triply mine <span className="text-[#00F0FF]">$CYS, $CGT</span>, and <span className="text-[#00F0FF]">veScroll</span> reward</div>
          <Link to='/stake/veCompute'>
            <div className="underline text-[#D3D3D3]">You may delegate your veScroll rewards to $CGT</div>
          </Link>
        </div>

        <a href="https://medium.com/@cysic/phase-ii-genesis-node-prover-guide-53f17125ae4d" target="_blank"><div className="flex items-center gap-1 text-sm justify-end font-[400]"><span>Become a Scroll Prover</span> <ArrowRight size={16} /></div></a>
      </MainCard>


      <MainCard className="flex flex-col gap-6 rounded-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="size-[28px]" src={getImageUrl('@/assets/images/tokens/veAleo.svg')} />
            <div className="text-[24px] font-[500]">Aleo Prover</div>
          </div>
          <Status suc={aleoAddress ? aleoProverStatus : undefined} />
        </div>

        <div className="flex flex-col gap-2 text-[#A1A1AA] text-sm font-[400]">
          <div>Aleo Prover can now triply mine <span className="text-[#00F0FF]">$CYS, $CGT</span>, and <span className="text-[#00F0FF]">Aleo/veAleo</span> reward </div>
          <Link to='/stake/veCompute'>
            <div className="underline text-[#D3D3D3]">You may delegate your Aleo/veAleo rewards to $CGT.</div>
          </Link>
        </div>

        <a href="https://bit.ly/AleoProverTutorial" target="_blank"><div className="flex items-center gap-1 text-sm justify-end font-[400]"><span>Become an Aleo Prover</span> <ArrowRight size={16} /></div></a>
      </MainCard>

    </div>
  );
};

export default Provers;
