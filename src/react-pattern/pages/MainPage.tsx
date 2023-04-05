import { ProductButton, ProductCard, ProductImage, ProductTitle } from "../components"

import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";


const product = {
  name: "T-Shirt",
  price: 29,
  image:image1
}


export const MainPage = () => {

  return (
    // FORMA ANTERIOR
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductImage />
     <ProductTitle name="Soy el name de product"/>
     <ProductButton />
    </ProductCard>
    

    // NUEVA FORMA
    
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductCard.Image />
     <ProductCard.Title  />
     <ProductCard.Button />
    </ProductCard>
    </>
  )

}
