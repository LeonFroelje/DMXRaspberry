import styles from "./HomeRoute.module.css";
import Universe from "../components/Universe.mjs";

export default function HomeRoute(){
    const channels=[];
    for(let i = 1; i <= 512; i++){
        channels.push({
            id: i,
            fixtureName: ""
        })
    }
    return (
        <div className={styles.home}>
            <h2>Werkstatt</h2>
            <div className={styles.universe_container}>
                <h3>Universum</h3>
               <Universe channels={channels}/> 
            </div>
        </div>
        );
}