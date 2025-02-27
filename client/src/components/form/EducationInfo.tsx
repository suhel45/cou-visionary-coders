import { useState, useEffect, ChangeEvent } from "react";

interface EducationInfoProps {
  formData: {
    ssc: {
      passingYear: string;
      group: string;
      gpa: string;
    };
    hsc: {
      passingYear: string;
      group: string;
      gpa: string;
    };
    university: {
      faculty: string;
      department: string;
      session: string;
    };
  };
  setFormData: (formData: EducationFormData) => void;
}

interface EducationFormData {
  ssc: {
    passingYear: string;
    group: string;
    gpa: string;
  };
  hsc: {
    passingYear: string;
    group: string;
    gpa: string;
  };
  university: {
    faculty: string;
    department: string;
    session: string;
  };
}

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Business Administration",
  "Economics",
  "Physics",
  "Mathematics",
  "English",
  "Law",
];

function EducationInfo({ formData, setFormData }: Readonly<EducationInfoProps>) {
  const [localFormData, setLocalFormData] = useState<EducationFormData>({
    ssc: {
      passingYear: "",
      group: "",
      gpa: "",
    },
    hsc: {
      passingYear: "",
      group: "",
      gpa: "",
    },
    university: {
      faculty: "",
      department: "",
      session: "",
    },
  });

  useEffect(() => {
    setLocalFormData({
      ssc: formData.ssc || { passingYear: "", group: "", gpa: "" },
      hsc: formData.hsc || { passingYear: "", group: "", gpa: "" },
      university: formData.university || {
        faculty: "",
        department: "",
        session: "",
      },
    });
  }, [formData]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    section: "ssc" | "hsc" | "university",
    field:
      | keyof EducationFormData["ssc"]
      | keyof EducationFormData["hsc"]
      | keyof EducationFormData["university"]
  ) => {
    const { value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], [field]: value },
    }));

    // Ensure setFormData receives the updated data with the correct type
    setFormData({
      ...formData,
      [section]: { ...formData[section], [field]: value },
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center border border-gray-400 bg-purple-100 p-2 rounded-md md:m-4 shadow-lg">
        <h2 className="heading"> শিক্ষাগত তথ্য </h2>
        <form className="items-center justify-center w-full md:w-auto bg-white border-pink-600 p-2 md:px-28 my-4 rounded-md border shadow-lg hover:shadow-lg flex flex-col gap-2">
          <h2 className="subheading">এস এস সি</h2>
          <label className="label py-0">
            জিপিএ{/**/}
            <input
              type="number"
              step="0.01"
              min="1.00"
              max="5.00"
              value={localFormData.ssc.gpa}
              onChange={(e) => handleChange(e, "ssc", "gpa")}
              className="option-btn p-2"
              placeholder="যেমনঃ 3.21"
            />
          </label>

          <label className="label py-0">
            পাশের সন{/**/}
            <select
              value={localFormData.ssc.passingYear}
              onChange={(e) => handleChange(e, "ssc", "passingYear")}
              className="option-btn p-2"
            >
              <option value="">Select Year</option>
              {Array.from({ length: 21 }, (_, i) => 2005 + i).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="label py-0">
            গ্রুপ{/**/}
            <select
              value={localFormData.ssc.group}
              onChange={(e) => handleChange(e, "ssc", "group")}
              className="option-btn p-2"
            >
              <option value="">Select Group</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </label>

          <h2 className="subheading">এইচ এস সি</h2>
          <label className="label py-0">
            জিপিএ{/**/}
            <input
              type="number"
              step="0.01"
              min="1.00"
              max="5.00"
              value={localFormData.hsc.gpa}
              onChange={(e) => handleChange(e, "hsc", "gpa")}
              className="option-btn p-2"
              placeholder="যেমনঃ 3.21"
            />
          </label>

          <label className="label py-0">পাশের সন{/**/}
          <select
            value={localFormData.hsc.passingYear}
            onChange={(e) => handleChange(e, "hsc", "passingYear")}
            className="option-btn p-2"
          >
            <option value="">Select Year</option>
            {Array.from({ length: 21 }, (_, i) => 2005 + i).map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select></label>

          <label className="label py-0">
            গ্রুপ{/**/}
            <select
              value={localFormData.hsc.group}
              onChange={(e) => handleChange(e, "hsc", "group")}
              className="option-btn p-2"
            >
              <option value="">Select Group</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
            </select>
          </label>
          <hr className="my-4" />
          <h2 className="subheading">বিশ্ববিদ্যালয় (অনার্স)</h2>
          <label className="label py-0">
            অনুষদ{/**/}
            <select
              value={localFormData.university.faculty}
              onChange={(e) => handleChange(e, "university", "faculty")}
              className="option-btn p-2"
            >
              <option value="">Select Faculty</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
            </select>
          </label>

          <label className="label py-0">
            বিভাগ{/**/}
            <select
              value={localFormData.university.department}
              onChange={(e) => handleChange(e, "university", "department")}
              className="option-btn py-2"
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>

          <label className="label py-0">
            সেশন{/**/}
            <select
              value={localFormData.university.session}
              onChange={(e) => handleChange(e, "university", "session")}
              className="option-btn p-2 mb-4"
            >
              <option value="">Select Session</option>
              {Array.from({ length: 19 }, (_, i) => 2006 + i).map((year) => (
                <option key={year} value={`${year}-${year + 1}`}>
                  {`${year}-${year + 1}`}
                </option>
              ))}
            </select>
          </label>
          <hr />
          <span className="text-gray-900 bg-gray-100 p-2 rounded">
            For those who continue or complete their masters
          </span>
          <h2 className="subheading">বিশ্ববিদ্যালয় (মাস্টার্স)</h2>
          <label className="label py-0">
            অনুষদ{/**/}
            <select
              value={localFormData.university.faculty}
              onChange={(e) => handleChange(e, "university", "faculty")}
              className="option-btn p-2"
            >
              <option value="">Select Faculty</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
            </select>
          </label>

          <label className="label py-0">
            বিভাগ{/**/}
            <select
              value={localFormData.university.department}
              onChange={(e) => handleChange(e, "university", "department")}
              className="option-btn p-2"
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </label>

          <label className="label py-0">
            সেশন{/**/}
            <select
              value={localFormData.university.session}
              onChange={(e) => handleChange(e, "university", "session")}
              className="option-btn p-2 mb-4"
            >
              <option value="">Select Session</option>
              {Array.from({ length: 19 }, (_, i) => 2006 + i).map((year) => (
                <option key={year} value={`${year}-${year + 1}`}>
                  {`${year}-${year + 1}`}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
    </div>
  );
}

export default EducationInfo;
