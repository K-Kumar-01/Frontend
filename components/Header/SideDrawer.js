import Link from "next/link";
import { IconContext } from "react-icons";
import {
  FcAndroidOs,
  FcHome,
  FcIdea,
  FcSportsMode,
  FcBullish,
  FcFilmReel,
  FcCommandLine,
  FcButtingIn,
  FcGraduationCap,
  FcSpeaker,
  FcGoogle,
  FcBriefcase,
  FcCurrencyExchange,
  FcComboChart,
  FcAddDatabase,
  FcFlowChart,
  FcSteam,
  FcGallery,
} from "react-icons/fc";
import { GiPopcorn } from "react-icons/gi";
import {
  FaHamburger,
  FaPray,
  FaTree,
  FaVenusMars,
  FaPlane,
  FaSpaceShuttle,
  FaHospital,
} from "react-icons/fa";

const SideDrawer = () => {
  return (
    <ul>
      <Link href="/articles">
        <a title="Home">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcHome />
            </IconContext.Provider>
          </i>
          <span className={`navbar-brand`}>Titan Read</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/technology`}>
        <a title="Technology">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcAndroidOs />
            </IconContext.Provider>
          </i>
          <span>Technology</span>
        </a>
      </Link>

      <Link href="/category/[id]" as={`/category/science`}>
        <a title="Science">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcIdea />
            </IconContext.Provider>
          </i>
          <span>Science</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/sports`}>
        <a title="Sports">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcSportsMode />
            </IconContext.Provider>
          </i>
          <span>Sports</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/caetgory/business`}>
        <a title="Business">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcBullish />
            </IconContext.Provider>
          </i>
          <span>Business</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/media`}>
        <a title="Media">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcFilmReel />
            </IconContext.Provider>
          </i>
          <span>Media</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/programming`}>
        <a title="Programming">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcCommandLine />
            </IconContext.Provider>
          </i>
          <span>Programming</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/gaming`}>
        <a title="Gaming">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcSteam />
            </IconContext.Provider>
          </i>
          <span>Gaming</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/caetgory/psychology`}>
        <a title="Psychology">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcButtingIn />
            </IconContext.Provider>
          </i>
          <span>Psychology</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/education`}>
        <a title="Education">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcGraduationCap />
            </IconContext.Provider>
          </i>
          <span>Education</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/politics`}>
        <a title="Politics">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcSpeaker />
            </IconContext.Provider>
          </i>
          <span>Politics</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/world`}>
        <a title="World">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcGoogle />
            </IconContext.Provider>
          </i>
          <span>World</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/startups`}>
        <a title="Startups">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcBriefcase />
            </IconContext.Provider>
          </i>
          <span>Startups</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/history`}>
        <a title="History">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcFlowChart />
            </IconContext.Provider>
          </i>
          <span>History</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/fashion`}>
        <a title="Fashion">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcGallery />
            </IconContext.Provider>
          </i>
          <span>Fashion</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/cryptocurrency`}>
        <a title="Cryptocurrency">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcCurrencyExchange />
            </IconContext.Provider>
          </i>
          <span>Cryptocurrency</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/marketing`}>
        <a title="Marketing">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcComboChart />
            </IconContext.Provider>
          </i>
          <span>Marketing</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/entertainment`}>
        <a title="Entertainment">
          <i>
            <IconContext.Provider value={{ size: "2rem", color: "bisque" }}>
              <GiPopcorn />
            </IconContext.Provider>
          </i>
          <span>Entertainment</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/health`}>
        <a title="Health">
          <i>
            <IconContext.Provider value={{ size: "2rem", color: "#F7C6C5" }}>
              <FaHospital />
            </IconContext.Provider>
          </i>
          <span>Health</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={"/category/travel"}>
        <a title="Travel">
          <i>
            <IconContext.Provider value={{ size: "2rem", color: "lightgray" }}>
              <FaPlane />
            </IconContext.Provider>
          </i>
          <span>Travel</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/food`}>
        <a title="Food">
          <i>
            <IconContext.Provider
              value={{ size: "2rem", color: "rgb(223, 181, 142)" }}
            >
              <FaHamburger />
            </IconContext.Provider>
          </i>
          <span>Food</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/sexuality`}>
        <a title="Sexuality">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FaVenusMars />
            </IconContext.Provider>
          </i>
          <span>Sexuality</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/nature`}>
        <a title="Nature">
          <i>
            <IconContext.Provider
              value={{ size: "2rem", color: "rgb(18, 159, 75)" }}
            >
              <FaTree />
            </IconContext.Provider>
          </i>
          <span>Nature</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/spirituality`}>
        <a title="Spirituality">
          <i>
            <IconContext.Provider
              value={{ size: "2rem", color: "floralwhite" }}
            >
              <FaPray />
            </IconContext.Provider>
          </i>
          <span>Spirituality</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/space`}>
        <a title="Space">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FaSpaceShuttle />
            </IconContext.Provider>
          </i>
          <span>Space</span>
        </a>
      </Link>
      <Link href="/category/[id]" as={`/category/others`}>
        <a title="Others">
          <i>
            <IconContext.Provider value={{ size: "2rem" }}>
              <FcAddDatabase />
            </IconContext.Provider>
          </i>
          <span>Others</span>
        </a>
      </Link>
    </ul>
  );
};

export default SideDrawer;
