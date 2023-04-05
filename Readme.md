# Para reconstruir los módulos de node hacer  

```js
yarn

```

# Compound Component Pattern 

La idea detrás de este repo es entender el uso del patrón Compound Component Pattern,
éste nos da una forma de crear nuestros componentes de una determinada manera y obtener determinados beneficios. En este caso nos permite manejar la información desde un componente madre hacia un componente hijo teniendo control total de sus children.

Si ya tenés el repositorio en tu computadora  


En el componente ProductCard deberías ver el clásico contador 

react-pattern/components/ProductCard.tsx

```javascript

import styles from "../styles/styles.module.css";
import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";
import { useState } from "react";

export const ProductCard = () => {

  const [ counter, setCounter ] = useState<number>(0);

  const handleIncreaseBy = ( value: number ) => {

    setCounter((prev) => Math.max( prev + value, 0 ));

  };

  return (

    <div className={styles.productCard}>
      <img className={styles.productCard} src={image1} alt="product-1" />
      <span className={styles.productDescription}>T-shirt</span>
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
    </div>
  );
};

```

Una vez veas esto empezá creando un "Custom-Hook" en la carpeta hooks:


react-pattern/hooks/useProduct.ts
```javascript

import { useState } from "react";


export const useProduct = () => {

    const [ counter, setCounter ] = useState<number>(0);

  const handleIncreaseBy = ( value: number ) => {

    setCounter(( prev ) => Math.max( prev + value, 0 ));

  };
  return {
    handleIncreaseBy,
    counter,
  }
}


```

_Comentario_: 
            Si el órden no es importante yo prefiero hacer el return con llaves, pero si por ejemplo siempre retorno la  misma cantidad de elementos y el órden me interesa uso corchetes.

* Hagmos uso ahora de nuestro "Custom-Hook" en nuestro componente ProductCard  


react-pattern/components/ProductCard.tsx

```javascript

import styles from "../styles/styles.module.css";
import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";
import { useProduct } from "../hooks/useProduct";

export const ProductCard = () => {

  const { counter,handleIncreaseBy } = useProduct();

  return (

    <div className={styles.productCard}>
      <img className={styles.productCard} src={image1} alt="product-1" />
      <span className={styles.productDescription}>T-shirt</span>
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
    </div>
  );
};


```
# Pasando props a nuestro ProductCard:

Hagamos uso de TypeScript para generar mediante una interfaz la estructura que va a tener nuestro "producto".

react-pattern/components/ProductCard.tsx

```js

export interface IProps {

product   :IProduct;

}

export interface IProduct {

    name  :string;
    price :number;
    image?: string;

}

```
_Comentario_: 
            Me gusta usar I mayúscula al inicio de los nombres de mis interfaces porque facilita a golpe de vista diferenciarlas de, por ejemplo, el nombre de una clase.

Usualmente la interfaz de mayor jerarquía va más arriba. Implementamos "IProduct" y luego "IProps" para poder hacer desestructuración en nuestro ProductCard. El hecho de hacerlo así 

```js

export const ProductCard = ( { product }: IProps ) => {...}

``` 

y no de esta manera 

```js
export const ProductCard = ( { product }: IProduct ) => {...}

```

Es porque si en un futuro queremos recibir en nuestro functional component, por ejemplo el children, me parece más óptimo modificar la intefaz del propio ProductCard (IProps) que hacerlo sobre IProduct.

Vas a notar que salta un error en MainPage ya que nos está faltando el producto que acabamos de definir como "property" en ProductCard.

# Vista del código con las interfaces implementadas


react-pattern/components/ProductCard.tsx

```js

import styles from "../styles/styles.module.css";
import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";
import { useProduct } from "../hooks/useProduct";


export interface IProps {

    product   :IProduct;
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }
export const ProductCard = ( { product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
      <img className={styles.productCard} src={image1} alt="product-1" />
      <span className={styles.productDescription}>T-shirt</span>
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
    </div>
  );
};



```

Agregemos nuestro producto en MainPage 

```js

import { IProduct, ProductCard } from "../components"

const product:IProduct = {
  name : "T-Shirt",
  price: 29
}


export const MainPage = () => {

  return (
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }/>
    </>
  )
  
}

```
Ahora notamos que en la variable "product" no agregamos la propiedad "image" en el objeto, para solucionar este inconveniente importemos la imagen 

```js

import noImage from '../../assets/no-image.jpg';

```

en nuestro ProductCard. Como la imagen en nuestra interfaz de producto la declaramos como opcional, hagamos uso del operador ternario para poder mostrar una imagen en caso de que el producto no tenga la propia. 

```js
<img className={styles.productCard} src={ product.image ? product.image : noImage} alt="product-1" />

```
# Agregando la importación de la imagen y las correcciones en el tag img tenemos:

```js

import styles from "../styles/styles.module.css";
import noImage from '../../assets/no-image.jpg';
import { useProduct } from "../hooks/useProduct";


export interface IProps {

    product   :IProduct;
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }
export const ProductCard = ( { product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
      <img className={styles.productCard} src={ product.image ? product.image : noImage} alt="product-1" />
      <span className={styles.productDescription}>T-shirt</span>
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
    </div>
  );
};


```

Agregando todos los datos del producto a nuestro componente y quitando esta importación 

```js
import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";

```
tu código deberá verse así: 

react-pattern/components/ProductCard.tsx

```js

import styles from "../styles/styles.module.css";
import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";
import noImage from '../../assets/no-image.jpg';

import { useProduct } from "../hooks/useProduct";


export interface IProps {

    product   :IProduct;
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }


    
export const ProductCard = ( { product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
      <img className={styles.productCard} src={ product.image ? product.image : noImage} alt="product-1" />
      <span className={styles.productDescription}>{ product.name }</span>
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
    </div>
  );
};


```

Con esto hecho, en MainPage agreguemos la imagen a nuestro producto:

```js

import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";

const product:IProduct = {
  name : "T-Shirt",
  price: 29,
  image:image1
}


```
Deberíamos ser capaces de ver la imagen en nuestra pantalla.

Hasta este punto no hay nada nuevo en el horizonte...

# Empezando con Compound Component

Ejemplo de Compound Component.

```html

<label for="fruits">Elija una opción</label>

<select name="fruits" id="fruits">
    <option value='bananna'>Banana</option>
    <option value='pear'>Pera</option>
    <option value='peach'>Melocotón</option>
</select>

```

En este caso el componente padre es "select" y los hijos las "option", el componente padre coordina la selección mientras que los hijos "option" nos brindan opciones que podemos seleccionar.

La idea es replicar este patrón en nuestro componente


Empecemos por tomar a nuestro ProductCard y dividámoslo en piezas más pequeñas
en este mismo archivo, postriormente encapsularemos los mismos para mejorar la legibilidad. 

## Componente 1

react-pattern/components/ProductCard.tsx

```js
export const ProductImage = ( { image='' } )=>{
        return(
           <img className={styles.productCard} src={ image ? image : noImage} alt="product-1" /> 
        )
    }

```
_Comentario_: 
            El hecho de igualar image='' permite que la imagen sea opcional, recordemos que un string vacío para un operador ternario es considerado como sin valor.

## Componente 2 

react-pattern/components/ProductCard.tsx

```js
export const ProductTitle = ( { name }:{ name:string }  ) =>{
    return(
        <span className={styles.productDescription}>{ name }</span>
    )
} 

```

_Comentario_: 
            El hecho de definir la interfaz “inline” es porque tengo una propiedad para especificar y solo mi componente ProductTitle la usa. Si hubiera más propiedades u otros componentes usan la misma interfaz la crearíamos como hicimos antes.


## Componente 3

react-pattern/components/ProductCard.tsx

```js


export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

} 

export const ProductButton = ( { handleIncreaseBy, counter }:IButton ) =>{

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

```

_Comentario_: 
            Notemos cómo en este componente se implementó la interfaz IButton, ya que, había dos propiedades que definir y hacerlo "inline" lo considero desprolijo.

# Hasta éste punto nuestro código con las modificaciones hechas se visuliza así:

react-pattern/components/ProductCard.tsx

```js

import styles from "../styles/styles.module.css";

import noImage from '../../assets/no-image.jpg';

import { useProduct } from "../hooks/useProduct";


export interface IProps {

    product   :IProduct;
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }

export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

}    



export const ProductImage = ( { image='' } )=>{
        return(
           <img className={styles.productCard} src={ image ? image : noImage} alt="product-1" /> 
        )
    }

export const ProductButton = ( { handleIncreaseBy, counter }:IButton ) =>{

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


export const ProductTitle = ( { name }:{ name:string }  ) =>{
    return(
        <span className={styles.productDescription}>{ name }</span>
    )
}          
export const ProductCard = ( { product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
     <ProductImage image={ product.image } />
     <ProductTitle name={ product.name } />
     <ProductButton handleIncreaseBy={ handleIncreaseBy } counter={ counter } />
    </div>
  );
};


```

Hasta ahora todo lo que hicimos fue separar nuestro componente en pequeñas partes, puede parecer a primera vista que no esto no tiene utilidad práctica, pero sienta las bases para poder comenzar con el Compound Pattern.

Iniciemos con nuestro ProductCard, la idea es transformar este componente en un HOC o sea que pueda recibir componentes o elementos hijos. El objetivo es poder lograr algo como esto:



```js

<ProductCard product={ product }>
    <ProductImage />
    <ProductName />
    <ProductButton />
</ProductCard>

```

Para ello agreguemos "children" en nuestro ProductCard

react-pattern/components/ProductCard.tsx

```js
export const ProductCard = ( { children, product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
     <ProductImage image={ product.image } />
     <ProductTitle name={ product.name } />
     <ProductButton handleIncreaseBy={ handleIncreaseBy } counter={ counter } />
    </div>
  );
};


```
En este punto TypeScript nos va a lanzar un error porque no tenemos definida la property "children", es ahora en donde podemos ver la ventaja de definir las props de ProductCard así:

```js
export interface IProps {

    product   :IProduct;
    
    }

```
agregando children en IProps tenemos 

```js

export interface IProps {

    product   :IProduct;
     children :React.ReactNode  
    }

```
_Comentario_: 
            En este caso usamos React.ReactNode  porque me permite mostrar cualquier dato que se pueda representar en React ( booleanos,arrays,objetos,etc )mientras que JSX.Element se refiere a elementos JSX que pueden renderizarse el DOM.

Podemos definir  nuestro children en ProductCard comentando los tres componentes:

# Vista del código con estos cambios:

react-pattern/components/ProductCard.tsx

```js
import styles from "../styles/styles.module.css";

import noImage from '../../assets/no-image.jpg';

import { useProduct } from "../hooks/useProduct";


export interface IProps {

    product   :IProduct;
    children? :React.ReactNode  
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }

export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

}    



export const ProductImage = ( { image='' } )=>{
        return(
           <img className={styles.productCard} src={ image ? image : noImage} alt="product-1" /> 
        )
    }

export const ProductButton = ( { handleIncreaseBy, counter }:IButton ) =>{

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


export const ProductTitle = ( { name }:{ name:string }  ) =>{
    return(
        <span className={styles.productDescription}>{ name }</span>
    )
}          
export const ProductCard = ( { children, product }: IProps ) => {// en esta línea agregamos children
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
        {/* Comentamos los tres componentes */}

        { children }
     {/* <ProductImage image={ product.image } />
     <ProductTitle name={ product.name } />
     <ProductButton handleIncreaseBy={ handleIncreaseBy } counter={ counter } /> */}
    </div>
  );
};


```

Ahora en MainPage podemos podremos insertar "children" en ProductCard como muestra el siguiente código:

react-pattern/pages/MainPage.tsx

```js
export const MainPage = () => {

  return (
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <h1>Soy un children de ProductCard</h1>
    </ProductCard>
    </>
  )

}

```

Si todo sale bien vas a visualizar el h1 con la leyenda "Soy un children de ProductCard", pero hagamos un pasito más y agreguemos otro h1, puede que TypeScript arroje un error.De ser así debemos corregir la interfaz IProps de la siguiente manera:

```js

export interface IProps {

    product   :IProduct;
    children? :React.ReactNode  | React.ReactNode[]
    
    }

```

Intentemos usar <ProductImage /> <ProductTitle  /> <ProductButton /> en MainPage:

react-pattern/pages/MainPage.tsx

```js

export const MainPage = () => {

  return (
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductImage />
     <ProductTitle />
     <ProductButton />
    </ProductCard>
    </>
  )

}

```

Notamos que TypeScritpt nos lanza errores, te invito a que los vayas corrigiendo asi notás que si bien los mismos se corrigen, la idea es que tanto image de ProductImage, title de ProductTitle ; handleIncreaseBy y counter de ProductButton sean propiedades internas de ProductCard.

Otra forma de implementar este tipo de componentes para que quede en mejor evidenciada la relación padre-hijo sería:


```js

export const MainPage = () => {

  return (
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductCard.Image />
     <ProductCard.Title />
     <ProductButton.Button />
    </ProductCard>
    </>
  )

}

```
Empecemos en ProductCard al final del componente agregando las siguientes líneas, posteriormente lo vamos a refactorizar.

```js

ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```

Tu ProductCard con estos cambios se ve de la siguiente manera: 

```js
import styles from "../styles/styles.module.css";

import noImage from '../../assets/no-image.jpg';

import { useProduct } from "../hooks/useProduct";


export interface IProps {

    product   :IProduct;
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }

export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

}    



export const ProductImage = ( { image='' } )=>{
        return(
           <img className={styles.productCard} src={ image ? image : noImage} alt="product-1" /> 
        )
    }

export const ProductButton = ( { handleIncreaseBy, counter }:IButton ) =>{

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


export const ProductTitle = ( { name }:{ name:string }  ) =>{
    return(
        <span className={styles.productDescription}>{ name }</span>
    )
}          
export const ProductCard = ( { product }: IProps ) => {
   

  const { counter,handleIncreaseBy } = useProduct();

  

  return (

    <div className={styles.productCard}>
     <ProductImage image={ product.image } />
     <ProductTitle name={ product.name } />
     <ProductButton handleIncreaseBy={ handleIncreaseBy } counter={ counter } />
    </div>
  );
};

ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```


Ahora en MainPage podemos usar ProductCard de esta forma:

```js
export const MainPage = () => {

  return (
    // FORMA ANTERIOR
    // <>
    // <h1>Main Page</h1>
    // <ProductCard product={ product }>
    //  <ProductImage />
    //  <ProductTitle />
    //  <ProductButton />
    // </ProductCard>
    // </>

    // NUEVA FORMA
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductCard.Image />
     <ProductCard.Title />
     <ProductButton.Button />
    </ProductCard>
    </>
  )

}
```

Estás pensando esto no resuleve el problema de poder darle al padre la capacidad de compartir las propiedades que vienen de nuestro producto y tampoco relacionar el handleIncreaseBy de ProductButton.Button con el estado interno del padre. 
Pero logramos crear componentes hijos con relación directa con el componente padre.


 La idea es ahora poder usar nuestro componente de las dos maneras en nuestro MainPage

 ```js
export const MainPage = () => {

  return (
    // FORMA ANTERIOR
    <>
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductImage />
     <ProductTitle />
     <ProductButton />
    </ProductCard>
    

    // NUEVA FORMA
    
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductCard.Image />
     <ProductCard.Title />
     <ProductButton.Button />
    </ProductCard>
    </>
  )

}
```
# Agregando las correciones sugeridas por TypeScript tenemos:

```js
import { IProduct, ProductButton, ProductCard, ProductImage, ProductTitle } from "../components"

import image1 from "../../assets/shop-assets/products/100042307_0_2000.jpg";


const product:IProduct = {
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
     <ProductImage image={ product.image }/>
     <ProductTitle name={""} />
     <ProductButton handleIncreaseBy={function (value: number): void {
          throw new Error("Function not implemented.");
        } } counter={0} />
    </ProductCard>
    

    // NUEVA FORMA
    
    <h1>Main Page</h1>
    <ProductCard product={ product }>
     <ProductCard.Image />
     <ProductCard.Title name="hola" />
     <ProductCard.Button handleIncreaseBy={ () => {throw new Error("Function not implemented.")  } } counter={0} />
    </ProductCard>
    </>
  )

}
 

```

Deberías ver en pantalla dos cards de nuestro componente.

# Usando context 

Para poder compartir información entre padre e hijo en este caso utilizamos context en ProductCard. Para ello usamos el "createContext" importándolo de React, 

```js

const ProductContext  = createContext( {} );


```

Ahora coloquemos el Provider del ProductContext en el punto donde queremos compartir la información. 

```js
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

```

Definamos una interfaz que me permita aprovechar las ventajas del tipado y poder saber cómo luce mi contexto.
Para ello definamos una interfaz como muestra el siguiente código:

```js
export interface IProductContextProps {
    
    handleIncreaseBy: (value: number) => void;
    counter: number;
    product: IProduct

}

```

# Resultado de los pasos anteriores 

```js
import styles from "../styles/styles.module.css";

import noImage from '../../assets/no-image.jpg';

import { useProduct } from "../hooks/useProduct";
import { createContext } from "react";


export interface IProps {

    product   :IProduct;
    children? :React.ReactNode  | React.ReactNode[]
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }

export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

}

export interface IProductContextProps {

    handleIncreaseBy: (value: number) => void;
    counter: number;
    product: IProduct

}

const ProductContext  = createContext( {} as IProductContextProps );



export const ProductImage = ( { image='' } )=>{
        return(
           <img className={styles.productCard} src={ image ? image : noImage} alt="product-1" /> 
        )
    }

export const ProductButton = ( { handleIncreaseBy, counter }:IButton ) =>{

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


export const ProductTitle = ( { name }:{ name:string }  ) =>{
    return(
        <span className={styles.productDescription}>{ name }</span>
    )
}          
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

ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```

Si llegaste hasta acá vamos genial!! para acceder a los recursos que necesitamos en cada componente utilicemos el Hook useContext() en ProductButton ProductImage ProductTitle 

## useContext en ProductButton:

```js

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

```

## useContext en ProductImage:

Se contemplan los casos en que la imagen venga desde nuestro producto, ó desde la definición de la propiedad , ó que directamente no venga.

```js

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

```

## useContext en ProductTitle:



```js
export const ProductTitle = ( { name }:{ name?:string }) =>{// ojo acá que name se declara opcional

    const { product } = useContext( ProductContext );

    return(
        <span className={styles.productDescription}>
            { name ? name : product.name }
        </span>
    )
}  

```

Si probaras ahora el componente ( corregí los errores que emita TypeScript ) todo debería funcionar correctamente. Y listo tenemos nuestro Compound Pattern creado. Pero vamos ahora a refactorizar nuestro código porque siendo honestos se ve horrible.

## Código sin refactorizar: 

```js
import styles from "../styles/styles.module.css";

import noImage from '../../assets/no-image.jpg';

import { useProduct } from "../hooks/useProduct";
import { createContext, useContext } from "react";


export interface IProps {

    product   :IProduct;
    children? :React.ReactNode  | React.ReactNode[]
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }

export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

}

export interface IProductContextProps {

    handleIncreaseBy: (value: number) => void;
    counter         : number;
    product         : IProduct

}

const ProductContext  = createContext( {} as IProductContextProps );



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


export const ProductTitle = ( { name }:{ name?:string }) =>{

    const { product } = useContext( ProductContext );

    return(
        <span className={styles.productDescription}>
            { name ? name : product.name }
        </span>
    )
}          
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

ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```

## Inicio de refactorización:

Comencemos con separar las interfaces declaradas en ProductCard en la carpeta "interfaces":

react-pattern/interfaces/interface.ts

```js
export interface IProps {

    product   :IProduct;
    children? :React.ReactNode  | React.ReactNode[]
    
    }
    
export interface IProduct {
    
        name  :string;
        price :number;
        image?: string;
    
    }

export interface IButton  {

    handleIncreaseBy: (value: number) => void;
    counter         : number;

}

export interface IProductContextProps {

    handleIncreaseBy: (value: number) => void;
    counter         : number;
    product         : IProduct

}

```

En la carpeta components creamos los componentes ProductTitle ProductImage y ProductButton, asegurarse de tener todas las importaciones faltantes en cada componente. Luego crear un archivo de barril en esta misma carpeta y acomodamos las importaciones.


react-pattern/components/ProductCard.tsx

```js

import styles from "../styles/styles.module.css";



import { useProduct } from "../hooks/useProduct";
import { createContext } from "react";
import { IProductContextProps, IProps } from "../interfaces/interfaces";
import { ProductTitle,ProductImage,ProductButton } from "./";// importaciones del archivo de barril




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

ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```

Cuando vayas a la pantalla de para observar si todo funciona correctamente te vas a topar  con un error como éste en la consola del navegador.

```js
Uncaught ReferenceError: Cannot access 'ProductTitle' before initialization 

```

# ¿ Por qué diablos pasa esto ?

El problema esta en esta parte del código en nuestro PorductCard 

```js
ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```
Al estar los componentes separados ya no puedo hacer el append como originalmente lo hicimos. 

Para resolverlo regresemos a nuestro archivo de barril, comentemos la exportación de ProductCard e importemos nuevamente ProductCard renombrándola como ProductCardHoc. Creemos una nueva variable llamada ProductCard. Ahora recordemos que todo en JavaScript salvo los primitivos son objetos, aprovechando esto hagamos uso del Object.assign para poder expandir las propiedades de la nueva variable asignando a las properties Title, Image, Button los componentes ProductTitle ProductImage ProductButton respectivamente. Para completar agreguemos la exportación por defecto de ProductCard para tener la posibilidad de exportar todo el contenido del módulo.

react-pattern/components/index.tsx
```js
import { ProductCard as ProductCardHoc} from './ProductCard';

export * from './ProductButton';
// export * from './ProductCard';
export * from './ProductImage';
export * from './ProductTitle';
export * from './index';

export const ProductCard : any = Object.assign( ProductCardHoc, {
   
Title  :ProductTitle,
Image  :ProductImage,
Button :ProductButton, 


} )

export default ProductCard;


```

Para poder crear una interfaz para la variable ProductCard engañemos a TypeScript y asignemos un tipo de dato que sabemos que no corresponde por ejemplo un tipo number dejando el cursor del mouse sobre ProductCard Visual Studio Code nos alerta del error y nos describe el tipo de nuestra variable ProductCard y con esta información construimos la interfaz que buscamos. 

react-pattern/components/index.tsx
```js
import { ProductCard as ProductCardHoc} from './ProductCard';

export * from './ProductButton';
// export * from './ProductCard';
export * from './ProductImage';
export * from './ProductTitle';
export * from './index';

export const ProductCard : number = Object.assign( ProductCardHoc, {
                         // acá asignamos el tipo para ayudarnos de TypeScript
Title  :ProductTitle,
Image  :ProductImage,
Button :ProductButton, 


} )

export default ProductCard;


```

La interfaz buscada es:

```js
export interface IHOCProdutcCardProps {

    ({ children, product }: IProps) : JSX.Element;
    Title: ({ name }: { name?: string | undefined; }) => JSX.Element,
    Image: ({ image }: { image?: string | undefined; }) => JSX.Element;
    Button: () => JSX.Element; 
}

```
Elimina estas líneas de ProductCard 

```js
ProductCard.Title  = ProductTitle;
ProductCard.Image  = ProductImage;
ProductCard.Button = ProductButton;

```
Felicidades!!! Tenés que tener tu patrón de componente terminado. 