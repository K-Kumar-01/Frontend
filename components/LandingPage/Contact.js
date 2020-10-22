import styles from "./Contact.module.css";
import AnimatedBox from "./AnimatedBox";

const Contact = () => {
  const MEMBERS = [
    {
      name: "Kushal Kumar",
      role: "Full stack",
      image_url: "",
      contact_email: "kushalkumar012000@gmail.com",
    },
    {
      name: "Atul Tyagi",
      role: "Backend and Design",
      image_url:
        "https://res.cloudinary.com/dr6pkartq/image/upload/v1602872162/IMG_20201014_123547_ooixvf.jpg",
      contact_email: "atul.tyagi.mat19@iitbhu.ac.in",
    },
    {
      name: "Lakshya Rathore",
      role: "Chatbot and Backend",
      image_url:
        "https://res.cloudinary.com/dr6pkartq/image/upload/v1602871860/nikhil_ssdtgr.jpg",
      contact_email: "nikhilrathore068@gmail.com",
    },
    {
      name: "Adarsh Mishra",
      role: "Design and Tester",
      image_url:
        "https://res.cloudinary.com/dr6pkartq/image/upload/v1603364040/WhatsApp_Image_2020-10-17_at_12.23.39_AM_d0q611.jpg",
      contact_email: "",
    },
  ];

  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`container`}>
        <AnimatedBox>
          <h1 className={`heading text-center ${styles.heading} mb-5`}>
            Contact
          </h1>
        </AnimatedBox>
        <div className={`row my-4`}></div>
      </div>
    </div>
  );
};

export default Contact;
