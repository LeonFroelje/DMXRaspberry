import styles from "./HomeRoute.module.css";
import Universe from "../components/Universe.mjs";
import Fixtures from "../components/Fixtures.mjs";
import SwitchButton from "../components/SwitchButton.mjs";
import { BsThreeDots } from "react-icons/bs";


export default function HomeRoute(){
    const channels = [];
    for(let i = 1; i <= 512; i++){
        channels.push({
            id: i,
            fixtureName: ""
        })
    }

    const fixtures = [];
    return (
        <div className={styles.home}>
            <div id={styles.header}>
                <h1>Werkstatt</h1>
                <div id={styles.header_control}>
                    <div id={styles.header_settings}>
                        <BsThreeDots/>
                    </div>
                    <div id={styles.header_toggle_all}>
                        <SwitchButton/>
                    </div>
                </div>
            </div>
            <div id={styles.main}>
                <div className={styles.universe_container}>
                    <h3>Universum</h3>
                    <Universe channels={channels}/> 
                </div>

                <div className={styles.fixture_container}>
                    <h3>Lampen</h3>
                    <Fixtures fixtures={fixtures}/>
                </div>
            </div>
        </div>
        );
}