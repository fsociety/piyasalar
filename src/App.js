import React,{ useState, useEffect } from "react";
import { IMaskInput } from 'react-imask';
import axios from "axios";

const date = new Date();
// YYYY-MM-DD
const dateFormat = date.getFullYear() + '-'
+ ((date.getMonth()+1).toString().length < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)) +'-'
+ date.getDate()

function App() {
  const [currency, setCurrency] = useState({});
  const [timer, setTimer] = useState(null)
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('USD')
  const [result, setResult] = useState(0);

  useEffect(() => {
    //her bir döviz kuru için ayrı ayrı istek göndermek istemediğim için TRY Cinsinden çekip 1'e bölerek kuru bulmayı tercih ettim.
    axios.get('https://api.exchangerate.host/latest',{
      params:{
        base:'TRY',
        symbols: 'USD,EUR,GBP,JPY,DKK,NOK',
        v: dateFormat
      }
    })
    .then(({data}) => {
      setCurrency({
        usd: (1 / data.rates.USD).toFixed('4'),
        jpy: (1 / data.rates.JPY).toFixed('4'),
        dkk: (1 / data.rates.DKK).toFixed('4'),
        eur: (1 / data.rates.EUR).toFixed('4'),
        gbp: (1 / data.rates.GBP).toFixed('4'),
        nok: (1 / data.rates.NOK).toFixed('4'),
      });
    })
    .catch(err => console.log(err))
  }, [])

  //para ve para birimi değiştiğinde burası çalışacak
  useEffect(() => {
    // her tuşa basıldığında istek göndermek yerine sistemi yormamak için 500 milisaniyelik bir delay verdim
    // kullanıcı tuşa basmayı bıraktığında istek gönderilecek
    clearTimeout(timer);
    const timerFunc = setTimeout(() => {
      axios.get('https://api.exchangerate.host/convert',{
      params:{
        from:from,
        to: 'TRY',
        date: dateFormat,
        amount: amount,
        places: 2
      }
    })
    .then(({data}) => {
      setResult(data.result)
    })
    .catch(err => console.log(err))
    }, 500);

    setTimer(timerFunc)

  }, [amount,from])
  

  const moneyFormat = (val) => {
    try {
      let res = val.toFixed(2).split(".");
      return res[0].replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1.') +","+ res[1];
    } catch (error) {
      return '0,00';
    }
  }
  
  return (
    <main>
      <div className="container">
        <h1>Piyasalar</h1>
        <div className="row">
          <div className="col-xl-8">
            <div className="list">
              
              <div className="item">
                <div className="unit w-50">
                  <div className="flag">
                    <img src="/assets/usd.png" width={43} height={30} alt="" />
                  </div>
                  <div>
                    <h2>USD</h2>
                    <small>Amerikan Doları</small>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className="buy">
                    <h2>ALIŞ</h2>
                    <span>{currency?.usd}</span>
                  </div>
                  <div className="sale">
                    <h2>SATIŞ</h2>
                    <span>{currency?.usd}</span>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="unit w-50">
                  <div className="flag">
                    <img src="/assets/jpy.png" width={43} height={30} alt="" />
                  </div>
                  <div>
                    <h2>JPY</h2>
                    <small>Japon Yeni</small>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <div className="buy">
                    <h2>ALIŞ</h2>
                    <span>{currency?.jpy}</span>
                  </div>
                  <div className="sale">
                    <h2>SATIŞ</h2>
                    <span>{currency?.jpy}</span>
                  </div>
                </div>
              </div>
              
              <div className="item">
                <div className="unit w-50">
                  <div className="flag">
                    <img src="/assets/dkk.png" width={43} height={30} alt="" />
                  </div>
                  <div>
                    <h2>DKK</h2>
                    <small>Danimarka Kronu</small>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <div className="buy">
                    <h2>ALIŞ</h2>
                    <span>{currency?.dkk}</span>
                  </div>
                  <div className="sale">
                    <h2>SATIŞ</h2>
                    <span>{currency?.dkk}</span>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="unit w-50">
                  <div className="flag">
                    <img src="/assets/eur.png" width={43} height={30} alt="" />
                  </div>
                  <div>
                    <h2>EUR</h2>
                    <small>Avrupa Para Birimi</small>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <div className="buy">
                    <h2>ALIŞ</h2>
                    <span>{currency?.eur}</span>
                  </div>
                  <div className="sale">
                    <h2>SATIŞ</h2>
                    <span>{currency?.eur}</span>
                  </div>
                </div>
              </div>

              <div className="item">
                <div className="unit w-50">
                  <div className="flag">
                    <img src="/assets/gbp.png" width={43} height={30} alt="" />
                  </div>
                  <div>
                    <h2>GBP</h2>
                    <small>İngiliz Sterlini</small>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <div className="buy">
                    <h2>ALIŞ</h2>
                    <span>{currency?.gbp}</span>
                  </div>
                  <div className="sale">
                    <h2>SATIŞ</h2>
                    <span>{currency?.gbp}</span>
                  </div>
                </div>
              </div>
              
              <div className="item">
                <div className="unit w-50">
                  <div className="flag">
                    <img src="/assets/nok.png" width={43} height={30} alt="" />
                  </div>
                  <div>
                    <h2>NOK</h2>
                    <small>Norveç Kronu</small>
                  </div>
                </div>
                <div className="d-flex justify-content-end w-50">
                  <div className="buy">
                    <h2>ALIŞ</h2>
                    <span>{currency?.nok}</span>
                  </div>
                  <div className="sale">
                    <h2>SATIŞ</h2>
                    <span>{currency?.nok}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="col-xl-4">
            <div className="converter mx-auto">
              <h2>Döviz Çevir</h2>
              <div className="inpt-group">
                <div className="currency-unit">
                  <IMaskInput
                    mask={Number}
                    thousandsSeparator={'.'}
                    radix="."
                    className="form-control"
                    unmask={true}
                    onAccept={(value, mask) => setAmount(value)}
                  />
                  
                  <select className="form-select" onChange={e => setFrom(e.target.value)}>
                    <option value="usd">USD</option>
                    <option value="jpy">JPY</option>
                    <option value="dkk">DKK</option>
                    <option value="eur">EUR</option>
                    <option value="gbp">GBP</option>
                    <option value="nok">NOK</option>
                  </select>
                </div>
                <img src="/assets/buttons-change.svg" alt="" />
                <div className="result">
                  <div>{moneyFormat(result)}</div>
                  <div>TL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4">
            <a href="/" className="btn btn-1 mx-auto ms-xl-0 me-xl-auto">
              Detaylı Bilgi
            </a>
          </div>
          <div className="col-xl-4">
            <a href="/" className="btn btn-2 mx-auto me-xl-0 ms-xl-auto">
              Tüm Piyasalar
              <img src="/assets/icons-32-go.png" className="d-block d-xl-none" alt="" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
