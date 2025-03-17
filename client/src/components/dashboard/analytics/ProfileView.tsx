import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Eye } from "lucide-react";

const ProfileView = () => {
  const [lastMonthViews, setLastMonthViews] = useState<number>(0);
  const [lastWeekViews, setLastWeekViews] = useState<number>(0);

  useEffect(() => {
    // Simulated data (Replace with API call if needed)
    setLastMonthViews(1250);
    setLastWeekViews(320);
  }, []);

  return (
    <Box className="flex flex-col items-center rounded-md m-2 border-2 border-purple-900 p-6">
      <Typography variant="h4" sx={{ px: { xs: 2, sm: 4 }, py: 2, fontWeight: "bold", textAlign: "center", fontSize: { xs: "1rem", sm: "1.5rem" } }} className="text-white bg-indigo-900 py-2 px-4 rounded-full mb-6 font-bold">
        Profile View Statistics
      </Typography>
      <Box className="flex flex-col md:flex-row p-4 items-center gap-4">
        <Card className="bg-white shadow-lg p-2 sm:p-6 rounded-2xl flex flex-col items-center text-center">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4C566A", p: 2 }} className="text-gray-800 font-semibold">
              Total Views <Eye className="inline text-blue-900 w-6 h-6 mb-1" />
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#043667", p: 2 }} className="text-blue-900 font-bold bg-gray-100 rounded p-2">
              {lastMonthViews} 
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#868e96", p: 2 }} className="text-blue-900 font-bold  rounded p-2">
              Last One Month
            </Typography>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg p-2 sm:p-6 rounded-2xl flex flex-col items-center text-center">
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4C566A", p: 2 }} className="text-gray-800 font-semibold">
              Total Views <Eye className="inline text-blue-900 w-6 h-6 mb-1" />
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#043667", p: 2 }} className="text-blue-900 font-bold bg-gray-100 rounded p-2">
              {lastWeekViews} 
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#868e96", p: 2 }} className="text-blue-900 font-bold  rounded p-2">
              Last One Week
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProfileView;