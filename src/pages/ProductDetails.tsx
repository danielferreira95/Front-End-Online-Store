import { useEffect, useState } from "react";
import { getDetails, getProductById } from "../services/api";
import { Link, useParams } from "react-router-dom";

type DetailsType = {
    id: string,
    title: string,
    price: number,
    thumbnail: string,
  };

function ProductDetails() {
    const [ details, setDetails ] = useState<DetailsType[]>();
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams();
    
    useEffect(() => {
        async function fetchDetails() { // chama a api
          try {
            if(params.id){
            const data = await getProductById( params.id );
            setDetails(data.result);
            setLoading(false);
            // console.log(data);
            }
          } catch (fetchError) {
            console.log(fetchError);
            setError('Erro ao exibir detalhes dos produtos');
            setLoading(false);
          }
        }
        fetchDetails();
      }, [params.id]);

      if (loading) {
        return <div>Carregando produtos...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }
  
    //   const { title, thumbnail, price } = details[0];

    return (
        <>
        {details && (
        
        <div>      
          <h2 data-testid="product-detail-name">{ `casa` }</h2>
          <img src={ `casa`  } alt={ `casa`  } data-testid="product-detail-image" />
          <p data-testid="product-detail-price">{ `casa`  }</p>
         <Link to={"/cart"}>
          <button data-testid="shopping-cart-button"></button>
         </Link>          
        </div>
)}
      </>
    )
}

export default ProductDetails;