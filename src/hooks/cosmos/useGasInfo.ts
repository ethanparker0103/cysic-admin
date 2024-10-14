import { useEffect, useState } from 'react';
import { StargateClient } from '@cosmjs/stargate';
import useCosmos from '@/models/_global/cosmos';
import { useRequest } from 'ahooks';

const useGasInfo = () => {
    const { connector } = useCosmos()
    const [gasInfo, setGasInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useRequest(async () => {

        // const client = await StargateClient.connect(connector?.getCometClient()?.client?.url);
        // console.log('client, ', client)
        // const latestBlock = await client.getBlockWithTxs();

        // console.log('latestBlock', latestBlock )

        return connector?.getBlock()

    }, {
        ready: !!connector,
        refreshDeps: [connector],
        onSuccess(e) {
            console.log('block', e)
        }
    })

    // useEffect(() => {
    //     const fetchGasInfo = async () => {
    //         try {
    //             const client = await StargateClient.connect(rpcEndpoint);
    //             const latestBlock = await client.getBlockWithTxs();
    //             const gasLimit = latestBlock.block.header.maxGas;

    //             setGasInfo({
    //                 gasLimit,
    //                 blockHeight: latestBlock.block.header.height,
    //                 time: latestBlock.block.header.time,
    //             });
    //         } catch (err) {
    //             setError(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchGasInfo();
    // }, [rpcEndpoint]);

    // return { gasInfo, loading, error };
};

export default useGasInfo;
