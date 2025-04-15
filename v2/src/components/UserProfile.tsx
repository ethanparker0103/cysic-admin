import Image from "@/components/Image";
import useAccount from "@/hooks/useAccount";
import useUser from "@/models/_global/user";
import { Tooltip } from "@nextui-org/react";

const UserProfile = () => {
    const { address } = useAccount()
    const { profile: _profile } = useUser();
    const profile = _profile?.[address || '']

    if (!profile?.name) return;
    return (
        <>
            <Tooltip
                classNames={{
                    content: '!p-0'
                }}
                content={
                    <div className="border border-[#FFFFFF33] rounded-[12px] p-4 flex items-center gap-2">
                        <div className="size-6">
                            <Image className="size-full rounded-full" src={profile?.avatar} />
                        </div>
                        <div>{profile?.name}</div>
                    </div>
                }
            >
                <div className="size-10">
                    <Image className="size-full rounded-full" src={profile?.avatar} />
                </div>
            </Tooltip>
        </>
    );
};

export default UserProfile;
