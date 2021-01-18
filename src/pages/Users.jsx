import React from "react";

export const Users = ({children}) => {
  // useState Example
  const [counter, setCounter] = React.useState(0);

  console.log('Render', counter);

  const clickHandler = () => {
    console.log('Am Clicked', counter);
    //counter = counter +1;
    setCounter(counter +1);
  };

  React.useEffect(() => {
    console.log('After Draw', counter);
  });

  return (
    <div>
      I am USERS ddddd
      <div>
        Count: {counter}
      </div>

      <div
        style={{
          color: 'red'
        }}>


        <hr/>
        {children}
        <br/>
        <button onClick={clickHandler}>
          Hello
        </button>
      </div>
    </div>
  );
};
