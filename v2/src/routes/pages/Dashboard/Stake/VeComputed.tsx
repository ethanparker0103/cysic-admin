import Button from "@/components/Button";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import DelegateModal from "@/routes/pages/Dashboard/Stake/Modal/delegate";
import DelegateDetail from '@/routes/pages/Dashboard/Stake/DelegateDetail';

const VeComputed = () => {
  return (
    <MainContainer title="Delegate veCompute">
      <>
        <DelegateDetail />

        <DelegateModal />
      </>
    </MainContainer>
  );
};

export default VeComputed;
