const CheckBox = ({checked}: any) => {
    return <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.589844" width="24.2188" height="24" rx="6" className={checked ? "fill-[--accentPurpe]" : "fill-[--base-900]"} />
        <path d="M17.8667 9L11.2233 15.5833L8.20361 12.5909" className={checked ? "stroke-[--base-900]" : "stroke-[--secGray-600]"}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}
export default CheckBox