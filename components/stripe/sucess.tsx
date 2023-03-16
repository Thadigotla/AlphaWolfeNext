import React from "react";

export const Success = () => {
  const [state, setState] = React.useState("sucess");
  return (
    <div>
      <h1>{state}</h1>
      <h2>Thank you for your purchase!</h2>
    </div>
  );
};
