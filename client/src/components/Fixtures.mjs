import styles from "./Fixtures.module.css";

export default function Fixtures(props){
    return (
        <div className={styles.fixtures}>
            {props.fixtures}
        </div>);
}