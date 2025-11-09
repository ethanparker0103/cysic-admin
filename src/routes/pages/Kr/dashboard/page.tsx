import { PT12Wrapper } from "@/components/Wrappers";
import useKrActivity from "@/models/kr";
import { TasksSection } from "@/routes/pages/Kr/components/TasksSection";
import { CheckInSection } from "@/routes/pages/Kr/components/CheckInSection";
import { ProfileSection } from "@/routes/pages/Kr/components/ProfileSection";
import { Divider } from "@nextui-org/react";
import Copy from "@/components/Copy";
import { useTranslation } from "react-i18next";

export const KrActivityDashboard = () => {
    const {  inviteCodes: _inviteCodes, systemSetting, tweetUnderReview, user, signInList, taskList, loading, stampList } =
        useKrActivity();
    const { t } = useTranslation()

    const ifActive = user?.id && !tweetUnderReview;

    const isInviteCodeEnabled = systemSetting?.enableInviteCode;
  
    const inviteCodes =
      _inviteCodes?.filter((i: any) => i?.available)?.map((i: any) => i?.code) ||
      [];
  

    return (
        <>
            {user?.id && tweetUnderReview ? (
                <div className="flex items-center justify-between gap-4 teachers-14-300 px-8 py-2 rounded-[8px] mb-6 w-fit mx-auto bg-[#00eeff]/20 border border-[#00eeff]">
                    <span className="text-white">
                        Your tweet is now under reviewing, please wait...
                    </span>
                </div>
            ) : null}

            <PT12Wrapper className="w-full pt-0">
                <div className="flex flex-col justify-center gap-4">
                    <TasksSection taskList={taskList} loading={loading} ifActive={ifActive} />
                    <div className="w-full flex flex-col gap-4">
                        <CheckInSection signInList={signInList} ifActive={ifActive} />
                        <ProfileSection user={user} stampList={stampList} />


                        {isInviteCodeEnabled && (
                            <>
                                <Divider className="my-8" />
                                <div className="flex flex-col gap-8 w-fit mx-auto">
                                    <p className="teachers-18-200 !normal-case">
                                        {t("shareInviteCodesWithFriends")}
                                    </p>

                                    {inviteCodes?.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-3 ">
                                            {inviteCodes?.map((inviteCode: string) => (
                                                <Copy
                                                    key={inviteCode}
                                                    value={window.location.origin + "/kr?_c=" + inviteCode}
                                                    className="[&_svg]:size-3 text-sm"
                                                >
                                                    <span className="text-white">{inviteCode}</span>
                                                </Copy>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-white/50">
                                            {t("noInviteCodesAvailable")}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </PT12Wrapper>
        </>
    );
};
