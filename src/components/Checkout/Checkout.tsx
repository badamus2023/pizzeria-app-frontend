import React, { Fragment } from "react";
import classes from './Checkout.module.css'

const Checkout:React.FC = () => {
    return (
      <Fragment>
        <div className={classes.checkoutFormContainer}>
          <form className={classes.checkoutForm}>
            <label htmlFor="checkoutName">Imie</label>
            <input type="text" id="checkoutName" />
            <label htmlFor="checkoutLastName">Nazwisko</label>
            <input type="text" id="checkoutLastName" />
            <label htmlFor="checkoutStreet">Adres</label>
            <input type="text" id="checkoutStreet" />
            <label htmlFor="checkoutCity">Miasto</label>
            <input type="text" id="checkoutCity" />
            <label htmlFor="checkoutZip-code">Kod pocztowy</label>
            <input type="text" id="checkoutZip-code" />
            <div className={classes.checkoutActions}>
            <button>Zamów</button>
            <button>Wróć</button>
            </div>
          </form>
        </div>
      </Fragment>
    );
}

export default Checkout;