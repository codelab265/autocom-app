import * as React from "react";
import { TextInput } from "react-native";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <TextInput
      keyboardType={type}
      className="w-full border border-red-500"
      ref={ref}
      {...props}
      placeholder="name"
    />
  );
});
Input.displayName = "Input";

export { Input };
