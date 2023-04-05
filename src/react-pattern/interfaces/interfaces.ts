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
export interface IHOCProdutcCardProps {

    ({ children, product }: IProps) : JSX.Element;
    Title: ({ name }: { name?: string | undefined; }) => JSX.Element,
    Image: ({ image }: { image?: string | undefined; }) => JSX.Element;
    Button: () => JSX.Element; 
}
