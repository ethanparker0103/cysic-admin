import Button from "@/components/Button";
import Input from "@/components/Input";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import axios from '@/service'
// import queryString from 'qs'
import { defaultChainId } from "@/config";
import { toast } from "react-toastify";
import clsx from "clsx";
import { Upload } from '@arco-design/web-react';
import qs from 'qs'

const clientID = "X3JzcmZDcV9nRk02NDFFa01wY0s6MTpjaQ"
const clientSecret = "s3VXDo9hB4yT22W9vPWVbA-kDEHfs63yR0kuWAIi-fZYXwD5Dt"

const redirect = "http://localhost:5173/test"
const apiKey = "3rlRzDhuPsS9tE6N0SWD4hz33"
const aPIKeySecret = "plwT4K0oQAPZxhQkGgIsRwOfmIRaRQwx4dUPaNQ85HjHVFntSa"

const twitterOAuth = 'https://twitter.com'
const authorize = `/i/oauth2/authorize`
const getTokenUrl = twitterOAuth+'/2/oauth2/token'



const oauthV1 = 'https://api.twitter.com/oauth/request_token'



// response_type=code
// &client_id=cFo1S1g4azUweVJzWFBBcEx1LVE6MTpjaQ
// &redirect_uri=https%3A%2F%2Fvotacionya.000webhostapp.com%2Fcallback%2Flogintwitter.php%0A
// &scope=tweet.read+users.read+follows.read+follows.write+offline.access
// &state=state
// &code_challenge=NWRFR2hCRWU%3D
// &code_challenge_method=plain

const FormItem = ({ title, children }: any) => {
  return <div className="flex flex-col gap-3">
    <div className="text-[#696F79]">{title}</div>
    {children}
  </div>
}
const Test = () => {
  const navigate = useNavigate()
  const handleLogin = ()=>{

    axios.post(oauthV1, {
        oauth_callback
    })

    // const params = {
    //     response_type: 'code',
    //     client_id: clientID,
    //     // client_secret: clientSecret,
    //     // redirect_uri: window.location.href,
    //     redirect_uri: 'http://26.26.26.1:81/test',
    //     scope: 'tweet.read%20users.read%20offline.access',
    //     state: 'state',
    //     code_challenge: 'challenge',
    //     code_challenge_method: 'plain'
    // }
    // window.open(`${twitterOAuth}${authorize}?${qs.stringify(params)}`, '_blank')
  }
  return (
    <div className=" ">
        <Button onClick={handleLogin}>Login Twitter</Button>
    </div>
  );
};

export default Test;
