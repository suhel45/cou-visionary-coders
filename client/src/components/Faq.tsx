import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    id: '1',
    question:
      'React is a JavaScript library for building user interfaces, maintained by Facebook.',
    answer:
      'React is a JavaScript library for building user interfaces, maintained by Facebook.',
  },
  {
    id: '2',
    question: 'Ques 2',
    answer:
      "Material-UI is a popular React UI framework that implements Google's Material Design.",
  },
  {
    id: '3',
    question: 'Ques 3',
    answer:
      'You can use the Accordion component from @mui/material, with AccordionSummary and AccordionDetails to create expandable sections.',
  },
];

const FAQ = () => {
  return (
    <div className="flex flex-col items-center m-5 p-4 gap-4 border border-gray-100 rounded-md shadow-md">
      <Typography
        sx={{
          fontSize: { xs: '1rem', sm: '1.5rem' },
          p: 1,
        }}
        gutterBottom
        className="text-center  rounded-full p-2 mx-4 my-2 sm:m-2 font-extrabold bg-indigo-900 text-white sm:w-1/2 sm:mx-auto"
      >
        Frequently Asked Questions
      </Typography>
      {faqData.map((item) => (
        <Accordion
          key={item.id}
          className="md:w-2/3 items-stretch rounded-md  border border-indigo-200"
        >
          <AccordionSummary
            expandIcon={
              <ChevronDown className="bg-indigo-800 font-bold rounded-full text-white" />
            }
          >
            <Typography
              sx={{
                color: '#043667',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1rem' },
                p: 1,
                textAlign: 'justify',
              }}
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                color: '#495057',
                fontSize: { xs: '1rem', sm: '1rem' },
                textAlign: 'justify',
                bgcolor: '#f8f9fa',
                p: 1,
              }}
            >
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
