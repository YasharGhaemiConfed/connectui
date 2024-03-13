import React, { useState } from "react";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloseIcon from "@mui/icons-material/Close";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { UploadFileAction } from "./services";

interface FileUploadProps {
  setTasks: (tasks: string[]) => void;
  setClear: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setTasks, setClear }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleExtractTasks = async () => {
    try {
      // @ts-ignore
      const response = await UploadFileAction(selectedFile);
      if (response?.status === 200) {
        //   @ts-ignore
        setTasks(response.data);
      } else {
        throw new Error();
      }
    } catch (err) {
      setTasks([""]);
      console.error("Error fetching data:", err);
    }
  };

  const handleClear = () => {
    setClear();
    setSelectedFile(null);
  };

  return (
    <Grid item xs={8} md={8}>
      {!selectedFile && (
        <>
          <input
            accept=".xpdl"
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<FileUploadIcon sx={{ mx: 1 }} />}
              sx={{ marginTop: 2 }}
              size="large"
            >
              بارگزاری
            </Button>
          </label>
        </>
      )}
      {selectedFile && (
        <>
          <ButtonGroup variant="contained" aria-label="Basic button group" sx={{boxShadow:"none"}}>
            <Button
              variant="contained"
              color="error"
              component="span"
              startIcon={<CloseIcon sx={{ ml: 1 }} />}
              sx={{ marginTop: 2 }}
              onClick={handleClear}
              size="large"
            >
              ابطال
            </Button>
            <Button
              variant="contained"
              color="success"
              component="span"
              startIcon={<DownloadingIcon sx={{ ml: 1 }} />}
              sx={{ marginTop: 2 }}
              onClick={handleExtractTasks}
              size="large"
            >
              استخراج
            </Button>
            <input
              accept=".xpdl"
              id="contained-button-file"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<FileUploadIcon sx={{ ml: 1 }} />}
                sx={{ marginTop: 2 }}
                size="large"
              >
                بارگزاری
              </Button>
            </label>
          </ButtonGroup>

          <Typography variant="body1" color="textSecondary">
            فایل انتخاب شده: {selectedFile.name}
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default FileUpload;
