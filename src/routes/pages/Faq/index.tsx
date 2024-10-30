import MainContainer from "@/routes/pages/Dashboard/components/mainContainer"
import { Accordion, AccordionItem } from "@nextui-org/react"


const faqs = [
    {
        title: 'Verifier',
        list: [
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
        ]
    },

    {
        title: 'Prover',
        list: [
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
            {
                q: 'Help! What is Cysic Network',
                a: 'Users can withdraw their assets before the migration starts. But once the migration process begins, it may take time to complete depending on the asset as we wait for partners to deploy their tokens on Zircuit L2. Users won’t be able to withdraw those assets until the migration is finished. Once completed, the assets will appear on the Liquidity Hub page, and users can withdraw anytime.'
            },
        ]
    },
]


const Faq = () => {
    return <>
    <style>
        {`
        
        .faq .rotate-0{
            transform: rotate(90deg)
        }
        .faq .rotate-0[data-open=true]{
            transform: rotate(270deg)
        }
        `}

    </style>
        <MainContainer title="FAQS">
            <div className="flex flex-col bg-[#FFFFFF0A] rounded-[20px] px-10 py-6 gap-10">
                {
                    faqs.map((i, index) => {
                        return <div key={index} className="flex flex-col gap-4">
                            <div className="text-gradient text-2xl font-[500]">{i.title}</div>

                            <div className="flex flex-col faq bg-[#1b1b1b] p-6 rounded-[20px]">
                                {i.list.map((j, jndex) => {
                                    return <div key={jndex}>
                                        <Accordion defaultExpandedKeys={['0']} className="[&_button]:flex-row-reverse">
                                            <AccordionItem
                                                key={jndex}
                                                title={j.q}
                                            >
                                                {j.a}
                                            </AccordionItem>
                                        </Accordion>

                                    </div>
                                })}
                            </div>
                        </div>
                    })
                }

            </div>
        </MainContainer>
    </>
}
export default Faq