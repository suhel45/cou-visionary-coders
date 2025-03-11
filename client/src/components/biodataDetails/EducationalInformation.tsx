const EducationInformation = () => {
  // Sample fake data
  const data = {
    ssc: { gpa: '5.00', year: '2018', group: 'বিজ্ঞান' },
    hsc: { gpa: '4.80', year: '2020', group: 'বিজ্ঞান' },
    honours: {
      degree: 'বিএসসি ইন কম্পিউটার সায়েন্স',
      department: 'কম্পিউটার সায়েন্স ও প্রকৌশল',
      session: '2021-2025',
    },
    masters: {
      degree: 'এমএসসি ইন কম্পিউটার সায়েন্স',
      department: 'কম্পিউটার সায়েন্স ও প্রকৌশল',
      session: '2026-2028',
    },
  };

  return (
    <div className="bg-[#ededed] p-4 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-purple-700 p-6">
        {/* Header */}
        <div className="bg-purple-700 text-white text-center py-4 rounded-2xl mb-6">
          <h1 className="text-2xl font-bold">শিক্ষাগত তথ্য</h1>
        </div>

        {/* ssc Education */}
        <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
          <h2 className="bg-purple-800 text-white text-center py-2 rounded-xl mb-4">
            মাধ্যমিক
          </h2>
          <p className="text-lg">
            <span className="font-bold">জিপিএ - </span>
            {data.ssc.gpa}
          </p>
          <p className="text-lg">
            <span className="font-bold">পাশের সন - </span>
            {data.ssc.year}
          </p>
          <p className="text-lg">
            <span className="font-bold">বিভাগ - </span>
            {data.ssc.group}
          </p>
        </div>

        {/* Higher Secondary Education */}
        <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
          <h2 className="bg-purple-800 text-white text-center py-2 rounded-xl mb-4">
            উচ্চ মাধ্যমিক
          </h2>
          <p className="text-lg">
            <span className="font-bold">জিপিএ - </span>
            {data.hsc.gpa}
          </p>
          <p className="text-lg">
            <span className="font-bold">পাশের সন - </span>
            {data.hsc.year}
          </p>
          <p className="text-lg">
            <span className="font-bold">বিভাগ - </span>
            {data.hsc.group}
          </p>
        </div>

        {/* Bachelor's Education */}
        <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
          <h2 className="bg-purple-800 text-white text-center py-2 rounded-xl mb-4">
            বিশ্ববিদ্যালয় (অনার্স)
          </h2>
          <p className="text-lg">
            <span className="font-bold">অনুমোদ - </span>
            {data.honours.degree}
          </p>
          <p className="text-lg">
            <span className="font-bold">বিভাগ - </span>
            {data.honours.department}
          </p>
          <p className="text-lg">
            <span className="font-bold">সেশন - </span>
            {data.honours.session}
          </p>
        </div>

        {/* Master's Education */}
        <div className="border-2 border-purple-700 rounded-2xl p-4">
          <h2 className="bg-purple-800 text-white text-center py-2 rounded-xl mb-4">
            বিশ্ববিদ্যালয় (মাস্টার্স)
          </h2>
          <p className="text-lg">
            <span className="font-bold">অনুমোদ - </span>
            {data.masters.degree}
          </p>
          <p className="text-lg">
            <span className="font-bold">বিভাগ - </span>
            {data.masters.department}
          </p>
          <p className="text-lg">
            <span className="font-bold">সেশন - </span>
            {data.masters.session}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationInformation;
