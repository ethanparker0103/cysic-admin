import Modal from "@/components/Modal";
import useKrActivity from "@/models/kr";
import Quizs from "@/routes/pages/Kr/components/quiz";
import { useEventListener } from "ahooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { inviteCodeApi, signInApi, stampApi, Task, taskApi } from "./krApi";
import { toast } from "react-toastify";
import { EUserTaskStatus } from "@/routes/pages/Admin/interface";
import { FIRST_TASK_ID } from "@/routes/pages/Kr/config";
import dayjs from "dayjs";
import { generateQueryString, sleep } from "@/utils/tools";
import Copy from "@/components/Copy";
import { Card, Input } from "@nextui-org/react";
import Button from "@/components/Button";

export const KrLayout = () => {
    const taskId = useRef<number>(0);
    const quizId = useRef<number>(0);
    const quizRef = useRef<any>(null);
    const postTwitterContentRef = useRef<any>('');
    const quoteTwitterIdRef = useRef<any>('');
    const inviteCodesRef = useRef<string[]>([]);
    const [quizVisible, setQuizVisible] = useState<boolean>(false);
    const [inviteVisible, setInviteVisible] = useState<boolean>(false);

    const [quoteTwitterVisible, setQuoteTwitterVisible] = useState(false);
    const [postTwitterVisible, setPostTwitterVisible] = useState(false);

    const [postTwitterUrl, setPostTwitterUrl] = useState('')
    const [quoteTwitterUrl, setQuoteTwitterUrl] = useState('')


    const {
        week,
        inviteCodes,
        authToken,
        setState,
        initUserOverview,
        initSystemSetting,
        setAuthToken,
        initTaskList,
        initTaskListByGroup,
        systemSetting,
        inviterId
    } = useKrActivity();
    const navigate = useNavigate();

    useEventListener("cysic_kr_next_step", (e: Event) => {
        const customEvent = e as CustomEvent;

        setState({ step: customEvent?.detail });
    });

    useEventListener("cysic_kr_tasks_action", async (e: Event) => {
        const customEvent = e as CustomEvent;
        const state = customEvent?.detail as Task;

        if (state.currentStatus === EUserTaskStatus.UserTaskCompletionStatusCompleted) {
            return;
        }

        if (state.currentStatus === EUserTaskStatus.UserTaskCompletionStatusWaitClaim) {
            await taskApi.claimTask(state.id);
            dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh"));
            return;
        }

        if (state.currentStatus === EUserTaskStatus.UserTaskCompletionStatusPending) {
            return;
        }

        taskId.current = state.id
        switch (state.taskType) {
            case "postTwitter": {
                postTwitterContentRef.current = state.postTwitterTaskConfig?.content
                setPostTwitterVisible(true)
                break;
            }
            case "quoteTwitter": {
                quoteTwitterIdRef.current = state.quoteTwitterTaskConfig?.content
                setQuoteTwitterVisible(true)
                break;
            }
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
            case "invite":
                inviteCodesRef.current = inviteCodes?.filter((inviteCode: any) => inviteCode.available)?.map((inviteCode: any) => inviteCode.code) || [];
                setInviteVisible(true);
                break;
        }
    });

    // 移除URL中的参数
    const removeParamFromUrl = (paramName: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has(paramName)) {
            urlParams.delete(paramName);
            const newUrl =
                window.location.pathname +
                (urlParams.toString() ? `?${urlParams.toString()}` : "") +
                window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
        }
    };

    // 登录后绑定邀请码
    const bindInviteCodeAfterLogin = useCallback(async (inviteCode: string) => {
        if (!inviteCode) return;
        try {
            const response = await inviteCodeApi.bindInviteCode(
                inviteCode,
                "twitter"
            );
            if (response.code === "200") {
                toast.success("Invite code bound successfully!");
                dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh_user_overview"));
            } else {
                toast.error(response.msg || "Failed to bind invite code");
            }
        } catch (error) {
            toast.error("Failed to bind invite code");
        }
    }, []);

    // 检查URL中的认证token和邀请码
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("_t");
        const inviteCode = urlParams.get("_c");

        // 处理邀请码参数
        if (inviteCode) {
            localStorage.setItem("cysic_kr_invite_code", inviteCode);
            removeParamFromUrl("_c");
            toast.success("Invite code received!");
        }

        // 处理认证token
        if (token) {
            setAuthToken(token);
            removeParamFromUrl("_t");

            // 检查是否有邀请码需要绑定
            const storedInviteCode = localStorage.getItem("cysic_kr_invite_code");
            if (storedInviteCode) {
                bindInviteCodeAfterLogin(storedInviteCode);
            }

            toast.success("Login successful!");
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

                if (window.location.pathname == "/krkrkr" && [EUserTaskStatus.UserTaskCompletionStatusWaitClaim, EUserTaskStatus.UserTaskCompletionStatusCompleted].includes(response?.list?.[0]?.currentStatus)) {
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
            await signInApi.signIn();

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
        }
    }, [authToken]);

    useEffect(() => {
        if (authToken && systemSetting?.enableInviteCode !== undefined) {
            const week = useKrActivity.getState().week
            if (systemSetting?.enableInviteCode) {
                if (Number(inviterId) > 0) {
                    loadFirstTask();
                    getUserStampList();
                    initTaskListByGroup(+week);
                    signIn();
                }
            } else {
                loadFirstTask();
                getUserStampList();
                initTaskListByGroup(+week);
                signIn();
            }
        }
    }, [authToken, inviterId, systemSetting?.enableInviteCode]);



    useEffect(() => {
        if (!authToken && window.location.pathname == "/krkrkr/dashboard") {
            navigate("/krkrkr");
        }
    }, [authToken]);

    useEffect(() => {
        if (!authToken) {
            setState({ showLogin: true });
        } else if (window.location.pathname == "/krkrkr") {
            if (systemSetting?.enableInviteCode && Number(inviterId) <= 0) {
                setState({ showLogin: true });
            } else {
                setState({ showLogin: false });
            }
        } else {
            setState({ showLogin: true });
        }
    }, [authToken, systemSetting?.enableInviteCode, inviterId, setState]);

    useEventListener("cysic_kr_tasks_change_week", () => {
        const week = useKrActivity.getState().week
        initTaskListByGroup(+week);
    })

    useEventListener("cysic_kr_tasks_refresh_user_overview", () => {
        initUserOverview();
    });

    useEventListener("cysic_kr_tasks_refresh", () => {
        const week = useKrActivity.getState().week
        initUserOverview();
        initTaskListByGroup(+week);
        getUserStampList();
    });



    const handleSubmitPost = async () => {
        await taskApi.submitTask(taskId.current, postTwitterUrl);
        toast.success('Your tweet is now under-reviewing')

        await sleep(1000);
        dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh"));
    }

    const handlePost = (content: string) => {
        const link = `https://x.com/intent/post?${generateQueryString({
            text: content
        })}`

        window.open(link, '_blank')
    }

    const handleSubmitQuote = async () => {
        await taskApi.submitTask(taskId.current, quoteTwitterUrl);
        toast.success('Your tweet is now under-reviewing')

        await sleep(1000);
        dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh"));
    }

    const extractTweetId = (url: string): string | null => {
        if (!url) return null;
        
        const patterns = [
            /(?:x\.com|twitter\.com)\/\w+\/status\/(\d+)/,
            /status\/(\d+)/,
            /\/tweet\/(\d+)/,
            /tweet_id=(\d+)/,
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return null;
    };

    const handleQuote = (tweetUrlOrContent: string) => {
        const tweetId = extractTweetId(tweetUrlOrContent) || tweetUrlOrContent;
        
        if (!tweetId) {
            toast.error('Invalid Twitter URL or ID');
            return;
        }

        const replyUrl = `https://twitter.com/intent/tweet?in_reply_to=${tweetId}`;
        window.open(replyUrl, '_blank');
    }

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

            <Modal
                isOpen={inviteVisible}
                onClose={() => setInviteVisible(false)}
                title="Get Your Invite Codes"
                className="max-w-[400px]"
            >
                <>
                    <div className="flex flex-col gap-6">
                        <p className="text-white/80 text-sm">
                            Share your invite codes with friends to earn rewards!
                        </p>

                        {inviteCodesRef.current.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {inviteCodesRef.current.map((inviteCode: string) => (
                                    <Copy key={inviteCode} value={window.location.origin + '/krkrkr?_c=' + inviteCode} className="justify-between bg-white/10 border border-white/20 rounded-lg px-4 py-3 hover:bg-white/15 transition-colors">
                                        <span className="font-mono text-white font-semibold tracking-wider">
                                            {inviteCode}
                                        </span>
                                    </Copy>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-white/50">
                                No invite codes available
                            </div>
                        )}
                    </div>
                </>
            </Modal>

            <Modal
                isOpen={postTwitterVisible}
                onClose={() => { setPostTwitterVisible(false); setPostTwitterUrl(''); }}
                title="Post"
                className="max-w-[400px]"
            >
                <>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm">
                            1. Post the following section
                        </p>

                        <Card className="p-4 rounded-[8px]">
                            {postTwitterContentRef.current}
                        </Card>

                        <Button className="mb-4" type="light" onClick={() => handlePost(postTwitterContentRef.current)} >Post</Button>


                        <p className="text-white/80 text-sm">
                            2. Enter your Tweet url. (You can only submit once, please be careful)
                        </p>

                        <Input placeholder="https://x.com/..." value={postTwitterUrl} onValueChange={setPostTwitterUrl} />

                        <Button className="" disabled={!postTwitterUrl} onClick={handleSubmitPost} type="light">Submit</Button>
                    </div>
                </>
            </Modal>

            <Modal
                isOpen={quoteTwitterVisible}
                onClose={() => { setQuoteTwitterVisible(false); setQuoteTwitterUrl(''); }}
                title="Reply"
                className="max-w-[400px]"
            >
                <>
                    <div className="flex flex-col gap-2">
                        <p className="text-white/80 text-sm">
                            1. Reply to the following tweet
                        </p>

                        <Card className="p-4 rounded-[8px] overflow-auto">
                            <div className="flex flex-col gap-2">
                                {quoteTwitterIdRef.current && (
                                    <a 
                                        href={quoteTwitterIdRef.current.startsWith('http') 
                                            ? quoteTwitterIdRef.current 
                                            : `https://x.com/${quoteTwitterIdRef.current}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-sm break-all"
                                    >
                                        {quoteTwitterIdRef.current.startsWith('http') 
                                            ? quoteTwitterIdRef.current 
                                            : `View tweet: https://x.com/${quoteTwitterIdRef.current}`}
                                    </a>
                                )}
                            </div>
                        </Card>

                        <Button className="mb-4" type="light" onClick={() => handleQuote(quoteTwitterIdRef.current)} >Open Reply</Button>


                        <p className="text-white/80 text-sm">
                            2. Enter your Tweet url. (You can only submit once, please be careful)
                        </p>

                        <Input placeholder="https://x.com/..." value={quoteTwitterUrl} onValueChange={setQuoteTwitterUrl} />

                        <Button className="" disabled={!quoteTwitterUrl} onClick={handleSubmitQuote} type="light">Submit</Button>
                    </div>
                </>
            </Modal>


            <Outlet />
        </>
    );
};
