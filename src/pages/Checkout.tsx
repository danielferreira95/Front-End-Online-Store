import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Itens } from './cart/types';

function Checkout() {
  const [products, setProducts] = useState<Itens[]>([]);
  const [fullName, SetFullName] = useState<string>('');
  const [email, SetEmail] = useState<string>('');
  const [cpf, SetCpf] = useState<string>('');
  const [phone, SetPhone] = useState<string>('');
  const [cep, SetCep] = useState<string>('');
  const [address, SetAddress] = useState<string>('');
  const [isValidatedField, setIsValidatedField] = useState<boolean>(false);
  const [checkButtom, setCheckButtom] = useState<boolean>(false);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('products');
    const notNull = dataLocalStorage || '[]';
    const parseLocalStorage = JSON.parse(notNull);
    setProducts(parseLocalStorage);
  }, []);
  const navegate = useNavigate();

  function handleSubmitForm() {
    const isValid = (currentValue: string) => currentValue !== '';
    const fieldString = [fullName, email, cpf, phone, cep, address];
    const valid = fieldString.every(isValid);
    if (!valid || !checkButtom) {
      setIsValidatedField(true);
    } else {
      setIsValidatedField(false);
      localStorage.setItem('products', JSON.stringify([]));
      return navegate('/');
    }
  }

  return (

    <section>
      {
        isValidatedField && <h2 data-testid="error-msg">Campos inválidos</h2>
      }
      <div>
        { products.map((el, index) => <p key={ index }>{ el.title }</p>) }
      </div>
      <form>
        <label htmlFor="checkout-fullname">
          Nome:
          <input
            type="text"
            data-testid="checkout-fullname"
            value={ fullName }
            onChange={ (event) => SetFullName(event.target.value) }
            required
          />
        </label>
        <label htmlFor="checkout-email">
          Email:
          <input
            type="email"
            data-testid="checkout-email"
            value={ email }
            onChange={ (event) => SetEmail(event.target.value) }
            required
          />
        </label>
        <label htmlFor="checkout-cpf">
          CPF:
          <input
            type="text"
            data-testid="checkout-cpf"
            value={ cpf }
            onChange={ (event) => SetCpf(event.target.value) }
            required
          />
        </label>
        <label htmlFor="checkout-phone">
          Telefone:
          <input
            type="tel"
            data-testid="checkout-phone"
            value={ phone }
            onChange={ (event) => SetPhone(event.target.value) }
            required
          />
        </label>
        <label htmlFor="checkout-cep">
          CEP:
          <input
            type="text"
            data-testid="checkout-cep"
            value={ cep }
            onChange={ (event) => SetCep(event.target.value) }
            required
          />
        </label>
        <label htmlFor="checkout-address">
          Endereço:
          <input
            type="text"
            data-testid="checkout-address"
            value={ address }
            onChange={ (event) => SetAddress(event.target.value) }
            required
          />
        </label>
      </form>
      <fieldset>
        <legend>Método de Pagamento</legend>

        <div>
          <input
            type="radio"
            id="ticket-payment"
            name="groupPayment"
            value="ticket-payment"
            data-testid="ticket-payment"
            onClick={ () => setCheckButtom(true) }
          />
          <label htmlFor="ticket-payment">Boleto</label>
        </div>

        <div>
          <input
            type="radio"
            id="visa-payment"
            name="groupPayment"
            value="visa-payment"
            data-testid="visa-payment"
            onClick={ () => setCheckButtom(true) }
          />
          <label htmlFor="visa-payment">Visa</label>
        </div>

        <div>
          <input
            type="radio"
            id="master-payment"
            name="groupPayment"
            value="master-payment"
            data-testid="master-payment"
            onClick={ () => setCheckButtom(true) }
          />
          <label htmlFor="master-payment">Mastercard</label>
        </div>

        <div>
          <input
            type="radio"
            id="elo-payment"
            name="groupPayment"
            value="elo-payment"
            data-testid="elo-payment"
            onClick={ () => setCheckButtom(true) }
          />
          <label htmlFor="elo-payment">Elo</label>
        </div>
      </fieldset>

      <button
        onClick={ handleSubmitForm }
        type="submit"
        data-testid="checkout-btn"
      >
        Comprar
      </button>
    </section>
  );
}

export default Checkout;
