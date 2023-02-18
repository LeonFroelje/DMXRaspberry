import Channel from "./Channel.mjs";
import styles from "./Universe.module.css";

export default function Universe(props){
    const channels = props.channels.map(channel => {
        return <Channel key={channel.id} channelId={channel.id} fixtureName={channel.fixtureName}/>
    })
    return (
        <div className={styles.universe} id="Universe">
            {channels}
        </div>
    );
}