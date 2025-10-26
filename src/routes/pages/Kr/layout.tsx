import Modal from "@/components/Modal";
import useKrActivity from "@/models/kr";
import Quizs from "@/routes/pages/Kr/components/quiz";
import { useEventListener } from "ahooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { inviteCodeApi, signInApi, stampApi, Task, taskApi } from "./krApi";
import { toast } from "react-toastify";
import { ETaskStatus, EUserTaskStatus } from "@/routes/pages/Admin/interface";
import { FIRST_TASK_ID } from "@/routes/pages/Kr/config";
import dayjs from "dayjs";
import { sleep } from "@/utils/tools";

export const KrLayout = () => {
    const quizId = useRef<number>(0);
    const quizRef = useRef<any>(null);
    const [quizVisible, setQuizVisible] = useState<boolean>(false);
    const {
        authToken,
        setState,
        initUserOverview,
        initSystemSetting,
        setAuthToken,
        initTaskList,
        tweetUnderReview,
    } = useKrActivity();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken && window.location.pathname == "/krkrkr/dashboard") {
            navigate("/krkrkr");
        }
    }, [authToken]);

    useEffect(() => {
        if (authToken && window.location.pathname == "/krkrkr") {
            setState({ showLogin: false });
        } else {
            setState({ showLogin: true });
        }
    }, [authToken]);

    useEventListener("cysic_kr_next_step", (e: Event) => {
        const customEvent = e as CustomEvent;

        setState({ step: customEvent?.detail });
    });

    useEventListener("cysic_kr_tasks_action", async (e: Event) => {
        const customEvent = e as CustomEvent;
        const state = customEvent?.detail as Task;

        if(state.currentStatus === EUserTaskStatus.UserTaskCompletionStatusCompleted) {
            return;
        }

        if (state.currentStatus === EUserTaskStatus.UserTaskCompletionStatusWaitClaim) {
            await taskApi.claimTask(state.id);
            dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh"));
            return;
        }

        if(state.currentStatus === EUserTaskStatus.UserTaskCompletionStatusPending) {
            return;
        }

        switch (state.taskType) {
            case "quiz":
                try {
                    const quizStr = state.quizTaskConfig?.quiz || '';
                    const answerStr = state.quizTaskConfig?.answer || '';
                    
                    let questions = [];
                    let answer = [];
                    
                    try {
                        questions = quizStr ? JSON.parse(quizStr) : [];
                        answer = answerStr ? JSON.parse(answerStr) : [];
                    } catch (parseError) {
                        console.error('JSON parse error:', parseError);
                        const cleanedQuiz = quizStr.trim().replace(/^"(.*)"$/, '$1');
                        const cleanedAnswer = answerStr.trim().replace(/^"(.*)"$/, '$1');
                        questions = cleanedQuiz ? JSON.parse(cleanedQuiz) : [];
                        answer = cleanedAnswer ? JSON.parse(cleanedAnswer) : [];
                    }

                    quizId.current = state.id;
                    quizRef.current = questions?.map((question: any, idx: number) => ({
                        q: question.q || question.question,
                        choice: question.choice || question.options,
                        a: answer[idx],
                    }));

                    setQuizVisible(true);
                } catch (error) {
                    toast.error("Failed to load quiz questions");
                }
                break;
        }
    });

    // 移除URL中的token参数
    const removeTokenFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("_t")) {
            urlParams.delete("_t");
            const newUrl =
                window.location.pathname +
                (urlParams.toString() ? `?${urlParams.toString()}` : "") +
                window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
        }
    };

    // 登录后绑定邀请码
    const bindInviteCodeAfterLogin = useCallback(async (inviteCode: string) => {
        if(!inviteCode) return;
        try {
            const response = await inviteCodeApi.bindInviteCode(
                inviteCode,
                "twitter"
            );
            if (response.code === "200") {
                toast.success("Invite code bound successfully!");
                // 清除存储的邀请码
                localStorage.removeItem("cysic_kr_invite_code");
            } else {
                toast.error(response.msg || "Failed to bind invite code");
            }
        } catch (error) {
            toast.error("Failed to bind invite code");
        }
    }, []);

    // 检查URL中的认证token
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("_t");

        if (token) {
            setAuthToken(token);

            removeTokenFromUrl();

            const storedInviteCode = localStorage.getItem("cysic_kr_invite_code");
            if (storedInviteCode) {
                bindInviteCodeAfterLogin(storedInviteCode);
            }

            toast.success("Login successful!");
            dispatchEvent(new CustomEvent("cysic_kr_login_success"));
        }
    }, [bindInviteCodeAfterLogin, setAuthToken]);

    const loadFirstTask = async () => {
        try {
            const response = await taskApi.getTaskList(FIRST_TASK_ID);
            if (response.code === "200") {
                setState({
                    tweetUnderReview: ![EUserTaskStatus.UserTaskCompletionStatusWaitClaim, EUserTaskStatus.UserTaskCompletionStatusCompleted].includes(response?.list?.[0]?.currentStatus),
                    firstTask: response?.list?.[0] || null,
                });

                if(window.location.pathname == "/krkrkr" && [EUserTaskStatus.UserTaskCompletionStatusWaitClaim, EUserTaskStatus.UserTaskCompletionStatusCompleted].includes(response?.list?.[0]?.currentStatus)){
                    navigate("/krkrkr/dashboard");
                }
            } else {
                toast.error(response.msg || "Failed to load task");
            }
        } catch (error) {
            toast.error("Failed to load task");
        }
    };

    const signIn = async () => {
        try {
            const response = await signInApi.signIn();

            const signInList = await signInApi.getSignInHistory(
                dayjs().subtract(30, "day").startOf("day").valueOf(),
                dayjs().endOf("day").valueOf()
            );
            if (signInList.code === "200") {
                setState({ signInList: signInList.signInDates });
            } else {
                toast.error(signInList.msg || "Failed to get sign in list");
            }
        } catch (error) {
            toast.error("Failed to sign in");
        }
    };

    const getUserStampList = async () => {
        try {
            const response = await stampApi.getStampList();
            if (response.code === "200") {
                setState({ stampList: response.list });
            } else {
                toast.error(response.msg || "Failed to get user stamp list");
            }
        } catch (error) {
            toast.error("Failed to get user stamp list");
        }
    };


    useEffect(() => {
        initSystemSetting();
    }, []);
    
    useEffect(() => {
        if (authToken) {
            initUserOverview();
            loadFirstTask();
            getUserStampList();
            initTaskList();
        }
    }, [authToken]);

    useEffect(() => {
        if (authToken && !tweetUnderReview) {
            signIn();
        }
    }, [authToken, tweetUnderReview]);

    useEventListener("cysic_kr_tasks_refresh", () => {
        initUserOverview();
        initTaskList();
        getUserStampList();
    });

    return (
        <>
            <Modal
                isOpen={quizVisible}
                onClose={() => setQuizVisible(false)}
                title="Quiz"
                className="max-w-[600px]"
            >
                <>
                    <Quizs
                        quizId={quizId.current}
                        quiz={quizRef.current}
                        onFinish={async (answer: string) => {
                            await taskApi.submitTask(quizId.current, answer);
                            await taskApi.claimTask(quizId.current);

                            await sleep(1000);
                            setQuizVisible(false);

                            dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh"));

                        }}
                    />
                </>
            </Modal>

            <Outlet />
        </>
    );
};
