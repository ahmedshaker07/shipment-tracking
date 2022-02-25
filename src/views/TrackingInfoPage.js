import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { injectIntl } from "react-intl";
import { Steps, Table, Spin } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { message } from "antd";
import Info from "../components/Info";
import axios from "axios";
import dayjs from "dayjs";

function TrackingInfoPage({ intl, ...props }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelReason, setCancelReason] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState({});
  const { Step } = Steps;
  const columns = [
    {
      title: intl.formatMessage({ id: "table.branch" }),
      dataIndex: "hub",
      key: "hub",
    },
    {
      title: intl.formatMessage({ id: "table.date" }),
      dataIndex: "date",
      key: "date",
    },
    {
      title: intl.formatMessage({ id: "table.time" }),
      dataIndex: "time",
      key: "time",
    },
    {
      title: intl.formatMessage({ id: "table.details" }),
      dataIndex: "details",
      key: "details",
    },
  ];
  const error = (err) => {
    err
      ? message.error(err)
      : message.error(intl.formatMessage({ id: "paper.input.error" }));
  };

  useEffect(() => {
    fetchShipmentData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchShipmentData = async () => {
    await axios
      .get("https://tracking.bosta.co/shipments/track/" + id)
      .then((res) => {
        getFormattedTransitEvents(res.data);
        const {
          CurrentStatus: { state },
        } = res.data;
        if (state === "DELIVERED") {
          setActiveStep(4);
          setStatus("finished");
        } else if (state === "DELIVERED_TO_SENDER") {
          setActiveStep(2);
          setStatus("error");
        } else {
          setActiveStep(1);
          setStatus("proccess");
        }
        setLoading(false);
      })
      .catch(() => {
        navigate("/track", error());
      });
  };

  const getFormattedTransitEvents = (shipmentData) => {
    let newShipmentData = [];
    const { TransitEvents } = shipmentData;
    TransitEvents.forEach(({ hub, timestamp, state, reason }, index) => {
      newShipmentData.push({
        key: index,
        hub: intl.formatMessage({ id: `${hub}` }),
        date: dayjs(timestamp).format("DD/MM/YYYY"),
        time: dayjs(timestamp).format("hh:mm a"),
        details: intl.formatMessage({ id: `${state}` }),
      });
      reason && setCancelReason(reason);
    });
    setShipmentDetails({ ...shipmentData, TransitEvents: newShipmentData });
  };

  const formatLatestUpdateDate = (props) => {
    return (
      intl.formatMessage({ id: `${dayjs(props).format("dddd")}` }) +
      " " +
      dayjs(props).format("h:mma DD/MM/YYYY")
    );
  };

  const formatPromisedDate = () => {
    return (
      dayjs(shipmentDetails.PromisedDate).format(" DD ") +
      intl.formatMessage({
        id: `${dayjs(shipmentDetails.PromisedDate).format("MMMM")}`,
      }) +
      dayjs(shipmentDetails.PromisedDate).format(" YYYY ")
    );
  };

  const getStepperClassName = () => {
    switch (status) {
      case "finished":
        return "stepperGreen";
      case "error":
        return "stepperRed";
      case "proccess":
        return "stepperYellow";
      default:
        break;
    }
  };

  return loading ? (
    <div className="loading">
      <Spin />
    </div>
  ) : (
    <div className="delivery-main">
      <div className="delivery-status">
        <div className="info">
          <Info
            header={intl.formatMessage(
              { id: "info.trackingNumber" },
              { trackingNo: shipmentDetails?.TrackingNumber }
            )}
            status={status}
            description={intl.formatMessage({
              id: `${shipmentDetails?.CurrentStatus?.state}`,
            })}
          />
          <Info
            header={intl.formatMessage({ id: "info.latestUpdate" })}
            date={formatLatestUpdateDate(
              shipmentDetails?.CurrentStatus?.timestamp
            )}
          />
          <Info
            header={intl.formatMessage({ id: "info.merchant" })}
            description={intl.formatMessage({ id: "info.merchantName" })}
          />
          <Info
            header={intl.formatMessage({ id: "info.deliveryDate" })}
            date={formatPromisedDate(props)}
          />
        </div>
        <div className="progress" dir="ltr">
          <Steps
            current={activeStep}
            status={status}
            size="small"
            labelPlacement="vertical"
            className={getStepperClassName()}
          >
            <Step title={intl.formatMessage({ id: "step.first" })} />
            <Step title={intl.formatMessage({ id: "step.second" })} />
            <Step
              title={intl.formatMessage({ id: "step.third" })}
              description={
                status === "finished"
                  ? ""
                  : intl.formatMessage(
                      { id: "step.error" },
                      { reason: cancelReason }
                    )
              }
            />
            <Step
              icon={<SaveOutlined />}
              title={intl.formatMessage({ id: "step.fourth" })}
            />
          </Steps>
        </div>
      </div>
      <div className="delivery-info">
        <div className="delivery-progress">
          <h4>{intl.formatMessage({ id: "table.header" })}</h4>
          <Table
            columns={columns}
            dataSource={shipmentDetails?.TransitEvents}
            pagination={false}
            scroll={{ x: true }}
          />
        </div>
        <div className="delivery-address">
          <h4>{intl.formatMessage({ id: "address.header" })}</h4>
          <div>
            <p>{intl.formatMessage({ id: "deliveryAddress" })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(TrackingInfoPage);
