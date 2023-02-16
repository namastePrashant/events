import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import EventDetailsPrintComponent from '../../components/eventDetailsPrint';
import { getSingleEventApi } from '../../services/events.service';
import { useAppDispatch } from "../../hooks/reduxHooks";

interface EventDetailPrintInterface {

}

const EventDetailPrint: React.FC<EventDetailPrintInterface> = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState();
  const [functionData, setFunctionData] = useState([]);

  const id = params?.id;
  const functionId = params?.functionId;

  useEffect(() => {
    fetchEventDetail()
  }, [])

  const fetchEventDetail = () => {
    setLoading(true)
    dispatch(
      getSingleEventApi({
        id: id,
        successCallback: (response: any) => {
          if (response?.data) {
            setEventData(response?.data);
            let fData = response?.data?.functions;
            setFunctionData(fData)
          }
        },
        finalCallback: () => {
          setLoading(false);
        },
      })
    );
  };

  useEffect(() => {
    let fData: any = functionData;
    if (functionId) {
      fData = _.filter(fData, ['id', parseInt(functionId)])
    }
    setFunctionData(fData)
  }, [functionId, eventData])

  if (loading) {
    return (
      <>
        Loading print...
      </>
    )
  }
  return (
    <EventDetailsPrintComponent
      data={eventData}
      functionData={functionData}
      functionId={functionId}
    />
  )
}

export default EventDetailPrint;
