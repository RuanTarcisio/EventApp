const EventDetails = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  // fetch event based on the id
  const fetchEvent = async (id) => {};

  return (
    <section className="min-h-screen flex items-center py-8 sm:py-48">
      <div className="container mx-auto">Event Details</div>
    </section>
  );
};

export default EventDetails;
