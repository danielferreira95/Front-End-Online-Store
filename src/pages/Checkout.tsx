import { useState, useEffect } from 'react';
import { Itens } from './cart/types';

function Checkout() {
  const [products, setProducts] = useState<Itens[]>([]);
  const [fullName, SetFullName] = useState<string>('');
  const [email, SetEmail] = useState<string>('');
  const [cpf, SetCpf] = useState<string>('');
  const [phone, SetPhone] = useState<string>('');
  const [cep, SetCep] = useState<string>('');
  const [address, SetAddress] = useState<string>('');
  const [ticketPayment, SetTicketPayment] = useState<string>('');
  const [visaPayment, SetVisaPayment] = useState<string>('');
  const [masterPayment, SetMasterPayment] = useState<string>('');
  const [eloPayment, SetEloPayment] = useState<string>('');
  const [isValidatedField, setIsValidatedField] = useState<boolean>(false);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('products');
    const notNull = dataLocalStorage || '[]';
    const parseLocalStorage = JSON.parse(notNull);
    setProducts(parseLocalStorage);
  }, []);

  function handleSubmitForm() {
    const isValid = (currentValue: string) => currentValue !== '';
    const fieldString = [fullName, email, cpf, phone, cep, address];
    const valid = fieldString.every(isValid);
    if (!valid) {
      setIsValidatedField(true);
    } else setIsValidatedField(false);
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
      <div>
        <h3>Método de Pagamento</h3>
        <input
          type="radio"
          data-testid="ticket-payment"
          value={ ticketPayment }
          onChange={ (event) => SetTicketPayment(event.target.value) }
          required
        />
        Boleto
        <input
          type="radio"
          data-testid="visa-payment"
          value={ visaPayment }
          onChange={ (event) => SetVisaPayment(event.target.value) }
          required
        />
        Visa
        <input
          type="radio"
          data-testid="master-payment"
          value={ masterPayment }
          onChange={ (event) => SetMasterPayment(event.target.value) }
          required
        />
        MasterCard
        <input
          type="radio"
          data-testid="elo-payment"
          value={ eloPayment }
          onChange={ (event) => SetEloPayment(event.target.value) }
          required
        />
        Elo
      </div>
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
