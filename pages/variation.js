import client from "../components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "../queries/product-and-categories";
import Product from "../components/singleVariation";
const Index = (props) => {
  const { productCategories, products } = props;
  const onMatchFound = (value) => console.log(value);
  return (
    <div className="row">
      {products.products.edges.map((product, index) => (
        <div key={index}>
          <p>{product.node.name}</p>
          {product.node.type == "VARIABLE" && (
            <Product
              onMatchFound={onMatchFound}
              attributes={product.node.attributes.nodes}
              variations={product.node.variations.nodes}
            />
          )}
        </div>
      ))}
    </div>
  );
};

Index.getInitialProps = async ({ req }) => {
  req && console.log(req.headers);
  const result = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });
  return {
    productCategories: result.data.productCategories.nodes,
    products: result.data,
  };
};

export default Index;
