import React,{useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { injectIntl} from "react-intl";
import { Steps, Table } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import Info from "../components/info";

var dayjs = require('dayjs')

function TrackingInfoPage({intl,...props}) {

    const {state} = useLocation();
    const [current, setCurrent] = useState(0);
    const [status, setStatus] = useState("");
    const [shipmentDetailsData, setShipmentDetailsData] = useState([]);
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
            key: 'time',
        },
        {
            title: intl.formatMessage({id: 'table.details'}),
            dataIndex: 'details',
            key: 'details',
        }
    ];

    useEffect(() => {
        state.data.TransitEvents.map((element,index)=>{
            setShipmentDetailsData(shipmentDetailsData=>
                [...shipmentDetailsData,
                {
                    key: index,
                    hub: intl.formatMessage({id: `${element.hub}`}),
                    date: dayjs(element.timestamp).format('DD/MM/YYYY'),
                    time: dayjs(element.timestamp).format('hh:mm a'),
                    details: intl.formatMessage({id: `${element.state}`})
                }
            ])
        })
        if(state.data.CurrentStatus.state==="DELIVERED") {
            setCurrent(4);
            setStatus("finished");
        }
        else if(state.data.CurrentStatus.state==="DELIVERED_TO_SENDER"){
            setCurrent(2);
            setStatus("error");
        }
        else{
            setCurrent(1);
            setStatus("proccess");
        }
    }, []);

    const getLatestUpdateDate = (props)=>{
        return intl.formatMessage({id: `${dayjs(props).format('dddd')}`})+" "+
        dayjs(props).format('h:mma DD/MM/YYYY')
    }

    const getPromisedDate = ()=>{
        return dayjs(state.data.PromisedDate).format(' DD ') + intl.formatMessage({id: `${dayjs(state.data.PromisedDate).format('MMMM')}`})
        + dayjs(state.data.PromisedDate).format(' YYYY ')
    }

    return(
        <div className="delivery-main">
           <div className="delivery-status">
                <div className="info">
                    <Info headerID="info.trackingNumber" status={status} descID={state.data.CurrentStatus.state} trackingNo={state.data.TrackingNumber}/>
                    <Info headerID="info.latestUpdate" date={getLatestUpdateDate(state.data.CurrentStatus.timestamp)}/>
                    <Info headerID="info.merchant" descID="info.merchantName"/>
                    <Info headerID="info.deliveryDate" date={getPromisedDate(props)}/>
                </div>
                <div className="progress" dir="ltr">
                    <Steps current={current} status={status} size="small" labelPlacement="vertical" className="olele">
                        <Step style={{fontWeight:"bold"}} title={intl.formatMessage({id: 'step.first'})}/>
                        <Step style={{fontWeight:"bold"}} title={intl.formatMessage({id: 'step.second'})}/>
                        <Step style={{fontWeight:"bold"}} title={intl.formatMessage({id: 'step.third'})} 
                                description={status==="finished"?"":intl.formatMessage({id: 'step.error'})} />
                        <Step style={{fontWeight:"bold"}} icon={<SaveOutlined />} title={intl.formatMessage({id: 'step.fourth'})}/>
                    </Steps>
                </div>
           </div>
           <div className="delivery-info">
               <div className="delivery-progress">
                   <h4 style={{margin:"10px 0"}}>{intl.formatMessage({id: 'table.header'})}</h4>
                   <Table columns={columns} dataSource={shipmentDetailsData} pagination={{ pageSize: 99,position:[ "none"] }} scroll={{ x: true }}/>
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