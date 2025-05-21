import BridgeC from "@/routes/pages/Bridge/components/bridge";
import HistoryC from "@/routes/pages/Bridge/components/history";
import Tab, { TabItem } from "@/routes/components/Tab";

const Bridge = () => {
    const tabs: TabItem[] = [
        {
            key: "bridge",
            label: "Bridge",
            content: <BridgeC />
        },
        {
            key: "history",
            label: "History",
            content: <HistoryC />
        },
    ];

    return (
        <div className="flex flex-col">

            <div className="unbounded text-[36px] font-light text-center my-12">BRIDGE</div>
            <div className="flex flex-col items-center justify-center gap-8 main-container w-full">
                <Tab 
                    items={tabs}
                    defaultActiveKey="bridge"
                    tabClassName="w-full max-w-[40.625rem]"
                    renderMode="hidden"
                />
            </div>
        </div>
    );
}

export default Bridge;