import useReferral from "@/models/_global/referral";
import { generateQueryString, getImageUrl } from "@/utils/tools";

export const defaultChainId = '9527';

export const baseStatus: any = {
    '0': 'Pending',
    '1': 'Accept',
    '2': 'Reject'
}

export const rewardStatus: any = {
    '0': 'Pending',
    '1': 'Claimed',
    '2': 'No Reward'
}

export const providerStatus = baseStatus

export const projectStatus = baseStatus

export const verifierStatus = baseStatus

export const taskStatus: any = {
    "TaskStatusWaitSchedule": "Wait For Assign",
    "TaskStatusWaitVerifier": "Wait For Verifier",
    "TaskStatusFinishSuccess": "Success",
    "TaskStatusWaitProof": "Wait For Proof",
    "TaskStatusMatchProviderFailed": "Failed"
}

export const TaskStatus: any = {
    '0': 'TaskStatusPublished',
    '1': taskStatus['TaskStatusWaitSchedule'],
    '2': taskStatus['TaskStatusWaitProof'],
    '3': taskStatus['TaskStatusWaitVerifier'],
    '100': taskStatus['TaskStatusFinishSuccess'],
    '200': 'TaskStatusFinishFailed',
    '400': 'TaskStatusInvalid',
    '40': taskStatus['TaskStatusMatchProviderFailed'],
    '401': 'TaskStatusMatchVerifierFailed',
}

export const ProofBackend: any = {
    '1': 'Halo2'
}


export const isQa = import.meta.env.VITE_APP_ENV == 'qa'
export const isProd = import.meta.env.VITE_APP_ENV == 'prod'


export const mainUrl = import.meta.env.VITE_APP_BASE_URL
// isQa ? 'https://api-dev.prover.xyz' : 'https://api-testnet.prover.xyz'



export const defaultRewardAmount = 100;

export const commonPageSize = 10;

export const explorerUrl = 'https://explorer-testnet.prover.xyz'

export const cosmosReservedValue = '0.1'

export const cysicBaseCoin = 'CYS'
export const cysicStCoin = 'CGT'

export const supTokens: any = {
    [cysicBaseCoin]: {
        name: cysicBaseCoin,
        icon: getImageUrl('@/assets/images/tokens/cysic.svg')
    },
    [cysicStCoin]: {
        name: cysicStCoin,
        icon: getImageUrl('@/assets/images/tokens/cysic-light.svg')
    }
}


export const cosmosFee = {
    amount: [
        {
            denom: cysicBaseCoin,
            amount: "200000",
        },
    ],
    gas: "2000000", // gas amount
};

export const keplrDownloadLink = 'https://chromewebstore.google.com/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap'

export const blockTime = {
    short: 5_000,
    average: 10_000,
    long: 15_000
}


export const twitterLink = `https://twitter.com/intent/tweet?${generateQueryString({
    text: "Earn Cysic tokens as rewards while verifying and computing ZK proofs for top projects like @Scroll_ZKP and @AleoHQ, exclusively on @cysic_xyz. #cysictestnet \n\r ",
})}`

export const getReferralUrl = ()=>`${window.location.origin}/m/referral/invite${useReferral.getState().code ? `?code=${useReferral.getState().code}` : ''}`

export const genTwitterLink = ()=>{
    let link = twitterLink;
    if(useReferral.getState().code){
        link = twitterLink + '👇 Get started now: \n' + `&url=${getReferralUrl()}`
    }
    return link;
}


export const openTwitterLink = ()=>{
    window.open(genTwitterLink(), '_blank')
}



export const mediasLink = {
    whitePaper: 'https://bit.ly/cysicnetworkwhitepaper',
    discord: 'https://bit.ly/CysicDC',
    twitter: 'https://bit.ly/Cysic_xyz',
    medium: 'https://bit.ly/CysicMedium',
    twitterWhitePaper: 'https://x.com/cysic_xyz/status/1846960627878866984',
}

export const downloadLink = {
    andorid: '/'
}

export const enableCosmosUrl = ['my', 'stake', '/my', '/my/phase1', '/stake/cgt', '/stake/veCompute', '/my/', '/stake/cgt/', '/stake/veCompute/', '/my/phase1/', '/my/phase1Convert', '/my/phase1Convert/']


export const loginSignContent = 'Welcome to Cysic！'