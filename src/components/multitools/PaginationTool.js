import React from "react";
import _ from "lodash";
import { Pagination } from "react-bootstrap";

const Component = (props) => {
  const { collection, query, setQuery } = props;
  const limit = query.get("page[limit]") ?? "10";
  const offset = query.get("page[offset]") ?? "0";

  const countTotal = _.get(collection, "meta.countTotal", 0);
  const countPages = Math.ceil(countTotal / limit);
  const currentPage = Math.ceil(offset / limit) + 1;

  let pagination = [];
  for (let i = 1; i <= countPages; i++) {
    let isValid = false;
    if (i <= 2) {
      isValid = true;
    }

    const middleCounter = currentPage > 4 ? currentPage : 4;
    if (middleCounter >= i - 1 && middleCounter <= i + 1) {
      isValid = true;
    }

    if (i >= countPages - 1) {
      isValid = true;
    }

    if (i >= countPages - 4 && pagination.length <= 4) {
      isValid = true;
    }

    if (isValid) {
      pagination.push({
        offset: (i - 1) * limit,
        label: i,
        isCurrent: i === currentPage,
      });
    }
  }

  if (pagination[2] && pagination[2].label !== 3) {
    pagination[1].label = "...";
    pagination[1].isDisabled = true;
  }

  if (
    pagination[pagination.length - 3] &&
    pagination[pagination.length - 3].label !== countPages - 2
  ) {
    pagination[pagination.length - 2].label = "...";
    pagination[pagination.length - 2].isDisabled = true;
  }

  return (
    <>
      <Pagination className="mb-2 mb-lg-0">
        <Pagination.Prev
          disabled={parseInt(offset) - parseInt(limit) < 0}
          onClick={() =>
            setQuery({ "page[offset]": parseInt(offset) - parseInt(limit) })
          }
        >
          Previous
        </Pagination.Prev>

        {countPages > 1 && (
          <>
            {pagination.map((page) => {
              return (
                <Pagination.Item
                  key={page.offset}
                  active={page.isCurrent}
                  disabled={page.isDisabled}
                  onClick={() => setQuery({ "page[offset]": page.offset })}
                >
                  {page.label}
                </Pagination.Item>
              );
            })}
          </>
        )}

        <Pagination.Next
          disabled={countTotal - offset < limit}
          onClick={() =>
            setQuery({ "page[offset]": parseInt(offset) + parseInt(limit) })
          }
        >
          Next
        </Pagination.Next>
      </Pagination>
    </>
  );
};

export default Component;
