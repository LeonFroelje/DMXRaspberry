import { useState } from "react";
import styles from "./footer.module.css";
import IconLink from "./IconLink.mjs";


export default function Footer(props){
    const [active, setActive] = useState(window.location.pathname)

    const handleClick = (e) => {
        setActive(e.currentTarget.id)
    }
    console.log(active)
    const links = props.links.map(link => {
        return active === link.path 
        ?
        <IconLink active={true} key={link.path} path={link.path} name={link.name}
        icon={link.icon} handleClick={handleClick}></IconLink>
        :
        <IconLink active={false} key={link.path} path={link.path} name={link.name}
        icon={link.icon}></IconLink>
    })
    return (
        <div className={styles.footer_wrapper}>
            {links}
        </div>
    )
}