import Switch from "react-switch";
import { useState } from "react";


export default function SwitchButton(props){
    const [checked, setChecked] = useState(false);

    const handleChange = (checked) => {
        setChecked(checked);
    }
    console.log(props.id);
    return(
        <Switch onChange={handleChange} checked={checked}/>
    )
}