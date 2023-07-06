import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { logout, updateUser } from "../../utilites/redux/action/login";
import { useDispatch, useSelector } from "react-redux";

import { FiSettings } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import { IoMdArrowBack } from "react-icons/io";
import LoadingRequest from "../../components/LoadingRequest";
import { TbPencilMinus } from "react-icons/tb";
import useInput from "../../utilites/customHooks/use-input";

const Account = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestUpdate, setUpdate] = useState(false);
  const [data, setData] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get data from global var
  const { dataUser } = useSelector((state) => state.auth);

  const {
    value: valueFullName,
    isInvalid: invalidFullName,
    handlerBlur: handleBlurFullName,
    handlerChange: handleChangeFullName
  } = useInput((e) => e.length > 3);

  const {
    value: valuePhone,
    isInvalid: invalidPhone,
    handlerBlur: handleBlurPhone,
    handlerChange: handleChangePhone,
  } = useInput((e) => e.length > 10);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (invalidFullName || invalidPhone) {
      return;
    }
  
    const userData = {
      uuid_user: dataUser?.uuid_user,
      email: dataUser?.email,
      gender: "L",
      full_name: valueFullName,
      phone: valuePhone,
    };
    setData(userData);
    setUpdate(true);
    setUpdateMessage("Sedang memperbarui data...");
    try {
      await dispatch(updateUser(userData));
      closeModal();
    } catch (error) {
      setUpdate(false);
    } finally {
      setUpdateMessage("");
    }
  };
  
  useEffect(() => {
    if (requestUpdate && data) {
      dispatch(updateUser(data));
    }
  }, [requestUpdate, data, dispatch]);
  return (
    <div className="container mx-auto px-4">
      {/* Komponen Account */}
      <div className="md:border-b md:border-slate-500 md:ml-[6rem]">
        <div className="mt-[6rem]">
          <h1 className="text-xl font-bold">Akun</h1>
        </div>
        <div className="hidden md:flex md:gap-3 md:mt-6 md:ml-6 md:p-2 md:rounded-t-lg md:mb-4 md:text-white md:bg-primary-darkblue03">
          <Link to={"/"}>
            <button className="flex items-center gap-2">
              <IoMdArrowBack size="20px" />
              Beranda
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col max-w-sm mt-6 font-semibold md:ml-[10rem]">
        <div className="border-b border-slate-500 w-11/12 flex items-center py-4 cursor-pointer">
          <TbPencilMinus className="text-primary-darkblue04 mr-2" size="30px" />
          <button className="flex items-center gap-2" onClick={openModal}>
            Ubah Profil
          </button>
        </div>
        <div className="border-b border-slate-500 w-11/12 flex items-center py-4">
          <FiSettings className="text-primary-darkblue04 mr-2" size="30px" />
          <button className="flex items-center gap-2">Pengaturan Akun</button>
        </div>
        <div className="border-b border-slate-500 w-11/12 flex items-center py-4">
          <ImExit className="text-primary-darkblue04 mr-2" size="30px" />
          <button
            className="flex items-center gap-2"
            onClick={(e) => dispatch(logout(navigate))}
          >
            Keluar
          </button>
        </div>
        <span className="text-slate-500 font-thin text-xs">version 1.1.0</span>
      </div>
      {/* Akhir Komponen Account */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-10/12 bg-white rounded-lg p-6">
            <h2 className="font-bold text-xl mb-4">Ubah Data Profil</h2>
            <div className="w-9/12 mx-auto mt-4 rounded-lg">
              <h3 className="text-neutral-neutral01 bg-primary-darkblue03 p-2 text-sm rounded-t-lg">
                Data Diri
              </h3>
              <form
                className="bg-white flex flex-col gap-1 w-10/12 mx-auto"
                onSubmit={handleSubmit}
              >
                <label htmlFor="fullName" className="text-xs text-primary-darkblue04 mt-3">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder={dataUser?.full_name ?? "Nama Lengkap"}
                  className="rounded-sm shadow-md"
                  onChange={handleChangeFullName}
                  onBlur={handleBlurFullName}
                  value={valueFullName}
                />
                {invalidFullName && (
                  <p className="message-error-input">
                    Nama harus lebih dari 3 karakter
                  </p>
                )}
                <label htmlFor="phoneNumber" className="text-xs text-primary-darkblue04">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder={dataUser?.phone ?? "Nomor Telepon"}
                  className="rounded-sm shadow-md"
                  onChange={handleChangePhone}
                  onBlur={handleBlurPhone}
                  value={valuePhone}
                />
                {invalidPhone && (
                  <p className="message-error-input">
                    Nomor telepon harus memiliki lebih dari 10 digit
                  </p>
                )}
                <p className="text-green-500 font-bold text-xs">{updateMessage}</p>
                <p className="text-slate-300 font-bold text-xs">*Silahkan Input Ulang Data , dan pastikan sesuai</p>
                {requestUpdate ? (
                  <LoadingRequest />
                ) : (
                  <>
                    <button
                      type="submit"
                      className="bg-primary-darkblue02 text-white rounded-sm px-2 py-1 mt-2"
                    >
                      Simpan
                    </button>
                    <button
                      className="bg-primary-darkblue04 text-white rounded-sm px-2 py-1 mt-2"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Akhir Modal */}
    </div>
  );
};

export default Account;
