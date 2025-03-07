import HeroImage from '../assets/hero.svg';

const Hero = () => {
  return (
    <div className="hero-section text-center">
      <img src={HeroImage} alt="Hero" className="w-full h-auto mx-auto " />
    </div>
  );
};

export default Hero;
