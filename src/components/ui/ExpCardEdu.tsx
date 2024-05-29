import { useNavigate } from "react-router-dom";
import { educations } from "../../helpers/serverEducation";
import { currentUser, useStore } from "../../store";


export const ExpCardEdu = ({el}:{el:educations}) => {
    const userStore = useStore()
    const currStore = currentUser()
    const navigate = useNavigate();
    const navegar = () => {
        navigate("/education/form-education", {state: {elemento: el}})
    }
  
    const pasameLaFecha = (fecha: string) => {
      if(fecha.includes("1111-11-11")){
        return "Still studying here"
      }else{
        const date = new Date(fecha);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        return formattedDate
      }
    }
    const start = pasameLaFecha(el.start_date)
    const end = pasameLaFecha(el.end_date)
  
    return (
      <article className="relative flex flex-col gap-3 w-[96%]">
          <h2 className="mt-3 font-semibold text-[#F4E559] text-[32px]">{el.degree}</h2>
          <p className="text-2xl text-white">{el.institution}</p>
          <p className="text-[20px] text-white">{start} - {end}</p>
          <p className="mb-6 text-[#B1B1B1] text-2xl">{el.country}</p>
          {currStore.id == userStore.id && (
            <button type="button" onClick={navegar} className="top-6 group active:scale-90 right-0 absolute transition-all duration-75">
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none">
                    <path d="M3.17098 30.8719C2.29896 30.8719 1.55272 30.5702 0.932269 29.9669C0.311813 29.3636 0.00105699 28.6375 0 27.7885V6.20521C0 5.35729 0.310756 4.63168 0.932269 4.02837C1.55378 3.42507 2.30002 3.1229 3.17098 3.12188H17.3215L14.1505 6.20521H3.17098V27.7885H25.3679V17.074L28.5388 13.9906V27.7885C28.5388 28.6365 28.2286 29.3626 27.6082 29.9669C26.9877 30.5712 26.2409 30.8729 25.3679 30.8719H3.17098ZM9.51294 21.6219V15.0698L24.0598 0.925C24.3769 0.616667 24.7337 0.385417 25.13 0.23125C25.5264 0.0770833 25.9228 0 26.3191 0C26.7419 0 27.1452 0.0770833 27.5289 0.23125C27.9126 0.385417 28.2624 0.616667 28.5785 0.925L30.7982 3.12188C31.0888 3.43021 31.3134 3.77092 31.472 4.144C31.6305 4.51708 31.7098 4.89582 31.7098 5.28021C31.7098 5.66563 31.6374 6.04488 31.4926 6.41796C31.3478 6.79104 31.1163 7.13124 30.7982 7.43854L16.2513 21.6219H9.51294ZM12.6839 18.5385H14.9036L24.0995 9.59687L22.9896 8.51771L21.8401 7.43854L12.6839 16.3417V18.5385Z" className="group-hover:fill-[#F4E559]" fill="#CFCFCF"/>
                </svg>
            </button>
          )}
      </article>
    )
}
