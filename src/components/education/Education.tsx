import { Link } from "react-router-dom";
import { ExpAdd } from "../../components/ui/ExpAdd";
import { useEffect, useState } from "react";
import { currentUser, useStore } from "../../store";
import { educations } from "../../helpers/serverEducation";
import { ExpCardEdu } from "../../components/ui/ExpCardEdu";
import { getCurrentuser } from "../../helpers/serverUser";
import Spinner from "../ui/Spinner";
const Education = () => {
  const userStore = useStore();
  const currUser = currentUser();
  const [cards, setCards] = useState<Array<educations> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtExp = async () => {
      setLoading(true);
      if (userStore.id) {
        const value = await getCurrentuser(currUser.id);

        if (value) {
          setCards(value.education);
        }
      }
      setLoading(false);
    };
    obtExp();
  }, [userStore.id, currUser.id]);

  if (loading) return <Spinner />;

  return (
    <div className="flex-grow bg-[#1B161E]">
      <section className="flex flex-col items-center pb-6 w-[100%] max-h-[90vh] overflow-y-auto">
        {cards && cards?.length > 0 ? (
          <>
            <div className="border-[#5B5B5B] mt-6 border rounded-[5px] w-[95%]">
              {cards.map((el, index, arr) => (
                <div className="flex flex-col items-center w-full" key={el.id}>
                  <ExpCardEdu el={el} />
                  {index !== arr.length - 1 && (
                    <p className="bg-[#5B5B5B] w-[96%] h-[2px]"></p>
                  )}
                </div>
              ))}
            </div>
            {currUser.id == userStore.id && (
              <Link
                to="/education/form-education"
                className="mt-4 group active:scale-90 transition-all duration-75"
              >
                <svg
                  className="cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                >
                  <path
                    d="M15.8571 21.1429H0V15.8571H15.8571V0H21.1429V15.8571H37V21.1429H21.1429V37H15.8571V21.1429Z"
                    className="group-hover:fill-[#F4E559]"
                    fill="#CFCFCF"
                  />
                </svg>
              </Link>
            )}
          </>
        ) : (
          <>
            {currUser.id == userStore.id ? (
              <Link
                to="/education/form-education"
                className="flex justify-center mt-4 w-full"
              >
                <ExpAdd title="Add your Education" />
              </Link>
            ) : (
              <>
                <span className="mt-12 font-semibold text-[42px] text-[rgb(68,61,81)]">
                  This User do not have any Education added yet
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="currentColor"
                  className="mt-6 text-[rgb(68,61,81)]"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Education;
