import GradientBorderCard from "@/components/GradientBorderCard"
import useAccount from "@/hooks/useAccount"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export const CompletionTasksCard = () => {
    return (
        <GradientBorderCard borderRadius={8} className="px-6 py-4 flex-1 w-full h-full flex flex-col gap-4">

            <div className="text-base unbounded font-light flex-1">
                My<br />
                Task<br />
                Completion
            </div>

            <div className="text-2xl unbounded ml-auto">2500</div>

            <div className="flex flex-col gap-1 text-sm teacher !normal-case">
                <div className="flex items-center justify-between">
                    <div>Prover</div>
                    <div>2500</div>
                </div>
                <div className="flex items-center justify-between">
                    <div>Verifier</div>
                    <div>2</div>
                </div>
            </div>
        </GradientBorderCard>
    )
}

const BaseCard = ({ title, linkContent, to, children }: { title: string, linkContent: string, to: string, children: React.ReactNode }) => {
    return (
        <GradientBorderCard borderRadius={8} className="px-6 py-4 flex-1 w-full h-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="unbounded font-light">{title}</div>
                <Link to={to} className="text-sub text-sm teacher hover:text-white flex items-center gap-2">
                    {linkContent}
                    <ArrowRight size={12} />
                </Link>
            </div>

            {children}
        </GradientBorderCard>
    )
}



export const VerifierCard = () => {
    const { zkPart } = useAccount()

    const status = [
        { label: "STANDARD", key: "standardActive" },
        { label: "MOBILE", key: "mobileActive" }
    ] as const
    return (
        <BaseCard title="ZK Verifier" linkContent="More about ZK Verifier" to="/zk/verifier">
            <div className="flex items-center gap-x-12 gap-y-4 flex-wrap">
                {status.map((item) => (
                    <>
                        <div className="flex items-center gap-2 text-sm font-light unbounded">
                            <div className={`h-2 w-2 rounded-full ${zkPart?.verifierStatus?.[item.key] == 1 ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                            {item.label}&nbsp;
                            {zkPart?.verifierStatus?.[item.key] == 1 ? 'ACTIVE' : 'INACTIVE'}
                        </div>
                    </>
                ))}
            </div>
        </BaseCard>
    )
}

export const ProverCard = () => {
    const { zkPart } = useAccount()
    const status = [
        { label: "NFT", key: "nftActive" },
        { label: "SELF", key: "selfActive" }
    ] as const
    return (
        <BaseCard title="ZK Prover" linkContent="More about ZK Prover" to="/zk/prover">
            <div className="flex items-center gap-x-12 gap-y-4 flex-wrap">
                {status.map((item) => (
                    <div className="flex items-center gap-2 text-sm font-light unbounded">
                        <div className={`h-2 w-2 rounded-full ${zkPart?.proverStatus?.[item.key] == 1 ? 'bg-[#19FFE0]' : 'bg-red-500'}`}></div>
                        {item.label}&nbsp;
                        {zkPart?.proverStatus?.[item.key] == 1 ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                ))}
            </div>
        </BaseCard>
    )
}

export const ProjectCard = () => {
    const { zkPart } = useAccount()
    const status = [
        { label: "ONGOING PROJECTS", key: "ongoingCnt" },
        { label: "PROJECTS UNDER REVIEW", key: "underReviewCnt" }
    ] as const
    return (
        <BaseCard title="ZK Project" linkContent="More about ZK Project" to="/zk/project">
            <div className="flex items-center gap-x-12 gap-y-4 flex-wrap">
                {status.map((item) => (
                    <div className="flex items-center gap-2 text-sm font-light unbounded">
                        <div className={`h-2 w-2 rounded-full ${item.key == 'underReviewCnt' ? 'bg-[#19FFE0]' : 'bg-[#FFB60C]'}`}></div>
                        {zkPart?.projectStatus?.[item.key]}&nbsp;
                        {item.label}
                    </div>
                ))}
            </div>
        </BaseCard>
    )
}