import { Link } from "react-router-dom";
import styles from "./footer.module.css";

export default function IconLink(props){
    return (
        <Link to={props.path}>
            <div onClick={props.handleClick} className={props.active ? styles.icon_link + " " + styles.active : styles.icon_link} id={props.path}>
                <div className={styles.icon}>
                    {props.icon}
                </div>
                <div className={styles.link_name}>
                    {props.name}
                </div>
            </div>
        </Link>
    );
}