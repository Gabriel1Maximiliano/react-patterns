import styles from "../styles/styles.module.css";



import { useProduct } from "../hooks/useProduct";
import { createContext } from "react";
import { IProductContextProps, IProps } from "../interfaces/interfaces";





export const ProductContext  = createContext( {} as IProductContextProps );

         
export const ProductCard = ( { children, product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  
  return (
    <ProductContext.Provider value={{
        handleIncreaseBy,
        counter,
        product
    }} >
    <div className={styles.productCard}>
        { children }
    </div>
    </ProductContext.Provider>
  );
};

