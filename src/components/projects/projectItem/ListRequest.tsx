import { useEffect, useState } from "react";

import {
  acceptRequest,
  getRequest,
  rejectRequest,
} from "../../../helpers/serverSolicitud";
import { GrClose } from "react-icons/gr";
type Request = {
  id: number;
  comment: string;
  statusRequest: string;
  developer: string;
  project: string;
  role: string;
};

const ListRequest = ({ close }: { close: () => void }) => {
  const [request, setRequest] = useState<Request[]>();

  useEffect(() => {
    const fetchRequest = async () => {
      const requestData = await getRequest();
      setRequest(requestData);
    };
    fetchRequest();
  }, []);

  const acceptRequesthandler = async (id: number) => {
    const data = await acceptRequest(id);
    if (data) {
      const currentRequest = request?.filter((item) => item.id !== id);
      setRequest(currentRequest);
    }
  };
  const rejectRequesthandler = async (id: number) => {
    const data = await rejectRequest(id);
    if (data) {
      const currentRequest = request?.filter((item) => item.id !== id);
      setRequest(currentRequest);
    }
    close();
  };

  return (
    <div className="relative flex flex-col items-center gap-6 bg-color-bg-primary p-2 rounded-md w-[30rem] text-3xl text-center text-color-text jus">
      <GrClose
        onClick={() => {
          close();
        }}
        className="top-2 right-2 absolute text-2xl text-color-text hover:text-color-secondary cursor-pointer"
      />
      <p className="text-3xl text-center text-color-text">Requests</p>
      <div className="flex flex-col w-full">
        <ul className="flex flex-col gap-6 pt-14 pb-4 rounded-md max-h-[30rem] text-start text-xl overflow-auto">
          {request ? (
            request.map((request: Request) => (
              <li
                className="flex flex-col gap-4 bg-color-bg-thirdy p-2"
                key={request.id}
              >
                <div className="flex justify-between">
                  <p className="text-lg">{request.developer}</p>
                  <p className="text-color-secondary text-sm">{request.role}</p>
                </div>

                <p className="text-sm">{request.comment}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => rejectRequesthandler(request.id)}
                    className="border-2 border-color-text bg-color-bg-seconda px-1 py-0 rounded-md text-base"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => acceptRequesthandler(request.id)}
                    className="bg-color-text px-1 py-0 rounded-md text-base text-color-bg-seconday"
                  >
                    Accept
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-sm">You don't have any request</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListRequest;
