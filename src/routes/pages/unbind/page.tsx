import Button from "@/components/Button";
import { usePrivy } from "@privy-io/react-auth";

const UnbindPage = () => {
    const { linkEmail, unlinkDiscord, unlinkGoogle, unlinkTwitter, user } = usePrivy()
    return <div className="flex flex-wrap gap-4">

        <textarea value={JSON.stringify(user || {}, null, 4)} className="w-full h-40" />

        <Button type="light" onClick={linkEmail}>Bind Mail</Button>
        <Button type="light" disabled={!user?.twitter?.subject} onClick={async () => {
            if (user?.twitter?.subject) {
                await unlinkTwitter(user?.twitter?.subject)
            }
        }}>Unbind Twitter</Button>
        <Button type="light" disabled={!user?.discord?.subject} onClick={async () => {
            if (user?.discord?.subject) {
                await unlinkDiscord(user?.discord?.subject)
            }
        }}>Unbind Discord</Button>
        <Button type="light" disabled={!user?.google?.subject} onClick={async () => {
            if (user?.google?.subject) {
                await unlinkGoogle(user?.google?.subject)
            }
        }}>Unbind Google</Button>
 
  </div>;
};

export default UnbindPage;
