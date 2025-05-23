// /dashboard/prover/*
// /dashboard/verifier/*
// /dashboard/provider/*
// /dashboard/task/*

// /zk/prover/*
// /zk/verifier/*
// /zk/provider/*
// /zk/task/*

// /zk/invite
// /socialTask
// /stake
export const PT12Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=" pt-12 ">
            {children}
        </div>
    )
}