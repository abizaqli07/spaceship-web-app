


const TextAnimate = {
  offscreen: {
    y: -200,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1
    }
  }
}

const Footer = () => {
  return (
    <div className=' w-full'>

      <div className=' flex flex-col items-center text-center sm:text-left sm:flex-row flex-wrap gap-x-6 gap-y-16 sm:justify-around sm:items-start'>
        <div className=' flex gap-4'>
          {/* <div><Image alt='' src={Logo.src} height={35} width={35} /></div> */}
          <div>
            <div className=' footer__title'>Mi Sides</div>
            <div className=' footer__text max-w-[300px]'>Clean lines, silent expressiveness, modern sophistication. <br /> Simplicity is everything.</div>
          </div>
        </div>

        <div className=' footer__wrap'>
          <div className=' footer__title'>Developers</div>
          <div className=' footer__link'>About Developer</div>
          <div className=' footer__link'>About Website</div>
        </div>
        <div className=' footer__wrap'>
          <div className=' footer__title'>Help</div>
          <div className=' footer__link'>Customer Support</div>
          <div className=' footer__link'>Contact</div>
        </div>
        <div className=' footer__wrap'>
          <div className=' footer__title'>Social</div>
          <div className=' footer__link'>Github</div>
          <div className=' footer__link'>Linkedin</div>
          <div className=' footer__link'>Twitter</div>
        </div>
        <div className=' footer__wrap'>
          <div className=' footer__title'>Legal</div>
          <div className=' footer__link'>Terms of Use</div>
          <div className=' footer__link'>Privacy Policy</div>
          <div className=' footer__link'>Legal Notice</div>
        </div>

      </div>
      <div className=' mt-12 text-center text-shade '>
        <div>&#169; ApolloStar. All right reserved</div>
      </div>
    </div>
  )
}

export default Footer