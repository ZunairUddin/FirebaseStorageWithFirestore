import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { Box, Button, Typography } from "@mui/material";
import { DATABASE } from "../../config/firebase/FirebaseConfig";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProductCard from "../../components/ProductCard/ProductCard";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    setIsLoading(true);
    //GETTING DATA
    const docRef = collection(DATABASE, "products");
    const unsub = onSnapshot(docRef, (users) => {
      const arr = [];
      users.docs.forEach((e) => {
        arr.push({ ...e.data(), id: e.id });
      });

      setData(arr);
      setIsLoading(false);
    });
    return unsub;
  };

  useEffect(() => {
    document.title = "Home";

    let get;
    async function fetch() {
      get = await getData();
    }
    fetch();

    return () => {
      get();
    };
  }, []);
  return (
    <Box maxWidth={"100%"}>
      <Box textAlign={"end"}>
        <Button
          onClick={() => navigate("AddProduct")}
          endIcon={<AddCircleIcon />}
          sx={{
            backgroundImage: `linear-gradient( 92.88deg,
                #455eb5 9.16%,
                #5643cc 43.89%,
                #673fd7 64.72%);`,
            color: "white",
            px: 2,
          }}
        >
          Add Product
        </Button>
      </Box>
      <Box
        my={5}
        pb={2}
        textAlign={"center"}
        borderBottom={"3px solid #455eb5"}
      >
        <Typography fontSize={"2rem"}>PRODUCTS</Typography>
      </Box>
      {isLoading ? (
        <Box textAlign={"center"}>
          <CircularProgress size={60} />
        </Box>
      ) : data && data.length > 0 ? (
        <Container fixed>
          <Grid container spacing={2}>
            {data.map((e, i) => (
              <Grid key={i} item xs={12} md={4} sm={6}>
                <ProductCard dataSource={e} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Typography fontSize={"1.5rem"} align="center">
          NO PRODUCTS FOUND
        </Typography>
      )}
    </Box>
  );
}

export default Home;
