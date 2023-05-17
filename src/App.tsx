import {SelectDoctorForm} from "./components";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Box} from "@mui/material";


const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <SelectDoctorForm/>
                </Box>
            </LocalizationProvider>
        </QueryClientProvider>
    )
}

export default App
