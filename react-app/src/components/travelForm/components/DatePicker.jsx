import React from "react";
import { DatePicker, Space, ConfigProvider } from "antd";
const { RangePicker } = DatePicker;

const dateFormat = "DD.MM.YYYY";
const datePickerStyle = {
    "&.antPickedFocused": {
        borderColor: "#808000",
    },
};
export const DateRangePicker = ({ setSelectedDate }) => {
    const handleDateChange = (_, dateString) => {
        setSelectedDate(dateString);
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        activeBorderColor: "#808000",
                        hoverBorderColor: "#CBD5E0",
                        activeShadow: "0 0 0 2px rgba(148, 146, 7, 0.1)",
                        borderRadius: "16px",
                    },
                },
            }}
        >
            <Space direction="vertical" size={20}>
                <RangePicker
                    format={dateFormat}
                    style={datePickerStyle}
                    placeholder={["Start date", "End date"]}
                    onChange={handleDateChange}
                />
            </Space>
        </ConfigProvider>
    );
};
