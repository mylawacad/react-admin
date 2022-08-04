import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWithExpiry } from "../../helpers/localStorage";
import { userActions as Actions } from "../../store/users";
import { roleActions } from "../../store/roles";

import { useQuery } from "../../helpers/useQuery";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
import { Routes } from "../../routes";

import {
  Button,
  ButtonGroup,
  Row,
  Col,
  InputGroup,
  Form,
  Image,
  Dropdown,
  Card,
  Table,
  Nav,
} from "react-bootstrap";
import PaginationTool from "../../components/multitools/PaginationTool";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSearch,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

import ReactSelectAsync from "../../components/multitools/ReactSelectAsync";
import userAvatar from "../../assets/img/avatar/user-avatar.jpg";

import ContextMenuButton from "./ContextMenuButton";
import Alerts from "../../components/multitools/Alerts";
import Preloader from "../../components/Preloader";

const Component = (props) => {
  const { query, setQuery, history } = useQuery();
  const name = "usersList";
  const stateName = "users_data";

  const dispatch = useDispatch();
  const istemsList = (payload) => dispatch(Actions[name](payload));
  const itemsListRes = useSelector((state) => state[stateName][name]);
  const status = itemsListRes?.status ?? "";
  const error = itemsListRes?.errors ?? "Error";
  const items = itemsListRes?.data ?? [];
  const included = itemsListRes?.included ?? [];
  const count = itemsListRes?.meta?.count ?? 0;
  const countTotal = itemsListRes?.meta?.countTotal ?? 0;

  const limit = query.get("page[limit]") ?? "10";
  const offset = query.get("page[offset]") ?? "0";

  const [search, setSearch] = useState(query.get("filter[search]") ?? "");

  const roleId = query.get("filter[roleId]") ?? "";

  // reset pagination after item delete
  const _delId = query.get("_delId") ?? "";
  useEffect(() => {
    if (!_delId) {
      return;
    }
    setQuery({ "page[offset]": 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_delId]);

  useEffect(() => {
    const accessToken = getWithExpiry("accessToken");
    if (accessToken) {
      const payload = {
        data: {
          "page[limit]": limit,
          "page[offset]": offset,
          "filter[search]": search,
          "filter[roleId]": roleId,
        },
        token: accessToken,
      };
      istemsList(payload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery({ "filter[search]": search, "page[offset]": 0 });
  };

  // is loading
  if (["", "initial", "loading"].includes(status)) {
    return <Preloader show={true} />;
  }

  if (["fail", "error"].includes(status)) {
    return (
      <div className="mt-3 mb-3">
        <Alerts alerts={error} />
      </div>
    );
  }

  return (
    <>
      <div className="table-settings mb-2 mb-lg-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={12} lg={4} className="d-flex py-2 pe-lg-3">
            <Form
              onSubmit={handleSearchSubmit}
              noValidate={true}
              className="w-100"
            >
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by email"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <Button variant="outline-primary" type="submit">
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>

          <Col xs={12} lg={4} className="d-flex py-2 pe-lg-3">
            <ReactSelectAsync
              Actions={roleActions}
              actionName="rolesList"
              queryParams={{}}
              itemsPath="roles_data.rolesList"
              fieldName="attributes.roleName"
              placeholder="All roles"
              isClearable={true}
              onChange={(item) =>
                setQuery({
                  "filter[roleId]": item?.value ?? "",
                  "page[offset]": 0,
                })
              }
              selectedValue={roleId}
            />
          </Col>

          <Col xs={12} lg={4} className="text-end py-2">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faSlidersH} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">
                  Show
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex fw-bold"
                  onClick={() =>
                    setQuery({ "page[limit]": 10, "page[offset]": 0 })
                  }
                >
                  10
                  {limit === "10" && (
                    <span className="icon icon-small ms-auto">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                </Dropdown.Item>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    setQuery({ "page[limit]": 20, "page[offset]": 0 })
                  }
                >
                  20
                  {limit === "20" && (
                    <span className="icon icon-small ms-auto">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                </Dropdown.Item>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    setQuery({ "page[limit]": 50, "page[offset]": 0 })
                  }
                >
                  50
                  {limit === "50" && (
                    <span className="icon icon-small ms-auto">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                </Dropdown.Item>
                <Dropdown.Item
                  className="fw-bold"
                  onClick={() =>
                    setQuery({ "page[limit]": 100, "page[offset]": 0 })
                  }
                >
                  100
                  {limit === "100" && (
                    <span className="icon icon-small ms-auto">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="user-table align-items-center">
            <thead>
              <tr>
                <th className="border-bottom">Name</th>
                <th className="border-bottom">Email</th>
                <th className="border-bottom">Role</th>
                <th className="border-bottom">Created at</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {_(items)
                .map(function (item, i) {
                  const userName = `${item?.attributes?.firstName ?? ""} ${
                    item?.attributes?.lastName ?? ""
                  }`.trim();
                  const roleId = item?.relationships?.role?.data?.id;
                  const role = roleId
                    ? _.find(included, { type: "roles", id: roleId })
                    : {};
                  const roleName = role?.attributes?.roleName || "No role";
                  return (
                    <tr key={item.id} data-i={i}>
                      <td>
                        <Card.Link
                          as={Link}
                          to={Routes.User.path.replace(":_id", item.id)}
                          className="d-flex align-items-center"
                        >
                          <Image
                            src={item?.attributes?.image ?? userAvatar}
                            className="user-avatar rounded-circle me-3"
                          />
                          <div className="d-block">
                            <span className="fw-bold">
                              {userName || "No name"}
                            </span>
                          </div>
                        </Card.Link>
                      </td>
                      <td>
                        <span className="fw-normal">
                          {item?.attributes?.email}
                        </span>
                      </td>
                      <td>
                        <span className="fw-normal">{roleName}</span>
                      </td>
                      <td>
                        <span className="fw-normal">
                          {moment(item?.attributes?.createdAt).format(
                            "DD.MM.YYYY HH:mm"
                          )}
                        </span>
                      </td>
                      <td>
                        <ContextMenuButton
                          item={item}
                          redirectAfterTo={`${Routes.Users.path}?_delId=${item.id}`}
                        />
                      </td>
                    </tr>
                  );
                })
                .value()}
              {count === 0 && (
                <tr>
                  <td colSpan="5">
                    <span className="fw-normal">No entries to show</span>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <Nav>
              <PaginationTool
                query={query}
                setQuery={setQuery}
                collection={itemsListRes}
              />
            </Nav>
            <small className="fw-bold">
              Showing <b>{count}</b> out of <b>{countTotal}</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  );
};

export default Component;
