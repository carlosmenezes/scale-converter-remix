import { useState } from "react";

const scales = ["1/12", "1/16", "1/20", "1/24", "1/25", "1/32", "1/48", "1/64", "other"];
const units = ["mm", "cm", "m", "in", "ft"];

type UnitProportions = {[key: string]: number};
const unitsInMM: UnitProportions = {
    "mm": 1,
    "cm": 10,
    "m": 1000,
    "in": 25.4,
    "ft": 304.8
};

export default function Index() {
    const [conversionProps, setConversionProps] = useState({
        ratio: "1/24",
        realLength: 1,
        realUnit: "in",
        scaleLength: 1,
        scaleUnit: "mm",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(`handleInputChange event.target.id: ${event.target.id}`);
        let newProps = {
            ...conversionProps,
            [event.target.id]: event.target.value
        };

        let lengthInMM, lengthOnScale, lengthOnUnit, target;
        if (event.target.id.startsWith("real") || event.target.id === "ratio") {
            lengthInMM = newProps.realLength * unitsInMM[newProps.realUnit];
            lengthOnScale = lengthInMM * (Number(newProps.ratio.split("/")[0]) / Number(newProps.ratio.split("/")[1]));
            lengthOnUnit = lengthOnScale / unitsInMM[newProps.scaleUnit];
            target = "scaleLength";
        } else {
            lengthInMM = newProps.scaleUnit === "mm" ? newProps.scaleLength : newProps.scaleLength * unitsInMM[newProps.scaleUnit];
            lengthOnScale = lengthInMM * (Number(newProps.ratio.split("/")[1]) / Number(newProps.ratio.split("/")[0]));
            lengthOnUnit = lengthOnScale / unitsInMM[newProps.realUnit];
            target = "realLength";
        }

        setConversionProps({
            ...newProps,
            [target]: lengthOnUnit
        });
    };

    return (
        <div id="content">
            <p>Scale Ratio</p>
            <select id="ratio" value={conversionProps.ratio} onChange={handleInputChange}>
                {scales.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <p>Real Length</p>
            <input id="realLength" type="number" placeholder="1" value={Number(conversionProps.realLength).toFixed(4)} onChange={handleInputChange} />
            <select id="realUnit" defaultValue="in" onChange={handleInputChange}>
                {units.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>
            <p>Scale Length</p>
            <input id="scaleLength" type="number" placeholder="1" value={Number(conversionProps.scaleLength).toFixed(4)} onChange={handleInputChange} />
            <select id="scaleUnit" defaultValue="mm" onChange={handleInputChange}>
                {units.map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <div id="result">
                <p>Real Length {Number(conversionProps.realLength).toFixed(4)} {conversionProps.realUnit}</p>
                <p>Scale Length {Number(conversionProps.scaleLength).toFixed(4)} {conversionProps.scaleUnit}</p>
            </div>
        </div>
    );
}