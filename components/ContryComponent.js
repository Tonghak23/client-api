import React, {useState, useEffect } from 'react'
import axios from "axios";
import { Button, Modal, Alert, Space, Spin } from 'antd';

const ContryComponent = () => {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countryperPage, setCountryPerPage] = useState(25);

    const fetchCountry = async () => {
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountries(data);
    }

    useEffect(() => {
        fetchCountry();
    }, [])

    const findOneCountry = async (name) => {
        if(name) {
            setLoading(true);
            const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            if (data) {
                console.warn(data[0]);
                setCountry(data[0]);
                setLoading(false);
                setOpen(true);
            }
        }
    }

    const lastIndex = currentPage * countryperPage;
    const firstIndex = lastIndex - countryperPage;
    const currentCountry = countries.slice(firstIndex, lastIndex);

  return (
      <>
          <Modal title="View more detail" style={{ top: 100 }} open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={900}>
              <div className="container">
                  <div className="row">
                        <div className="col-lg-5">
                          <div className="card">
                              <img src={`${country.flags?.png}`} className="card-img-top" width="100%" height="100%" alt="..." />
                          </div>      
                        </div>
                        <div className="col-lg-7">
                          <h4>{country.name?.official}</h4>
                        </div>
                    </div>
                </div>
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
                                            <p className="card-text">{item.name?.official}</p>
                                          <p className="card-text">{item.idd?.root}{item.idd?.suffixes}</p>
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