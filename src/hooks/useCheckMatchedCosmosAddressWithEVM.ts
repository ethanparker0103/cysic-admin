import useAccount from "@/hooks/useAccount";
import useUser from "@/models/user";
import { cosmosToEthAddress } from "@/utils/cosmos";
import axios from "axios";
import { useEffect, useMemo } from "react";

const useCheckMatchedCosmosAddressWithEVM = () => {
  const { updateHasMatchedWithCosmos } = useUser();
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

  const uploadState = async () => {
    if (hasMatchedWithCosmos || !address) return;
    await axios.post("/api/v1/user/updateProfile", {
      hasMatchedWithCosmos: true,
    });
    updateHasMatchedWithCosmos(address, true);
  };

  useEffect(() => {
    if (ifMatchedCosmosWithEvm && !hasMatchedWithCosmos) {
      uploadState();
    }
  }, [ifMatchedCosmosWithEvm, hasMatchedWithCosmos]);
};

export default useCheckMatchedCosmosAddressWithEVM;
