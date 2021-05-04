const incrementPrice = (index, bas, setbas) => {
  const newArr = [...bas];
  newArr[index].quantity += 1;
  setbas(newArr);
};

const incrementPriceClick = (index, bas, setbas, title) => {
  const newArr = [...bas];
  let ind = newArr.findIndex((o) => o.name === title);

  newArr[ind].quantity += 1;
  setbas(newArr);
};

const Panier = ({ basket, setBasket, numberItems, setNumberItems }) => {
  const calculatePrice = () => {
    let totalprice = 0;
    for (let i = 0; i < basket.length; i++) {
      totalprice += Number(basket[i].price) * Number(basket[i].quantity);
    }

    return totalprice;
  };

  const displaySubPrice = () => {
    return (
      <span className="SubPrice">
        <span>Sous-Total</span> <span>{calculatePrice()}</span>
      </span>
    );
  };

  const displayPrice = () => {
    return <span>{calculatePrice() + 2.5} €</span>;
  };

  const verifyIfNull = () => {
    let newArr = [...basket];
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].quantity === 0) {
        newArr.splice(i, 1);
        setBasket(newArr);
      }
    }
    setBasket(newArr);
  };
  return (
    <div className="Panier">
      <h3>Valider mon panier</h3>
      <div className="Panier-produit">
        {basket.length > 0
          ? basket.map((b, index) => {
              return (
                <div key={index}>
                  <button
                    onClick={() => {
                      verifyIfNull();

                      incrementPrice(index, basket, setBasket);
                    }}
                  >
                    +
                  </button>
                  {b.quantity}
                  <button
                    onClick={() => {
                      const newArr = [...basket];
                      verifyIfNull();
                      if (newArr[index].quantity !== 0) {
                        newArr[index].quantity -= 1;
                        setBasket(newArr);
                      }
                    }}
                  >
                    {b.quantity === 0 ? "❌" : "-"}
                  </button>
                  <span>{b.name}</span> <span>{b.price} €</span>
                </div>
              );
            })
          : "Panier vide"}
      </div>
      <hr />
      <div className="PricePanier">
        <div>{basket.length > 0 ? displaySubPrice() : null}</div>
        <div>
          {basket.length > 0 ? (
            <span className="fraislivr">
              <span>Frais de livraison</span> <span>2.5 €</span>
            </span>
          ) : null}
        </div>
        <hr />
        <div>
          {basket.length > 0 ? (
            <span className="totalpr">
              <span>Total </span>
              <span>{displayPrice()}</span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Panier, incrementPrice, incrementPriceClick };
