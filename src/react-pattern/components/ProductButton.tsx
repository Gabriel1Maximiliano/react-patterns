import { useContext } from "react";
import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";

export const ProductButton = () =>{

    const { handleIncreaseBy,counter } = useContext( ProductContext );

    return(
   
        <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonSubstraction}
          onClick={() => handleIncreaseBy(-1)}
        >
          {" "}
          -{" "}
        </button>

        <div className={styles.countLabel}> { counter } </div>

        <button
          className={styles.buttonAdd}
          onClick={() => handleIncreaseBy(1)}
        >
          {" "}
          +{" "}
        </button>
      </div>
     
    )
   
}