const EventCard = ({ eachEvent }) => {
  let event = eachEvent.fields;
  // console.log("event", event);

  const getDefaultImage = (e) => {
    e.currentTarget.src = "altImage.jpeg";
  };

  return (
    <div className="border col-3 eventCard">
      <h4>{event.title}</h4>
      <img
        className="img-thumbnail"
        src={event.image_thumb ?? "altImage.jpeg"}
        alt=""
        onError={getDefaultImage}
      />
      <p>{event.city}</p>
      <p>{event.city_district}</p>

      <p>{event.date_start}</p>
      <p>{event.date_end}</p>

      <p>{event.description}</p>
    </div>
  );
};

export default EventCard;
