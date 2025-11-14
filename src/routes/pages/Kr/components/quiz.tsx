import React, { useState } from "react";
import confetti from "canvas-confetti";
import { taskApi } from "@/routes/pages/Kr/krApi";
import { sleep } from "@/utils/tools";
import Button from "@/components/Button";
import { cn } from "@nextui-org/react";

interface QuizItem {
    q: string;
    choice: string[];
}

interface QuizsProps {
    quizId: number; // 任务ID，用于提交答案
    quiz: QuizItem[]; // 不再包含正确答案，后端评判
    autoAdvanceDelay?: number; // 题内跳转延迟
    setQuizVisible: (visible: boolean) => void;
}

let selectionsResult: any[] = [];

const Quizs: React.FC<QuizsProps> = ({ quizId, quiz, setQuizVisible, autoAdvanceDelay = 300 }) => {
    const [current, setCurrent] = useState(0);

    const [selections, setSelections] = useState<number[]>(
        () => Array.isArray(quiz) ? new Array(Math.max(quiz.length, 0)).fill(0) : []
    );
    const [submitted, setSubmitted] = useState(false);
    const [correctAnswers1Based, setCorrectAnswers1Based] = useState<number[] | null>(null);
    const [loading, setLoading] = useState(false);

    const q = quiz[current];
    if (!q) return <div>No questions</div>;

    const handleSubmitAll = async () => {

        const answers1Based = selectionsResult.map((idx) => idx + 1);
        try {
            setLoading(true);
            const resp = await taskApi.submitTask(quizId, JSON.stringify(answers1Based));
            setSubmitted(true);

            if (resp?.isRight) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            }

            setCorrectAnswers1Based(JSON.parse(resp?.result as string));

            dispatchEvent(new CustomEvent("cysic_kr_tasks_refresh"));

            setTimeout(async () => {
                if (resp?.isRight) {
                    setQuizVisible(false);
                }
            }, 1_200)


        } catch (e) {
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    const goNext = async (fromIndex?: number) => {
        const base = typeof fromIndex === "number" ? fromIndex : current;
        const nextIndex = base + 1;
        if (nextIndex < quiz.length) {
            setCurrent(nextIndex);
        } else {
            await handleSubmitAll();
        }
    };

    const handleOptionClick = async (idx: number) => {
        if (submitted) return; // 提交后不允许更改

        setSelections((prev) => {
            const nextSel = [...prev];
            nextSel[current] = idx;
            selectionsResult = nextSel
            return nextSel;
        });
        await goNext(current);
    };

    // 当前题目的用户选择与正确答案（0-based）
    const userIdx = selections[current];
    const correct1 = correctAnswers1Based?.[current];
    const correctIdx = typeof correct1 === "number" ? correct1 - 1 : null;

    return (
        <div className="p-4">
            <>
                <style>
                    {`
                    @keyframes quiz-shake {
                      0% { transform: translateX(0); }
                      20% { transform: translateX(-6px); }
                      40% { transform: translateX(6px); }
                      60% { transform: translateX(-4px); }
                      80% { transform: translateX(4px); }
                      100% { transform: translateX(0); }
                    }
                    .quiz-shake {
                      animation: quiz-shake 0.4s ease-in-out;
                      will-change: transform;
                    }
                    `}
                </style>
                <div className="text-sm text-gray-500">
                    Question {current + 1} / {quiz.length}
                </div>

                <div className="mb-4 text-lg font-semibold">{q.q}</div>

                <div className="flex flex-col gap-3">
                    {q.choice.map((ch, idx) => (
                        <Button
                            disabled={loading}
                            type="solid"
                            key={idx}
                            onClick={() => handleOptionClick(idx)}
                            className={cn(
                                // 基础样式（按钮需要边框用于显示红/绿终态）
                                "rounded-[8px] px-4 py-3 text-left border w-full hover:!bg-white/10",
                                submitted && "pointer-events-none",
                                // 提交后终态颜色：优先使用逐题正确答案
                                submitted && correctIdx !== null && idx === correctIdx && idx === userIdx && "!border-green-500 !bg-green-500/10",
                                submitted && correctIdx !== null && idx === correctIdx && idx !== userIdx && "!border-green-500 !bg-green-500/10 opacity-95",
                                submitted && correctIdx !== null && idx === userIdx && userIdx !== correctIdx && "!border-red-500 !bg-red-500/10 quiz-shake",
                                submitted && correctIdx !== null && idx !== correctIdx && idx !== userIdx && "opacity-60",
                                // 若后端未提供逐题答案，仅弱化非选择项并弱绿色/白色边框提示所选
                                submitted && correctIdx === null && idx === userIdx && "!border-white/60 !bg-white/10",
                                submitted && correctIdx === null && idx !== userIdx && "opacity-60",
                            )}
                            aria-disabled={false}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="w-6 text-sm font-medium">{String.fromCharCode(65 + idx)}</div>
                                <div className="flex-1 text-left">{ch}</div>
                            </div>
                        </Button>
                    ))}
                </div>
            </>
        </div>
    );
};

export default Quizs;
