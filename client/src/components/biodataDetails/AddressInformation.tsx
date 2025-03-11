
const AddressInformation = () => {
    const data = {
        permanentAddress: {
            "village": "village",
            "district": "district",
            "subdistrict": "subdistrict",
        },
        presentAddress: {
            "village": "village",
            "district": "district",
            "subdistrict": "subdistrict",
        },
      };

      return (
        <div className="bg-[#ededed] p-4 min-h-screen">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-purple-700 p-6">
            {/* Header */}
            <div className="bg-purple-700 text-white text-center py-4 rounded-2xl mb-6">
              <h1 className="text-2xl font-bold">ঠিকানা তথ্য</h1>
            </div>

            {/* Bachelor's Education */}
            <div className="border-2 border-purple-700 rounded-2xl p-4 mb-6">
              <h2 className="bg-purple-800 text-white text-center py-2 rounded-xl mb-4">
                স্থায়ী ঠিকানা
              </h2>
              <p className="text-lg">
                <span className="font-bold">গ্রাম - </span>
                {data.permanentAddress.village}
              </p>
              <p className="text-lg">
                <span className="font-bold">জেলা - </span>
                {data.permanentAddress.district}
              </p>
              <p className="text-lg">
                <span className="font-bold">উপজেলা - </span>
                {data.permanentAddress.subdistrict}
              </p>
            </div>
            {/* Master's Education */}
            <div className="border-2 border-purple-700 rounded-2xl p-4">
              <h2 className="bg-purple-800 text-white text-center py-2 rounded-xl mb-4">
                বর্তমান ঠিকানা
              </h2>
              <p className="text-lg">
                <span className="font-bold">গ্রাম- </span>
                {data.presentAddress.village}
              </p>
              <p className="text-lg">
                <span className="font-bold">জেলা - </span>
                {data.presentAddress.district}
              </p>
              <p className="text-lg">
                <span className="font-bold">উপজেলা - </span>
                {data.presentAddress.subdistrict}
              </p>
            </div>
          </div>
        </div>
      );
      };

export default AddressInformation