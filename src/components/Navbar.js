import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import MyProfile from "./MyProfile";
import CustomerAutocomplete from "./autocomplete/customerAutocomplete";

const Component = (props) => {
  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex flex-grow-1 align-items-center">
            <CustomerAutocomplete className="search-bar" />
            <div className="p-1" />
          </div>

          <Nav className="align-items-center">
            <MyProfile />
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Component;
