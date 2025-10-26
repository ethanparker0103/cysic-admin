import { PT12Wrapper } from "@/components/Wrappers";
import useKrActivity from "@/models/kr";
import { TasksSection } from "@/routes/pages/Kr/components/TasksSection";
import { CheckInSection } from "@/routes/pages/Kr/components/CheckInSection";
import { ProfileSection } from "@/routes/pages/Kr/components/ProfileSection";

export const KrActivityDashboard = () => {
    const { authToken, tweetUnderReview, user, signInList, taskList, loading, stampList } =
        useKrActivity();

    const ifActive = user?.id && !tweetUnderReview;
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
                    </div>
                </div>
            </PT12Wrapper>
        </>
    );
};
