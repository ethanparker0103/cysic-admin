import useAccount from "@/hooks/useAccount";
import useCosmos from "@/models/_global/cosmos";
import { convertAddrByProvider, unmatchToastError } from "@/utils/cosmos";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";


const useCosmosCheck = () => {
    const { address: cosmosAddr, connector, setState } = useCosmos()
    const { address: evmAddr } = useAccount()


    useEffect(()=>{
        if(cosmosAddr && evmAddr){
            convertAddrByProvider({client: connector}).then(({ethereumHexAddress = '', bech32Address = ''}) => {
                console.log('ethereumHexAddress', ethereumHexAddress, bech32Address)
                if(cosmosAddr?.toLowerCase() !== bech32Address?.toLowerCase() || ethereumHexAddress?.toLowerCase() !== evmAddr?.toLowerCase()){
                    setState({unmatchedAddressWithEVM: true})
                    if(!document.querySelectorAll('#unmathedAddressToast')?.[0]){
                        unmatchToastError()
                    }
                    
                    dispatchEvent(new CustomEvent('modal_download_keplr_visible', {detail:{
                        type: 'unmathedAddress',
                        visible: true
                    }}))
                    
                }else{
                    setState({unmatchedAddressWithEVM: false})
                    if(document.querySelectorAll('#unmathedAddressToast')?.[0]){
                        toast.dismiss('unmathedAddressToast'); 
                    }
                }
            })
        }
    }, [cosmosAddr, evmAddr])

    

   
};

export default useCosmosCheck