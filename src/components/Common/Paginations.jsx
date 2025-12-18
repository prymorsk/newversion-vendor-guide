import React from "react";
// import {Pagination} from "@nextui-org/react";
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/react";

const PaginationCustum = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center justify-center px-4 py-3 sm:px-6 pt-10 overflow-x-hidden paginationScroll ">

      <Pagination
        total={total}
        initialPage={current}
        onChange={onChange}
        loop showControls color="success"
      >
      </Pagination>

    </div>

  );
}
export default PaginationCustum;