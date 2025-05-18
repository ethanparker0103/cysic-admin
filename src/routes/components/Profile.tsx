import useAccount from "@/hooks/useAccount";
import GradientBorderCard from "@/components/GradientBorderCard";
import { getImageUrl, handleSignIn, shortStr } from "@/utils/tools";

const Profile = () => {
    const handleEditName = () => {
        handleSignIn('profile')
    }

    const { user } = useAccount()
    const { name, avatarUrl } = user || {};

    return (

        <GradientBorderCard borderRadius={8} className={`h-full relative`}>
            <div className="h-full flex justify-between px-6 py-4 w-full gap-4">
                <div className="flex-1  flex flex-col justify-between">
                    <div className="text-base !font-light uppercase font-medium ">PROFILE</div>
                    <div className="flex-1 flex flex-col justify-between w-full gap-4">
                        <div className="flex-1 flex items-end ">
                            <>
                                <div className="flex justify-between gap-4 max-w-[17.5rem] ">
                                    <div className="flex flex-col gap-1 justify-end w-full">
                                        <div className="text-base text-sub">NAME</div>
                                        <div className="flex items-center gap-2 text-base">
                                            <span className="text-white flex-1">{name ? shortStr(name, 16) : "-"}</span>
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
                        </div>

                    </div>
                </div>
                <div
                    onClick={handleEditName}
                    className="cursor-pointer flex self-center h-[calc(100%-2rem)] aspect-square">
                    <img
                        src={avatarUrl}
                        alt="Profile"
                        className="w-full h-full rounded-md object-cover"
                    />
                </div>
            </div>

        </GradientBorderCard>


    )
}

export default Profile;