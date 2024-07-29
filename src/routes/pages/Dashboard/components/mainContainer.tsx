import { useTranslation } from "react-i18next"
import {
    BrowserView,
    MobileView,
    isMobile,
  } from "react-device-detect";
import clsx from "clsx";

const MainContainer = ({ title, children, className }: any) => {
    const { t } = useTranslation()
    return <div className={clsx(isMobile ? 'gap-4' : 'gap-8', "flex flex-col")}>
        <div className="Gemsbuck text-3xl font-semibold">{t(title)}</div>
        <div className={clsx(className, "flex flex-col gap-10 text-sm")}>
            {children}
        </div>
    </div>
}
export default MainContainer