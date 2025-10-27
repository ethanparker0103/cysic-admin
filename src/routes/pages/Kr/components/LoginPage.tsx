import { useState } from "react";
import { Card, CardBody, CardHeader, Input, Spinner } from "@nextui-org/react";
import Button from "@/components/Button";
import GradientBorderCard from "@/components/GradientBorderCard";
import { PT12Wrapper } from "@/components/Wrappers";
import useKrActivity from "@/models/kr";
import { inviteCodeApi, socialMediaApi } from "../krApi";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";


const codeLength = 5;
// a模块：登录权限校验页面
export const LoginPage = () => {
    const { systemSetting, loading, inviterId, authToken } = useKrActivity();
    const [inviteCode, setInviteCode] = useState(window.localStorage.getItem('cysic_kr_invite_code') || "");
    const [isConnecting, setIsConnecting] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    // Twitter登录处理
    const handleConnectTwitter = async () => {
        try {
            setIsConnecting(true);
            const response = await socialMediaApi.bindTwitter();

            if (response.code === '200') {
                // 跳转到Twitter授权页面
                window.location.href = response.authURL as string;
            } else {
                toast.error(response.msg || 'Failed to connect Twitter');
            }
        } catch (error) {
            toast.error('Failed to connect Twitter');
        } finally {
            setIsConnecting(false);
        }
    };

    // 邀请码验证处理
    const handleVerifyInviteCode = async () => {
        if (!inviteCode.trim()) {
            toast.error('Please enter an invite code');
            return;
        }

        try {
            setIsVerifying(true);
            
            // 如果已登录（有authToken），直接绑定邀请码
            if (authToken) {
                const response = await inviteCodeApi.bindInviteCode(inviteCode.trim(), 'twitter');
                if (response.code === '200') {
                    toast.success('Invite code bound successfully!');
                    // 清除localStorage中的邀请码
                    localStorage.removeItem('cysic_kr_invite_code');
                    // 刷新页面数据
                    window.location.reload();
                } else {
                    toast.error(response.msg || 'Failed to bind invite code');
                }
            } else {
                // 未登录：存储邀请码到localStorage，然后跳转到Twitter登录
                localStorage.setItem('cysic_kr_invite_code', inviteCode.trim());
                toast.success('Invite code saved! Redirecting to Twitter...');
                // 跳转到Twitter登录
                handleConnectTwitter();
            }
        } catch (error) {
            toast.error('Failed to process invite code');
        } finally {
            setIsVerifying(false);
        }
    };

    // 直接登录Twitter（当不需要邀请码时）
    const handleDirectLogin = () => {
        handleConnectTwitter();
    };


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
        <PT12Wrapper className="w-full">
            <GradientBorderCard borderRadius={8} className="py-8 px-8 text-center">
                <h1 className="unbounded-40-300">Welcome to Cysic Community</h1>
                <h3 className="mt-4 unbounded-18-200 text-sub">
                    Join our community and start your journey
                </h3>

                <div className="mt-8 rounded-[8px] bg-white text-black py-3 px-6 mx-auto teachers-14-400 !normal-case w-fit">
                    🎉{" "}
                    <span className="text-[#9D47FF]">Pre-registration period:</span>{" "}
                    First 72 hours get an exclusive stamp!
                </div>

                <div className="max-w-[500px] mx-auto mt-8">
                    {((systemSetting?.enableInviteCode) && (Number(inviterId) <= 0) && authToken) ? (
                        // 已登录但未绑定邀请码的情况
                        <Card className="bg-white/5">
                            <CardHeader className="text-center flex flex-col items-center">
                                <h2 className="unbounded-24-300">Bind Your Invite Code</h2>
                                <p className="mt-2 text-sub/80">
                                    You need to bind an invite code to continue
                                </p>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                <Input
                                    classNames={{ input: "text-center" }}
                                    placeholder="Enter Invite Code"
                                    variant="bordered"
                                    value={inviteCode}
                                    onValueChange={setInviteCode}
                                    isInvalid={!!inviteCode && inviteCode.length < codeLength}
                                />

                                <Button
                                    disabled={!inviteCode || inviteCode.length < codeLength || isVerifying}
                                    className="w-full"
                                    type="light"
                                    onClick={handleVerifyInviteCode}
                                >
                                    {isVerifying ? 'Binding...' : 'Bind & Continue'}
                                </Button>
                            </CardBody>
                        </Card>
                    ) : systemSetting?.enableInviteCode ? (
                        // 需要邀请码的流程
                        <Card className="bg-white/5">
                            <CardHeader className="text-center flex flex-col items-center">
                                <h2 className="unbounded-24-300">Enter Your Invite Code</h2>
                                <p className="mt-2 text-sub/80">
                                    Please enter your invite code to continue
                                </p>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                <Input
                                    classNames={{ input: "text-center" }}
                                    placeholder="Enter Invite Code"
                                    variant="bordered"
                                    value={inviteCode}
                                    onValueChange={setInviteCode}
                                    isInvalid={!!inviteCode && inviteCode.length < codeLength}
                                />

                                <Button
                                    disabled={!inviteCode || inviteCode.length < codeLength || isVerifying}
                                    className="w-full"
                                    type="light"
                                    onClick={handleVerifyInviteCode}
                                >
                                    {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                                </Button>

                                {/* OR 分隔线 */}
                                <div className="flex items-center my-4">
                                    <div className="flex-1 h-px bg-sub/30"></div>
                                    <span className="px-4 text-sub/60 text-sm">OR</span>
                                    <div className="flex-1 h-px bg-sub/30"></div>
                                </div>

                                {/* 直接连接X选项 */}
                                <Button
                                    className="w-full"
                                    type="bordered"
                                    onClick={handleDirectLogin}
                                    disabled={isConnecting}
                                >
                                    {isConnecting ? 'Connecting...' : 'Already Joined? Connect X Directly'}
                                    <ChevronRight className="size-4" />
                                </Button>
                            </CardBody>
                        </Card>
                    ) : (
                        // 直接登录流程
                        <Card className="bg-white/5">
                            <CardHeader className="text-center flex flex-col items-center">
                                <h2 className="unbounded-24-300">Connect with X (Twitter)</h2>
                                <p className="mt-2 text-sub/80">
                                    Log in with your X account to start your journey
                                </p>
                            </CardHeader>
                            <CardBody>
                                <Button
                                    className="w-full"
                                    type="light"
                                    onClick={handleDirectLogin}
                                    disabled={isConnecting}
                                >
                                    {isConnecting ? 'Connecting...' : 'Connect X'}
                                </Button>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </GradientBorderCard>
        </PT12Wrapper>
    );
};
