import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className='bg-[#111827]'>
      <div className='overflow-clip flex flex-col relative min-h-[100vh]'>
        <div className="blur-[80px] translate-x-[-50%] w-[1102px] z-10 left-[50%] top-0 bottom-0 absolute">
          <div className="one" />
          <div className="two" />
          <div className="three" />
          <div className="four" />
          <div className="five" />
          <div className="six" />
        </div>

        <div className=' translate-x-[-50%] w-[1102px] z-10 left-[50%] top-0 bottom-0 absolute pointer-events-none'>
          <div className='lineLeftOne' />
          <div className='lineLeftTwo' />
          <div className='lineRightOne' />
          <div className='lineRightTwo' />
        </div>

        <section className="content-container">
          <div className="text-container">
            <h1 className='specialh1 text-center md:text-[4rem] text-[2rem]'>
              The best electricity data analysis tool
            </h1>
            <p className=' text-[18px]  text-[#9ca3af] mt-3 mb-[30px]'>
              WattCheck is a tool that helps you analyze electricity data to make better decisions.
            </p>

            <div className="flex justify-center gap-5 mt-[73px]">
              <button className='w-60 bg-white/90 text-black font-semibold hover:bg-gray-300/90' onClick={() => navigate("/authScreen")}>Get Started</button>
            </div>


          </div>
        </section>

        <div className="border-[#D1DAFF]/30 absolute w-full border-b-[1px] top-[400px] pb-[1.5rem]" />
        <div className="border-[#D1DAFF]/30 absolute w-full border-b-[1px] top-[510px] pb-[1.5rem]" />

      </div>
    </div>
  );
}