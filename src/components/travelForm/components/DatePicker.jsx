import React from "react";
import { DatePicker, Space, ConfigProvider } from "antd";
const { RangePicker } = DatePicker;

const dateFormat = "DD.MM.YYYY";
const datePickerStyle = {
    "&.antPickedFocused": {
        borderColor: "#808000",
    },
};
export const DateRangePicker = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        activeBorderColor: "#808000",
                        hoverBorderColor: "#808000",
                        activeShadow: "0 0 0 2px rgba(148, 146, 7, 0.1)",
                    },
                },
            }}
        >
            <Space direction="vertical" size={12}>
                <RangePicker
                    format={dateFormat}
                    style={datePickerStyle}
                    placeholder={["Data wyjazdu", "Data powrotu"]}
                />
            </Space>
        </ConfigProvider>
    );
};
