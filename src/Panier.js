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
    return <span>Sous-Total {calculatePrice()}</span>;
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
      <p>
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
                  {b.name} {b.price} €<div>Sous total</div>
                </div>
              );
            })
          : "Panier vide"}
      </p>
      <div>{basket.length > 0 ? displaySubPrice() : null}</div>
      <div>{basket.length > 0 ? "2.5 €" : null}</div>
      <div>Total {basket.length > 0 ? displayPrice() : null}</div>
    </div>
  );
};

export { Panier, incrementPrice, incrementPriceClick };
