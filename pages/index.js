import Layout from "../components/Layout";
import Product from "../components/Product";
import client from "../components/ApolloClient";
import AcordeonCategories from "../components/acordeon";
import ProductCategoryBlock from "../components/category/category-block/ParentCategoryBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../queries/product-and-categories";

const Index = (props) => {
  const { productCategories, products } = props;
  return (
    <Layout>
      <div className="row">
        <AcordeonCategories
          products={products}
          categories={productCategories}
        />
      </div>
    </Layout>
  );
};

export const getStaticProps = async ({ req }) => {
  const result = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });
  return {
    props: {
      productCategories: result.data.productCategories.nodes,
      products: result.data,
    },
  };
};

export default Index;
