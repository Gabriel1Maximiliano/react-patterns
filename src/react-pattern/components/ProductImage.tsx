import React, { useContext } from 'react'
import { ProductContext } from './ProductCard';
import noImage from '../../assets/no-image.jpg';
import styles from "../styles/styles.module.css";




export const ProductImage = ( { image='' } )=>{

    const { product } = useContext( ProductContext );

    let imageToPrint : string;

    if( image ){
        imageToPrint= image;
    }else if( product.image ){
        imageToPrint= product.image;
    }else{
        imageToPrint= noImage;
    }
        return(
           <img className={styles.productCard} src={ imageToPrint } alt="product-1" /> 
        )
    }