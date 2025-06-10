import useStatic from "@/models/_global";
import { useRequest } from "ahooks";
import axios from "axios";

const useBootstrap = () => {

  const { setState } = useStatic()

  useRequest(async () => axios.get('/api/v1/metadata/get'), {
    onSuccess: (res) => {
      if (res?.data) {
        setState({
          proofTypeList: res?.data?.proofTypeList,
          referralLevelList: res?.data?.referralLevelList,
          multiplierLevelList: res?.data?.multiplierLevelList,
          faucetAmount: res?.data?.faucetAmount
        })
      }
    }
  })

}

export default useBootstrap;