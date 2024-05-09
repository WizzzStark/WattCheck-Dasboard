import PropTypes from 'prop-types';


export default function PersonalConsumption({ percentage, co2Consumed }) {
  return (
    <div className='flex-1 flex-col border-[1px] p-5 bg-[#1E1E22]/50 border-[#E1E3F3]/5 rounded-md backdrop-blur-3xl h-[280px]'>
      <h2 className='text-[20px] font-semibold pb-1 pl-3 dashboard_mainText'>Personal consumption</h2>
      <div className='w-full md:h-[50px] h-[220px] justify-center'>
        <h2 className={`text-[90px] text-center justify-center font-sans  font-bold`}>
          {percentage.toFixed(0)}%
        </h2>
        <p className='text-[16px] text-center font-sans font-semibold'>You consume {percentage.toFixed(2)}% of what a person consumes on average per day, that is {co2Consumed.toFixed(2)}kg of CO2 per day.</p>
      </div>
    </div>
  )
}

PersonalConsumption.propTypes = {
  percentage: PropTypes.number.isRequired,
  co2Consumed: PropTypes.number.isRequired,
};
