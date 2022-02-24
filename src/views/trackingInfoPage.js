import React,{useState, useEffect} from "react";
import {useParams,useNavigate } from "react-router-dom";
import { injectIntl} from "react-intl";
import { Steps, Table ,Spin} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import {message} from 'antd';
import Info from "../components/info";
import axios from 'axios';

function TrackingInfoPage({intl,...props}) {
    
    var dayjs = require('dayjs')
    const navigate = useNavigate();
    const { id } = useParams();
    const [current, setCurrent] = useState(0);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [cancelReason, setCancelReason] = useState("");
    const [shipmentDetails, setShipmentDetails] = useState({});
    const [transitEvents, setTransitEvents] = useState([]);
    const { Step } = Steps;
    const columns = [
        {
            title: intl.formatMessage({id: 'table.branch'}),
            dataIndex: 'hub',
            key: 'hub',
        },
        {
            title: intl.formatMessage({id: 'table.date'}),
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: intl.formatMessage({id: 'table.time'}),
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: intl.formatMessage({id: 'table.details'}),
            dataIndex: 'details',
            key: 'details',
        }
    ];
    const error = (err) => {
        err?message.error(err):
        message.error(intl.formatMessage({id: 'paper.input.error'}));
    };

    useEffect(() => {
        async function fetchShipmentData() {
            await axios
            .get("https://tracking.bosta.co/shipments/track/"+id)
            .then(res=>{
                // console.log(res.data)
                setShipmentDetails(res.data)
                updateShipmentDetailsTable(res.data.TransitEvents);
                if(res.data.CurrentStatus.state==="DELIVERED") {
                    setCurrent(4);
                    setStatus("finished");
                }
                else if(res.data.CurrentStatus.state==="DELIVERED_TO_SENDER"){
                    setCurrent(2);
                    setStatus("error");
                }
                else{
                    setCurrent(1);
                    setStatus("proccess");
                }
                setLoading(false)
            })
            .catch(()=>{
                navigate('/track',error());
            })
        }
        fetchShipmentData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateShipmentDetailsTable = (props)=>{
        try{
            let newShipmentData = [];
            props.forEach((element,index)=>{
                newShipmentData.push({
                    key: index,
                    hub: intl.formatMessage({id: `${element.hub}`}),
                    date: dayjs(element.timestamp).format('DD/MM/YYYY'),
                    time: dayjs(element.timestamp).format('hh:mm a'),
                    details: intl.formatMessage({id: `${element.state}`})
                })
                if(element.reason)
                    setCancelReason(element.reason)
            })
            setTransitEvents(newShipmentData)
        }
        catch(err){
            error(err)
        }
    }

    const getLatestUpdateDate = (props)=>{
        return intl.formatMessage({id: `${dayjs(props).format('dddd')}`})+" "+
        dayjs(props).format('h:mma DD/MM/YYYY')
    }

    const getPromisedDate = ()=>{
        return dayjs(shipmentDetails.PromisedDate).format(' DD ') + intl.formatMessage({id: `${dayjs(shipmentDetails.PromisedDate).format('MMMM')}`})
        + dayjs(shipmentDetails.PromisedDate).format(' YYYY ')
    }

    const getStepperClassName = ()=>{
        switch (status) {
            case "finished":
                return "stepperGreen"
            case "error":
                return "stepperRed"
            case "proccess":
                return "stepperYellow"
            default: break;
        }
    }
    
    return(
        loading?
        <div className="loading">
            <Spin />
        </div>
        :
        <div className="delivery-main">
           <div className="delivery-status">
                <div className="info">
                    <Info headerID="info.trackingNumber" status={status} descID={shipmentDetails.CurrentStatus.state} trackingNo={shipmentDetails.TrackingNumber}/>
                    <Info headerID="info.latestUpdate" date={getLatestUpdateDate(shipmentDetails.CurrentStatus.timestamp)}/>
                    <Info headerID="info.merchant" descID="info.merchantName"/>
                    <Info headerID="info.deliveryDate" date={getPromisedDate(props)}/>
                </div>
                <div className="progress" dir="ltr">
                    <Steps current={current} status={status} size="small" labelPlacement="vertical" className={getStepperClassName()}>
                        <Step title={intl.formatMessage({id: 'step.first'})}/>
                        <Step title={intl.formatMessage({id: 'step.second'})}/>
                        <Step title={intl.formatMessage({id: 'step.third'})} description={status==="finished"?"":intl.formatMessage({id: 'step.error'},{reason: cancelReason})} />
                        <Step icon={<SaveOutlined />} title={intl.formatMessage({id: 'step.fourth'})}/>
                    </Steps>
                </div>
           </div>
           <div className="delivery-info">
               <div className="delivery-progress">
                   <h4 style={{margin:"10px 0"}}>{intl.formatMessage({id: 'table.header'})}</h4>
                   <Table columns={columns} dataSource={transitEvents} pagination={{ pageSize: 99,position:[ "none"] }} scroll={{ x: true }}/>
               </div>
               <div className="delivery-address">
                   <h4 style={{margin:"10px 0"}}>{intl.formatMessage({id: 'address.header'})}</h4>
                   <div>
                        <p>
                         امبابه شارع طلعت حرب مدينة العمال بجوار البرنس
                        </p>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default injectIntl(TrackingInfoPage);