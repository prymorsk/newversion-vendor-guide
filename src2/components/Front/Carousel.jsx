import Image from "next/image";

const Carousel = (props) => {
    
    return (
        <div id="default-carousel " className="" data-carousel="slide">
            <div className="xl:h-[70vh] lg:h-[70vh] md:h-[54vh] h-[40vh] bg-[#0000007d] absolute top-0 right-0 bottom-0 left-0 z-30"></div>
            <div className="overflow-hidden relative xl:h-[70vh]  lg:h-[70vh] md:h-[54vh] h-[40vh]">
                {props.images && props.images.map((src, i) => {
                    return (
                        <div key= {i} className="duration-700 ease-in-out xl:h-[70vh] lg:h-[70vh] md:h-[54vh] h-[40vh] bg-blend-darken" data-carousel-item >
                            <Image src={src} className="h-[54vh] lg:h-[70vh] w-auto object-cover block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={src} width="100"  height="100"/>
                        </div>
                    );
                })}
                
            </div>
            <div className="absolute bottom-6 xl:bottom-12 sm:bottom-6 left-1/2 z-30 space-x-1 sm:space-x-3 -translate-x-1/2">
                {props.images && props.images.map((src, i) => {
                    return (
                        <>
                            <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label={`Slide ${i}`} data-carousel-slide-to={i}></button>
                        </>
                    );
                })}
            </div>
            <button type="button" className="flex lg:block z-50 hidden absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span className="hidden">Anterior</span>
                </span>
            </button>
            <button type="button" className="flex  z-50 lg:block hidden absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 0 group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
                    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="hidden">Siguiente</span>
                </span>
            </button>
        </div>
    )
}

export default Carousel;