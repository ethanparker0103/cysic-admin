import { getImageUrl } from "@/utils/tools"

const Ad = ()=>{
    return <div className="bg-[#913FEF33] py-6 px-8 relative h-[12.5rem] rounded-[20px] overflow-hidden">
    <div className="flex flex-col gap-3 max-w-[32.5rem]">
        <div className="Gemsbuck uppercase text-[32px] font-bold">Maximize your <span className="text-gradient">reward</span> with Cysic Network Triple Reward System</div>
        <div className="text-[#A1A1AA] text-sm font-[300]">Our unique reward structure lets you contribute computational power and earn in three ways</div>
    </div>
    <img className="scale-[1.2] absolute h-full top-0 right-0" src={getImageUrl('@/assets/images/about/bg.png')} />
</div>
}

export default Ad