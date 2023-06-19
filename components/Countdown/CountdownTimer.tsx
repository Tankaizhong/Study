import React, { useState, useEffect } from "react";
import styles from "./CountdownTimer.module.css";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isHydrated, setIsHydrated] = useState(false); // 新增的状态

  useEffect(() => {
    if (typeof window !== "undefined") setIsHydrated(true); // 在客户端渲染时设置 isHydrated 为 true
  }, []);

  useEffect(() => {
    if (isHydrated) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, isHydrated]);

  const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div className={styles.container}>
      {timeLeft.days > 0 && (
        <div className={styles.flipCard}>
          <div className={styles.flipCardInner}>
            <div className={styles.flipCardFront}>
              <div className={styles.flipCardNumber}>
                {addLeadingZero(timeLeft.days)}
              </div>
              <div className={styles.flipCardLabel}>Days</div>
            </div>
            <div className={styles.flipCardBack}>
              <div className={styles.flipCardNumber}>
                {addLeadingZero(timeLeft.days)}
              </div>
              <div className={styles.flipCardLabel}>Days</div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div className={styles.flipCardNumber}>
              {addLeadingZero(timeLeft.hours)}
            </div>
            <div className={styles.flipCardLabel}>Hours</div>
          </div>
          <div className={styles.flipCardBack}>
            <div className={styles.flipCardNumber}>
              {addLeadingZero(timeLeft.hours)}
            </div>
            <div className={styles.flipCardLabel}>Hours</div>
          </div>
        </div>
      </div>

      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div className={styles.flipCardNumber}>
              {addLeadingZero(timeLeft.minutes)}
            </div>
            <div className={styles.flipCardLabel}>Minutes</div>
          </div>
          <div className={styles.flipCardBack}>
            <div className={styles.flipCardNumber}>
              {addLeadingZero(timeLeft.minutes)}
            </div>
            <div className={styles.flipCardLabel}>Minutes</div>
          </div>
        </div>
      </div>

      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <div className={styles.flipCardNumber}>
              {addLeadingZero(timeLeft.seconds)}
            </div>
            <div className={styles.flipCardLabel}>Seconds</div>
          </div>
          <div className={styles.flipCardBack}>
            <div className={styles.flipCardNumber}>
              {addLeadingZero(timeLeft.seconds)}
            </div>
            <div className={styles.flipCardLabel}>Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
