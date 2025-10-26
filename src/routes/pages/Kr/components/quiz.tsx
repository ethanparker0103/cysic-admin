import { sleep } from "@/utils/tools";
import React, { useState } from "react";
import confetti from "canvas-confetti";

interface QuizItem {
    q: string;
    choice: string[];
    a: number; // NOTE: your data appears to be 1-based (1..n). We'll convert to 0-based internally.
}

interface QuizsProps {
    quizId: number;
    quiz: QuizItem[];
    onFinish?: (answer: string) => void;
    autoAdvanceDelay?: number; // ms to wait after correct before advancing (default 600)
}

const Quizs: React.FC<QuizsProps> = ({ quizId, quiz, onFinish, autoAdvanceDelay = 300 }) => {
    const [current, setCurrent] = useState(0);

    // status: 'idle' - 未答 / 可选
    //         'wrong' - 已选错（展示错/对），等待用户点击正确答案
    //         'correct' - 已选对，待跳转（短延迟）
    const [status, setStatus] = useState<"idle" | "wrong" | "correct">("idle");
    const [selectedWrongIdx, setSelectedWrongIdx] = useState<number | null>(null);

    const q = quiz[current];
    if (!q) return <div>No questions</div>;

    // convert 1-based a to 0-based index safely
    const correctIdx = Math.max(0, Math.min(q.choice.length - 1, q.a - 1));

    const goNext = async () => {
        const next = current + 1;
        if (next < quiz.length) {
            setCurrent(next);
            setStatus("idle");
            setSelectedWrongIdx(null);
        } else {

            const answer = quiz.map(q=>q.a);

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
            })
            
            await onFinish?.(JSON.stringify(answer));
        }
    };

    const handleOptionClick = (idx: number) => {
        if (status === "correct") return; // 在短延迟里防止重复点击
        if (status === "idle") {
            if (idx === correctIdx) {
                // 直接答对：标绿并自动跳转（短延迟）
                setStatus("correct");
                setTimeout(goNext, autoAdvanceDelay);
            } else {
                // 第一次选错：标错 + 同时显示正确答案为绿色，但不跳题，等待用户点击正确答案
                setSelectedWrongIdx(idx);
                setStatus("wrong");
            }
            return;
        }
        if (status === "wrong") {
            // 已经选错：只有点击正确答案才会进入下一题
            if (idx === correctIdx) {
                setStatus("correct");
                setTimeout(goNext, autoAdvanceDelay);
            } else {
                // 点击其他错误选项时：可以切换错误高亮（可选），我们这里切换 selectedWrongIdx
                setSelectedWrongIdx(idx);
            }
        }
    };

    const optionClass = (idx: number) => {
        // base
        const base = "rounded-[8px] px-4 py-3 text-left border w-full";

        if (status === "idle") {
            return `${base} hover:bg-white/10`;
        }

        if (status === "correct") {
            if (idx === correctIdx) return `${base} border-green-500 bg-green-500/10`;
            return `${base} opacity-60`;
        }

        if (status === "wrong") {
            if (idx === selectedWrongIdx) return `${base} border-red-500 bg-red-500/10`;
            if (idx === correctIdx) return `${base} border-green-500 bg-green-500/10`;
            return `${base} opacity-60`;
        }

        return base;
    };

    return (
        <div className="p-4">
            <div className="text-sm text-gray-500">
                Question {current + 1} / {quiz.length}
            </div>

            <div className="mb-4 text-lg font-semibold">{q.q}</div>

            <div className="flex flex-col gap-3">
                {q.choice.map((ch, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        className={optionClass(idx)}
                        aria-disabled={status === "correct"}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 text-sm font-medium">{String.fromCharCode(65 + idx)}</div>
                            <div className="flex-1 text-left">{ch}</div>
                        </div>
                    </button>
                ))}
            </div>

            {status === "wrong" && (
                <div className="mt-3 text-sm text-red-600">Wrong! — Please pick the right answer.</div>
            )}
        </div>
    );
};

export default Quizs;
