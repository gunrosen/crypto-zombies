import React from 'react';
import styles from './WhitelistCountDown.module.css';

const WhitelistCountDown = () => {
    return (
      <div className={styles.container}>
            <div className="d-flex flex-row justify-content-around text-center fs-6 mt-2">
                <div>
                    <div className={styles.rectangle}>01</div>
                    <div>Days</div>
                </div>
                <div>
                    <div className={styles.rectangle}>23</div>
                    <div>Hours</div>
                </div>
                <div>
                    <div className={styles.rectangle}>12</div>
                    <div>Mins</div>
                </div>
                <div>
                    <div className={styles.rectangle}>01</div>
                    <div>Secs</div>
                </div>
            </div>
      </div>
  )
}

export default WhitelistCountDown;
