import Button from "@/components/Button"
import MainCard from "@/components/MainCard"
import Modal from "@/components/Modal"
import Verticle from "@/components/Verticle"
import useAccount from "@/hooks/useAccount"
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer"
import { ModalHeader, ModalBody } from "@nextui-org/react"
import { useRequest } from "ahooks"
import axios from "axios"
import BigNumber from "bignumber.js"
import { useState } from "react"
import { toast } from "react-toastify"


const Phase1Convert = () => {
    const { address } = useAccount()

    const [activityPoints, setActivityPoints] = useState<any>()
    const [taskPoints, setTaskPoints] = useState<any>()
    const [claimed, setClaimed] = useState<any>(false)

    const { run } = useRequest(() => {
        return axios.get(`/api/v1/myPage/${address}/phase1/point`)
    }, {
        ready: !!address,
        refreshDeps: [address],
            onSuccess(e) {
              const data = e?.data?.data || {};
              setTaskPoints(data?.verifierPoints)
              setActivityPoints(data?.activityPoints)
              setClaimed(data?.claimed)
            },
    })


    const activityRewards = BigNumber(activityPoints || 0).div(10).toString()

    const [visible, setVisible] = useState(false)
    // const [taskPointsModalVisible, setTaskPointsModalVisible] = useState(false)
    // const [activityPointsModalVisible, setActivityPointsModalVisible] = useState(false)


    const handleClaimAll = async (closeLoading: any) => {
        try {
            if(!address) return;
            await axios.get(`/api/v1/myPage/${address}/phase1/convert`)
            run()
            toast.success('Converted successfully')
        } catch (e: any) {

        } finally {
            closeLoading?.()
        }
    }
    // const handleClaimTaskPoints = async (closeLoading: any) => {
    //     try {

    //         toast.success('Task Points converted successfully')
    //     } catch (e: any) {

    //     } finally {
    //         closeLoading?.()
    //     }
    // }
    // const handleClaimActivityPoints = async (closeLoading: any) => {
    //     try {


    //         run()
    //         toast.success('Activity Points converted successfully')
    //     } catch (e: any) {

    //     } finally {
    //         closeLoading?.()
    //     }
    // }

    return <>
        <MainContainer titleClassName={'flex-1'} title={<div className="flex-1 flex items-center justify-between">
            <span>Phase 1 POINTS</span>
            <Button
                className="relative z-[2]"
                type="solidGradient"
                onClick={() => setVisible(true)}
                disabled={!(+taskPoints || +activityPoints)}
            >
                <div className="flex items-center gap-1">
                    <span>Convert Points</span>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.33325 16.6917C9.65933 16.6917 10.9311 16.1649 11.8688 15.2272C12.8065 14.2895 13.3333 13.0178 13.3333 11.6917C13.3333 10.3656 12.8065 9.09383 11.8688 8.15615C10.9311 7.21847 9.65933 6.69168 8.33325 6.69168C7.00717 6.69168 5.7354 7.21847 4.79772 8.15615C3.86004 9.09383 3.33325 10.3656 3.33325 11.6917C3.33325 13.0178 3.86004 14.2895 4.79772 15.2272C5.7354 16.1649 7.00717 16.6917 8.33325 16.6917ZM8.33325 10.025L6.66659 11.6917L8.33325 13.3583L9.99992 11.6917L8.33325 10.025Z"
                            fill="currentColor"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.9524 10.8942C15.4385 10.5396 15.8421 10.084 16.1354 9.55869C16.4287 9.03334 16.6047 8.45071 16.6513 7.85085C16.698 7.251 16.6142 6.64816 16.4057 6.08378C16.1972 5.51939 15.8689 5.00686 15.4435 4.58142C15.0181 4.15598 14.5055 3.82772 13.9411 3.61922C13.3768 3.41072 12.7739 3.32692 12.1741 3.37358C11.5742 3.42024 10.9916 3.59626 10.4662 3.88954C9.94088 4.18281 9.48528 4.58638 9.13075 5.0725C10.6126 5.25156 11.9916 5.92249 13.047 6.97793C14.1024 8.03337 14.7734 9.41233 14.9524 10.8942ZM15.6749 16.4833L17.1083 17.9167L16.2249 18.8L13.7541 16.33C13.6292 16.205 13.559 16.0355 13.559 15.8587C13.559 15.682 13.6292 15.5125 13.7541 15.3875L16.2249 12.9167L17.1083 13.8L15.6749 15.2333H19.1666V16.4833H15.6749ZM4.32492 4.81667L2.89159 6.25L3.77492 7.13333L6.24575 4.66333C6.37068 4.53832 6.44086 4.36882 6.44086 4.19208C6.44086 4.01535 6.37068 3.84584 6.24575 3.72083L3.77492 1.25L2.89159 2.13333L4.32492 3.56667H0.833252V4.81667H4.32492Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </Button>
        </div>}>
            <div className="flex items-center gap-4">
                <MainCard>
                    <div className="flex flex-col gap-6 text-[#fff]">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="tex-[20px] font-[400]">Task Points</span>
                                <div className="text-[40px] leading-none">{taskPoints || '-'}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Verticle title={'1 Point = 1CYS + 1CGT'} desc={undefined} />
                        </div>
                    </div>
                </MainCard>
                <MainCard>
                    <div className="flex flex-col gap-6 text-[#fff]">
                        <div className="flex justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="tex-[20px] font-[400]">Activity Points</span>
                                <div className="text-[40px] leading-none">{activityPoints || '-'}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Verticle title={'10 Points = 1CYS'} desc={undefined} />
                            {/* <Verticle title={'Activity Points'} desc={phase1?.activity_points || '-'}/>
                    <Verticle title={'Verifier Points'} desc={phase1?.verifier_points || '-'}/>
                    <Verticle title={'Prover Points'} desc={phase1?.prover_points || '-'}/>
                    <Verticle title={'Reward points'} desc={phase1?.reward_points || '-'}/> */}
                        </div>
                    </div>
                </MainCard>
            </div>
        </MainContainer>



        <Modal isOpen={visible} onClose={() => setVisible(false)} className="w-[520px] max-w-fit">
            <ModalHeader className="flex flex-col gap-1">Convert Points</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <span>Please confirm converting </span>
                            <ul className="list-inside list-disc flex flex-col gap-2">
                                <li >{taskPoints} Task Points to {taskPoints} CYS + {taskPoints} CGT</li>
                                <li >{activityPoints} Activity Points to {activityRewards} CYS at the conversion rate of (10:1)</li>
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[#A1A1AA] text-sm">1 Task Point = 1 CYS + 1 CGT</span>
                            <span className="text-[#A1A1AA] text-sm">1 Activity Point = 0.1 CYS</span>
                        </div>


                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="flex-1" type="dark" onClick={() => setVisible(false)}>Cancel</Button>
                        <Button className="flex-1" type="gradient" needLoading onClick={handleClaimAll}>Confirm</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>


        {/* 
        <Modal isOpen={taskPointsModalVisible} onClose={() => setTaskPointsModalVisible(false)}>
            <ModalHeader className="flex flex-col gap-1">Convert Points</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <span>Please confirm converting {taskPoints} Task Points to {taskPoints} CYS + {taskPoints} CGT</span>

                        <span className="text-[#A1A1AA] text-sm">1Point = 1CYS + 1CGT</span>

                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="flex-1" type="dark" onClick={() => setTaskPointsModalVisible(false)}>Cancel</Button>
                        <Button className="flex-1" type="gradient" needLoading onClick={handleClaimTaskPoints}>Confirm</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>

        <Modal isOpen={activityPointsModalVisible} onClose={() => setActivityPointsModalVisible(false)}>
            <ModalHeader className="flex flex-col gap-1">Convert Points</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <span>Please confirm converting {activityPoints} Activity Points to {activityRewards} CYS at the conversion rate of (10:1)</span>

                        <span className="text-[#A1A1AA] text-sm">10Points = 1CYS</span>

                    </div>
                    <div className="flex items-center gap-2">
                        <Button className="flex-1" type="dark" onClick={() => setActivityPointsModalVisible(false)}>Cancel</Button>
                        <Button className="flex-1" type="gradient" needLoading onClick={handleClaimActivityPoints}>Confirm</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal> */}

    </>
}

export default Phase1Convert