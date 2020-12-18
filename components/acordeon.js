import React, { useState } from "react";
import ScrollView, { ScrollElement } from "./scroll";
import { ListProvider } from "./reducer";
import { Side, SearchBar, Accord, Search } from "./acordeon-utils";
import Product from "./Product";
import CartItemsContainer from "./cart/cart-page/CartItemsContainer";

const ControlledAccordions = ({ categories, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pr, setProductos] = useState([]);
  function stringIncludes(a, b) {
    return a.indexOf(b) !== -1;
  }
  React.useEffect(() => {
    if (searchTerm.length > 1) {
      const results = products.filter((pro) =>
        stringIncludes(pro.name.toLowerCase(), searchTerm.toLocaleLowerCase())
      );
      setProductos(results);
    } else if (searchTerm <= 1) {
      setProductos([]);
    }
  }, [searchTerm]);
  const scroll = (id) => {
    if (id == 0) {
      return;
    }
    var elmnt = document.getElementById(id);
    setTimeout(() => {
      if (process.browser) {
        elmnt.scrollIntoView();
      }
      window.scrollBy(0, -11);
    }, 700);
  };
  return (
    <ListProvider>
      <div id="step2Div" className="row">
        <div className="top col-md-2">
          <div className="sidenav">
            <h5 className="titlecat">Categorías</h5>
            <br />
            <div>
              <SearchBar title=" Buscador" />
            </div>
            {categories.map((category, index) => (
              <div key={index} onClick={() => scroll(index + 1 - 1)}>
                <Side key={index} category={category} index={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="both col-md-7">
          <div className="contain">
            <div className="top-items">
              <Search>
                <div className="search-products">
                  <h3>¿Qué estás buscando?</h3>
                  <form>
                    <div className="product-filter-container">
                      <i className=" fa fa-search icon-search"></i>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </form>
                  <div className="results">
                    <div className="product-container row">
                      {pr.length >= 1 &&
                        pr.map((product) => (
                          <Product key={product.id} product={product} />
                        ))}
                    </div>
                  </div>
                </div>
              </Search>
              {categories.map((category, index) => (
                <div
                  key={index}
                  id={index + 1}
                  onClick={() => scroll(index + 1 - 1)}
                >
                  <Accord key={index} category={category} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="both col-md-3">

          <div id="divone">
            <div id="block_container2">
              <div id="block3">
                <h5 className="textdone">
                  <strong>MI PEDIDO</strong>
                </h5>
              </div>

              <div id="block4">
                <i className="fa fa-shopping-cart iconsho">
                  <input type="text" className="countd" value="0" disabled />
                </i>
              </div>
            </div>
          </div>

          <div id="divfourth">
            <CartItemsContainer />
          </div>
        </div>
      </div>
    </ListProvider>
  );
};
export default ControlledAccordions;
