import React from "react";

const Loading = () => {
    return (
        <div className="flex left-0 top-0 items-center justify-center z-100 fixed h-screen w-screen bg-black/25">
            <div className="w-10 h-10 rounded-full border-2 border-light-grey border-r-main-purple animate-spin"></div>
        </div>
    );
};

export default Loading;
