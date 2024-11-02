import useAccount from "@/hooks/useAccount";
import useCosmos from "@/models/_global/cosmos";
import { convertAddrByProvider } from "@/utils/cosmos";
import { useEffect } from "react";
import { toast } from "react-toastify";


const useCosmosCheck = () => {
    const { address: cosmosAddr, connector } = useCosmos()
    const { address: evmAddr } = useAccount()

    useEffect(()=>{
        if(cosmosAddr && evmAddr){
            convertAddrByProvider({client: connector}).then(({ethereumHexAddress = '', bech32Address = ''}) => {
                console.log('ethereumHexAddress', ethereumHexAddress, bech32Address)
                if(cosmosAddr?.toLowerCase() !== bech32Address?.toLowerCase() || ethereumHexAddress?.toLowerCase() !== evmAddr?.toLowerCase()){

                    toast.error(`Looks like your walletaddress doesn't match. Connect the right EVM address to keep going.`)
                    dispatchEvent(new CustomEvent('modal_download_keplr_visible', {detail:{
                        type: 'unmathedAddress',
                        visible: true
                    }}))
                    
                }
            })
        }
    }, [cosmosAddr, evmAddr])

    

   
};

export default useCosmosCheck