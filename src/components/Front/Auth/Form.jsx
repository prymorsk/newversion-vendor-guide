"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import TableCheckbox from "@/components/Front/Company/TableCheckbox"
import Link from "next/link";
import { useState } from 'react'
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Form = (props) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user,login,renderFieldError,isLoding}  = useAuth();
    // console.log(user);
    const makeRequest = (e) => {
        e.preventDefault();
        login(props.type,{
            email,
            password
        })

    };


      
    return (
        <div className="md:col-span-2 lg:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1 ">
            <div className="container mx-auto overflow-hidden p-12 md:pt-12 px-12 md:px-12 xl:px-12">
                <div className="">
                    <div className="absolute inset-x-0 top-[-10rem] -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">

                    </div>
                    <div className=" text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl  text-left">Login</h2>

                    </div>
                    <form action="#" method="POST" className="mx-auto mt-6" onSubmit={makeRequest}>
                        <div className="">
                            <div className="w-full my-2 pb-6" >
                                <Label label="Email" required="required" />

                                <div className="mt-2.5">
                                    <Input name="email" id="email"  value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                {renderFieldError('email')}
                            </div>
                            <div className="w-full my-2">
                                <Label label="password" required="required" />
                                <div className="mt-2.5">
                                    <Input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                {renderFieldError('password')}
                            </div>
                            <div className="flex gap-2 pt-3">
                                <TableCheckbox />  <p className=" text-lg font-semibold"> Remember Me</p>
                            </div>

                            <div className="my-4">

                                <Submit button="Sign In" is_loding={isLoding} disabled={isLoding}  />
                            </div>

                            <div>
                                <Link href="register" className="text-[#c13e27] text-lg font-semibold">Register</Link>
                            </div>
                            <div>
                                {/* <Link href="#" className="text-[#c13e27] text-lg font-semibold">Forgot Password</Link> */}
                            </div>

                        </div>
                        <div className="mt-2 mb-8" >

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form