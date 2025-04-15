import { multicall } from '@wagmi/core'



const useMulticall = () => {
  return async (configGenerators: any[], walletConfig: any) => {
    // Generate multicall configurations for each set of calls
    const allCalls: any[] = []
    const callIndexMap: { [key: string]: any[] } = {} // Maps functionName to call index and params

    configGenerators.forEach((generator) => {
      const configs = generator()
      configs.forEach((call: any) => {
        const { functionName, address, args } = call
        allCalls.push(call)
        if (!callIndexMap[functionName]) {
          callIndexMap[functionName] = []
        }
        callIndexMap[functionName].push({
          index: allCalls.length - 1,
          address,
          args,
          functionName,
        })
      })
    })

    // Execute multicall for all combined configurations
    const multicallResults = await multicall(walletConfig, {
      contracts: allCalls,
    }).catch((error) => {
      console.error('Multicall failed:', error)
      return [] // Return an empty array on failure
    })

    // Attach results to the corresponding functionName and params
    for (const functionName in callIndexMap) {
      callIndexMap[functionName]?.forEach((call: any) => {
        // Specify result type as `any` to avoid implicit any error
        const result: any = multicallResults[call.index]
        call.result = result
      })
    }

    // Return the structured results with functionName as key, and params with results
    const structuredResults: { [key: string]: any[] } = {}
    for (const functionName in callIndexMap) {
      structuredResults[functionName] = callIndexMap[functionName].map(
        ({ result, ...props }) => {
          const validToString = Array.isArray(result?.result) ? !result?.result?.filter((i: any) => ['object'].includes(typeof i))?.length : ['string'].includes(typeof result?.result)
          return ({
            result: validToString ? result?.result?.toString?.() : result?.result,
            ...props,
          })
        },
      )
    }

    return structuredResults
  }
}

export default useMulticall
