import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./LandingPage.module.css";

const LandingPageArea = () => (
  <React.Fragment>
    <div classNameName={`${styles.mainback}`}>
      <div classNameName={`${styles.lp}`}>
        <div classNameName={`container ${styles.mainstyles}`}>
          <h1 classNameName={`heading`}>Understand about the topics</h1>
          <h3 classNameName={`heading`}>Dive into them</h3>
          <h1 classNameName={`heading`}>Learn with the world</h1>
          <br />
          <br />
          <Link href="/signup">
            <a>
              <button
                classNameName={`btn btn-outline-light mb-1 ${styles.button}`}
              >
                Get Started
              </button>
            </a>
          </Link>
          <br />
          <p>
            Already have an account?
            <Link href="/signin">
              <a>
                <span
                  classNameName={`btn mb-1 font-bold heading text-capitalize ${styles.link}`}
                  style={{ fontSize: "1.2rem" }}
                >
                  Sign in
                </span>
              </a>
            </Link>
          </p>
          <div>
            Just here to read.
            <Link href="/articles">
              <a>
                <span
                  classNameName={`btn mb-1 font-bold heading text-capitalize ${styles.link}`}
                  style={{ fontSize: "1.2rem" }}
                >
                  Articles
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div classNameName={`container pt-3`}>
        <div classNameName={`row`}>
          <div classNameName={`col-lg-7 col-md-9 col-sm-12 text-justify`}>
            <h2 classNameName={`heading ${styles.green}`}>Why Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse interdum sapien tortor, sit amet eleifend lorem
              sagittis non. Nullam est lectus, bibendum at finibus eu, tincidunt
              eu massa. Nam id lorem fringilla, semper elit in, convallis metus.
              Fusce dignissim pharetra urna, non tempor leo. Proin sagittis eget
              mi id tincidunt. Vivamus maximus lacus ac sapien aliquet, accumsan
              bibendum diam mollis. Praesent aliquet eros tincidunt, viverra
              metus ac, consequat erat. Praesent vel tempus libero. Curabitur in
              rhoncus dui. In hac habitasse platea dictumst. Sed nisi erat,
              posuere non mi nec, ultrices imperdiet neque. Nulla pellentesque
              accumsan condimentum. Nullam sed mattis sem. Phasellus pharetra,
              urna vel faucibus tempus, sapien ipsum elementum risus, vel
              volutpat est felis ornare nisi. Fusce vulputate dolor eget semper
              viverra. Maecenas finibus bibendum nibh.
            </p>
          </div>
        </div>
      </div>
      <div classNameName={`container pt-3`}>
        <div classNameName={`row`}>
          <div
            classNameName={`col-lg-7 offset-lg-5 col-md-9 offset-md-3 col-sm-12 offset-sm-0 text-justify`}
          >
            <p>
              <h2 classNameName={`heading ${styles.green}`}>
                What Our Members has to say
              </h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse interdum sapien tortor, sit amet eleifend lorem
              sagittis non. Nullam est lectus, bibendum at finibus eu, tincidunt
              eu massa. Nam id lorem fringilla, semper elit in, convallis metus.
              Fusce dignissim pharetra urna, non tempor leo. Proin sagittis eget
              mi id tincidunt. Vivamus maximus lacus ac sapien aliquet, accumsan
              bibendum diam mollis. Praesent aliquet eros tincidunt, viverra
              metus ac, consequat erat. Praesent vel tempus libero. Curabitur in
              rhoncus dui. In hac habitasse platea dictumst. Sed nisi erat,
              posuere non mi nec, ultrices imperdiet neque. Nulla pellentesque
              accumsan condimentum. Nullam sed mattis sem. Phasellus pharetra,
              urna vel faucibus tempus, sapien ipsum elementum risus, vel
              volutpat est felis ornare nisi. Fusce vulputate dolor eget semper
              viverra. Maecenas finibus bibendum nibh.
            </p>
          </div>
        </div>
      </div>
      <div classNameName={`container`}>
        <div classNameName={`text-center`}>
          <h1 classNameName={`heading ${styles.green}`}>
            Subscribe to get the most of us
          </h1>
          <p>
            Read unlimited articles. Write unlimited. Do unlimited. Be unlimited
          </p>
          <Link href="/membership">
            <a>
              <button classNameName={`btn btn-outline-success`}>
                Subscribe
              </button>
            </a>
          </Link>
        </div>
      </div>
      <div classNameName={`container text-center py-5`}>
        <h1 classNameName={`text-capitalize heading ${styles.green}`}>
          So what are you waiting for?
        </h1>
        <h3 classNameName={``}>Learn More with us</h3>
        <Link href="/signup">
          <a>
            <button classNameName={`btn btn-success mb-1`}>Get Started</button>
          </a>
        </Link>
      </div>
    </div>
  </React.Fragment>
);

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let t1 = gsap.timeline();
    t1.from(".imsrk", {
      opacity: 0,
      xPercent: -100,
      delay: 0.5,
      duration: 1,
      ease: "power1.out",
      yoyo: true,
    });
    t1.from(
      ".dot",
      {
        opacity: 0,
        yPercent: 100,
        delay: 0.5,
        repeatDelay: 1,
        duration: 1,
        ease: "power1.out",
      },
      0.01
    );

    t1.to(".dot", {
      x: 20,
      duration: 1,
      ease: "power1.out",
    });

    t1.to(".dot", {
      x: -10,
      duration: 0.5,
      ease: "power1.out",
    });

    t1.to(".imsrk", {
      opacity: 0,
      xPercent: -100,
      duration: 1,
      ease: "power1.out",
      yoyo: true,
    });

    t1.to(
      ".dot",
      {
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      },
      3
    );

    t1.to(
      ".cover",
      {
        xPercent: -100,
        duration: 1,
        ease: "power1.out",
      },
      3
    );

    t1.to(
      ".cover-2",
      {
        xPercent: -100,
        duration: 1,
        ease: "power1.out",
      },
      3.2
    );

    t1.to(
      ".cover-3",
      {
        xPercent: -100,
        duration: 1,
        ease: "power1.out",
      },
      3.4
    );

    t1.to(
      ".cover-4",
      {
        xPercent: -100,
        duration: 1,
        ease: "power1.out",
      },
      3.6
    );

    t1.from(
      ".imsrk2",
      {
        xPercent: -100,
        duration: 1,
        ease: "power1.out",
        opacity: 0,
      },
      3.8
    );

    t1.from(".cover-5", {
      yPercent: -100,
      duration: 1,
      ease: "power1.out",
      delay: 0.4,
    });

    t1.from(".logo", {
      xPercent: -100,
      opacity: 0,
      duration: 1,
      ease: "power1.out",
    });

    t1.from(
      ".item",
      {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        stagger: {
          amount: 0.5,
          from: "left",
        },
      },
      6
    );

    t1.from(
      ".header-img",
      {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      },
      6.2
    );

    t1.from(
      ".heading",
      {
        xPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
      },
      6.2
    );

    t1.from(
      ".sub-heading",
      {
        xPercent: 100,
        opacity: 0,
        duration: 1.1,
        ease: "power1.out",
      },
      6.2
    );

    t1.from(
      ".button",
      {
        yPercent: 100,
        opacity: 0,
        duration: 2,
        ease: "bounce",
      },
      6.5
    );
    setTimeout(() => {
      setScrolled(true);
    }, 6000);
    const body = document.querySelector("body");
    const img = document.querySelector(".header-img");

    // let z = document.querySelector(".cover-5")

    // z.addEventListener("mousemove", (e) => {
    //   var xPos = e.clientX / img.clientWidth - 0.5,
    //     yPos = e.clientY / img.clientHeight - 0.5;

    //   gsap.to(".header-img", 1, {
    //     rotationY: xPos * 20,
    //     rotationX: yPos * 20,
    //     ease: Power1.easeOut,
    //   });

    //   gsap.to(".heading", 1, {
    //     rotationY: xPos * 20,
    //     rotationX: yPos * 20,
    //     ease: Power1.easeOut,
    //   });

    //   gsap.to(".sub-heading", 1, {
    //     rotationY: xPos * 20,
    //     rotationX: yPos * 20,
    //     ease: Power1.easeOut,
    //   });

    //   gsap.to(".button", 1, {
    //     rotationY: xPos * 20,
    //     rotationX: yPos * 20,
    //     ease: Power1.easeOut,
    //   });
    // });
  }, []);
  return (
    <section className="mainContainer">
      <div className="bodyLp">
        <div className="cover-5">
          <header className="headerLP">
            <div className="logo">TR</div>

            <ul className="items">
              <li className="item">Actor</li>
              <li className="item">Producer</li>
              <li className="item">Contact</li>
            </ul>
          </header>

          <div className="container">
            <div className="left">
              <img
                className="header-img"
                src="https://images.unsplash.com/photo-1522211988038-6fcbb8c12c7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                alt=""
              />
            </div>

            <div className="right">
              <h1 className="heading">
                <span>TITAN </span>
                <br />
                READ
              </h1>
              <p className="sub-heading">
                <Link href={`/articles`}>
					<a>Get Started</a>
				</Link>
              </p>
            </div>
            <div className={` mt-5`} style={{ opacity: scrolled ? "1" : "0" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              rutrum urna et porttitor elementum. Nam ut finibus massa, eget
              commodo nisl. Aliquam erat volutpat. Donec urna neque, interdum
              aliquet tempus a, lacinia vitae orci. Proin metus ligula, placerat
              vitae augue condimentum, vestibulum pharetra ipsum. Suspendisse
              potenti. Morbi ac velit ut nisi ornare auctor at vel nisl. Aenean
              at ex in nulla faucibus blandit nec at ante. Nunc dignissim ante
              nec hendrerit vulputate. Etiam laoreet faucibus lorem pulvinar
              dignissim. Aliquam ultricies nulla at nisi condimentum,
              scelerisque sodales eros sodales. Curabitur auctor ultricies
              risus, vel viverra arcu vehicula at. Morbi accumsan ultrices lacus
              eget varius. Suspendisse arcu velit, efficitur in consequat id,
              gravida vitae nisl. Integer dui risus, aliquam nec massa vel,
              scelerisque lobortis velit. Sed eget rutrum neque, ut scelerisque
              metus. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Nunc elementum ipsum sit amet interdum euismod. Integer
              condimentum vel sapien quis consequat. Mauris nulla diam, commodo
              vitae odio non, elementum bibendum enim. Donec eu vulputate odio,
              sit amet vulputate justo. Vestibulum odio mauris, porta nec
              ullamcorper a, lacinia at dolor. Etiam suscipit massa neque. Sed
              egestas suscipit hendrerit. Nulla enim magna, tempus laoreet
              porttitor non, hendrerit ut ex. Integer rutrum augue nibh,
              accumsan sodales est tincidunt in. Donec condimentum orci id nibh
              pharetra imperdiet. Pellentesque libero sapien, imperdiet ut justo
              ut, placerat tempus quam. Proin ut leo quis diam mattis molestie.
              Aliquam volutpat magna felis, nec iaculis diam bibendum ac. Morbi
              cursus quis elit eu tincidunt. Nunc nec ex semper, porta mauris
              sit amet, vulputate sapien. Fusce sodales lacus dictum,
              pellentesque augue et, auctor massa. In sed feugiat magna.
              Pellentesque eleifend, justo pretium maximus aliquam, erat nisi
              laoreet libero, in aliquet dui tellus nec urna. Phasellus iaculis
              porttitor tortor. Pellentesque a laoreet dui, quis efficitur
              risus. Nullam lacus turpis, ornare sed nibh eget, congue placerat
              lacus. Morbi diam purus, molestie non porta sit amet, convallis
              sed lacus. Sed fermentum posuere imperdiet. Aenean porttitor, quam
              ut aliquet faucibus, ante felis suscipit nunc, in dignissim turpis
              ipsum eget ligula. Praesent eros eros, suscipit at ligula sit
              amet, luctus ultrices libero. Vivamus sed odio tempor purus
              facilisis sodales. Pellentesque porttitor, metus tristique porta
              sodales, eros risus dignissim enim, quis tincid
            </div>
          </div>
        </div>
        <div className="cover-4"></div>
        <div className="cover-3"></div>
        <div className="cover-2"></div>
        <div className="cover">
          <div className="cover-heading">
            <h1 className="imsrk">TR</h1>
            <span className="dot">.</span>
          </div>
        </div>

        <div className="imsrk2">Titan Read</div>
      </div>
    </section>
  );
};

export default LandingPage;
