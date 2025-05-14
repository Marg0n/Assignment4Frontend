/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomButton from "../shared/CustomButton";
// import test2 from "../../assets/images/logo/logo1.png";


const Adv = () => {

    // handle click
  const handleClick = () => {
    window.location.href = "/showroom"
    // const section = window.location.href = "/showroom";
    // if (section) {
    //   section.scrollIntoView({ behavior: "smooth" });
    // }
  };

  return (
    <div 
      className="w-full md:min-h-[70vh] rounded-4xl border-purple-300 shadow-purple-300 shadow-2xl flex flex-col justify-center items-center bg-gradient-to-br from-transparent via-blue-400 to-purple-300 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJpbmt8ZW58MHx8fHwxNjg5NTY1NzQy&ixlib=rb-4.0.3&q=80&w=1080')`,
        // backgroundImage: `url(${test2})`,
        // backgroundImage: `url('https://img.freepik.com/foto-gratuito/silhouette-di-donne-con-bicicletta-e-bel-cielo_1150-5338.jpg')`,
        backgroundSize: "cover",
        // backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* <div className="absolute inset-0 rounded-4xl opacity-20 !bg-gradient-to-br from-transparent via-blue-400 to-purple-300"></div> */}
      {/* header */}
      <header className="flex h-full lg:flex-row flex-col-reverse gap-4 lg:gap-0 justify-center items-center ">
        <div className="px-8 mt-0  w-full lg:w-[60%] h-full py-4 lg:py-0 lg:h-80">
          <div className="flex flex-col items-center justify-start text-center space-y-6 lg:space-y-8 xl:space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 hover:scale-[1.02] text-black">
              Bicycle
            </h1>
            <p className="max-w-3xl text-lg md:text-xl text-white text-shadow-white font-semibold leading-relaxed text-justify lg:text-center bg-gradient-to-br from-white to-blue-300 bg-clip-text">
              Bicycle is the market leader when it comes to local bikes in Bangladesh. Every year we try to be more innovative to come up with better designs and specs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-0">
            <CustomButton textName="Visit us" handleAnything={handleClick} className="font-bold"/>
            </div>
          </div>
        </div>

      </header>
    </div>
  );
};

export default Adv;
