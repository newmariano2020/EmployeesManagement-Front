import Header from "./header";
import Footer from "./footer";
import { Box } from "@mui/material";
import Body from "./body";
import { UserIdProvider } from "./user-provider-id";

function Home() {
  return (
    <UserIdProvider>
      <Box className="App">
        <Header />
        <Body />
        <Footer />
      </Box>
    </UserIdProvider>
  );
}

export default Home;
