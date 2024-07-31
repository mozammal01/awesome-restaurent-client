const SectionTitle = ({heading, subHeading}) => {
  return (
    <div className='text-center my-20'>
    <h4 className="text-xl mb-4 text-warning">{subHeading}</h4>
    <h2 className="w-96 mx-auto text-4xl border-y-4 py-4 font-semibold uppercase">{heading}</h2>
  </div>

  );
};

export default SectionTitle;