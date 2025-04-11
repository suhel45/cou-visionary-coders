import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

const BiodataVisit = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="flex flex-col items-center justify-center m-2 border-2 border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-center border-2 border-purple-700 p-10 rounded-xl bg-indigo-200 shadow-lg w-full md:w-2/3">
          <button className="px-8 py-3 md:text-2xl font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-900 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <Link to="/biodata">Visit Biodata</Link>
          </button>
        </div>

        {/* Dialog Button */}
        <button
          onClick={handleClickOpen}
          className="mt-4 px-6 py-2 text-lg font-semibold text-indigo-700 border-2 border-indigo-700 rounded-lg shadow-md hover:bg-indigo-700 hover:text-white transition"
        >
          কিভাবে বায়োডাটা খুজবেন ও দেখবেন (বিস্তারিত) ?
        </button>

        {/* MUI Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          className="flex flex-col gap-2 items-center"
        >
          <DialogTitle className="text-xl font-bold text-indigo-900 rounded-md p-2 m-4">
            Biodata Search and Visit Information
          </DialogTitle>
          <DialogContent>
            <ol className="list-disc list-inside space-y-2 text-gray-700">
              <li>"Visit Biodata" বাটনে ক্লিক করুন।</li>
              <li>আপনার পছন্দের বায়োডাটা খুঁজতে ফিল্টার অপশন ব্যবহার করুন।</li>
              <li>
                সম্পূর্ণ বায়োডাটা দেখতে হলে প্রোফাইল ভেরিফিকেশন বাধ্যতামূলক।
              </li>
              <li>একাউন্ট না থাকলে প্রথমে সাইন আপ করুন বা লগ ইন করুন।</li>
              <li>লগ ইন করার পর প্রোফাইল ভেরিফিকেশন সম্পন্ন করুন।</li>
              <li>
                শর্ত: শুধুমাত্র বিশ্ববিদ্যালয়ের শিক্ষার্থীরাই প্রোফাইল ভেরিফাই
                করতে পারবেন।
              </li>
              <li>
                সফলভাবে ভেরিফিকেশন সম্পন্ন হলে, আপনি বায়োডাটা দেখতে ও যোগাযোগ
                করতে পারবেন।
              </li>
            </ol>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="contained">
              Got it!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BiodataVisit;
