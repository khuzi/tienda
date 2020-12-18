import { Hidden } from "@material-ui/core";
import React from "react";

function Attribute({ name }) {
  switch (name) {
    case "pa_tamano":
      return <span>Tamaño:</span>;
    case "pa_bano":
      return <span>Baño:</span>;
    case "pa_sabor":
      return <span>Sabor:</span>;
    case "pa_azucar":
      return <span>Azucar:</span>;
    default:
      return null;
  }
}

export default class singleVariation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attributes: [],
      options: [],
      filters: [],
      matches: [],
    };
    this.variations = this.props.variations;
    this.attributes = this.props.attributes;
    this.onMatchFound = this.props.onMatchFound;
  }

  componentDidMount() {
    this.getAttributes();
  }

  getAttributes = () => {
    let newAttributes = [];
    let newOptions = [];
    this.variations.map((variation) => {
      variation.attributes.nodes.map((variation_attribute) => {
        //CHECK IF ATTRIBUTE EXISTS
        const attributes = newAttributes.filter(
          (attribute) => variation_attribute.name == attribute
        );
        if (attributes.length == 0) {
          newAttributes.push(variation_attribute.name);
        }
        //CHECK IF OPTION EXISTS
        const options = newOptions.filter((option) => {
          if (option.key == variation_attribute.name) {
            return option.value == variation_attribute.value;
          }
        });
        if (options.length == 0) {
          newOptions.push({
            key: variation_attribute.name,
            value: variation_attribute.value,
          });
        }
      });
    });

    this.setState({ attributes: newAttributes });
    this.setState({ options: newOptions });
  };

  onVariationChange = (key, value) => {
    var newFilters = [];

    if (
      this.state.filters.length > 0 &&
      this.state.matches.filter((match) => match == value).length == 0
    ) {
      newFilters = [];
    } else if (
      !(this.state.filters.length > 0 && this.state.filters[0].key == key)
    ) {
      newFilters = this.state.filters.filter((filter) => filter.key !== key);
    }

    newFilters = [{ key, value }, ...newFilters];
    this.setState(
      {
        filters: newFilters,
      },
      () => {
        // CHECK IF WE FOUND A VARIATION
        this.findVariationWithFilters();
        this.updateVariationMatches();
      }
    );
  };

  updateVariationMatches = () => {
    var newMatches = [];
    this.state.filters.map((filter) => {
      this.variations.map((variation) => {
        variation.attributes.nodes.map((attribute) => {
          if (attribute.name == filter.key && attribute.value == filter.value) {
            variation.attributes.nodes.map((vattribute) => {
              newMatches.push(vattribute.value);
            });
          }
        });
      });
    });
    this.setState({ matches: newMatches }, () => {
      // console.log(this.state.matches)
    });
  };

  findVariationWithFilters = () => {
    if (this.state.filters.length == this.state.attributes.length) {
      const variations = this.variations.filter((variation) => {
        return (
          variation.attributes.nodes.filter(
            (attribute) =>
              this.state.filters.filter(
                (filter) =>
                  attribute.name == filter.key &&
                  attribute.value == filter.value
              ).length >= 1
          ).length >= this.state.filters.length
        );
      });
      this.onMatchFound(variations[0]);
    }
  };

  findImageWithColor = (color) => {
    const variations = this.variations.filter((variation) => {
      return (
        variation.attributes.nodes.filter(
          (attribute) => attribute.option == color
        ).length > 0
      );
    });
    if (variations.length > 0) {
      if (variations[0].image != null) {
        return variations[0].image.src;
      }
    }
    return undefined;
  };

  render() {
    const { attributes, options, filters, matches } = this.state;
    return (
      <div>
        <div className="item__variations variation__table">
          {attributes.map((attribute, index) => {
            return (
              <div key={index} style={{ paddingBottom: 0, paddingLeft: 0 }}>
                <Attribute name={attribute} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {options.map((option, index) => {
                    if (option.key == attribute) {
                      const isDisable = () => {
                        if (filters.length == 1 && filters[0].key == option.key)
                          return false;
                        if (
                          filters.length > 0 &&
                          matches.filter((match) => match == option.value)
                            .length > 0
                        ) {
                          return false;
                        }
                        if (filters.length == 0) return false;
                        return true;
                      };

                      const isSelected = () => {
                        if (
                          filters.length > 0 &&
                          filters.filter(
                            (filter) =>
                              filter.key == option.key &&
                              filter.value == option.value
                          ).length > 0
                        )
                          return true;
                        return false;
                      };
                      // HERE WE RENDER EACH OPTION FOR THE ATTRIBUTES
                      return (
                        <div
                          key={index}
                          style={
                            isDisable()
                              ? styles.restAttributesDisable
                              : isSelected()
                              ? styles.restAttributesSelected
                              : styles.restAttributesEnable
                          }
                          onClick={(e) => {
                            this.onVariationChange(option.key, option.value);
                          }}
                        >
                          <a>{option.value}</a>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const styles = {
  restAttributesEnable: {
    overflow: "hidden",
    width: "49%",
    height: "auto",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    padding: "12px",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  restAttributesDisable: {
    // visibility: 'hidden',
    pointerEvents: "none",
    width: "49%",
    height: "auto",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    padding: "12px",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: 0.3,
  },
  restAttributesSelected: {
    width: "49%",
    height: "auto",
    background: "red",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    padding: "12px",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};
