import { Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

const scales = ["1/12", "1/16", "1/20", "1/24", "1/25", "1/32", "1/48", "1/64", "other"];
const units = ["mm", "cm", "m", "in", "ft"];

type UnitProportions = { [key: string]: number };
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
    const targetId = event.target.id ? event.target.id : event.target.name;
    console.log(`handleInputChange event.target.id: ${targetId}`);
    let newProps = {
      ...conversionProps,
      [targetId]: event.target.value
    };

    let lengthInMM, lengthOnScale, lengthOnUnit, target;
    if (targetId.startsWith("real") || targetId === "ratio") {
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

  /**
   * TODOS:
   // [ ] Estudar layouts com tailwindcss
   // [ ] Estudar como fazer testes unitários?
   // [ ] Implementar dark mode
   // [ ] deploy
   // [ ] como colocar adsense?
   */

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4 items-end max-w-xl mx-auto">
        <div className="col-span-2"><p>Scale Ratio</p></div>
        <div className="col-span-2">
          <Select
            id="ratio"
            name="ratio"
            defaultSelectedKeys={[conversionProps.ratio]}
            onChange={handleInputChange}
            className="max-w-xs"
          >
            {scales.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div >
          <p>Real Length</p>
          <Input id="realLength" className="max-w-xs" type="number" placeholder="1" value={Number(conversionProps.realLength).toFixed(4)} onChange={handleInputChange} />
        </div>
        <div >
          <Select id="realUnit" className="max-w-xs" name="realUnit" defaultSelectedKeys={[conversionProps.realUnit]} onChange={handleInputChange}>
            {units.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div >
          <p>Scale Length</p>
          <Input id="scaleLength" className="max-w-xs" type="number" placeholder="1" value={Number(conversionProps.scaleLength).toFixed(4)} onChange={handleInputChange} />
        </div>
        <div >
          <Select id="scaleUnit" className="max-w-xs" name="scaleUnit" defaultSelectedKeys={[conversionProps.scaleUnit]} onChange={handleInputChange}>
            {units.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div id="result" className="col-span-2">
          <p>Real Length {Number(conversionProps.realLength).toFixed(4)} {conversionProps.realUnit}</p>
          <p>Scale Length {Number(conversionProps.scaleLength).toFixed(4)} {conversionProps.scaleUnit}</p>
        </div>
      </div>
    </div>
  );
}
