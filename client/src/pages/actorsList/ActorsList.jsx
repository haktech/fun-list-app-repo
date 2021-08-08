import "./actorsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { actorRows } from "../../dummyData";

export default function ActorsList() {
  const [data, setData] = useState(actorRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Actor name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="actorsListImgContainer">
            <img className="actorsListImg" src={params.row.imgPath} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "nickname", headerName: "Nick name", width: 180 },
    { field: "rating", headerName: "Rating", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link>
              <button className="actorsListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="actorsListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="actorsList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
