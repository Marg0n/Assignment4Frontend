/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomButton from "../shared/CustomButton";


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
    <div className="w-full md:min-h-[70vh] rounded-4xl shadow-purple-600 shadow-2xl flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600">
      {/* header */}
      <header className="flex h-full lg:flex-row flex-col-reverse gap-4 lg:gap-0 justify-center items-center ">
        <div className="px-8 mt-0  w-full lg:w-[60%] h-full py-4 lg:py-0 lg:h-80">
          <div className="flex flex-col items-center justify-start text-center space-y-6 lg:space-y-8 xl:space-y-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight transition-all duration-300 hover:scale-[1.02] text-white">
              Bicycle
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-white leading-relaxed text-justify lg:text-center">
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
