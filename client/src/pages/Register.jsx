import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { GiThreeLeaves } from "react-icons/gi";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { RegImage } from "../assets";
import {apiRequest} from "../utils";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await apiRequest({
        url : "/auth/register",
        data : data,
        method : "POST",
      });
      if (res?.status === "failed" ){
        setErrMsg(res);
      }else{
        setErrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        },5000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };


  return (
    <div className='bg-[#111111] w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-[#E0F3DF] rounded-xl overflow-hidden shadow-xl'>
        {/* ------------------- RIGHT ----------------- */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center '>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 border border-[#445D48] rounded text-[#445D48]'>
            <GiThreeLeaves />
            </div>
            <span className='text-2xl text-[#111111] font-semibold '>
              TrashTroops
            </span>
          </div>

          <p className=' text-[#111111] font-semibold'>
            New Here!
            <br/>Create your account
          </p>

          <form
            className='py-5 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full bg-[#ffffff] text-[#111111]'
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label='Last Name'
                placeholder='Last Name'
                type='lastName'
                styles='w-full bg-[#ffffff] text-[#111111]'
                register={register("lastName", {
                  required: "Last Name do no match",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full bg-[#ffffff] text-[#111111]'
              error={errors.email ? errors.email.message : ""}
            />

            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                styles='w-full bg-[#ffffff] text-[#111111]'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />

              <TextInput
                label='Confirm Password'
                placeholder='Password'
                type='password'
                styles='w-full bg-[#ffffff] text-[#111111]'
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                      return "Passwords do no match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-[#111111] px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Create Account'
              />
            )}
          </form>

          <p className='text-sm text-center text-[#111111]'>
            Already has an account?{" "}
            <Link
              to='/login'
              className='text-[#5b5b5b] font-semibold ml-2 cursor-pointer'
            >
              Login
            </Link>
          </p>
        </div>
        {/* --------------------- LEFT ------------------------ */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[##E0F3DF]'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={RegImage}
              alt='Reg Image'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-[#111111] right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} style={{ color: '#C6EBC5' }} />
              <span className='text-xs font-medium text-[#C6EBC5]'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-[#111111] left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection style={{ color: '#C6EBC5' }} />
              <span className='text-xs font-medium text-[#C6EBC5]'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-[#111111] left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction style={{ color: '#C6EBC5' }} />
              <span className='text-xs font-medium text-[#C6EBC5]'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-black text-base'>
              Spread HYGIENE , not GERMS!  
            </p>
            <span className='text-sm text-black/80'>
              Click!.. Upload!... for your cleaner surrounding !
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;