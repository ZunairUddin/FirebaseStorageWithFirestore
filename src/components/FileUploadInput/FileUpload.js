import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUpload({ children, onChange, variant, sx }) {
  return (
    <Button
      component="label"
      variant={variant || "contained"}
      sx={{ ...sx }}
      endIcon={<CloudUploadIcon />}
    >
      {children}
      <VisuallyHiddenInput accept="image/*" onChange={onChange} type="file" />
    </Button>
  );
}
