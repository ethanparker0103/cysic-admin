import { mediasLink } from "@/config";
import MainContainer from "@/routes/pages/Dashboard/components/mainContainer";
import { Accordion, AccordionItem } from "@nextui-org/react";

const faqs = [
  {
    title: "Getting Started",
    list: [
      {
        q: "What is Cysic Network?",
        a: "Cysic Network is a high-performance decentralized computing network designed for zero-knowledge proof (ZKP) projects, offering efficient, low-cost proof generation and verification services.",
      },
      {
        q: "Why should I run a node on Cysic Network?",
        a: "Be part of a revolution in decentralized, next-gen computing with Cysic. By sharing your computational power through our optimized node, you’re hyperscaling pioneering projects like Scroll and Aleo, strengthening the ZK ecosystem. As a contributor on Cysic Network, you’ll earn $CYS and $CGT for every task you verify, and veCompute tokens for the projects you help bring to a more decentralized life through proof generation. $CYS will be converted to token in the future.",
      },
      {
        q: "How can I join Cysic Network Phase II, and who is eligible?",
        a: "To join Phase II, you’ll need either a Genesis Code or an invite code, while Phase I contributors have direct access. Once signed in, simply follow the Verifier/Prover instructions to run the node in the terminal, and start earning rewards.",
      },
      {
        q: "What is a Genesis Node?",
        a: "Genesis Nodes are the whitelist for Testnet Phase II, made up of highly active members who stand out in our community and will play a crucial role in supporting the Cysic Network.",
      },
      {
        q: "When will Mainnet launch?",
        a: "Testnet Phase III is anticipated for late 2024, and Mainnet is expected for Q1 2025. Keep an eye on official announcements on our socials for confirmed dates.",
      },
    ],
  },

  {
    title: "Provers, Verifiers, and Tokens",
    list: [
      {
        q: "What are Provers and Verifiers, and how do I join as one?",
        a: "A Prover node generates ZK proofs and requires high-performance hardware, while a Verifier lightnode checks ZK proofs and has lower hardware requirements, making it accessible to most users. To join, simply register on Cysic Network, install, and configure the node using our tutorials. Please review hardware requirements for Prover eligibility below.",
      },
      {
        q: "What hardware requirements are needed for a Prover?",
        a: "Prover nodes require substantial resources, including 2x3070/2080 GPUs, a 64-thread CPU, 280GB memory, and a 512GB SSD. This setup is typically suited for larger stakeholders rather than everyday users.",
      },
      {
        q: "What rewards can I earn by running a Verifier node?",
        a: "Keep your Verifier node running in the background to complete ZK proof verification tasks, and you’ll earn $CYS and $CGT rewards. You can view your earnings on the “My Page” section.",
      },
      {
        q: "What rewards can I earn by running a Prover node?",
        a: "Running a Prover node allows you to earn $CYS, $CGT, and veCompute (veScroll/veAleo) tokens for successful ZK proof generation tasks. Track your rewards in the “My Page” section.",
      },
      {
        q: "How many Prover and Verifier nodes can I run, and is there a maximum limit?",
        a: "Each account can operate one Prover and one Verifier node at the same time. To maintain network stability, Cysic also sets a maximum number of Verifiers.",
      },
      {
        q: "What are $CYS, $CGT, and veCompute tokens?",
        a: (
          <ul>
            <li>$CYS: The native token for transactions and rewards.</li>
            <li>$CGT: A governance token for voting on network decisions.</li>
            <li>
              veCompute: Represents staked computing power, granting additional
              rewards for active Scroll and Aleo Provers.
            </li>
          </ul>
        ),
      },
      {
        q: "How do I stake CGT or delegate veCompute?",
        a: "Follow the staking instructions on Cysic’s staking platform to stake CGT or delegate veCompute. Airdrops may also be available for community activities, testnet tasks, or events.",
      },
    ],
  },

  {
    title: "Invites and Referrals",
    list: [
      {
        q: "How do I invite team members to the Cysic Network?",
        a: "Share your unique invite code to help grow the Cysic community and earn 15% of their Verifier/Prover rewards. Your code is permanently valid.",
      },
      {
        q: "How do I level up as a team leader, and what are the benefits?",
        a: "Level up by inviting successfully activated users, which grants one-time rewards and reduced pool fees. You can track your progress in the 'Referral' Page.",
      },
      {
        q: "What qualifies as a successful invite?",
        a: "Only activated users count as successful invites. Verifiers must complete 10 verification tasks, and Provers need to complete 3 proof tasks. If the user has both roles, whichever task is completed first counts.",
      },
      {
        q: "How much can I earn from my referrals?",
        a: "You’ll receive 15% of the rewards from each Verifier/Prover you invite, regardless of activation status.",
      },
      {
        q: "Where can I view my level, bonuses, and referral details?",
        a: "Visit the 'Referral' page to check your current level, bonuses, pool fees, and successful invite count.",
      },
    ],
  },

  {
    title: "Cysic Network Support",
    list: [
      {
        q: "Why do I need to connect my Keplr wallet?",
        a: "Connecting your Keplr wallet gives you access to Cysic Network features on Cosmos, including staking $CYS, converting $CYS to $CGT, and other actions.",
      },
      {
        q: "How do I match my Keplr wallet with my account’s EVM wallet address?",
        a: <>Import your account’s EVM wallet address as an existing wallet in Keplr. Follow the <a className="!underline" target="_blank" href="https://help.keplr.app/articles/import-recover-existing-wallet">Keplr Official Tutorial</a> for step-by-step guidance. Consistent wallet addresses ensure smooth integration.</>,
      },
      {
        q: "What is Cysic Gas Faucet, and what can I do with the gas?",
        a: <>Gas is used for network actions like staking and delegating. <span className="" onClick={()=>false && dispatchEvent(new CustomEvent('modal_cosmos_faucet_visible', {detail: {visible: true}}))}>The Gas Faucet</span> provides small amounts of $CYS for transaction fees on the Cysic Testnet. You can claim gas tokens every 24 hours. </>,
      },
      {
        q: "My node is running on my terminal, but I can’t view the block height—where can I track my rewards?",
        a: "The current version doesn’t display block height. You can track your rewards on the My Page.",
      },
      {
        q: "I participated in Phase I; how do I receive my airdrop?",
        a: "Thank you for being an early contributor! Check your Phase I total points earned on My Page > Check Phase I. Those points can be turned into $CGT to participate in Phase II, while remaining eligible for future airdrops even after the conversion. Stay tuned for updates on airdrop announcements.",
      },
      {
        q: "Need help or have issues joining?",
        a: <>For support, refer to the Cysic whitepaper, blog posts, or connect with our community support on <a className="!underline" target="_blank" href={mediasLink.discord}>Cysic's Discord channel</a>.</>,
      },
    ],
  },
];

const Faq = () => {
  return (
    <>
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
          {faqs.map((i, index) => {
            return (
              <div key={index} className="flex flex-col gap-4">
                <div className="text-gradient text-2xl font-[500] Gemsbuck">
                  {i.title}
                </div>

                <div className="flex flex-col faq bg-[#1b1b1b] p-6 rounded-[20px]">
                  {i.list.map((j, jndex) => {
                    return (
                      <div key={jndex} className={jndex == 0 ? '' : `border-t border-[rgba(255,255,255,0.2)]`}>
                        <Accordion
                          defaultExpandedKeys={["0"]}
                          className="[&_button]:flex-row-reverse"
                        >
                          <AccordionItem key={jndex} title={j.q}>
                            <div className="pl-6 leading-[1.4]">{j.a}</div>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </MainContainer>
    </>
  );
};
export default Faq;
