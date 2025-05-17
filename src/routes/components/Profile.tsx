import useAccount from "@/hooks/useAccount";
import InfoCard from "@/routes/components/usePortal/cards/InfoCard";
import { getImageUrl, handleSignIn } from "@/utils/tools";

const Profile = () => {
    const handleEditName = () => {
        handleSignIn('profile')
    }

    const { user } = useAccount()
    const { name,  avatarUrl } = user || {};
    
    return (
        <InfoCard title="PROFILE">
            <>
                <div 
                onClick={handleEditName}
                className="cursor-pointer absolute right-6 top-4 flex items-start h-[calc(100%-2rem)] aspect-square">
                    <img
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full rounded-md object-cover"
                    />
                </div>

                <div className="flex justify-between gap-4 w-full">
                    <div className="flex flex-col gap-1 justify-end">
                        <div className="text-base text-sub">NAME</div>
                        <div className="flex items-center gap-2 text-base">
                            <span className="text-white">{name || "Unknown"}</span>
                            <button onClick={handleEditName} className="text-sub p-0 bg-transparent border-0">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </InfoCard>
    )
}

export default Profile;