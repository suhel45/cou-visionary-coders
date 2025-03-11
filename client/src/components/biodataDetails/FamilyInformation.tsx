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
    <div className="bg-[#ededed] p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-purple-700 p-6">
        {/* Header */}
        <div className="bg-purple-700 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">পারিবারিক তথ্য</h1>
        </div>

        {/* Father Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold">পিতা - </span>
              {data.fatherStatus}
            </p>
            <p className="text-lg">
              <span className="font-bold">পেশা - </span>
              {data.fatherOccupation}
            </p>
          </div>
        </div>

        {/* Mother Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold">মাতা - </span>
              {data.motherStatus}
            </p>
            <p className="text-lg">
              <span className="font-bold">পেশা - </span>
              {data.motherOccupation}
            </p>
          </div>
        </div>

        {/* Sibling Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold">ভাইয়ের তথ্য - </span>
              {data.brotherInfo}
            </p>
            <p className="text-lg">
              <span className="font-bold">বোনের তথ্য - </span>
              {data.sisterInfo}
            </p>
            <p className="text-lg">
              <span className="font-bold">ভাই-বোন সম্পর্ক - </span>
              {data.siblingRelationship}
            </p>
          </div>
        </div>

        {/* Economic Information */}
        <div className="border-2 border-purple-700 rounded-2xl p-4">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-bold">পারিবারিক আর্থিক অবস্থা - </span>
              {data.financialStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyInformation;
