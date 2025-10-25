import Modal from "@/components/Modal";
import useKrActivity from "@/models/kr";
import Quizs from "@/routes/pages/Kr/components/quiz";
import { ITask } from "@/routes/pages/Kr/dashboard/page";
import { useEventListener } from "ahooks";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { authUtils, inviteCodeApi } from "./krApi";
import { toast } from "react-toastify";


const quizs = {
    fundamentalsQuiz: [
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 1,
        },
        {
            q: "Which of the following best describes ZK-SNARK?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 2,
        },
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 3,
        },
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 4,
        },
        {
            q: "What is the main focus of Cysic's technology?",
            choice: [
                "Social media platform",
                "Zero-knowledge proof acceleration",
                "E-commerce solutions",
                "Mobile gaming",
            ],
            a: 5,
        },
    ],
    basicsQuiz: [
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 1,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 2,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 3,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 4,
        },
        {
            q: "What is the purpose of the daily check-in system?",
            choice: [
                "To collect user data",
                "To maintain engagement and reward consistency",
                "To prevent spam",
                "To limit access to features",
            ],
            a: 5,
        },
    ],
};

export const KrLayout = () => {
    const [fundamentalsQuizVisible, setFundamentalsQuizVisible] =
        useState<boolean>(false);
    const [basicsQuizVisible, setBasicsQuizVisible] = useState(false);
    const { step, user, setState, initUserOverview, initSystemSetting } = useKrActivity();

    console.log("user", user);

    useEventListener("cysic_kr_next_step", (e: Event) => {
        const customEvent = e as CustomEvent;

        setState({ step: customEvent?.detail });
    });

    useEventListener("cysic_kr_login_x", () => {
        if (window.confirm("Click Confirm to Login")) {
            setState({ user: { id: "0001", name: "Test User" } });
        }
    });

    useEventListener("cysic_kr_tasks_action", (e: Event) => {
        const customEvent = e as CustomEvent;
        const state = customEvent?.detail as ITask;

        if (state.type == "fundamentalsQuiz") {
            setFundamentalsQuizVisible(true);
        }
        if (state.type == "basicsQuiz") {
            setBasicsQuizVisible(true);
        }
    });

    // 安全地移除URL中的_t参数，保留其他参数
    const removeTokenFromUrl = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('_t');
        
        // 构建新的URL
        const newUrl = url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
        window.history.replaceState({}, document.title, newUrl);
    };

    // 登录后绑定邀请码
    const bindInviteCodeAfterLogin = useCallback(async (inviteCode: string) => {
        try {
            const response = await inviteCodeApi.bindInviteCode(inviteCode, 'twitter');
            if (response.code === '200') {
                toast.success('Invite code bound successfully!');
                // 清除存储的邀请码
                localStorage.removeItem('cysic_kr_invite_code');
            } else {
                toast.error(response.msg || 'Failed to bind invite code');
            }
        } catch (error) {
            toast.error('Failed to bind invite code');
        } finally {
            // 无论成功失败，都获取用户概览
            initUserOverview();
        }
    }, [initUserOverview]);

    // 检查URL中的认证token
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('_t');
        
        if (token) {
            // 存储token
            authUtils.setAuthToken(token);
            
            // 立即从URL中移除_t参数
            removeTokenFromUrl();
            
            // 检查是否有邀请码需要绑定
            const storedInviteCode = localStorage.getItem('cysic_kr_invite_code');
            if (storedInviteCode) {
                // 如果有邀请码，先绑定邀请码
                bindInviteCodeAfterLogin(storedInviteCode);
            } else {
                // 没有邀请码，直接获取用户概览
                initUserOverview();
            }
            
            toast.success('Login successful!');
            // 触发登录成功事件
            dispatchEvent(new CustomEvent("cysic_kr_login_success"));
        }
    }, [initUserOverview, bindInviteCodeAfterLogin]);

    useEffect(() => {
        initSystemSetting()
    }, [initSystemSetting]);
    return (
        <>
            <Modal
                isOpen={fundamentalsQuizVisible}
                onClose={() => setFundamentalsQuizVisible(false)}
                title="Quiz"
                className="max-w-[600px]"
            >
                <>
                    <Quizs
                        quiz={quizs.fundamentalsQuiz}
                        onFinish={() => {
                            setFundamentalsQuizVisible(false);
                        }}
                    />
                </>
            </Modal>

            <Modal
                isOpen={basicsQuizVisible}
                onClose={() => setBasicsQuizVisible(false)}
                title="Quiz"
                className="max-w-[600px]"
            >
                <>
                    <Quizs
                        quiz={quizs.basicsQuiz}
                        onFinish={() => {
                            setBasicsQuizVisible(false);
                        }}
                    />
                </>
            </Modal>

            <Outlet />
        </>
    );
};
