import AnimatedBox from "./AnimatedBox";

import styles from "./WhyUs.module.css";

const WhyUs = () => {
  return (
    <div className={`${styles.mainContainer}`}>
      <AnimatedBox>
        <div className={`heading text-center ${styles.heading}`}>About</div>
      </AnimatedBox>
      <AnimatedBox>
        <div className={`text-center ${styles.description} mx-auto`}>
          <p className={`mb-5`}>
            How many times were you pondering over the thought that you want to
            have a go with the ignited minds of our era. In todays era where
            people are more inclined towards using the online platforms to put
            out there ideas and discuss over it, our team is here to provide you
            with the best experience you can get.
            <br />
            <div className={`${styles.space}`}></div>
            The developers of 'Titan Read' wanted to bring out the best features
            and facility we could muster for our users. The built and design is
            made in a way that would ensure maximum pleasant reading experience.
            The broad collection of articles ensures that there's something for
            everyone in the store.
          </p>
        </div>
      </AnimatedBox>
    </div>
  );
};

export default WhyUs;
