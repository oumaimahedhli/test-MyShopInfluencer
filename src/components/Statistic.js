import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getPurchases } from "../store/actions/purchaseAction";
import { getBrandById } from "../store/actions/brandAction";
import Figure from "react-bootstrap/Figure";
import { Table, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

import { getinfluenceur } from "../store/actions/influenceurAction";
const countDistinct = (arr) => {
  let res = 1;

  for (let i = 1; i < arr.length; i++) {
    let j = 0;
    for (j = 0; j < i; j++) if (arr[i] === arr[j]) break;

    if (i === j) res++;
  }
  return res;
};
const Statistic = () => {
  const [month, setMonth] = useState({ name: "January", id: 1 });
  const [index, setIndex] = useState(0);

  const influenceurs = useSelector((state) => state.influenceur);
  const purchases = useSelector((state) => state.purchase);

  const brands = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchases());
    dispatch(getBrandById());
    dispatch(getinfluenceur());
  }, []);

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var months1 = [
    { name: "January", id: 1 },
    { name: "February", id: 2 },
    { name: "March", id: 3 },
    { name: "April", id: 4 },
    { name: "May", id: 5 },
    { name: "June", id: 6 },
    { name: "July", id: 7 },
    { name: "August", id: 8 },
    { name: "September", id: 9 },
    { name: "October", id: 10 },
    { name: "November", id: 11 },
    { name: "December", id: 12 },
  ];
  const togglePrev = (e) => {
    let index1 = index > 0 ? index - 1 : 11;

    setIndex(index1);
    setMonth(months1[index1]);
  };

  const toggleNext = (e) => {
    let index1 = index < 11 ? index + 1 : 0;

    setIndex(index1);

    setMonth(months1[index1]);
  };
  const sliders = () => {
    return (
      <Row>
        <Col>
          {" "}
          <FaAngleLeft onClick={togglePrev}> </FaAngleLeft>
        </Col>

        <Col>{month ? month.name : ""}</Col>

        <Col>
          <FaAngleRight onClick={toggleNext}></FaAngleRight>
        </Col>
      </Row>
    );
  };
  const renderBrands = () => {
    let url = window.location.pathname.split("/");
    var lastSegment = url.pop() || url.pop();
    const listBrands = _.map(brands, (brand) => brand);
    let [infoBrand] = _.filter(listBrands, function (o) {
      return o.brandId == lastSegment;
    });

    const listpurchase = _.map(purchases, (purchase) => purchase);
    let infoPurchases = _.filter(listpurchase, function (o) {
        return o.brandId == lastSegment;
      });
    let grouped_array = _.groupBy(infoPurchases, "influencerId");
    let dataPurchases = _.map(grouped_array, (purchase) => purchase);

    let data = [];
    if (dataPurchases) {
      
      dataPurchases.forEach((element) => {
        {
          let sumCommis = 0;
          let salesNumb = 0;
          let influencerId = "";
          let creation_timestamp;
          let products = [];
          element.forEach((el) => {
            sumCommis = sumCommis + parseFloat(el.commissionInfluencer);
            salesNumb++;
            influencerId = el.influencerId;
            creation_timestamp = el.creation_timestamp;
            products.push(el.productId);
          });
          const productsNumber = countDistinct(products);
          var date = new Date(creation_timestamp * 1000);
          var monthN = date.getUTCMonth();
          var day = date.getUTCDate();

          let monthName = months[monthN];
          let listInfluenceur = _.map(
            influenceurs,
            (influenceur) => influenceur
          );
          let infoInfluenceur;
          listInfluenceur.forEach((element) => {
            if (element.id === influencerId) {
              infoInfluenceur = element;
            }
          });

          data.push({
            sumCommis,
            salesNumb,
            infoInfluenceur,
            productsNumber,
            monthName,
            day,
          });
        }
      });
    }

    let sort = _.sortBy(data, [
      function (o) {
        return o.day;
      },
    ]);
    let charts = _.groupBy(sort, "monthName");
    const saleSum = charts[month.name]
      ? charts[month.name].reduce(
          (accumulator, current) => accumulator + current.salesNumb,
          0
        )
      : 0;
    const CommissionsSum = charts[month.name]
      ? charts[month.name].reduce(
          (accumulator, current) => accumulator + current.sumCommis,
          0
        )
      : 0;
      console.log(charts)

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Figure>
                <Figure.Image
                  width={600}
                  height={1024}
                  alt="400x400"
                  src={infoBrand ? infoBrand.pic : ""}
                />
              </Figure>
            </Col>

            <Col
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginBottom: "50 px",
              }}
            >
              Sales Number
              <h3>{saleSum}</h3>
              Sales Amount
              <h3>{CommissionsSum} $</h3>
            </Col>
            <Col>
              <div>
                <Chart data={charts[month.name] ? charts[month.name] : []}>
                  <ArgumentAxis argumentField="months" />
                  <ValueAxis />

                  <LineSeries valueField="salesNumb" argumentField="day" />
                </Chart>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginBottom: "50 px",
              }}
            >
              <span> {infoBrand ? infoBrand.name : null}</span>{" "}
            </Col>
            <Col
              style={{
                textAlign: "center",
              }}
            >
              {sliders()}
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <Table bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Influencers</th>

                    <th>Sales number</th>
                    <th>Commissions amount</th>
                    <th>Products number</th>
                  </tr>
                </thead>
                <tbody>
                  {charts[month.name] ? (
                    charts[month.name].map((brand, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <Row>
                              <Col>
                                {" "}
                                <Figure>
                                  <Figure.Image
                                    width={200}
                                    height={400}
                                    alt="400x400"
                                    src={
                                      brand.infoInfluenceur
                                        ? brand.infoInfluenceur.img
                                        : ""
                                    }
                                  />
                                </Figure>
                              </Col>
                              <Col>
                                <h4>
                                  {brand.infoInfluenceur
                                    ? brand.infoInfluenceur.name
                                    : null}
                                </h4>
                                <h5>
                                  {brand.infoInfluenceur
                                    ? brand.infoInfluenceur.email
                                    : null}
                                </h5>
                              </Col>
                            </Row>{" "}
                          </td>

                          <td
                            style={{
                              textAlign: "center",
                              //  paddingTop: "85px",
                            }}
                          >
                            {brand.salesNumb}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              // paddingTop: "85px",
                            }}
                          >
                            {brand.sumCommis}$
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              // paddingTop: "85px",
                            }}
                          >
                            {brand.productsNumber}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
  return (
    <>
      <div className="list row">
        <div className="col-md-6">
          <h4>Statistic Brands </h4>
        </div>
        {renderBrands()}
      </div>
    </>
  );
};

export default Statistic;
