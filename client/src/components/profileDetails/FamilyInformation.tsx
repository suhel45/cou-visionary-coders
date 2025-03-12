const FamilyInformation = () => {
  // Sample fake data
  const data = {
    fatherStatus: 'জীবিত',
    fatherOccupation: 'শিক্ষক',
    motherStatus: 'জীবিত',
    motherOccupation: 'গৃহিণী',
    brotherInfo: '২ জন ভাই, দুজনই চাকরি করেন',
    sisterInfo: '১ জন বোন, বিবাহিতা',
    siblingRelationship: 'খুব ভালো',
    financialStatus: 'মধ্যবিত্ত',
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-3xl mx-auto bg-purple-100 rounded-3xl shadow-lg border-4 border-purple-900 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-purple-800 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">পারিবারিক তথ্য</h1>
        </div>

        {/* Father Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            পিতা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অবস্থা - </span>
            {data.fatherStatus}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পেশা - </span>
            {data.fatherOccupation}
          </p>
        </div>

        {/* Mother Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            মাতা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অবস্থা - </span>
            {data.motherStatus}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">পেশা - </span>
            {data.motherOccupation}
          </p>
        </div>

        {/* Sibling Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            ভাই-বোনের তথ্য
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">ভাইয়ের সংখ্যা - </span>
            {data.brotherInfo}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">বোনের সংখ্যা - </span>
            {data.sisterInfo}
          </p>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">সম্পর্ক - </span>
            {data.siblingRelationship}
          </p>
        </div>

        {/* Economic Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-2 md:p-4 mb-6 bg-white text-gray-800">
          <h2 className="bg-indigo-900 text-white text-center p-2 rounded-xl mb-4">
            পারিবারিক আর্থিক অবস্থা
          </h2>
          <p className="text-sm md:text-lg p-2 text-center">
            <span className="font-bold">অবস্থা - </span>
            {data.financialStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyInformation;
