import ReportForm from '../../components/report/ReportForm';
import SupportForm from '../../components/support/SupportForm';
import { Box, Stack } from '@mui/material';

const SupportAndReportPage = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
      >
        <Box flex={1}>
          <ReportForm />
        </Box>
        <Box flex={1}>
          <SupportForm />
        </Box>
      </Stack>
    </Box>
  );
};

export default SupportAndReportPage;
