import { cn } from '@nextui-org/react';
import { useInViewport } from 'ahooks';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';


const InViewFlip = ({ number, className }: { number: string, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [inView, threshold] = useInViewport(ref, {
        threshold: 0.5,
    });



    return <div ref={ref}>
        <CountUp
            className={cn(className)}
            start={0}
            // delay={2}
            redraw={!!inView}
            end={Number(number)}
        />
    </div>;
}

export default InViewFlip;