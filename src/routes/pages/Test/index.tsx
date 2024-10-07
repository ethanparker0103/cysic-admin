import Button from "@/components/Button";
import useCosmos from "@/models/_global/cosmos";

const Test = () => {

  const { hasConnectedWithKeplr, address, isConnected, isConnecting, chainId, connector } = useCosmos();
  console.log('connector', address, connector)

  const fns = ['connector', 'getKey', 'getAccount', 'getAllBalances', 'getBalance', 'getBlock', 'getChainId', 'getHeight', 'disconnect']

  const handleClick = async (i: any) => {
    let res;
    switch (i) {
      case 'connector':
        res = connector
        console.log(connector)
        return;
      case 'getKey':
        res = await window?.keplr?.[i]?.(chainId)
        break;
      case 'getBalance':
        // 替换 token addr
        res = await window?.keplr?.[i]?.(address, address)
        break
      case 'getAccount':
      case 'getAllBalances':
        res = await connector?.[i]?.(address)
        break;
      default:
        res = await connector?.[i]?.()
    }

    console.log(i + ': ' + JSON.stringify(res))
  }

  return (
    <div className="flex flex-wrap gap-4">
      {fns.map(i => {
        return <Button onClick={() => { handleClick(i) }}>{i}</Button>
      })}

    </div>
  );
};

export default Test;
