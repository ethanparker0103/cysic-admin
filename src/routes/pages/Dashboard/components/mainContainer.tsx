import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import clsx from "clsx";
import { useMatches, useNavigate } from "react-router-dom";

const MainContainer = ({ noRoute, title, children, className }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const matches = useMatches()
  const ids = matches?.map(i=>i?.id).join('-')
  const lastHref = matches?.slice(-1)?.[0]?.pathname.split('/')
  lastHref.pop()
  const nonZeroRegex = /[1-9]\d*/g;
  return (
    <div className={clsx(isMobile ? "gap-4" : "gap-8", "flex flex-col")}>
      <div className="flex items-center gap-2">
        {/* back */}
        {(title && nonZeroRegex.test(ids) && !noRoute) ? (
          <div className="cursor-pointer" onClick={()=>navigate(lastHref.join('/'))}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.4288 26.0003L6.09554 16.6665M6.09554 16.6665L15.4288 7.14415M6.09554 16.6665L26.0955 16.6665"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : null}
        <div className="Gemsbuck text-3xl font-semibold">{t(title)}</div>
      </div>

      <div className={clsx(className, "flex flex-col gap-10 text-sm")}>
        {children}
      </div>
    </div>
  );
};
export default MainContainer;
