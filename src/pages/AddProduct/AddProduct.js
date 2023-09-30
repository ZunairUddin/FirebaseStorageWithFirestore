import "./AddProduct.css";
import React, { useEffect, useState } from "react";
import { STORAGE, DATABASE } from "../../config/firebase/FirebaseConfig";
import { doc, collection, setDoc, serverTimestamp } from "@firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";
import LoadingButton from "@mui/lab/LoadingButton";
import FileUpload from "../../components/FileUploadInput/FileUpload";
import { Alert } from "../../components/Alert/Alert";
import { Box, Button, Snackbar } from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [toast, setToast] = useState(null);
  const [imgData, setImgData] = useState("");
  const [localImg, setlocalImg] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    desc: "",
    price: "",
    value: "",
  });
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  //INPUTS DATA
  const INPUTS_DATA = [
    {
      name: "userName",
      className: "inp",
      placeholder: "Enter Your Name...",
      value: productData.userName,
    },
    {
      name: "title",
      className: "inp",
      placeholder: "Enter Product Title...",
      value: productData.title,
    },
    {
      name: "desc",
      className: "inp",
      placeholder: "Enter Product Description...",
      value: productData.desc,
    },
    {
      name: "price",
      className: "inp",
      placeholder: "Enter Product Price...",
      value: productData.price,
    },
  ];

  //FUNCTIONS
  const sendData = async () => {
    //SENDING DATA TO DATABASE
    const obj = {
      ...productData,
    };

    if (!obj.userName || !obj.title || !obj.desc || !obj.price || !imgData) {
      setToast({
        result: "error",
        message: "All Fields are required",
        open: true,
      });
      return;
    }
    delete obj.value;
    setIsloading(true);
    try {
      const docRef = doc(collection(DATABASE, "products"));
      //IMAGE UPLOADING PROCESS
      const refer = ref(STORAGE, `images/${docRef.id}.jpg`); //REF FOR STORAGE
      const imgUpload = await uploadBytes(refer, imgData); // UPLOADING IMAGE
      const imgURL = await getDownloadURL(imgUpload.ref); //GETTING URL OF THAT IMAGE
      obj.productImg = imgURL; //ADDING IT TO THE LOCAL OBJECT
      obj.createdOn = serverTimestamp(); //ADDING CREATED ON TIME TO THE OBJECT

      //SENDING LOCAL OBJECT TO DATABASE
      await setDoc(docRef, obj);
      setToast({
        result: "success",
        message: "Added Product Successfully",
        open: true,
      });
      setIsloading(false);
      setProductData({
        title: "",
        desc: "",
        price: "",
        value: "",
      });
      setImgData(null);
      setlocalImg(null);
    } catch (error) {
      console.error(error);
      setIsloading(false);
    }
  };

  const fileHandler = (e) => {
    //GET IMAGE LOCALLY
    setImgData(e.target.files[0]);
    if (e.target.files[0]) {
      setlocalImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const ProductDataHandler = (e) => {
    setProductData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast((prev) => {
      return { ...prev, open: false };
    });
  };
  useEffect(() => {
    document.title = "Add Product";
  }, []);

  return (
    <main className="main">
      <Box>
        <Button onClick={() => navigate("/")}>GO TO PRODUCTS PAGE</Button>
      </Box>
      <section className="card">
        <Box className="txtContainer">
          <h1>ENTER PRODUCT DETAILS</h1>
        </Box>
        {INPUTS_DATA.map((e, i) => (
          <React.Fragment key={i}>
            <Box className="inpContainer">
              <input
                type="text"
                name={e.name}
                className={e.className}
                placeholder={e.placeholder}
                onChange={ProductDataHandler}
                value={e.value}
              />
            </Box>
          </React.Fragment>
        ))}

        {localImg && (
          <Box>
            <img src={localImg} width={"100%"} alt="productImg" />
          </Box>
        )}
        <Box>
          <FileUpload
            onChange={fileHandler}
            sx={{
              backgroundImage: `linear-gradient( 92.88deg,
                #455eb5 9.16%,
                #5643cc 43.89%,
                #673fd7 64.72%);`,
            }}
          >
            {localImg ? "Change Product Image" : "Add Product Image"}
          </FileUpload>
        </Box>

        <LoadingButton
          className="submitBtn"
          onClick={sendData}
          loading={isloading}
          variant="contained"
          endIcon={<ArrowUpwardOutlinedIcon />}
        >
          <span>Submit</span>
        </LoadingButton>
      </section>
      {/* TOAST */}
      {toast && (
        <Snackbar
          open={toast.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={toast.result}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      )}
    </main>
  );
}

export default AddProduct;
