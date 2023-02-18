import { useState } from "react";
import styles from "./Universe.module.css";


export default function Channel(props){
    const [active, setActive] = useState(false);
    console.log(active)
    const handleClick = (e) => {
        console.log("lel")
        if(active){
            setActive(false);
        }
        else{
            setActive(true)
        }
    }

    const occupied = props.fixtureName !== "";
    return (
        <div onClick={handleClick} id={`c${props.channelId}`} className={styles.channel }>
            {occupied ? props.fixtureName : props.channelId}
        </div>
    );
}