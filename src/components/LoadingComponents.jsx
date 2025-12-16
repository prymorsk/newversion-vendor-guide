const LoadingComponents = () => {
    return (
        <div className="w-full flex justify-center py-6">
            <div className="loading-wave flex gap-1 min-h-[80px] items-center ">
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave"></div>
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-100"></div>
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-200"></div>
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-300"></div>
            </div>
        </div>
    );
};

export default LoadingComponents;
