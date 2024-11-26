import { getImageUrl } from "@/utils/tools";
import { useEffect, useRef, useState } from "react";
import { activityRoller } from '@/config/activityRoller';
import clsx from "clsx";

const shouldScroll = activityRoller?.length > 1
// 上下滚动的notice
const timeout = 3_000

const HeaderNotice = () => {
    const messageIndex = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldScroll && containerRef.current) {
            const container = containerRef.current;
            const firstChild = container.firstElementChild;
            const lastChild = container.lastElementChild;

            if (firstChild && lastChild) {
                const cloneFirst = firstChild.cloneNode(true);
                const cloneLast = lastChild.cloneNode(true);

                container.appendChild(cloneFirst);
                container.insertBefore(cloneLast, firstChild);
            }

            container.style.transition = 'transform 0.5s linear';
            container.style.transform = 'translateY(-100%)';

            const interval = setInterval(() => {
                container.style.transition = 'transform 0.5s linear';
                container.style.transform = `translateY(-200%)`;

                setTimeout(() => {
                    container.style.transition = 'none';
                    container.style.transform = 'translateY(-100%)';
                    container.appendChild(container.firstElementChild);
                }, 500);
            }, timeout);

            return () => clearInterval(interval);
        }
    }, []);


    return <div className="relative h-12 px-10 mb-6 bg-gradient-to-r from-[#9D47FF40] to-[#00F0FF40]">
        <div
            className="overflow-y-hidden flex items-center gap-2 h-12"
        // onClick={handleClick}
        >
            <img
                className="size-6"
                src={getImageUrl("@/assets/images/_global/logo.svg")}
            />
            <div className="text-sm flex flex-col h-full" ref={containerRef}>
                {activityRoller.map((message, index) => (
                    <div key={index} className={clsx("min-h-12 flex items-center", message?.action ? 'underline cursor-pointer ' : '')} onClick={() => message?.action?.()}>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HeaderNotice;