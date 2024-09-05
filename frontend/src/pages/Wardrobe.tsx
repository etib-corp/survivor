import { useState } from "react";

import ETIBNavBar from "../components/ETIBNavBar";
import ETIBWardrobe from "../components/Wardrobe/ETIBWardrobe";

export default function Wardrobe() {
    const [props, setProps] = useState({ page: "wardrobe" });

    return (
        <div className="overflow-x-hidden">
            <ETIBNavBar properties={props} OnChangeView={setProps}/>
            <ETIBWardrobe />
        </div>
    );
}