import React from "react";
import Cascader from "rc-cascader";
import { useControllableState, Input, Box } from "@chakra-ui/react";
import arr from "../../../public/addr";

const CascaderSelect = () => {
  const inputValue: any = [];
  const [value, setValue] = useControllableState<any>({ value: inputValue });
  const onChange = (value, selectedOptions) =>
    setValue({ inputValue: selectedOptions.map(o => o.label) });
  return (
    <Box>
      <Cascader expandTrigger="hover" options={arr} onChange={onChange}>
        <Input
          variant="filled"
          placeholder="选择地址"
          value={value}
          isReadOnly
          size="md"
        />
      </Cascader>
    </Box>
  );
};

export default CascaderSelect;
