import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

const TimeAgo = (props) => {
  const handleTimeStamp = () => {
    if (props.timeStamp) {
      const timeStamp = parseISO(props.timeStamp);
      const timeAgo = formatDistanceToNow(timeStamp);
     
      return <span>{timeAgo} ago</span>;
    }
  };
  return handleTimeStamp() ;
};

export default TimeAgo;
