import ETIBNavBar from "../components/ETIBNavBar";
import { useState } from "react";

function Elearning() {
  const [props, setProps] = useState({ page: "elearning" });

  return (
    <div className="overflow-x-hidden">
      <ETIBNavBar properties={props} OnChangeView={setProps} />
        <div className="flex">
            <h1 className="text-2xl font-bold text-center mt-10">
                E-Learning Page
            </h1>
        </div>
    </div>
  );
}

export default Elearning;
