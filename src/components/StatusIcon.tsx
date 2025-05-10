import { getImageUrl } from "@/utils/tools";

// 0: 待验证  1: 验证通过  2:验证失败
const switchImg = (status: any) => {
    switch (+status) {
        case 0:
            return getImageUrl('@/assets/images/icon/unknown.svg');
        case 1:
            return getImageUrl('@/assets/images/icon/suc.svg');
        case 2:
            return getImageUrl('@/assets/images/icon/error.svg');
        default:
            return getImageUrl('@/assets/images/icon/unknown.svg');
    }
}
const StatusIcon = ({status}: any) => {

    return <img src={switchImg(status)} className="size-4" />
}

export default StatusIcon