import React, { FC, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import Loader from "./Loader";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

type Simplified = {
  simplified: boolean;
};

interface Coin {
  name: string;
}

interface Article {
  name: string;
  url: string;
  datePublished: string;
  description: string;
  provider: any;
  image: any;
}

const News = ({ simplified }: Simplified) => {
  const [newsCategory, setNewsCategory] = useState<string>("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  console.log(cryptoNews);

  if (!cryptoNews?.value) return <Loader />;
  return (
    <Row gutter={[32, 32]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value: string) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <Option value="cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin: Coin) => (
              <Option key={coin.name} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((article: Article, i: number) => (
        <Col xs={24} sm={12} lg={12} key={article.datePublished + i}>
          <Card className="news-card">
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {article.name}
                </Title>
                <img
                  alt="news article"
                  src={article?.image?.thumbnail?.contentUrl || demoImage}
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
              </div>
              <p>
                {article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      article.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="crypto news article"
                  />
                  <Text className="provider-name">
                    {article?.provider[0]?.name}
                  </Text>
                </div>
                <Text>{moment(article.datePublished).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
