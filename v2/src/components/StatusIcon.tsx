import { getImageUrl } from "@/utils/tools";

// 0: 待验证  1: 验证通过  2:验证失败
const switchImg = (status: any) => {
    switch (+status) {
        case 0:
            return getImageUrl('@/assets/images/dashboard/unknown.svg');
        case 1:
            return getImageUrl('@/assets/images/dashboard/suc.svg');
        case 2:
            return getImageUrl('@/assets/images/dashboard/error.svg');
        default:
            return getImageUrl('@/assets/images/dashboard/unknown.svg');
    }
}
const StatusIcon = ({status}: any) => {

    return <img src={switchImg(status)} className="size-4" />
}

export default StatusIcon