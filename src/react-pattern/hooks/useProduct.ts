import { useState } from "react";


export const useProduct = () => {

    const [ counter, setCounter ] = useState<number>(0);

  const handleIncreaseBy = ( value: number ) => {

    setCounter((prev) => Math.max( prev + value, 0 ));

  };
  return {
    handleIncreaseBy,
    counter,
  }
}
