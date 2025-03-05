import { useState, useEffect } from 'react';
import { FamilyInfoData } from '../../interfaces/Biodata.interface';
import GuardianInfoForm from './GuardianInfoForm';
import SiblingInfoForm from './SiblingInfoForm';

interface FamilyInfoProps {
  formData: FamilyInfoData;
  setFormData: (data: FamilyInfoData) => void;
}

const FamilyInfo: React.FC<FamilyInfoProps> = ({ formData, setFormData }) => {
  const [localFamilyInfo, setLocalFamilyInfo] =
    useState<FamilyInfoData>(formData);

  useEffect(() => {
    setLocalFamilyInfo(formData);
  }, [formData]);

  const handleGuardianChange = (
    guardianType: 'father' | 'mother',
    updatedGuardian: any,
  ) => {
    setLocalFamilyInfo((prev) => ({
      ...prev,
      [guardianType]: updatedGuardian,
    }));
    setFormData({ ...localFamilyInfo, [guardianType]: updatedGuardian });
  };

  const handleSiblingChange = (updatedSiblings: FamilyInfoData['siblings']) => {
    setLocalFamilyInfo((prev) => ({
      ...prev,
      siblings: updatedSiblings,
    }));
    setFormData({ ...localFamilyInfo, siblings: updatedSiblings });
  };

  const handleFinancialStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = e.target;
    setLocalFamilyInfo((prev) => ({ ...prev, financialStatus: value }));
    setFormData({ ...localFamilyInfo, financialStatus: value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:items-center sm:justify-center items-stretch border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading">পারিবারিক তথ্য</h2>

        <form className="w-full items-stretch justify-stretch md:w-auto bg-white border-pink-600 p-4 md:px-16 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-4">
          {/* Father's Information */}
          <GuardianInfoForm
            label="পিতা"
            guardian={localFamilyInfo.father}
            onChange={(updatedFather) =>
              handleGuardianChange('father', updatedFather)
            }
          />

          {/* Mother's Information */}
          <GuardianInfoForm
            label="মাতা"
            guardian={localFamilyInfo.mother}
            onChange={(updatedMother) =>
              handleGuardianChange('mother', updatedMother)
            }
          />

          {/* Siblings Information */}
          <SiblingInfoForm
            siblings={localFamilyInfo.siblings}
            onChange={handleSiblingChange}
          />

          {/* Financial Status */}
          <label className="label flex flex-col sm:justify-center sm:items-center justify-stretch items-stretch">
            পারিবারিক আর্থিক অবস্থা{/* Financial Status */}
            <select
              name="financialStatus"
              value={localFamilyInfo.financialStatus}
              onChange={handleFinancialStatusChange}
              className="option-btn"
            >
              <option>নির্বাচন করুন</option>
              <option value="Lower Class">নিম্নবিত্ত</option>
              <option value="Middle Class">মধ্যবিত্ত</option>
              <option value="Upper Middle Class">উচ্চ মধ্যবিত্ত</option>
              <option value="Upper Class">উচ্চবিত্ত</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  );
};

export default FamilyInfo;
