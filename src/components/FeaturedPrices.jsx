import PropTypes from 'prop-types';

export default function FeaturedPrices({ minPrice, currentPrice, maxPrice }) {
    return (
        <div className='flex flex-col lg:flex-row gap-5 p-10 items-center'>
            <div className="flex justify-center items-center h-[200px] w-full border-[1px] p-5 bg-[#1E1E22]/20 border-[#E1E3F3]/5 backdrop-blur-md rounded-md">
                <h1 className="text-[50px] text-center my-auto font-bold dashboard_mainText">WattCheck Dashboard</h1>
            </div>
            <div className='flex flex-col justify-between w-full border-[1px] p-5 bg-[#1E1E22]/20 border-[#E1E3F3]/5 backdrop-blur-md rounded-md '>
                <h2 className='text-[30px] dashboard_mainText font-semibold mb-2'>Featured prices</h2>
                <div className='flex flex-col md:flex-row gap-20'>
                    <div className="relative rounded-lg border-gray-500/50  shadow-xl px-4 border-[1px] p-5 w-[250px]">
                        <h2 className='text-[16px] text-[#E1E3F3]/70 font-normal'>Lowest Price</h2>
                        <p className='text-[25px] text-[#E1E3F3] font-bold'>{minPrice ? `${minPrice} €/MWh` : 'Loading...'}</p>
                    </div>
                    <div className="relative rounded-lg border-gray-500/50 shadow-xl px-4 border-[1px] p-5 w-[250px]">
                        <h2 className='text-[16px] text-[#E1E3F3]/70 font-normal'>Current Price</h2>
                        <p className='text-[25px] text-[#E1E3F3] font-bold'>{currentPrice ? `${currentPrice} €/MWh` : 'Loading...'}</p>
                    </div>
                    <div className="relative rounded-lg border-gray-500/50  shadow-xl px-4 border-[1px] p-5 w-[250px]">
                        <h2 className='text-[16px] text-[#E1E3F3]/70 font-normal'>Highest Price</h2>
                        <p className='text-[25px] text-[#E1E3F3] font-bold'>{maxPrice ? `${maxPrice} €/MWh` : 'Loading...'}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

FeaturedPrices.propTypes = {
    minPrice: PropTypes.number,
    currentPrice: PropTypes.number,
    maxPrice: PropTypes.number,
};
