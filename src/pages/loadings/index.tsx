import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import './index.scss';

export const initArrayByLength = (length: number) => {
  return Array.apply(null, Array(length)).map(function (x, i) {
    return i;
  });
};

export const LoadingTokenInformation: React.FC<{}> = () => {
  return (
    <div className="flex loading-token full-width">
      {initArrayByLength(2).map((key) => {
        return <Skeleton.Avatar active shape={'circle'} key={key} />;
      })}
      <Skeleton.Input active />
      <Skeleton active paragraph={{ rows: 2 }} title={false} />
    </div>
  );
};

export const LoadingOrderlist: React.FC<{}> = () => {
  return (
    <div className="loading-orderbook-list">
      <div className="flex" style={{ justifyContent: 'space-between' }}>
        <div>
          {initArrayByLength(3).map((key) => (
            <Skeleton.Avatar active shape={'circle'} size={'small'} key={key} />
          ))}
        </div>
        <div>
          <Skeleton.Input active size="small" />
        </div>
      </div>
      {initArrayByLength(2).map((key) => {
        return (
          <React.Fragment key={key}>
            <Skeleton.Input active />
            <Skeleton active paragraph={{ rows: 10 }} title={false} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const LoadingTradingView: React.FC<{}> = () => {
  return (
    <div className="loading-trading-view">
      <div className="flex">
        {initArrayByLength(2).map((key) => (
          <Skeleton.Avatar active shape={'circle'} size={'small'} key={key} />
        ))}
        <Skeleton.Input active size="small" style={{ marginLeft: 10 }} />
      </div>
      <Skeleton.Input active style={{ marginTop: 10 }} />
      <div className="flex chart" style={{ justifyContent: 'space-between', marginTop: 10 }}>
        <div>
          {initArrayByLength(2).map((key) => (
            <Skeleton.Button active key={key} />
          ))}
        </div>
        <div>
          {initArrayByLength(2).map((key) => (
            <Skeleton.Button active key={key} />
          ))}
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 20 }} title={false} style={{ marginTop: 10 }} />
    </div>
  );
};

export const LoadingOrderBookForm: React.FC<{}> = () => {
  return (
    <div className="loading-orderbook-form">
      <div className="flex">
        <Skeleton.Button active shape={'square'} size={'small'} />
        <Skeleton.Button active shape={'square'} size={'small'} style={{ marginLeft: 10 }} />
      </div>
      <div className="flex">
        <Skeleton.Input active size={'small'} />
        <Skeleton.Input active size={'small'} style={{ marginLeft: 10 }} />
      </div>
      <div className="flex list-button">
        <div>
          {initArrayByLength(5).map((key) => (
            <Skeleton.Button active key={key} />
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton.Avatar active shape={'circle'} size={'small'} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton.Input active size={'large'} className="full-width" />
      </div>
      <Skeleton active paragraph={{ rows: 18 }} title={false} style={{ marginTop: 10 }} />
    </div>
  );
};

export const PainInfoLoading: React.FC<{}> = () => {
  return (
    <div className="loading-pair">
      <div className="flex">
        {initArrayByLength(2).map((key) => (
          <Skeleton.Avatar active shape={'circle'} size={'small'} key={key} />
        ))}
        <Skeleton.Input active size="small" style={{ marginLeft: 10 }} />
      </div>
      <Skeleton active paragraph={{ rows: 3 }} style={{ marginTop: 10 }} />
    </div>
  );
};

export const TableLoading: React.FC<{}> = () => {
  return (
    <div className="loading-table full-width">
      <div className="flex">
        {initArrayByLength(2).map((key) => (
          <Skeleton.Button active size={'small'} key={key} />
        ))}

        <Skeleton.Input active size="small" style={{ marginLeft: 10 }} />
      </div>
      <div className="flex full-width" style={{ justifyContent: 'space-between', marginTop: 20 }}>
        {initArrayByLength(10).map((key) => (
          <Skeleton.Button active key={key} />
        ))}
      </div>
      <Skeleton active paragraph={{ rows: 10 }} style={{ marginTop: 10 }} />
    </div>
  );
};

export const ExchangePageLoading: React.FC<{}> = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Row>
        <LoadingTokenInformation />
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <LoadingOrderlist />
        </Col>
        <Col span={12}>
          <LoadingTradingView />
        </Col>
        <Col span={6}>
          <LoadingOrderBookForm />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }} className="full-width">
        <TableLoading />
      </Row>
    </div>
  );
};

export const MarketPageLoading: React.FC<{}> = () => {
  return (
    <div className="market-page-loading">
      <Row className="full-width flex" style={{ justifyContent: 'space-between' }}>
        {initArrayByLength(5).map((key) => (
          <PainInfoLoading key={key} />
        ))}
      </Row>
      <Skeleton.Input active style={{ marginTop: 20, marginBottom: 20 }} />
      <Row style={{ marginTop: 20 }} className="full-width">
        <TableLoading />
      </Row>
    </div>
  );
};

export const WalletAnalyticsLoading: React.FC<{}> = () => {
  return (
    <div className="wallet-analytic-loading">
      <div className="flex full-width three-buttons">
        {initArrayByLength(3).map((key) => (
          <Skeleton.Input active size={'default'} key={key} />
        ))}
      </div>
      <div>
        <Row className="full-width" style={{ marginTop: 20 }}>
          <Col span={6}>
            <div className="element1">
              {initArrayByLength(3).map((key) => (
                <Skeleton.Input active size={'default'} key={key} />
              ))}
            </div>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={12}>
                <Skeleton.Avatar
                  active
                  shape={'circle'}
                  size={'large'}
                  style={{ width: 200, height: 200 }}
                />
              </Col>
              <Col span={12}>
                <div className="element1">
                  {initArrayByLength(6).map((key) => (
                    <Skeleton.Input active size={'small'} key={key} />
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <div style={{ float: 'right' }}>
              <Skeleton.Input active size={'default'} />
              <Skeleton.Input active size={'small'} style={{ marginLeft: 30 }} />
            </div>
          </Col>
        </Row>
      </div>
      <Skeleton.Input active style={{ marginTop: 20, marginBottom: 20 }} />
      <Row style={{ marginTop: 20 }} className="full-width">
        <TableLoading />
      </Row>
    </div>
  );
};
