import Button from "@/components/Button";
import { getImageUrl, handlePurchaseNftModal, handleSignIn } from "@/utils/tools";
import { ArrowRight } from "lucide-react";
import GradientBorderCard from "@/components/GradientBorderCard";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { baseHref } from "@/config";

// NFT 卡片组件
interface NFTCardProps {
    name: string;
    rewards: string;
    lock: string;
    price: string;
    supply: string;
    sold: boolean;
    image?: string;
}

const NFTCard = ({ name, rewards, lock, price, supply, sold, image }: NFTCardProps) => {
    return (
        <GradientBorderCard borderRadius={8}>
            <div className="p-6 w-full h-full">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* 左侧：图片 + 供应信息的上下结构 */}
                    <div className="shrink-0 flex flex-col w-[12.1875rem]">
                        {/* 产品图片 */}
                        <div className="w-full aspect-square bg-gray-800 rounded-lg overflow-hidden">
                            {image ? (
                                <img src={image} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 rounded-lg"></div>
                            )}
                        </div>

                        {/* 供应信息 */}
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-sub">Supply</div>
                            <div className="text-sm text-white">{supply}</div>
                        </div>
                    </div>

                    {/* 右侧：详细信息 */}
                    <div className="flex-1">
                        <div className="title text-3xl !font-[300]">{name}</div>

                        {/* 参数详情链接 */}
                        <a href="#" className="text-xs text-sub flex items-center mt-1">
                            View parameter details <ArrowRight size={12} className="ml-1" />
                        </a>

                        {/* 奖励和锁定信息 */}
                        <div className="mt-4">
                            <div className="text-green-400 !font-[500]">{rewards}</div>
                            <div className="text-sm text-sub mt-1">{lock}</div>
                        </div>

                        {/* 价格信息 */}
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-sub">Price</div>
                            <div className="text-2xl !font-[400] font-medium">{price}</div>
                        </div>

                        {/* 按钮区域 */}
                        <div className="mt-4">
                            <Button
                                onClick={() => handlePurchaseNftModal({
                                    nft: {
                                        id: 1,
                                        name: name,
                                        rewards: rewards.split(' ')[0], // 只取数字部分
                                        lock: lock,
                                        price: price.split(' ')[0], // 只取数字部分
                                        supply: supply,
                                        chip: "Intel", // 可以从外部传入或设为默认值
                                        computingPower: "50 TH", // 可以从外部传入或设为默认值
                                        image: image
                                    }
                                })}
                                type="light"
                                className="w-full py-6 min-h-fit h-fit rounded-lg"
                                disabled={sold}
                            >
                                {sold ? 'SOLD OUT' : 'PURCHASE'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    );
};

// 功能卡片组件
interface FeatureCardProps {
    title: string;
    imageSrc: string;
    href?: string;
}

const FeatureCard = ({ title, imageSrc, href }: FeatureCardProps) => {
    const navigate = useNavigate    ()
    return (
        <GradientBorderCard borderRadius={8} className="h-64 overflow-hidden">
            <div className="relative h-full w-full group cursor-pointer overflow-hidden">
                {/* 绝对定位的图片 - 修改缩放方式 */}
                <img
                    src={imageSrc}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* 叠加的半透明层 */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* 内容区域，上下分布 */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10" onClick={() => { navigate(href || '/') }}>
                    <h3 className="title text-3xl !font-[300]">{title}</h3>

                    <div className="self-end">
                        <ArrowRight size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </GradientBorderCard>
    );
};

// 章节容器组件
interface SectionProps {
    children: ReactNode;
    className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => {
    return (
        <div className={`w-full bg-black py-24 ${className}`}>
            <div className="container mx-auto px-8">
                {children}
            </div>
        </div>
    );
};

// NFT 产品数据
const nftProducts = [
    {
        id: "zk-singularity-harvester",
        name: "ZK Singularity Harvester",
        rewards: "10,000 CYS",
        lock: "12 Monthly Lock + 12 Linear Unlock",
        price: "88 USDC",
        supply: "354/1000",
        sold: true,
        image: getImageUrl("@/assets/images/nft/product1.png"),
        chip: "Intel",
        computingPower: "45 TH"
    },
    {
        id: "zk-storm-harvester",
        name: "ZK Storm Harvester",
        rewards: "10,000 CYS",
        lock: "12 Monthly Lock + 12 Linear Unlock",
        price: "88 USDC",
        supply: "354/1000",
        sold: false,
        image: getImageUrl("@/assets/images/nft/product2.png"),
        chip: "Intel",
        computingPower: "50 TH"
    },
    {
        id: "zk-dune-harvester",
        name: "ZK Dune Harvester",
        rewards: "28,000 CYS",
        lock: "12 Monthly Lock + 12 Linear Unlock",
        price: "388 USDC",
        supply: "354/1000",
        sold: true,
        image: getImageUrl("@/assets/images/nft/product3.png"),
        chip: "AMD",
        computingPower: "75 TH"
    },
    {
        id: "zk-dust-harvester",
        name: "ZK Dust Harvester",
        rewards: "10,000 CYS",
        lock: "12 Monthly Lock + 12 Linear Unlock",
        price: "88 USDC",
        supply: "354/1000",
        sold: false,
        image: getImageUrl("@/assets/images/nft/product4.png"),
        chip: "Nvidia",
        computingPower: "55 TH"
    }
];

// 功能板块
const featureBlocks = [
    {
        id: "zk",
        title: "CYSIC ZK",
        image: getImageUrl("@/assets/images/nft/preset1.png"),
        href: '/zk/serviceHub'
    },
    {
        id: "ai",
        title: "CYSIC AI",
        image: getImageUrl("@/assets/images/nft/preset2.png"),
        href: '/ai'
    }
];

const NftLanding = () => {
    // 假设header高度约为80px

    return (
        <>
            {/* 第一屏 - 考虑header高度的全屏效果 */}
            <div className="h-[90vh] w-full flex flex-col items-center justify-center">
                {/* 居中内容，向上偏移一些 */}
                <div className="z-10 flex flex-col items-center px-4 text-center -mt-[7.5rem]">
                    <span className="text-2xl !font-[400] sub-title">INTRODUCING</span>
                    <h1 className="title text-[96px] !font-[200] text-center">CYSIC NFTS</h1>
                    <p className="mt-4 !font-[400] text-base max-w-[55rem] text-sub">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin consequat neque a sodales. Nulla vitae elementum urna. Quisque et ullamcorper ipsum. Maecenas dignissim lacus urna, facilisis porta mauris blandit nec. Mauris quis tincidunt est, sit amet pharetra odio.
                    </p>
                </div>
            </div>

            {/* 第二屏 - 购买区域 */}
            <Section>
                <h2 className="title !font-[200] text-[96px] uppercase text-center">PURCHASE</h2>
                <p className="text-center text-sub text-base mb-6">Trade Compute Box on MagicEden</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {nftProducts.map((nft) => (
                        <NFTCard
                            key={nft.id}
                            name={nft.name}
                            rewards={nft.rewards}
                            lock={nft.lock}
                            price={nft.price}
                            supply={nft.supply}
                            sold={nft.sold}
                            image={nft.image}
                        />
                    ))}
                </div>
            </Section>

            {/* 第三屏 - 收益区域 */}
            <Section>
                <div className="text-center mb-6">
                    <p className="text-2xl text-sub mb-2">Explore Cysic Space and use your NFTs to</p>
                    <h2 className="title !font-[200] text-[96px] uppercase">EARN NOW</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featureBlocks.map((block) => (
                        <FeatureCard
                            key={block.id}
                            title={block.title}
                            imageSrc={block.image}
                            href={block.href}
                        />
                    ))}
                </div>
            </Section>
        </>
    );
};

export default NftLanding;