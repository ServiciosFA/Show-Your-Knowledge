
export const ExpAdd = ({title}:{title: string}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 border-[#5B5B5B] bg-[#271A2F] border rounded-[5px] w-[90%] h-[183px] cursor-pointer">
        <h1 className="text-[32px] text-white">{title}</h1>
        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
            <path d="M15.8571 21.1429H0V15.8571H15.8571V0H21.1429V15.8571H37V21.1429H21.1429V37H15.8571V21.1429Z" fill="#CFCFCF"/>
        </svg>
    </div>
  )
}
