export const defaultChainId = '9527';

export const baseStatus: any = {
    '0': 'Pending',
    '1': 'Accept',
    '2': 'Reject'
}

export const providerStatus = baseStatus

export const projectStatus = baseStatus

export const verifierStatus = baseStatus

export const taskStatus: any = {
    "TaskStatusWaitVerifier": "Wait For Verifier",
    "TaskStatusFinishSuccess": "Success",
    "TaskStatusWaitProof": "Wait For Proof",
    "TaskStatusMatchProviderFailed": "Failed"
}

export const TaskStatus: any = {
    '0': 'TaskStatusPublished',
    '1': 'TaskStatusWaitSchedule',
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


export const mainUrl = isQa ? 'https://api-dev.prover.xyz' : 'https://api-testnet.prover.xyz'



export const defaultRewardAmount = 100;

export const commonPageSize = 10;

export const explorerUrl = 'https://explorer-testnet.prover.xyz'

export const cosmosReservedValue = '1'