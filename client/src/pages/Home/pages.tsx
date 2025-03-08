import BiodataStatistics from '../../components/BiodataStatistics';
import { Faq } from '../../components/Faq';
import Hero from '../../components/Hero';
import Instructions from '../../components/Instructions';

const pages = () => {
  return (
    <div>
      <Hero />
      <BiodataStatistics />
      <Instructions />
      <Faq/>
    </div>
  );
};

export default pages;
