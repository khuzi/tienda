import Link from "next/link";
import AddToCartButton from "../components/cart/AddToCartButton";
import clientConfig from "../client-config";
import { isEmpty } from "lodash";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import React, { useState } from "react";
import ProductVariation from "../components/singleVariation";

const StyledModal = Modal.styled`
  @media only screen and (max-width: 600px) {
      margin-bottom: 90%;
  }
  display: block !important;
  margin-bottom: 30%;
  width: 750px;
  height: 200px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition: opacity ease 500ms;
`;
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity ease 200ms;
`;

const Product = (props) => {
  const { product } = props;
  const [value, setValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const getImage = (str) => {
    let temp = str.match("([^ ]+)");
    return temp[0];
  };
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  function afterOpen() {
    setOpacity(1);
  }

  function beforeClose() {
    setOpacity(0);
  }
  const onMatchFound = (value) => {
    setValue(value);
    console.log(value);
  };
  const body = (
    <div className="card top-modal">
      <div className="row">
        <div className="modal-container get col-md-5">
          <a>
            {!isEmpty(product.image) ? (
              <img
                onClick={toggleModal}
                className="product-modal-image"
                src={getImage(product.image.srcSet)}
                alt="Product image"
              />
            ) : !isEmpty(clientConfig.productImagePlaceholder) ? (
              <img
                onClick={toggleModal}
                className="product-modal-image"
                src={clientConfig.productImagePlaceholder}
                alt="Placeholder product image"
              />
            ) : null}
          </a>
        </div>
        <div className=" col-md-6">
          <div className="product-desc-modal">
            <div className="product-name">
              <h4 className="product-title">
                {product.name ? product.name : ""}
              </h4>{" "}
              <b>
                <span className="card-subtitle mb-3">{product.price}</span>
              </b>
            </div>
            <div className="modal-container modal-container-custom">
              {product.type == "VARIABLE" && (
                <ProductVariation
                  onMatchFound={onMatchFound}
                  attributes={product.attributes.nodes}
                  variations={product.variations.nodes}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-md-12 footer-modal">
          <AddToCartButton product={value}>
            <div>
              <button className="agregar">
                <h5>
                  Agregar a Mi Pedido <i className="fa fa-arrow-right"></i>
                </h5>
              </button>
            </div>
          </AddToCartButton>
        </div>
      </div>
    </div>
  );

  return (
    // @TODO Need to handle Group products differently.
    undefined !== product && "GroupProduct" !== product.__typename ? (
      <ModalProvider backgroundComponent={FadingBackground}>
        <div className="container-product col-sm-6 col-md-4">
          <a>
            {!isEmpty(product.image) ? (
              <img
                onClick={toggleModal}
                className="product-image"
                src={getImage(product.image.srcSet)}
                alt="Product image"
              />
            ) : !isEmpty(clientConfig.productImagePlaceholder) ? (
              <img
                onClick={toggleModal}
                className="product-image"
                src={clientConfig.productImagePlaceholder}
                alt="Placeholder product image"
              />
            ) : null}
          </a>
          <div className="product-desc">
            <div className="product-name">
              <h5>{product.name ? product.name : ""}</h5>
            </div>

            <div id="block_container">
              <div id="block1">
                <h5 className="card-subtitle mb-3">{product.price}</h5>
              </div>  
              
              <div id="block2">
                <AddToCartButton product={product}>
                  <button className="agregar2"><i className="fa fa-shopping-cart fa-2x"></i></button>
                </AddToCartButton></div>
            </div>

          </div>
        </div>
        <StyledModal
          allowScroll={true}
          isOpen={isOpen}
          afterOpen={afterOpen}
          beforeClose={beforeClose}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          {body}
        </StyledModal>
      </ModalProvider>
    ) : (
      ""
    )
  );
};

export default Product;


              // <div className="product-price">
              //   <h5 className="card-subtitle mb-3">{product.price}</h5>
              // </div>

              // <AddToCartButton product={product}>
              //   <div className="modasl-footer modal-product">
              //     <button className="agregar">
              //       Agregar a Mi Pedido <i className="fa fa-arrow-right"></i>
              //     </button>
              //   </div>
              // </AddToCartButton>