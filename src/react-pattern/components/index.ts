import { ProductCard as ProductCardHoc } from './ProductCard'
import { ProductButton } from './ProductButton';
import { ProductImage } from './ProductImage';
import { ProductTitle } from './ProductTitle';
import { IHOCProdutcCardProps } from '../interfaces/interfaces';


export * from './ProductButton';
// export * from './ProductCard';
export * from './ProductImage';
export * from './ProductTitle';
export * from './index';


export const ProductCard : IHOCProdutcCardProps = Object.assign( ProductCardHoc, {
   
Title:ProductTitle,
Image:ProductImage,
Button:ProductButton, 


} )

export default ProductCard;