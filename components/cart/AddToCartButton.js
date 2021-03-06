import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { AppContext } from "../context/AppContext";
import { addFirstProduct, getFormattedCart, updateCart } from "../../functions";
import Link from "next/link";
import { v4 } from "uuid";
import GET_CART from "../../queries/get-cart";
import ADD_TO_CART from "../../mutations/add-to-cart";

const AddToCart = (props) => {
  const { product, children } = props;
  let id;
  if (!typeof product.variationId == "undefined") {
    id = product.variationId;
  } else {
    id = product.variationId;
  }
  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: id,
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  /**
   * @TODO will update this in future, when required.
   * Handles adding items to the cart.
   *
   * @return {void}
   */
  // const handleAddToCartLocalStorage = () => {
  //
  // 	// If component is rendered client side.
  // 	if ( process.browser ) {
  //
  // 		let existingCart = localStorage.getItem( 'woo-next-cart' );
  //
  // 		// If cart has item(s) already, update existing or add new item.
  // 		if ( existingCart ) {
  //
  // 			existingCart = JSON.parse( existingCart );
  //
  // 			const qtyToBeAdded = 1;
  //
  // 			const updatedCart = updateCart( existingCart, product, qtyToBeAdded );
  //
  // 			setCart( updatedCart );
  //
  // 		} else {
  // 			/**
  // 			 * If No Items in the cart, create an empty array and add one.
  // 			 * @type {Array}
  // 			 */
  // 			const newCart = addFirstProduct( product );
  // 			setCart( newCart );
  // 		}
  //
  // 		// Show View Cart Button
  // 		setShowViewCart( true )
  // 	}
  // };

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART' );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [
    addToCart,
    { data: addToCartRes, loading: addToCartLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      // console.warn( 'completed ADD_TO_CART' );

      // If error.
      if (addToCartError) {
        setRequestError(addToCartError.graphQLErrors[0].message);
      }

      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch();

      // 2. Show View Cart Button
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  const handleAddToCartClick = () => {
    if (!product.price) {
      window.alert("Seleccione todos los atributos de la variación");
      return;
    }
    // handleAddToCartLocalStorage();
    setRequestError(null);
    addToCart();
  };

  return (
    <div>
      {/* Add To Cart Loading*/}
      {addToCartLoading && <p>Adding to Cart...</p>}

      {/*	Check if its an external product then put its external buy link */}

      <div onClick={handleAddToCartClick}>{children}</div>
    </div>
  );
};

export default AddToCart;
