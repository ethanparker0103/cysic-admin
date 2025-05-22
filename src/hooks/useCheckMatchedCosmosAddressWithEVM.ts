import useAccount from "@/hooks/useAccount";
import useUser from "@/models/user";
import { cosmosToEthAddress } from "@/utils/cosmos";
import axios from "axios";
import { useEffect, useMemo } from "react";

const useCheckMatchedCosmosAddressWithEVM = () => {
  const { updateHasMatchedWithCosmos } = useUser();
  const { address, cosmosAddress, userProfile, isSigned } = useAccount();

  const hasMatchedWithCosmos = userProfile?.hasMatchedWithCosmos

  const calculatedEthAddress = useMemo(() => {
    if (!cosmosAddress || !isSigned) return null;
    return cosmosToEthAddress(cosmosAddress);
  }, [cosmosAddress, isSigned]);

  const ifMatchedCosmosWithEvm = useMemo(() => {
    if (!calculatedEthAddress || !address || !isSigned) return false;
    return calculatedEthAddress?.toLowerCase() == address?.toLowerCase();
  }, [calculatedEthAddress, address, isSigned]);

  const uploadState = async () => {
    if (hasMatchedWithCosmos || !address) return;
    await axios.post("/api/v1/user/updateProfile", {
      cysicAddress: cosmosAddress,
      evmAddress: address
    });
    updateHasMatchedWithCosmos(address, true);
  };

  useEffect(() => {
    if (ifMatchedCosmosWithEvm && !hasMatchedWithCosmos && isSigned) {
      uploadState();
    }
  }, [ifMatchedCosmosWithEvm, hasMatchedWithCosmos, isSigned]);
};

export default useCheckMatchedCosmosAddressWithEVM;
