import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

export default function UploadImages(props) {
  // State
  const [images, setimages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewOpen, setpreviewOpen] = useState(false);
  //Ref
  const hiddenFileInput = useRef(null);
  // handle Function
  const handlePreviewClose = () => {
    setpreviewOpen(false);
  };
  const handleCancel = () => {
    setimages([]);
    handlePreviewClose();
    props.setImages([]);
  };
  const handleImages = (event) => {
    if (Array.from(event.target.files).length > 10) {
      event.preventDefault();
      alert(`Cannot upload files more than ${10}`);
    }
    if (event.target.files.length > 0) {
      setpreviewOpen(true);
      console.log(event.target.files);
      let temp = [...event.target.files];
      setimages(temp);
    }
  };
  //Use Effect
  useEffect(() => {
    console.log("creating preview");
    setPreviewImages(images.map((x) => URL.createObjectURL(x)));
    return () => {
      console.log("Removing previous preview from memory");
      previewImages.forEach((x) => URL.revokeObjectURL(x));
    };
  }, [images]);

  const handleOkay = () => {
    handlePreviewClose();
    props.setImages(images);
  };
  return (
    <React.Fragment>
      <Dialog open={previewOpen} onClose={handlePreviewClose}>
        <DialogTitle>Images Preview</DialogTitle>
        <DialogContent>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {images.map((item, index) => (
              <ImageListItem key={index}>
                <img src={`${URL.createObjectURL(item)}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOkay}>Okay</Button>
        </DialogActions>
      </Dialog>
      <Button
        startIcon={<CloudUploadOutlinedIcon />}
        onClick={() => hiddenFileInput.current.click()}
        sx={{ marginRight: "1%", marginLeft: "8%" }}
      >
        Upload Images
      </Button>
      <input
        type="file"
        multiple
        onChange={handleImages}
        style={{ display: "none" }}
        ref={hiddenFileInput}
        accept="image/png, image/gif, image/jpeg"
      ></input>
    </React.Fragment>
  );
}
