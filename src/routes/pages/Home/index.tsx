import Image from "@/components/Image";
import { getImageUrl } from "@/utils/tools";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    title: "Project",
    // desc: "projectDesc",
    img: getImageUrl("@/assets/images/_global/project.svg"),
    link: "/register/project",
  },
  {
    title: "Prover",
    // desc: "proverDesc",
    img: getImageUrl("@/assets/images/_global/prover.svg"),
    link: "/register/provider",
  },
  {
    title: "Verifier",
    // desc: "verifierDesc",
    img: getImageUrl("@/assets/images/_global/verrifier.svg"),
    link: "/register/verifier",
  },
];

const Card = ({ item }: any) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const onClick = () => {
    navigate(item?.link)
  }

  return (
    <>
      {/* <style>
        {`
       .card-boder{
       border: 1px solid #fff;
        border-image-source: linear-gradient(124.58deg, #6D428E 19.98%, #54F2FF 77.52%);
        // border-image-source: url(${getImageUrl('@/assets/images/_global/border.svg')})
      }   
   `}
      </style> */}
      <div onClick={onClick} className="group/item hover:border-[#21E9FA] hover:bg-[#21e8fa17] border border-[#FFFFFF52] cursor-pointer flex items-center py-7 px-8 relative rounded-[12px] shadow-[0px_2px_14px_1px_#0000000F]">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full card-boder border border-[#21E9FA] group-hover/item:border-[#21E9FA]">
            <Image src={item?.img} className="size-6" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-base text-[#fff]">{t(item.title)}</div>
            {item?.desc ? <div className="text-sm text-[#525252]">{t(item.desc)}</div> : null}
          </div>
        </div>
        <svg
          className={clsx("absolute right-8 top-1/2 -translate-y-1/2 group-hover/item:opacity-100 opacity-0")}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5893 3.57733C10.2638 3.25189 9.73618 3.25189 9.41074 3.57733C9.0853 3.90277 9.0853 4.4304 9.41074 4.75584L13.8215 9.16659H4.16666C3.70642 9.16659 3.33333 9.53968 3.33333 9.99992C3.33333 10.4602 3.70642 10.8333 4.16666 10.8333H13.8215L9.41074 15.244C9.0853 15.5694 9.0853 16.0971 9.41074 16.4225C9.73618 16.7479 10.2638 16.7479 10.5893 16.4225L16.4226 10.5892C16.748 10.2637 16.748 9.7361 16.4226 9.41066L10.5893 3.57733Z"
            fill="#21E9FA"
          />
        </svg>
      </div>
    </>
  );
};

const Home = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="gap-1 self-end">
        <div className="text-sm text-[#BDBDBD]">STEP 01/02</div>
        <div className="font-semibold	 text-[#6E6E6E]">{t('categoryInfo')}</div>
      </div>
      <div className="flex flex-col gap-[3rem]">
        <div className="flex flex-col gap-[10px]">
          <div className="text-[#fff] text-[30px] font-bold Gemsbuck">{t('join')}</div>
          <div className="text-lg text-[#525252]">
            {t('joinUsDesc')}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {
            tabs.map(i => {
              return <Card item={i} key={i?.title} />
            })
          }
        </div>
      </div>
    </>
  );
};

export default Home;
