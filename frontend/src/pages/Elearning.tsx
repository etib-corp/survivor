import { useState } from "react";

import ETIBCard from "../components/ETIBCard";
import ETIBNavBar from "../components/ETIBNavBar";

function Elearning() {
  const [props, setProps] = useState({ page: "elearning" });

  return (
    <div className="overflow-x-hidden">
      <ETIBNavBar properties={props} OnChangeView={setProps} />
        <div className="flex">
            <h1 className="text-4xl font-bold mt-8 ml-4">
                E-Learning Page
            </h1>
        </div>
        <div className="flex justify-center items-center h-screen pb-[30%]">
            <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-4 md:mt-0 gap-10">
                <ETIBCard title="E-Learning" subtitle="First lesson" buttonTitle="Read more" />
                <ETIBCard title="E-Learning" subtitle="Second lesson" buttonTitle="Read more" />
                <ETIBCard title="E-Learning" subtitle="Third lesson" buttonTitle="Read more" />
                <ETIBCard title="E-Learning" subtitle="Fourth lesson" buttonTitle="Read more" />
            </div>
        </div>
    </div>
  );
}

export default Elearning;
