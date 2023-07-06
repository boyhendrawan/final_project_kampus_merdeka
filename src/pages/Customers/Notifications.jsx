import CardNotification from "../../components/CardNotification";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import React from "react";

const Notifications = () => {
  const promoData = [
    {
      id: 1,
      title: "Promosi Spesial 1",
      date: "20 Maret",
      time: "14.00",
      discount: "Potongan Harga 50%",
      description: "Syarat dan Ketentuan Berlaku",
    },
    {
      id: 2,
      title: "Promosi Spesial 2",
      date: "22 Maret",
      time: "16.00",
      discount: "Potongan Harga 30%",
      description: "Syarat dan Ketentuan Berlaku",
    },
  ];

  return (
    <div className="container w-11/12 h-11/12 ml-[1.5rem]">
      <div className="md:border-b md:border-slate-500 md:ml-[6rem]">
        <div className="mt-[6rem] mx-auto">
          <h1 className="text-xl font-bold">Notifikasi</h1>
        </div>
        <div className="hidden md:flex md:gap-3 md:mt-6 md:w-7/12 md:ml-6 md:p-2 md:rounded-t-lg md:mb-4 md:text-white md:bg-primary-darkblue03">
          <Link to={"/"}>
            <button className="flex items-center gap-2">
              <IoMdArrowBack size={20} />
              Beranda
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col mx-auto max-h-screen mt-6 font-semibold md:ml-[10rem]">
        <div>
          {promoData.map((promo, index) => (
            <CardNotification
              key={index}
              promo={promo}
              className="border border-b-2 border-slate-500"
            />
          ))}
        </div>
        <span className="text-slate-500 font-thin text-xs">version 1.1.0</span>
      </div>
    </div>
  );
};

export default Notifications;
