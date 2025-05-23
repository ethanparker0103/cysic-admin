
// /dashboard/prover/*
// /dashboard/verifier/*
// /dashboard/provider/*
// /dashboard/task/*

import { cn } from "@nextui-org/react"

// /zk/prover/*
// /zk/verifier/*
// /zk/provider/*
// /zk/task/*

// /zk/invite
// /socialTask
// /stake
export const PT12Wrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(" pt-12 ", className)}>
            {children}
        </div>
    )
}