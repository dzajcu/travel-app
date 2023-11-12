import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@chakra-ui/react";

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
export const DropZone = (props) => {
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
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
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
                <input {...getInputProps()} />
                <p>Przeciągnij i upuść pliki lub kliknij aby wybrać</p>
                <em>(Max 5 plików *.jpeg i *.png)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>{acceptedFileItems}</ul>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
            </aside>
        </Box>
    );
};
