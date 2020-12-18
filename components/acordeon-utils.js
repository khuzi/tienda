import React from "react";
import Product from "../components/Product";
import Collapse from "@kunukn/react-collapse";
import { useList } from "./reducer";

export const Down = ({ isOpen }) => {
  return (
    <svg
      className={isOpen ? "is-open" : "icon-down"}
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path d="M14.8 4L8 9.6 1.2 4 0 5.333 8 12l8-6.667z" />
    </svg>
  );
};

export function Block({ isOpen, title, onToggle, children }) {
  return (
    <>
      <div
        className="acme"
        onClick={(e) => {
          onToggle();
        }}
      >
        <span
          css={{
            pointerEvents: "none",
          }}
        >
          {title}
        </span>
        <Down isOpen={isOpen} />
      </div>
      <Collapse isOpen={isOpen}>{children}</Collapse>
    </>
  );
}

export function Accord({ category, index }) {
  const [state, dispatch] = useList();
  return (
    <>
      <Block
        title={category.name}
        isOpen={state.flags[index]}
        onToggle={() => dispatch({ type: "toggle", index: index })}
      >
        <div
          css={{
            padding: "10px 10px 30px",
          }}
        >
          <div className="product-container row">
            {category &&
              category.products.edges.map((product, index) => (
                <Product key={index} product={product.node} />
              ))}
          </div>
        </div>
      </Block>
    </>
  );
}

export function Side({ category, index }) {
  const [state, dispatch] = useList();
  return (
    <div
      key={category.id}
      onClick={() => dispatch({ type: "toggle", index: index })}
    >
      <p className="me">
        <a>{category.name}</a>
      </p>
    </div>
  );
}

export function Search({ children }) {
  const [state, dispatch] = useList();
  return (
    <div>
      <Block
        title="Buscador de productos"
        isOpen={state.flags[9999]}
        onToggle={() => dispatch({ type: "toggle", index: 9999 })}
      >
        <div
          css={{
            padding: "10px 10px 30px",
          }}
        >
          <div className="product-container row">{children}</div>
        </div>
      </Block>
    </div>
  );
}

export function SearchBar({ title }) {
  const [state, dispatch] = useList();
  return (
    <div onClick={() => dispatch({ type: "toggle", index: 9999 })}>
      <p className="me">
        <i className=" fa fa-search icon-search"></i>
        <a>{title}</a>
      </p>
    </div>
  );
}
