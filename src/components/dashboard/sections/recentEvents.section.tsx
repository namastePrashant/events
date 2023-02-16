import { Button, Row } from 'antd';
import React from 'react';
import { MdCircle } from 'react-icons/md';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import ProgressComponent from '../../common/progress/progress.component';
interface RecentEventsSectionInterface {
  data?: any
}

const RecentEventsSection: React.FC<RecentEventsSectionInterface> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div className="card recent-event">
      <h3 className="dashboard-card-title">Recent Events</h3>
      {data?.map((event?: any) => {
        return (
          <div className="recent-event__event">
            <Row justify='space-between' className="recent-event__event__header">
              <div className="recent-event__event__header__left">
                <h3>{event?.name}</h3>
                <MdCircle color="#B4BCC7" className="dot" />
                <span className="recent-event__event__header__left__duration">{moment(event?.start_date).format('MMM D YYYY')} - {moment(event?.end_date).format('MMM D YYYY')}</span>
              </div>
              <div>
                <Button
                  className="recent-event__event__header__view-more-btn"
                  onClick={() => { navigate(`/events/${event?.id}`) }}
                >
                  View More
                </Button>
              </div>
            </Row>
            <Row>
              {
                event?.functions?.map((functionItem?: any) => {
                  return (
                    <div className="recent-event__event__event-progress">
                      <ProgressComponent
                        format={<span className="progress-date">
                          {functionItem?.start_date ? moment(functionItem?.start_date).format("D MMM") : <i>Date N/A</i>}
                        </span>}
                        percent={(functionItem?.complete_tasks_count / functionItem?.tasks_count) * 100}
                        strokeColor={functionItem?.color_code ? {
                          '0%': functionItem?.color_code[0],
                          '100%': functionItem?.color_code[1],
                        } : undefined}
                      />
                      <h4>{functionItem?.name}</h4>
                    </div>
                  )
                })
              }
            </Row>
          </div>
        )
      })}

    </div>
  )
}

export default RecentEventsSection;
