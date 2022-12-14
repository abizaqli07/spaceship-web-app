import { type NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useState } from "react";
import AboutSvg from "../components/landingPage/AboutSvg";
import AboutSvgTwo from "../components/landingPage/AboutSvgTwo";
import Services from "../components/landingPage/Services";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import Footer from "../components/landingPage/Footer";
import NewsSwiper from "../components/landingPage/NewsSwiper";


const Home: NextPage = () => {

  const [navOpen, setNavOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Apollo Star</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav id="header" className="fixed w-full z-30 top-0 text-white">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 lg:gap-12">
          <div className="pl-4 flex items-center">
            <a className=" text-white no-underline hover:no-underline font-bold text-lg lg:text-xl" href="#">
              ApolloStar
            </a>
          </div>
          <div className="block lg:hidden pr-4">
            <button
              className="flex items-center p-1 text-primaryLight hover:text-primary focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              onClick={() => setNavOpen((prev) => { return !prev })}
            >
              <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className={`${navOpen ? "" : "hidden"} w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 lg:bg-transparent bg-gradient-to-br from-primary to-primaryHover rounded-xl lg:rounded-full p-4 lg:p-0 z-20`}>
            <ul className="list-reset lg:flex justify-end flex-1 items-center">
              <li className="mr-3">
                <a className="inline-block text-white no-underline hover:text-primaryLight hover:text-underline py-2 px-4" href="#">Home</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-white no-underline hover:text-primaryLight hover:text-underline py-2 px-4" href="#">About Us</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-white no-underline hover:text-primaryLight hover:text-underline py-2 px-4" href="#">Services</a>
              </li>
              <li className="mr-3">
                <a className="inline-block text-white no-underline hover:text-primaryLight hover:text-underline py-2 px-4" href="#">News</a>
              </li>
            </ul>
            <AuthUi />
          </div>
        </div>
      </nav>

      {/* <!--Hero--> */}
      <div className="pt-24 md:pt-28 lg:pt-36 min-h-screen gradient">
        <div className="container text-white px-3 mx-auto flex flex-wrap flex-col justify-center lg:flex-row items-center gap-y-16">
          {/* <!--Left Col--> */}
          <div className="flex flex-col w-full lg:w-2/5 justify-center items-start text-center lg:text-left">
            <p className="uppercase tracking-loose w-full">Confused to choose a rocket?</p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Get Your Favorite Rocket Here!
            </h1>
            <a className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out" href="#section1"><button>
              Read More</button></a>
          </div>
          {/* <!--Right Col--> */}
          <div className="w-full md:w-3/5 lg:w-[50%] py-6 text-center">
            <img className="w-full md:w-4/6 lg:w-4/7 z-50 mx-auto lg:ml-auto lg:mr-0" src="/header.png" />
          </div>
        </div>
      </div>

      <div className="relative -mt-20 md:-mt-36 lg:-mt-64">
        <svg viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">
              <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
            </g>
            <g transform="translate(-4.000000, 76.000000)" fill="#110016" fill-rule="nonzero">
              <path
                d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>

      <section className="section" id="section1">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center">
            Apolo-Star
          </h2>

          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient__light w-64 opacity-90 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-wrap mt-16 items-center">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-2xl font-bold leading-none mb-3">
                The best rocket company
              </h3>
              <p className=" mb-8">
                Apolo star can bring you everywhere you want in this planet or other planet in this universe so dont worry about your trip              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <AboutSvg />
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row items-center">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <AboutSvgTwo />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-2xl font-bold leading-none mb-3">
                  Make it imposible to posible
                </h3>
                <p className=" mb-8">
                  Apolo star can take you in every places that are impossible to visit , so go anywhere is not limited by place and time
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="section">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center ">
            Our Services
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient__light w-64 opacity-90 my-0 py-0 rounded-t"></div>
          </div>
          <div className="w-full mx-auto">
            <Services />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-2 pt-4 pb-12 ">
          <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center ">
            Blog
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient__light w-64 opacity-70 my-0 py-0 rounded-t"></div>
          </div>

          <div className='mt-24'>
            <NewsSwiper/>
          </div>

        </div>
      </section>

      <section className="section">
        <div className="container mx-auto text-center py-6 mb-12">
          <h2 className="w-full my-2 text-3xl font-bold leading-tight text-center text-white">
            Call to Action
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient__light w-1/3 opacity-70 my-0 py-0 rounded-t"></div>
          </div>
          <h3 className="my-4 text-xl leading-tight">
            Main Hero Message to sell yourself!
          </h3>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Contact Us!
          </button>
        </div>

        <div className="w-full h-full translate-y-[70px] sm:translate-y-24 md:translate-y-28 lg:translate-y-36 xl:translate-y-44 2xl:translate-y-48">
          <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
                <g className="wave" fill="#110016">
                  <path
                    d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
                  ></path>
                </g>
                <g transform="translate(1.000000, 15.000000)" fill="#110016">
                  <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                    <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                    <path
                      d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                      opacity="0.100000001"
                    ></path>
                    <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>

      </section>

      {/* <!-- Change the colour #f8fafc to match the previous section colour --> */}


      {/* <!--Footer--> */}
      <footer className="section gradient pt-36">
        <div className="container mx-auto px-8">
          <Footer />
        </div>
      </footer>
    </>
  );
};

export default Home;

const AuthUi: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter()

  if (!sessionData) {
    return (
      <button
        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        onClick={() => { router.push("/signin") }}
      >Sign In</button>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
        onClick={() => signOut()}
      >Sign Out</button>
      <div
        className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
        onClick={() => router.push("/redirect")}
      >Go to Dashboard</div>
    </div>
  );
};

