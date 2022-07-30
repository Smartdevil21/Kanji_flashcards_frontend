import React from 'react';
import Styles from "./Entrance.module.scss";

type Props = {
    children: React.ReactNode;
}

function Entrance({children}:Props) {
  return (
    <div className={Styles.entrance}>
        <div className={Styles.bg}></div>
        <div className={Styles.wrapper}>
            {children}
        </div>
    </div>
  )
}

export default Entrance