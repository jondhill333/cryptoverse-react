import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import Loader from "./Loader";
import { useGetCryptoExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

interface Exchange {
  id: string;
  name: string;
  rank: number;
  iconUrl: string;
  description: string;
  volume: number;
  numberOfMarkets: number;
  marketShare: number;
}

const Exchanges = () => {
  const { data: cryptoExhanges, isFetching } = useGetCryptoExchangesQuery(null);
  if (isFetching) return <Loader />;
  const exchangesList = cryptoExhanges?.data?.exchanges;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24 Trade Volume </Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {exchangesList.map((exchange: Exchange, i: number) => (
        <Col span={24} key={exchange.id}>
          <Collapse>
            <Panel
              key={i}
              showArrow={false}
              header={
                <Row key={exchange.id}>
                  <Col span={6}>
                    <Text>
                      <strong>{exchange.rank}.</strong>
                    </Text>
                    <Avatar className="exchange-image" src={exchange.iconUrl} />
                    <Text>
                      <strong>{exchange.name}</strong>
                    </Text>
                  </Col>
                  <Col span={6}>${millify(exchange.volume)}</Col>
                  <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                  <Col span={6}>{millify(exchange.marketShare)}%</Col>
                </Row>
              }
            >
              {HTMLReactParser(exchange.description || "")}
            </Panel>
          </Collapse>
        </Col>
      ))}
    </>
  );
};

export default Exchanges;
