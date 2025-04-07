import BiodataStatistics from '../../components/BiodataStatistics';
import BiodataVisit from '../../components/BiodataVisit';
import Hero from '../../components/Hero';
import Instructions from '../../components/Instructions';
import PrimaryProfile from '../../components/profileDetails/PrimaryProfile';

const pages = () => {
  return (
    <div>
      <Hero />
      <BiodataVisit />
      <BiodataStatistics />
      <Instructions />
      <PrimaryProfile username="shuvo"/>
    </div>
  );
};

export default pages;
