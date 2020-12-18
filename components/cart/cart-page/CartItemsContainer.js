import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import {
  getFormattedCart,
  getUpdatedItems,
  removeItemFromCart,
} from "../../../functions";
import CartItem from "./CartItem";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/react-hooks";
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import Image from "next/image";

const CartItemsContainer = () => {
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // console.warn( 'completed GET_CART', data );

      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        // setRequestError(error.graphQLErrors[0].message);
        process.browser && localStorage.removeItem("woo-next-cart");
      }
    },
  });

  // Update Cart Mutation.
  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        process.browser && localStorage.removeItem("woo-next-cart");
        // setRequestError(error.graphQLErrors[0].message);
      }
    },
  });

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: v4(),
          all: true,
        },
      },
    });
  };

  return (
    <div className="col-lg-12 nopa">
      {cart ? (
        <div className="woo-next-cart-wrapper container cajita">
          <div className="col-md-12">
            {cart.products.length &&
              cart.products.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  updateCartProcessing={updateCartProcessing}
                  products={cart.products}
                  handleRemoveProductClick={handleRemoveProductClick}
                  updateCart={updateCart}
                />
              ))}
          </div>

          {/*Clear entire cart*/}

          {/* Display Errors if any */}
          {requestError ? (
            <div className="row woo-next-cart-total-container ">
              {" "}
              {requestError}{" "}
            </div>
          ) : (
            ""
          )}

          {/*Cart Total*/}
          <div className="row woo-next-cart-total-container ">
            <div className="col-md-12">
              <div class="total">
                <div class="texto-total">
                  <h5>Total a pagar</h5>
                </div>
                <div class="nro-total">
                  <h5>
                    {"string" !== typeof cart.totalProductsPrice
                      ? cart.totalProductsPrice.toFixed(2)
                      : cart.totalProductsPrice}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <Link href="/checkout">
                <div className="btn btn-secondary botonsote">
                  <h5>IR A CHECKOUT</h5>
                  <i className="fas fa-long-arrow-alt-right" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <Image
            src="/acme.png"
            alt="cart"
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
};

export default CartItemsContainer;
