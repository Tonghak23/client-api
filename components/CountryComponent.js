import React, {useState, useEffect } from 'react'
import axios from "axios";
import { Button, Modal, Alert, Space, Spin, Image, Dropdown } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';

const CountryComponent = () => {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [countryperPage, setCountryPerPage] = useState(25);
    const [size, setSize] = useState('large');

    const fetchCountry = async () => {
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
        setCountries(data);
    }

    useEffect(() => {
        fetchCountry();
    }, []);

    const findOneCountry = async (name) => {
        if(name) {
            setLoading(true);
            const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            if(data) {
                setCountry(data[0]);
                setLoading(false);
                setOpen(true);
            }
        }
    }

    const handleSortingAsc = async () => {
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
        const countryAsc = data.sort((a, b) => a.name.official.localeCompare(b.name.official));
        setCountries(countryAsc);
    }

    const handleSortingDesc = async () => {
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
        const countryDesc = data.sort((a, b) => a.name.official.localeCompare(b.name.official)).reverse();
        setCountries(countryDesc);
    }


    const lastIndex = currentPage * countryperPage;
    const firstIndex = lastIndex - countryperPage;
    const currentCountry = countries.slice(firstIndex, lastIndex);

    const items = [
        {
            key: 'asc',
            label: (
                <a rel="a" onClick={handleSortingAsc}>
                    A to Z
                </a>
            ),
        },
        {
            key: 'desc',
            label: (
                <a rel="z" onClick={handleSortingDesc}>
                    Z to A
                </a>
            ),
        }
    ];

  return (
      <>
          <Modal title="View more detail" style={{ top: 100 }} open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} width={1000}>
              <div className="container">
                  <div className="row">
                        <div className="col-lg-5">
                          <div className="card">
                              <img src={`${country.flags?.png}`} className="card-img-top" width="100%" height="100%" alt="..." />
                          </div>      
                        </div>
                        <div className="col-lg-7">
                          <h4>{country.name?.official}</h4>
                          <p>{country?.capital}</p>
                        </div>
                    </div>
                </div>
          </Modal>
          {loading ? (<LoadingComponent />) : (<>

          </>)}
          <div className="container py-5">
                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                      <input type="search" onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search country here..." aria-label="Search any country here..." />
                  </div>
                  <div>
                      <Dropdown size={size} menu={{items}}
                          placement="bottomLeft" arrow>
                          <Button>Sorting country</Button>
                      </Dropdown>
                  </div>
                </div>
               
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                  {currentCountry.filter((item) => {
                      return search.toLowerCase() === ''
                          ? item
                          : item.name.official.toLowerCase().includes(search);
                  }).map(item => (
                            <>
                                <div className="col" key={item.name}>
                                    <div className="card shadow-sm">
                                        <div className="cover">
                                            <img src={`${item.flags.png}`} className="bd-placeholder-img card-img-top" width="100%" height="100%" alt="Country" />
                                        </div>
                                        <div className="card-body">
                                            <p className="card-title" onClick={() => findOneCountry(item.name.official)}>{item.name?.official}</p>
                                            <p className="card-text">{item.idd?.root}{item.idd?.suffixes?.[0] ? item.idd?.suffixes?.[0] : item.idd?.suffixes}</p>
                                            <p className="card-text">{item.name?.nativeName?.zho?.official ? item.name?.nativeName?.zho?.official : ''}</p>
                                            <p className="card-text">{item?.altSpellings[0] ? item?.altSpellings[0] : item?.altSpellings}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    {/* <Button type="primary" onClick={() => findOneCountry(item.name.official)}>
                                                        View
                                                    </Button> */}
                                                </div>
                                                <small className="text-muted">{item.cca2}  {item.cca3} </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </>
                      ))}
              </div>
              <PaginationComponent
                  totalCountry={countries.length}
                  countryPerPage={countryperPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                
              />
              </div>
    </>
  )
}

export default CountryComponent;