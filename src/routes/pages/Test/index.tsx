import Button from "@/components/Button";
import Input from "@/components/Input";
import { cosmosFee } from "@/config";
import useCosmos from "@/models/_global/cosmos";
import { checkkTx } from "@/utils/cosmos";
import { useRequest } from "ahooks";
import { useState } from "react";

const Test = () => {
  const {
    hasConnectedWithKeplr,
    address,
    isConnected,
    isConnecting,
    chainId,
    connector,
  } = useCosmos();

  const fns = [
    "connector",
    "getKey",
    "getAccount",
    "getAllBalances",
    "getBalance",
    "getBlock",
    "getChainId",
    "getHeight",
    "disconnect",
  ];

  const handleClick = async (i: any) => {
    try {
      let res;
      switch (i) {
        case "connector":
          res = connector;
          console.log(connector);
          return;
        case "getKey":
          // @ts-ignore
          res = await window?.keplr?.[i]?.(chainId);
          break;
        case "getBalance":
          // 替换 token addr
          // @ts-ignore
          res = await window?.keplr?.[i]?.(address, address);
          break;
        case "getAccount":
        case "getAllBalances":
          res = await connector?.[i]?.(address);
          break;
        default:
          res = await connector?.[i]?.();
      }

      console.log(i + ": " + JSON.stringify(res));
    } catch (e) {
      console.error(e);
    }
  };

  const [txValue, setTxValue] = useState("");
  const { run: checkTxRun, data: checkTxData } = useRequest(
    () => checkkTx(connector, txValue as string),
    {
      manual: true,
    }
  );

  console.log("connector", connector);
  const handleSend = async () => {
    const result = await connector?.sendTokens(
      address,
      "cysic1xwfqxzld8h2envwpqzfgwj5tvk0s29905wl5ux",
      [
        {
          denom: "CYS",
          amount: 2e18,
        },
      ],
      cosmosFee,
      ""
    );

    await checkkTx(connector, result?.transactionHash)
  };

  return (
    <div className="flex flex-wrap gap-4">
      {fns.map((i) => {
        return (
          <Button
            onClick={() => {
              handleClick(i);
            }}
          >
            {i}
          </Button>
        );
      })}

      <Button onClick={handleSend}>Send Token</Button>

      <div className="flex gap-4 justify-between">
        <div className="flex items-center">
          <Input value={txValue} onChange={setTxValue}></Input>
          <Button onClick={checkTxRun}>Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
