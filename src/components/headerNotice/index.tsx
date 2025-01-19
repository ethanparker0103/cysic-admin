import { getImageUrl } from "@/utils/tools";
import { useEffect, useRef, useState } from "react";
import { activityRoller } from '@/config/activityRoller';
import clsx from "clsx";
import { isMobile } from "react-device-detect";

const shouldScroll = activityRoller?.length > 1
// 上下滚动的notice
const timeout = 8_000

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

            initEvents()
            return () => clearInterval(interval);
        }
    }, []);

    const initEvents = () => {
        activityRoller.forEach((message, index) => {
            if (!!message.action) {
                const el = document.querySelectorAll(`.${message?.key}`);
                el.forEach((item) => {
                    item.addEventListener('click', message.action)
                })
            }
        })
    }


    return <div className={clsx("relative h-12 mb-6 bg-gradient-to-r from-[#9D47FF40] to-[#00F0FF40]", isMobile ? "px-3" : "px-10")}>
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
                    <div key={index} className={clsx(message?.key, "min-h-12 flex items-center", !!message?.action ? 'underline cursor-pointer ' : '')}>
                        <span>{message.content}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HeaderNotice;