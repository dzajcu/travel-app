import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Icon } from "@chakra-ui/react";
import { IoCloudUploadSharp } from "react-icons/io5";
const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: "100%",
};

const focusedStyle = {
    borderColor: "#808000",
};
const acceptStyle = {
    borderColor: "#00e676",
};
const rejectStyle = {
    borderColor: "#ff1744",
};
export const DropZone = ({ setUploadedFiles }) => {
    const {
        acceptedFiles,
        fileRejections,
        isFocused,
        isDragAccept,
        isDragReject,
        getRootProps,
        getInputProps,
    } = useDropzone({
        maxFiles: 5,
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        name: "images",

        onDrop: (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} 
                <ul>
                    {errors.map((e) => (
                        <li key={e.code}>{e.message}</li>
                    ))}
                </ul>
            </li>
        );
    });
    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );
    return (
        <Box width={"100%"}>
            <div {...getRootProps({ style })}>
                <input {...getInputProps({ name: "images" })} />
                <Icon as={IoCloudUploadSharp} fontSize="2xl" marginBottom={"10px"} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Max 5 files *.jpeg i *.png)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul>
                {/* <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul> */}
            </aside>
        </Box>
    );
};
