import MainDetail from "@/routes/pages/Dashboard/components/mainDetail"

const MainDetailContainer = (props?: any)=>{

    return <div className="flex flex-col gap-4">
        <MainDetail {...props}/>
        {
            props?.children
        }
    </div>
}
export default MainDetailContainer