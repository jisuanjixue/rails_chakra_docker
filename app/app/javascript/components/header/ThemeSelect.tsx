import React from "react";

const ThemeSelect = () => {
  return (
    <>
      <div className="m-1 btn">主题</div>
      <select
        data-choose-theme
        className="h-10 px-3 rounded-full focus:outline-none"
      >
        <option value="">默认</option>
        <option value="dark">暗黑</option>
        <option value="black">黑色</option>
        <option value="Pink">粉红</option>
        <option value="Blue">蓝色</option>
        <option value="Yellow">黄色</option>
      </select>
    </>
  );
};

export default ThemeSelect;
