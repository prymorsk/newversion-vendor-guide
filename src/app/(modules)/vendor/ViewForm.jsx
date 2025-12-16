"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import { useEffect, useState } from 'react';
import { getCookie } from "cookies-next";

const EditFormView = ({user,navigate,data}) => {
    // console.log(propertie)
    const [isLoding, setIsLoding] = useState(false);
    console.log(data)

    useEffect(() => {
        if(!getCookie('token')){
            navigate.push('/')
        }
    }, [])


    return (

        <div className="w-full">
            <form action="#" method="POST" className="mx-auto mt-6" >
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-x-4">

                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Bid Number" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.bid_number} disabled={true} id="property_name"  />
                            </div>
                        </div>

                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Vendore Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.name} disabled={true} id="property_name"  />
                            </div>
                        </div>

                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="City" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.city} disabled={true} id="property_name"  />
                            </div>
                        </div>
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Vendore Address" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.address} disabled={true} id="property_name"  />
                            </div>
                        </div>

                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Bid Priority" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.priority} disabled={true} id="property_name"  />
                            </div>
                        </div>

                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Bid Property Type" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.property_type} disabled={true} id="property_name"  />
                            </div>
                        </div>
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Vendore Number" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.phone} disabled={true} id="property_name"  />
                            </div>
                        </div>

                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Bid Detail" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" value={data[0]?.bid?.project_detail} disabled={true} id="property_name"  />
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditFormView;