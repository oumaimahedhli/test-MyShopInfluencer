import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getBrands } from "../store/actions/brandAction";
import { Table, Button } from "react-bootstrap";

const BrandsList = () => {
  const brands = useSelector((state) => state.brand);

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const renderBrands = () => {
    const listBrand = _.map(brands, (brand) => brand);
    let filtered_array = _.filter(listBrand, function (o) {
      return o.name === "kiabi" || o.name === "gemo" || o.name === "sephorafr";
    });

   
    return (
      <div>
       
          <Table borderless hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filtered_array.map((brand, index) => {
                return (
                  <tr>
                    <td>{index++}</td>

                    <td>{brand.name}</td>
                    <td>
                      <Link to ={{pathname:`domain/brand/${brand.brandId}`}}>
                      <Button
                        variant="info"
                       
                      >
                        Info
                      </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
       
      </div>
    );
  };
  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Brands List</h4>
      </div>
      {renderBrands()}
    </div>
  );
};

export default BrandsList;
