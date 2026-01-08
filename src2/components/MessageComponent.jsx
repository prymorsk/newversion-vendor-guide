'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle,faFileCirclePlus,faCircleXmark,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Fragment,useRef } from 'react';
import { getCookie } from 'cookies-next';
import axios from '@/lib/axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/context/UserContext';
import LoadingComponents from '@/components/LoadingComponents';
import Image from 'next/image';
import Link from 'next/link';
import Modal from "@/components/Modal";
import ModalCarosuel from "@/components/Front/ModalCarosuel";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function MessageComponent({bidId,receiverId,styles}) {
    const bidReceiverId = receiverId;
    const {user}  = useAuth();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isImageLoading, setImageIsLoading] = useState(true);
    const [bidName,setBidName] = useState('');
    const [message,setMessage] = useState('');
    const [textBox,setTextBox] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [newGalleryIds, setNewGalleryIds] = useState([]);
    const [newGalleryUrls, setNewGalleryUrls] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sliderImages, setSliderImages] = useState([]);

    const openModal = (e,data) => {
        e.preventDefault();
        setIsModalOpen(true);
        setSliderImages(data);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function scrollToBottom () {
        if (messagesEndRef) {
            messagesEndRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }

    }

    useEffect(()=>{
		
        async function getMessages() {
            axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
			axios.defaults.headers.common['token'] = `${getCookie('token')}`;
			
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}bid-message-list/${bidId}/${bidReceiverId}?token=${getCookie('token')}`).then(response => {
                var messages = response.data;
                if(messages.status==true){
                    var newMessagesData = messages?.data?.list?.map((v) => ({
                        sender: v.sender_id,
                        receiver: v.receiver_id,
                        receiver_name: v.receiver?.name,
                        sender_name: v.sender?.name,
                        message: v.message,
                        images: v.bid_img,
                        time: v.time,
                        isload:false
                    }));
                    setTextBox(newMessagesData);
                    setBidName(messages?.data?.bid?.project_name)
                    setIsPageLoading(false)
                }
            }).catch(error => {
                var errors = error?.response?.data?.data;
            });
        
        };

        getMessages()
		
        scrollToBottom()
		
    },[message]);
	

    async function formAction(e) {
        e.preventDefault();
        setIsLoading(true);
        if(message || newGalleryUrls){
            setTextBox((prevTextBox) => [...prevTextBox, { 
                sender:user.user_id,
                receiver:bidReceiverId,
                receiver_name: '',
                sender_name: user.name,
                message: message,
                images: newGalleryUrls,
                time: new Date().toLocaleTimeString("en-US",{
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                isload:true
            }]);
            scrollToBottom();
        }
        var formData = new FormData(e.target);
        formData.append('bid_id',bidId);
        formData.append('receiver_id',bidReceiverId);
        formData.append('token',getCookie('token'));

        if(newGalleryIds){
            newGalleryIds?.map((img,i) => {
                formData.append('image_id[]',img)
            });
        }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bid-message`, formData).then(response => {
            var messages = response.data;
            setIsLoading(false);
            setMessage('');
            setNewGalleryIds([]);
            setNewGalleryUrls([]);
        }).catch(error => {
            setIsLoading(false);
            if(error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        });
    }

    async function onMultipleImageUpload(event) {
        event.preventDefault();
        try {
            const formData = new FormData();
            for (const file of event.target.files) {
                formData.append('images[]', file, file.name);
            }
      
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}multiple_image`, {
                method: 'POST',
                body: formData,
            });
        
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.');
            }
        
            const responseData = await response.json();
            var imgid = responseData.map(image => image.id);

            setNewGalleryIds(prevIds => [...prevIds, ...imgid]);
            setNewGalleryUrls(responseData)

        } catch (error) {
            //   console.error(error);
            var errors = error?.response?.data?.data;
            if(errors){
                const errorArray = Object.keys(errors).map((key) => {
                    toast.error(errors[key][0], {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    
                });
            }else if(error?.response?.data?.message){
                toast.error(error?.response?.data?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } finally {
        }
    }

    function removeImage(e,index, imageId) {
        e.preventDefault();
        setNewGalleryUrls((prevUrls) => {
            const updatedUrls = [...prevUrls];
            updatedUrls.splice(index, 1); 
            return updatedUrls;
        });

        setNewGalleryIds((prevIds) => {
            const updatedIds = [...prevIds];
            updatedIds.splice(index, 1);
            return updatedIds;
        });
    }


    return (
        <section className='py-14 bg-[#F6F7F8]'>
            
            <div className={[styles.container, styles.clearfix].join(' ')} >
                <div className={[styles.chat,'border','rounded'].join(' ')}>
                    <div className={[styles['chat-header'],styles.clearfix].join(' ')}>
                        <div className={[styles['chat-with']]}>
                            <div className={[styles['chat-about']]}>
                            {bidName}
                            </div>
                        </div>
                    </div>
                

                    <div className={[styles['chat-history']]} ref={messagesEndRef}>
                    { isPageLoading ? 
                        <div className="flex justify-center items-center h-full">
                            <LoadingComponents />
                        </div> :
                        <ul >
                            {textBox && textBox?.map((chat,i) => (
                                <Fragment key={i} >
                                    { chat.isLoad==true ? 
                                        <li>
                                            <div className="w-full text-right mb-5 pr-5">
                                                <span className={styles['loader-40']}></span>
                                            </div>
                                        </li> : 
                                        chat.receiver==bidReceiverId && (
                                        // chat.receiver==user?.user_id && (
                                        
                                            <>
                                           
                                        {chat.images.length>0 && (
                                        <li  className={[styles['clearfix']]}>
                                            <div className="w-full text-right mb-5">
                                                <span className="text-gray-400" >{chat.time}</span> &nbsp; &nbsp;
                                                <span > {chat.receiver==bidReceiverId ? chat.sender_name : chat.receiver_name} {styles.me && <FontAwesomeIcon icon={faCircle} className={[styles.me].join(' ')} />}</span> 
                                            </div>
                                            <Link href="" onClick={(e)=>{openModal(e,chat.images)}} className={['w-80','mb-5', styles['float-right']].join(' ')}>
                                                <div className='grid gap-1 grid-cols-2'>
                                                    {chat.images?.map((src,j)=>(
                                                        <>
                                                        {chat.images.length>=4 && j <= 3 && (
                                                        <div className={`${chat.images.length==1?'col-span-2':'col-span-1'} ${j >= 3?'relative':''}`} key={j}>
                                                            <Image src={src?.img?.image_url?src.img.image_url:src.image_url} height={100} width={100} alt={src?.img?.image?src.img.image:src.image} className='rounded w-full h-full' />
                                                            {j >= 3 && chat.images.length>4 &&
                                                            <div className='absolute z-30 w-full h-full bg-[#615c5c70] flex justify-center items-center text-white font-semibold text-lg top-0'>{chat.images.length - 4}+</div>}
                                                        </div>)}
                                                        {chat.images.length<4 && j <= 1 && (
                                                        <div className={`${chat.images.length==1?'col-span-2':'col-span-1'} ${j >= 1?'relative':''}`} key={j}>
                                                            <Image src={src?.img?.image_url?src.img.image_url:src.image_url} height={100} width={100} alt={src?.img?.image?src.img.image:src.image} className='rounded w-full h-full' />
                                                            {j >= 1 && chat.images.length>2 && 
                                                            <div className='absolute z-30 w-full h-full bg-[#615c5c70] flex justify-center items-center text-white font-semibold text-lg top-0'>{chat.images.length - 2}+</div>}
                                                        </div>)}
                                                        </>
                                                    ))}
                                                </div>
                                            </Link>
                                            
                                        </li>
                                        )}
                                        {chat.message && (
                                        <li  className={[styles['clearfix']]}>
                                            <div className="w-full text-right mb-5">
                                                <span className="text-gray-400" >{chat.time}</span> &nbsp; &nbsp;
                                                <span > {chat.receiver==bidReceiverId ? chat.sender_name : chat.receiver_name} {styles.me && <FontAwesomeIcon icon={faCircle} className={[styles.me].join(' ')} />}</span> 

                                            </div>
                                            <div className={[styles.message, styles['other-message'], styles['float-right']].join(' ')}>
                                                {chat.message}
                                            </div>
                                            
                                        </li>
                                        )}
                                        </>
                                    )}
                                    
                                    
                                    {
                                        chat.sender==bidReceiverId && ( 
                                        // chat.sender==user?.user_id && ( 
                                        
                                        <>
                                        {chat.images.length>0 && (
                                            <li className={[styles['clearfix']]}>
                                                <div className="w-full text-left mb-5">
                                                    <span >{chat.receiver==bidReceiverId ? chat.receiver_name : chat.sender_name} <FontAwesomeIcon icon={faCircle} className={[styles.online].join(' ')} /> 
                                                    
                                                    </span>
                                                    <span className="text-gray-400 ml-2">{chat.time}</span>
                                                    
                                                </div>
                                                <Link href="" onClick={(e)=>{openModal(e,chat.images)}} className={['w-80','mb-5', 'float-left'].join(' ')}>
                                                    <div className='grid gap-1 grid-cols-2'>
                                                        {chat.images?.map((src,j)=>(
                                                            <>
                                                            {chat.images.length>=4 && j <= 3 && (
                                                            <div className={`${chat.images.length==1?'col-span-2':'col-span-1'} ${j >= 3?'relative':''}`} key={j}>
                                                                <Image src={src.img.image_url} height={100} width={100} alt={src.img.image} className='rounded w-full h-full' />
                                                                {j >= 3 && chat.images.length>4 &&
                                                                <div className='absolute z-30 w-full h-full bg-[#615c5c70] flex justify-center items-center text-white font-semibold text-lg top-0'>{chat.images.length - 4}+</div>}
                                                            </div>)}
                                                            {chat.images.length<4 && j <= 1 && (
                                                            <div className={`${chat.images.length==1?'col-span-2':'col-span-1'} ${j >= 1?'relative':''}`} key={j}>
                                                                <Image src={src.img.image_url} height={100} width={100} alt={src.img.image} className='rounded w-full h-full' />
                                                                {j >= 1 && chat.images.length>2 &&
                                                                <div className='absolute z-30 w-full h-full bg-[#615c5c70] flex justify-center items-center text-white font-semibold text-lg top-0'>{chat.images.length - 2}+</div>}
                                                            </div>)}
                                                            </>
                                                        ))}
                                                    </div>
                                                </Link>
                                            </li>
                                        )}
                                        {chat.message && (
                                        <li className={[styles['clearfix']]}>
                                            <div className="w-full text-left mb-5">
                                                <span >{chat.receiver==bidReceiverId ? chat.receiver_name : chat.sender_name} <FontAwesomeIcon icon={faCircle} className={[styles.online].join(' ')} /> 
                                                
                                                </span>
                                                <span className="text-gray-400 ml-2">{chat.time}</span>
                                                
                                            </div>
                                            <div className={[styles.message, styles['my-message']].join(' ')}>
                                            {chat.message}
                                            </div>
                                            
                                        </li>
                                        )}
                                        </>
                                    )}
                                </Fragment>
                            ))}
                        </ul>
                        }
                    </div>

                    <div className={[styles['chat-message'],styles['clearfix'],'border-t','p-2'].join(' ') }>
                        <form action="" method='POST' onSubmit={formAction}>
                        <div className='grid grid-cols-1 bg-gray-100 p-2 rounded-xl'>
                            {newGalleryUrls.length > 0 &&(<>
                                <div className='grid-cols-1'>
                                    <div className='grid gap-1 grid-cols-12'>
                                        {newGalleryUrls && newGalleryUrls.map((src,i)=>(
                                            <div className="col-span-2 relative" key={i}>
                                                <Image src={src.image_url} height={200} width={200} alt={src.image} className='rounded' />
                                                <Link href=""  onClick={(e)=>removeImage(e,i,src.id)}>
                                                    <FontAwesomeIcon icon={faCircleXmark} className='absolute top-0 right-0 text-white p-1' />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-span-1 my-1'>
                                    <hr />
                                </div>
                            </>)}
                            <div className='col-span-1'>
                                <textarea name="message" value={message} onChange={(e)=>setMessage(e.target.value)} className="bg-gray-100" id={[styles['message-to-send']]} placeholder="Type your message" rows="3" disabled={isPageLoading?isPageLoading:isLoading}></textarea>
                            </div>
                        </div>
                        <div className='grid grid-cols-12 mt-2'>
                            <div className='col-span-6'>
                                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                                <i className="fa fa-file-image-o"></i>
                                <label htmlFor='bidimage' className='cursor-pointer'>
                                <FontAwesomeIcon icon={faFileCirclePlus}  />
                                </label>
                                <input type="file" id="bidimage" multiple  onChange={onMultipleImageUpload} className="invisible" />
                            </div>
                            <div className='col-span-6 text-right'>
                                {(newGalleryUrls.length > 0 || message) &&
                                <button button="Submit" is_loding={isLoading} disabled={isPageLoading?isPageLoading:isLoading} className=" sm:w-auto w-full rounded-full bg-[#c13e27] px-3 py-2 text-center text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" ><FontAwesomeIcon icon={faPaperPlane} /></button>}
                            </div>
                            
                            
                        </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalCarosuel filterData={sliderImages}/>
            </Modal>
        </section>
    );
};
