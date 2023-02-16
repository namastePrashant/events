import React, { useEffect, useState } from "react";
import { MdBookmark } from "react-icons/md";
import { NavLink } from "react-router-dom";
import {
  SortableContainer,
  SortableElement,
  SortableContainerProps,
  SortableElementProps,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  getAllFavoriteEventsApi,
  reorderEventApi,
} from "../../../services/events.service";
import { defaultEventColors } from "../../../constants/colorPalette.constant";

interface EventsSidenavInterface {}

const AppSortableItem: React.ComponentClass<
  SortableElementProps & { value: string },
  any
> = SortableElement((props: any) => {
  const { value } = props;
  return (
    <li className="draggable-li" style={{ zIndex: 99999999 }}>
      <NavLink to={`/events/${value?.id}`}>
        <MdBookmark color={value?.color_code ?? defaultEventColors} />
        {value?.name}
      </NavLink>
    </li>
  );
});

const AppSortableContainer: React.ComponentClass<
  SortableContainerProps & { children: any },
  any
> = SortableContainer((props: any) => {
  return <ul>{props?.children}</ul>;
});

const EventsSidenav: React.FC<EventsSidenavInterface> = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { favoriteEvents } = state.events;
  const [items, setItems] = useState<any>(favoriteEvents);

  useEffect(() => {
    // handleEventsReorder(items);
    dispatch(
      getAllFavoriteEventsApi({
        finalCallback: () => {},
      })
    );
  }, []);

  useEffect(() => {
    setItems(favoriteEvents);
  }, [favoriteEvents]);

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex?: any;
    newIndex?: any;
  }) => {
    let newItems = arrayMoveImmutable(items, oldIndex, newIndex);
    setItems(newItems);
    handleEventsReorder(newItems);
  };

  const handleEventsReorder = (data: any) => {
    let newArr: any = [];
    data?.forEach((d: any, dIndex: any) => {
      newArr.push({
        id: d?.id,
        order: dIndex,
      });
    });

    dispatch(
      reorderEventApi({
        data: newArr,
        finalCallback: () => {},
        successCallback: () => {},
        failureCallback: () => {},
      })
    );
  };

  return (
    <div className="events__list">
      {items?.length === 0 ? (
        <p className="no-event">No event has been favorited.</p>
      ) : (
        <AppSortableContainer
          onSortEnd={onSortEnd}
          pressDelay={200}
          lockAxis="y"
          lockToContainerEdges={true}
        >
          {items.map((item: any, index: any) => {
            return (
              <AppSortableItem
                key={`item-${item?.id}`}
                index={index}
                value={item}
              />
            );
          })}
        </AppSortableContainer>
      )}
      <div className="see-all">
        <NavLink to="/events">See all events</NavLink>
      </div>
    </div>
  );
};

export default EventsSidenav;
