import axios from "axios";
import { PT12Wrapper } from "@/components/Wrappers"
import { useRequest } from "ahooks";
import { useMemo, useState } from "react";
import { CysicTableColumn } from "@/components/Table";
import CysicTable from "@/routes/pages/Leaderboard/CysicTabe";
import GradientBorderCard from "@/components/GradientBorderCard";
import { Pagination, Input } from "@nextui-org/react"; // 加了 Input
import { BigNumber } from "bignumber.js";

const apiKey = import.meta.env.VITE_APP_KAITO_API_KEY

const apiClient = axios.create({
    baseURL: "https://api.kaito.ai/api/v1",
    timeout: 30_000,
});

apiClient.interceptors.request.use(
    (config) => {
        config.headers["x-api-key"] = apiKey;
        return config;
    },
    (error) => Promise.reject(error)
);

const ticker = 'CYSIC'

export interface CommunityMindshareParams {
    ticker: string;
    start_date?: string;
    end_date?: string;
    user_type?: "creator" | "community";
    window?: "7d" | "30d" | "3m" | "6m" | "12m";
}

export interface Yappers {
    user_id: string;
    rank: string;
    mindshare: number;
    contribution: number;
    has_nft: boolean | null;
    language: string;
    user_level: string;
    username: string;
    displayname: string;
    tweet_counts: number;
    tweet_urls: string[];
    total_impressions: number;
    total_retweets: number;
    total_quote_tweets: number;
    total_likes: number;
    total_bookmarks: number;
    total_smart_engagements: number;
    total_community_engagements: number;
    peripheral_tweet_urls: string[];
}

export interface CommunityMindshareResponse {
    total_unique_yappers: number;
    total_unique_tweets: number;
    top_1000_yapper_impressions: number;
    top_1000_yapper_retweets: number;
    top_1000_yapper_quote_tweets: number;
    top_1000_yapper_likes: number;
    top_1000_yapper_bookmarks: number;
    top_1000_yapper_smart_engagements: number;
    top_1000_yapper_community_engagements: number;
    top_1000_yappers: Yappers[]
}

export const fetchCommunityMindshare = (params: CommunityMindshareParams) => {
    return apiClient.get("/community_mindshare", { params });
};

export const LeaderboardPage = () => {
    const [topYapper, setTopYapper] = useState<Yappers[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sortConfig, setSortConfig] = useState<{
        key?: keyof Yappers,
        direction: "asc" | "desc"
    }>({})
    const [search, setSearch] = useState("")

    const pageSize = 10;

    const { loading } = useRequest(() => fetchCommunityMindshare({
        ticker,
        window: '7d'
    }), {
        onSuccess(resp) {
            setTopYapper(resp?.data?.community_mindshare?.top_1000_yappers || [])
        }
    })

    const taskListColumns: CysicTableColumn<Yappers>[] = [
        { key: "rank", label: "Rank", sortable: true },
        { key: "displayname", label: "User Name" },
        { key: "language", label: "Language", renderCell: (row) => row?.language?.toUpperCase() || '-' },
        { key: "mindshare", label: "Mindshare", sortable: true, renderCell: (row) => BigNumber(row?.mindshare * 100).toFixed(4, BigNumber.ROUND_DOWN) + '%' },
        { key: "tweet_counts", label: "Tweets", sortable: true },
        { key: "total_impressions", label: "Impressions", sortable: true },
        { key: "total_likes", label: "Likes", sortable: true },
        { key: "total_community_engagements", label: "Engagements", sortable: true },
    ];

    /** 搜索 + 排序 + 分页处理 */
    const processedData = useMemo(() => {
        let data = [...(topYapper || [])];

        // 搜索
        if (search.trim()) {
            const lower = search.trim().toLowerCase();
            data = data.filter(y =>
                y.username?.toLowerCase().includes(lower) ||
                y.displayname?.toLowerCase().includes(lower)
            );
        }

        // 排序
        if (sortConfig.key) {
            const { key, direction } = sortConfig;
            data.sort((a, b) => {
                const valueA = a[key!];
                const valueB = b[key!];
                return direction === "asc"
                    ? Number(valueA || 0) - Number(valueB || 0)
                    : Number(valueB || 0) - Number(valueA || 0);
            });
        }

        // 分页
        const start = (currentPage - 1) * pageSize;
        return data.slice(start, start + pageSize);
    }, [topYapper, search, currentPage, sortConfig]);

    /** 点击列头进行排序 */
    const handleColumnClick = (col: CysicTableColumn<Yappers>) => {
        if (!col.sortable) return;

        setSortConfig(prev => {
            let direction: "asc" | "desc" = "asc";
            if (prev.key === col.key && prev.direction === "asc") {
                direction = "desc";
            }
            return { key: col.key as keyof Yappers, direction };
        });
        setCurrentPage(1); // 排序后回第一页
    };

    const totalFiltered = useMemo(() => {
        let data = topYapper;
        if (search.trim()) {
            const lower = search.trim().toLowerCase();
            data = data.filter(y =>
                y.username?.toLowerCase().includes(lower) ||
                y.displayname?.toLowerCase().includes(lower)
            );
        }
        return data.length;
    }, [topYapper, search]);

    const totalPages = Math.ceil(totalFiltered / pageSize);

    return (
        <PT12Wrapper className="w-full pb-12 px-[3rem]">
            <GradientBorderCard borderRadius={8} className="main-container mb-6 !px-0">
                <Input
                    classNames={{
                        inputWrapper: "!bg-transparent"
                    }}
                    isClearable
                    placeholder="Search by username or display name"
                    value={search}
                    onValueChange={(val) => {
                        setSearch(val);
                        setCurrentPage(1); // 搜索时回第一页
                    }}
                    size="lg"
                />
            </GradientBorderCard>
            <GradientBorderCard  borderRadius={8} className="main-container p-6">
                <CysicTable
                    sortable
                    data={processedData}
                    columns={taskListColumns}
                    className="[&>div]:!pt-0"
                    loading={loading}
                    onColumnClick={handleColumnClick}
                />

                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <Pagination
                            total={totalPages}
                            page={currentPage}
                            onChange={setCurrentPage}
                            color="primary"
                            size="sm"
                        />
                    </div>
                )}
            </GradientBorderCard>
        </PT12Wrapper>
    )
}