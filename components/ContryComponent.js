import React, {useState, useEffect } from 'react'
import axios from "axios";
import { Button, Modal } from 'antd';

const ContryComponent = () => {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [open, setOpen] = useState(false);

    const fetchCountry = async () => {
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountries(data);
    }

    useEffect(() => {
        fetchCountry();
    }, [])

    const findOneCountry = async (name) => {
        if(name) {
            setOpen(true);
            const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            setCountry(data);
        }
    }

  return (
      <>
          <Modal
              title="View more detail"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={900}
          >
              <p>{country.name?.official}</p>
              <p>some contents...</p>
              <p>some contents...</p>
          </Modal>

          <div className="album py-5 bg-light">
              <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                      {countries.map(item => (
                            <>
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img src={`${item.flags.png}`} className="bd-placeholder-img card-img-top" width="100%" height="100%" alt="Country" />
                                        <div className="card-body">
                                            <p className="card-text">{item.name.official}</p>
                                            <p className="card-text">{item.name?.nativeName?.zho?.official}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <Button type="primary" onClick={() => findOneCountry(item.name.official)}>
                                                        View
                                                    </Button>
                                                </div>
                                                <small className="text-muted">{item.cca2}  {item.cca3} </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </>
                        ))}
                  </div>
              </div>
          </div>
    </>
  )
}

export default ContryComponent