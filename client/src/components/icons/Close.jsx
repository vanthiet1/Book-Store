
const Close = (props) => {
  const { onClick } = props;
  return (
    <>
      <div className="flex justify-end">
        <svg onClick={onClick} stroke="currentColor" fill="currentColor" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" className="bgWred-500 text-[#fff] rounded-full w-[30px] h-[30px] cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>
      </div>
    </>
  );
};

export default Close;