import BridgeC from "@/routes/pages/Bridge/components/bridge";
import HistoryC from "@/routes/pages/Bridge/components/history";
import { Tabs, Tab } from "@nextui-org/react";

const Bridge = () => {
    let tabs = [
        {
            id: "bridge",
            label: "Bridge",
            content: <BridgeC />
        },
        {
            id: "history",
            label: "History",
            content: <HistoryC />
        },
    ];


    return <div className="flex flex-col">

        <div className="flex flex-col items-center justify-center gap-8">
            <Tabs variant="bordered" aria-label="Dynamic tabs" items={tabs} classNames={{
                base: 'w-[368px] h-[48px]',
                tabList: 'w-full h-full border-[1px]',
                tab: 'h-full',
                cursor: 'bg-[#1C1E26]',
                tabContent: 'group-data-[selected=true]:text-gradient text-lg font-semibold'
            }}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        {item.content}
                    </Tab>
                )}
            </Tabs>
        </div>
    </div>
}

export default Bridge