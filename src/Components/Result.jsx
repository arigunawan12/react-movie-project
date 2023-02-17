import React from "react";

export default function Result(props) {
  const boxes = props.movies.map((item, index) => {
    return <Box key={index} image={item.poster_path} title={item.original_title} rating={item.popularity} id={item.id} desc={item.overview} />;
  });
  return (
    <>
      
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 gap-2 w-100">{boxes}</div>
      </div>
    </>
  );
}

const Box = (props) => {
  const IMGPATH = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <div className="col border border-secondary mt-3 pb-3" style={{ boxShadow: "0 1px 3px 0", minHeight: "200px" }}>
        <p className="text-center">{props.id}</p>
        <img src={IMGPATH + props.image} alt="" className="w-100" />
        <div className="d-flex justify-content-between px-2 text-center pb-1 ">
          <span className="fs-6">{props.title}</span>
          <span className="fs-6 text-warning fw-bold">{props.rating}</span>
        </div>
        <br />
        <div className="">{props.desc}</div>
      </div>
    </>
  );
};
