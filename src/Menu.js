import { Panier, incrementPrice } from "./Panier.js";
import imgHeader from "./header-image.jpeg";

import { useState } from "react";

const Menu = ({ data }) => {
  const [basket, setBasket] = useState([]);
  return (
    <>
      <div className="header-bottom">
        <div className="col1">
          <h1>Le Pain Quotidien - Montorgueil</h1>
          <p>
            Profitez de chaque plaisir de la vie quotidienne. Le Pain Quotidien
            propose des ingrédients simples et sains, du bon pain, des fruits et
            des légumes frais et de saison issus de l’agriculture biologique.
          </p>
        </div>
        <div className="col2">
          <img src={imgHeader} alt="" />
        </div>
      </div>
      <main>
        <div className="col1-left">
          {data.categories.map((x, id) => {
            return (
              <div key={id}>
                <h2>
                  {x.name === "Sandwichs baguette" ||
                  x.name === "Desserts" ||
                  x.name === "Boissons fraîches" ||
                  x.name === "Epicerie bio" ||
                  x.name === "Repas corporate" ||
                  x.name === "Couverts"
                    ? null
                    : x.name}
                </h2>
                <div className="category">
                  {x.meals.map((y, id2) => {
                    return (
                      <div className="dis-mm" key={id2}>
                        <div
                          className="menu-mini"
                          onClick={() => {
                            const newArr = [...basket];

                            if (newArr.length === 0) {
                              newArr.push({
                                name: y.title,
                                price: y.price,
                                quantity: 1,
                              });
                              setBasket(newArr);
                            } else if (newArr.length > 0) {
                              let status = newArr.some(function (el) {
                                return el.name === y.title;
                              });

                              if (status) {
                                console.log(y.quantity);
                                incrementPrice(id2, basket, setBasket);
                              } else {
                                newArr.push({
                                  name: y.title,
                                  price: y.price,
                                  quantity: 1,
                                });
                                setBasket(newArr);
                              }
                            }
                          }}
                        >
                          <div>
                            <h3>{y.title}</h3>
                            <p>{y.description}</p>
                            <p>
                              <span id="price">{y.price} €</span>
                              <span className="Populaire">
                                {y.popular ? " ★ Populaire" : null}
                              </span>
                            </p>
                          </div>
                          <div>
                            {/* <img src={y.picture ? y.picture : null} alt="" /> */}
                            {y.picture ? (
                              <img
                                src={y.picture}
                                alt="visual description of menu"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Panier basket={basket} setBasket={setBasket} />
      </main>
    </>
  );
};

export default Menu;
