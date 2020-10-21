import AnimatedBox from "./AnimatedBox";

import styles from "./WhyUs.module.css";

const WhyUs = () => {
  return (
    <div className={`${styles.mainContainer}`}>
      <AnimatedBox>
        <div className={`heading text-center ${styles.heading}`}>Why Us</div>
      </AnimatedBox>
      <AnimatedBox>
        <div className={`text-center ${styles.description} mx-auto`}>
          <p>
            We provide our user with good quality content. Basically our goal is
            to keep everything simple and precise. We do not contain any Pop-up
            Ads that might hamper your experience with us.
            <br />
            <div className={`${styles.space}`}></div>
            The built and design is made in a way that would ensure maximum
            pleasant reading experience. The broad collection of articles
            ensures that there's something for everyone in the store.
          </p>
        </div>
      </AnimatedBox>
    </div>
  );
};

export default WhyUs;
