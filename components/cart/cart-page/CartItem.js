import { useState } from "react";
import { v4 } from "uuid";
import { getUpdatedItems } from "../../../functions";

const CartItem = ({
  item,
  products,
  updateCartProcessing,
  handleRemoveProductClick,
  updateCart,
}) => {
  const [productCount, setProductCount] = useState(item.qty);

  /*
   * When user changes the qty from product input update the cart in localStorage
   * Also update the cart in global context
   *
   * @param {Object} event event
   *
   * @return {void}
   */
  const handleQtyChange = (event, cartKey) => {
    if (process.browser) {
      event.stopPropagation();

      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }

      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      const newQty = event.target.value ? parseInt(event.target.value) : 1;

      // Set the new qty in state.
      setProductCount(newQty);

      if (products.length) {
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
    }
  };

  return (
    <div key={item.productId}>
      <div className="product-desc-box">
        <div className="woo-next-cart-element">
          <strong>
            <h5>{item.name}</h5>
          </strong>
        </div>
        <span
          className="woo-next-cart-close-icon"
          onClick={(event) =>
            handleRemoveProductClick(event, item.cartKey, products)
          }
        >
          <i className="fa fa-times-circle" />
        </span>
      </div>
      <div className="product-desc-box">
        <div className="woo-next-cart-element woo-next-cart-qty">
          <input
            type="number"
            min="1"
            data-cart-key={item.cartKey}
            className={`woo-next-cart-qty-input form-control ${
              updateCartProcessing ? "woo-next-cart-disabled" : ""
            } `}
            value={productCount}
            onChange={(event) => handleQtyChange(event, item.cartKey)}
          />
          {updateCartProcessing ? (
            <img
              className="woo-next-cart-item-spinner"
              src="/cart-spinner.gif"
              alt="spinner"
            />
          ) : (
            ""
          )}
        </div>
        <div className="woo-next-cart-element">
          <strong>
            <h5>
              {"string" !== typeof item.totalPrice
                ? item.totalPrice.toFixed(2)
                : item.totalPrice}
            </h5>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
