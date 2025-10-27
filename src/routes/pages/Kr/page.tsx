import GradientBorderCard from "@/components/GradientBorderCard";
import { PT12Wrapper } from "@/components/Wrappers";
import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    cn,
    Input,
    Spinner,
} from "@nextui-org/react";
import Button from "@/components/Button";
import { mediasLink } from "@/config";
import { getImageUrl } from "@/utils/tools";
import { ArrowDownToLineIcon, ArrowUpRight, Check } from "lucide-react";
import useKrActivity from "@/models/kr";
import { taskApi } from "./krApi";
import { toast } from "react-toastify";
import { LoginPage } from "./components/LoginPage";
import { useEventListener } from "ahooks";

enum EStepName {
    Step1 = "Follow Social Media",
    Step2 = "Post on X",
    Step3 = "Verification Pending",
}

// 邀请码逻辑现在在LoginPage中处理

const ConnectUs = () => {
    const [hasConnected, setHasConnected] = useState(false)
    const handleClick = () => {
        dispatchEvent(new CustomEvent("cysic_kr_next_step", { detail: 2 }));
    };

    return (
        <>
            <>
                <Card className="mt-8 rounded-[8px] mx-auto">
                    <CardHeader className="flex items-center gap-1 text-black">
                        <>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    fill="white"
                                    className="group-hover/item:fill-black transition-colors duration-200"
                                />
                                <path
                                    d="M17.9615 7.77392L15.9243 17.3209C15.7704 17.9946 15.3697 18.1623 14.8003 17.8451L11.6959 15.572L10.1982 17.0037C10.0323 17.1686 9.89394 17.3061 9.57424 17.3061L9.7975 14.1648L15.5506 8.9991C15.8008 8.77773 15.4961 8.65459 15.1619 8.87644L8.04954 13.3268L4.98761 12.3742C4.3217 12.1677 4.30965 11.7125 5.12648 11.3948L17.1027 6.80988C17.6573 6.60336 18.1423 6.93206 17.9615 7.77392Z"
                                    fill="currentColor"
                                />
                            </svg>

                            <div className="text-left ml-1">
                                <p className="text-white teachers-16-200 !normal-case">
                                    Join Telegram Group
                                </p>
                                <p className="mt-1 text-sub/40 teachers-14-200 !normal-case">
                                    Connect with the community and get real-time updates
                                </p>
                            </div>
                        </>
                    </CardHeader>
                    <CardBody>
                        <a
                            href={mediasLink.telegram}
                            target="_blank"
                            className="mx-auto w-full"
                        >
                            <Button className="w-full " type="light">
                                Open Telegram
                            </Button>
                        </a>
                    </CardBody>
                </Card>

                <Card className="mt-4 rounded-[8px] mx-auto">
                    <CardHeader className="flex items-center gap-1 text-black">
                        <>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    fill="white"
                                    className="group-hover/item:fill-black transition-colors duration-200"
                                />
                                <path
                                    d="M12.9989 11.3988L16.9078 6H15.9815L12.5874 10.6877L9.87662 6H6.75L10.8493 13.0886L6.75 18.75H7.67633L11.2605 13.7997L14.1234 18.75H17.25L12.9987 11.3988H12.9989ZM11.7302 13.151L11.3148 12.4452L8.0101 6.82855H9.43288L12.0999 11.3613L12.5152 12.0672L15.9819 17.9591H14.5592L11.7302 13.1513V13.151Z"
                                    fill="currentColor"
                                />
                            </svg>

                            <div className="text-left ml-1">
                                <p className="text-white teachers-16-200 !normal-case">
                                    Follow on Twitter
                                </p>
                                <p className="mt-1 text-sub/40 teachers-14-200 !normal-case">
                                    Stay updated with our latest announcements
                                </p>
                            </div>
                        </>
                    </CardHeader>
                    <CardBody>
                        <a
                            href={mediasLink.twitter}
                            target="_blank"
                            className="mx-auto w-full"
                        >
                            <Button className="w-full " type="light">
                                Follow X
                            </Button>
                        </a>
                    </CardBody>
                </Card>


                <div className="mt-8 flex flex-col gap-2 mx-auto justify-center items-center">
                    <Checkbox isSelected={hasConnected} onValueChange={setHasConnected} size="sm">
                        I have already Followed!
                    </Checkbox>
                    <Button disabled={!hasConnected} type="light" onClick={handleClick}>
                        Verify & Continue
                    </Button>
                </div>
            </>
        </>
    );
};

const Post = () => {
    const [postLink, setPostLink] = useState("");
    const { firstTask } = useKrActivity()



    const handleClick = async () => {
        if (!postLink || !postLink.includes('https') || !postLink.includes('x.com/')) {
            toast.error('Please enter a valid Twitter post link');
            return;
        }
        
        if (!firstTask?.id) {
            toast.error('Task information not available');
            return;
        }

        try {
            const response = await taskApi.submitTask(firstTask.id, postLink);
            if (response.code === '200') {
                toast.success('Task submitted successfully!');
                dispatchEvent(new CustomEvent("cysic_kr_next_step", { detail: 3 }));
            } else {
                toast.error(response.msg || 'Failed to submit task');
            }
        } catch (error) {
            toast.error('Failed to submit task');
        }
    };

    const handleDownloadImage = () => {
        if (firstTask?.imgUrl) {
            const link = document.createElement('a');
            link.href = firstTask.imgUrl;
            link.download = 'cysic-task-image.png';
            link.click();
        }
    };

    return (
        <>
            <div className="mt-8 flex justify-center gap-4">
                <div className="relative border rounded-[8px] bg-white p-1 flex-1">
                    <div className="absolute top-4 right-4 p-1 border rounded-[6px] hover:bg-white hover:text-black cursor-pointer">
                        <ArrowUpRight className="size-3" />
                    </div>

                    <div 
                        className="absolute top-4 right-12 p-1 border rounded-[6px] hover:bg-white hover:text-black cursor-pointer"
                        onClick={handleDownloadImage}
                    >
                        <ArrowDownToLineIcon className="size-3" />
                    </div>

                    <div className="rounded-[8px] size-full overflow-hidden">
                        <img
                            className="object-cover size-full"
                            src={firstTask?.imgUrl || getImageUrl("@/assets/images/_global/stake_landing_bg.png")}
                            alt={firstTask?.title || "Task Image"}
                        />
                    </div>
                </div>
                <div className="text-left flex-1">
                    <p className="mb-2 text-lg">Instructions:</p>
                    <ul className="list-decimal list-inside text-sub/60 [&_li]:mb-2">
                        <li>Download the image using the button</li>
                        <li>Go to Twitter and create a new post</li>
                        <li>Upload the downloaded image</li>
                        <li>Post with the title "{firstTask?.title || 'Cysic is inevitable'}"</li>
                        <li>Copy the post link and paste it below</li>
                    </ul>

                    <div className="mt-4 mb-2">Twitter Post Link</div>
                    <Input
                        classNames={{ input: "text-center" }}
                        placeholder='https://x.com/...'
                        variant="bordered"
                        value={postLink}
                        onValueChange={setPostLink}
                        isInvalid={!!postLink && (!postLink?.includes('https') || !postLink?.includes('x.com/'))}
                    />
                    <Button 
                        disabled={!postLink || !postLink?.includes('https') || !postLink?.includes('x.com/')} 
                        className="mt-4 w-full" 
                        type="light" 
                        onClick={handleClick}
                    >
                        Verify & Continue
                    </Button>
                </div>
            </div>
        </>
    );
};

const Verification = () => {
    const handleClick = () => {
        dispatchEvent(new CustomEvent("cysic_kr_next_step", { detail: 4 }));
    };

    return (
        <>
            <div className="mt-8 teachers-18-200 !normal-case mb-8">
                Your Twitter post is being verified. This usually takes a few minutes to
                a few hours.
            </div>

            <div className="mb-4 text-green-500 bg-green-500/10 p-4 rounded-[8px] flex items-center justify-center">
                <div className="rounded-full inline-flex items-center justify-center p-[2px] border border-green-500 mr-2">
                    <Check className="size-3" />
                </div>
                Invite code verified
            </div>
            <div className="mb-4 text-green-500 bg-green-500/10 p-4 rounded-[8px] flex items-center justify-center">
                <div className="rounded-full inline-flex items-center justify-center p-[2px] border border-green-500 mr-2">
                    <Check className="size-3" />
                </div>
                Social connections completed
            </div>
            <div className="mb-4 text-orange-500 bg-orange-500/10 p-4 rounded-[8px] flex items-center justify-center">
                <div className="rounded-full inline-flex items-center justify-center p-[2px] border border-orange-500 mr-2 size-5"></div>
                Twitter post verification in progress
            </div>

            <a href="/krkrkr/dashboard">
                <Button className="mt-4" type="light" onClick={handleClick}>
                    Get To Dashboard First
                </Button>
            </a>
        </>
    );
};

// 主组件：根据认证状态显示a模块或b模块
export const KRActivity = () => {
    const { showLogin, step, loading } = useKrActivity();

    if (showLogin) {
        return <LoginPage />;
    }

    const currentStep = step;

    if (loading) {
        return (
            <PT12Wrapper className="w-full">
                <GradientBorderCard borderRadius={8} className="py-8 px-8 text-center">
                    <div className="flex justify-center">
                        <Spinner size="lg" />
                    </div>
                </GradientBorderCard>
            </PT12Wrapper>
        );
    }

    return (
        <>
            <PT12Wrapper className="w-full">
                <GradientBorderCard borderRadius={8} className="py-8 px-8 text-center">
                    <h1 className="unbounded-40-300">Welcome to Cysic Community</h1>
                    <h3 className="mt-4 unbounded-18-200 text-sub">
                        Complete all steps to join our community
                    </h3>

                    <div className="max-w-[800px] mx-auto">
                        <div className="flex items-center gap-2 mt-12">
                            <div
                                className={cn(
                                    "flex-1 flex items-center justify-center",
                                    currentStep == 1 ? "opacity-100" : "opacity-60"
                                )}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        className={cn(
                                            "border size-6 rounded-full p-[2px]",
                                            currentStep > 1 && "border-green-500/40"
                                        )}
                                    >
                                        {currentStep > 1 ? (
                                            <div className="rounded-full font-semibold size-full bg-green-500/40 text-green-500 flex items-center justify-center ">
                                                <Check className="size-3" />
                                            </div>
                                        ) : (
                                            <div className="rounded-full font-semibold size-full bg-white text-black flex items-center justify-center ">
                                                1
                                            </div>
                                        )}
                                    </div>
                                    <span className="whitespace-nowrap">
                                        Follow Social Media
                                    </span>
                                </div>
                            </div>

                            <div className="h-px flex-1 bg-sub"></div>

                            <div
                                className={cn(
                                    "flex-1 flex items-center justify-center",
                                    currentStep == 2 ? "opacity-100" : "opacity-60"
                                )}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        className={cn(
                                            "border size-6 rounded-full p-[2px]",
                                            currentStep > 2 && "border-green-500/40"
                                        )}
                                    >
                                        {currentStep > 2 ? (
                                            <div className="rounded-full font-semibold size-full bg-green-500/40 text-green-500 flex items-center justify-center ">
                                                <Check className="size-3" />
                                            </div>
                                        ) : (
                                            <div className="rounded-full font-semibold size-full bg-white text-black flex items-center justify-center ">
                                                2
                                            </div>
                                        )}
                                    </div>
                                    <span className="whitespace-nowrap">Post on X</span>
                                </div>
                            </div>

                            <div className="h-px flex-1 bg-sub"></div>

                            <div
                                className={cn(
                                    "flex-1 flex items-center justify-center",
                                    currentStep == 3 ? "opacity-100" : "opacity-60"
                                )}
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <div
                                        className={cn(
                                            "border size-6 rounded-full p-[2px]",
                                            currentStep > 3 && "border-green-500/40"
                                        )}
                                    >
                                        {currentStep > 3 ? (
                                            <div className="rounded-full font-semibold size-full bg-green-500/40 text-green-500 flex items-center justify-center ">
                                                <Check className="size-3" />
                                            </div>
                                        ) : (
                                            <div className="rounded-full font-semibold size-full bg-white text-black flex items-center justify-center ">
                                                3
                                            </div>
                                        )}
                                    </div>
                                    <span className={cn("")}>Verification</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 rounded-[8px] bg-white text-black py-3 px-6 mx-auto teachers-14-400 !normal-case">
                            🎉{" "}
                            <span className="text-[#9D47FF]">Pre-registration period:</span>{" "}
                            First 72 hours get an exclusive stamp!
                        </div>
                        <div className="text-left mb-2 mt-8">
                            Step {currentStep}: {EStepName[`Step${currentStep}` as keyof typeof EStepName]}
                        </div>
                        {currentStep == 1 ? (
                            <ConnectUs />
                        ) : currentStep == 2 ? (
                            <Post />
                        ) : (
                            <Verification />
                        )}
                    </div>
                </GradientBorderCard>
            </PT12Wrapper>
        </>
    );
};

