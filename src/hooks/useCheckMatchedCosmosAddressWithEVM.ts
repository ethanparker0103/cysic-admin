import useAccount from "@/hooks/useAccount";
import { cosmosToEthAddress } from "@/utils/cosmos";
import axios from "axios";
import { useEffect, useMemo } from "react";

const useCheckMatchedCosmosAddressWithEVM = () => {
  const { address, cosmosAddress, userProfile } = useAccount();

  const hasMatchedWithCosmos = userProfile?.hasMatchedWithCosmos

  const calculatedEthAddress = useMemo(() => {
    if (!cosmosAddress) return null;
    return cosmosToEthAddress(cosmosAddress);
  }, [cosmosAddress]);

  const ifMatchedCosmosWithEvm = useMemo(() => {
    if (!calculatedEthAddress || !address) return false;
    return calculatedEthAddress?.toLowerCase() == address?.toLowerCase();
  }, [calculatedEthAddress, address]);

  const uploadState = () => {
    if (hasMatchedWithCosmos) return;
    axios.post("/api/v1/user/updateProfile", {
      hasMatchedWithCosmos: true,
    });
  };

  useEffect(() => {
    if (ifMatchedCosmosWithEvm && !hasMatchedWithCosmos) {
      uploadState();
    }
  }, [ifMatchedCosmosWithEvm, hasMatchedWithCosmos]);
};

export default useCheckMatchedCosmosAddressWithEVM;
